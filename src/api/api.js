import { Appwrite } from "appwrite";
import Server from '../utils/config';

const api = {
    sdk: null,

    provider: () => {
        if(api.sdk) return api.sdk;

        const appwrite = new Appwrite();
        appwrite.setEndpoint(Server.endpoint).setProject(Server.project);

        api.sdk = appwrite;

        return appwrite;
    },
    createAccount: (email, password, username) => {
        return api.provider().account.create('unique()', email, password, username);
    },
    getAccount: () => {
        return api.provider().account.get();
    },
    updateName: name => {
        return api.provider().account.updateName(name);
    },
    createSession: (email, password) => {
        return api.provider().account.createSession(email, password);
    },
    deleteSession: () => {
        return api.provider().account.deleteSession('current');
    },
    createDocument: (data, read, write) => {
        return api.provider().database.createDocument(Server.chatsCollectionID, 'unique()', data, read, write);
    },
    listMessages: async (from, to) => {
        let messages = await api.provider().database.listDocuments(Server.chatsCollectionID);
        messages = messages.documents.filter(message => (message.From === from || message.From === to) && (message.To === to || message.To === from));
        return messages;
    },
    createPic: file => {
        return api.provider().storage.createFile(Server.profilePicsBucketID, 'unique()', file);
    },
    savePic: async (username, profilePicID) => {
        const users = await api.getUsers();
        const user = users.documents.filter(user => user.Username === username);
        return api.provider().database.updateDocument(Server.usersCollectionID, user[0].$id, {
            ProfilePicID: profilePicID
        });
    },
    saveUsername: async (currentUsername, newUsername) => {
        const users = await api.getUsers();
        const user = users.documents.filter(user => user.Username === currentUsername);
        return api.provider().database.updateDocument(Server.usersCollectionID, user[0].$id, {
            Username: newUsername
        });
    },
    getPicPreview: fileId => {
        return api.provider().storage.getFilePreview(Server.profilePicsBucketID, fileId);
    },
    getPic: async username => {
        const pics = await api.provider().database.listDocuments(Server.usersCollectionID);
        const pic = pics.documents.filter(doc => doc.Username === username);
        return pic ? pic[pic.length - 1] : '';
    },
    getUsers: () => {
        return api.provider().database.listDocuments(Server.usersCollectionID);
    },
    addUser: (data, read, write) => {
        return api.provider().database.createDocument(Server.usersCollectionID, 'unique()', data, read, write);
    },
    deleteMessage: id => {
        return api.provider().database.deleteDocument(Server.chatsCollectionID, id);
    },
    deleteAllMessages: async (from, to) => {
        const messages = await api.listMessages(from, to);
        messages.forEach(async message => {
            await api.provider().database.deleteDocument(Server.chatsCollectionID, message.$id);
        });
    }
}

export const storage = api.provider().storage;
export default api;