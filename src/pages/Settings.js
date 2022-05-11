import React, { useState, useEffect } from 'react';

import Navbar from '../components/Navbar';
import SettingsSidebar from '../components/SettingsSidebar';
import SettingsSection from '../components/SettingsSection';

import { useNavigate } from 'react-router-dom';

import api from '../api/api';

import cameraIcon from '../images/camera.png';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../style/Settings.css';

const Settings = () => {
    const [user, setUser] = useState({});
    const [username, setUsername] = useState('');
    const [pic, setPic] = useState('');
    const [tab, setTab] = useState('profile');
    const [users, setUsers] = useState([]);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const _users = await api.getUsers();
            setUsers(users => _users);
        })();
    }, []);

    const handleUsernameChange = event => {
        setUsername(event.target.value);
    }

    const handleFileChange = async event => {
        try {
            const status = await api.createPic(event.target.files[0]);

            const newPic = await api.getPicPreview(status.$id);
            setPic(newPic);
        }
        catch(error) {
            toast.error(error.message);
        }
    }

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            if(username === '') {
                throw new Error('Username cannot be empty');
            }
            
            if(user.name !== username) {
                users.documents.forEach(user => {
                    if ((user.Username === username)) {
                        throw new Error('Username already exists');
                    }
                });
            }

            if(user.name !== username) {
                await api.updateName(username);
                await api.saveUsername(user.name, username);
            }

            if(pic.href !== undefined) {
                await api.savePic(user.name, pic.href);
            }

            toast.success('Profile Updated');
        }   
        catch(error) {
            toast.error(error.message);
        }     
    }

    const changePassword = async event => {
        event.preventDefault();

        try {
            await api.provider().account.updatePassword(newPassword, currentPassword);

            toast.success('Password Updated');
        }
        catch(error) {
            toast.error(error.message);
        }
        finally {
            setCurrentPassword('');
            setNewPassword('');
        }
    }

    const handleCurrentPasswordChange = event => {
        setCurrentPassword(event.target.value);
    }

    const handleNewPasswordChange = event => {
        setNewPassword(event.target.value);
    }

    useEffect(() => {
        (async () => {
            try {
                const data = await api.getAccount();

                setUser(data);
                setUsername(data.name);

                const profilePicHref = await api.getPic(data.name);
                setPic(profilePicHref.ProfilePicID);
            }
            catch(error) {
                navigate('/auth');
            }
        })();
    }, []);

    useEffect(() => {
        setTab(document.URL.slice(document.URL.lastIndexOf('/settings/') + 10));
    });

    return (
        <div className="settings">
            {
                user.name && (
                    <Navbar selectedUser={user.name} showItems />
                )
            }
            <main className="container">
                <SettingsSidebar />
                {
                    tab === 'profile' && (
                        <SettingsSection title='Profile'>
                            <form className="profile" onSubmit={handleSubmit}>
                                <div className="profile__image">
                                    <input onChange={handleFileChange} type="file" name="profilePic" id="profilePic" accept="image/*" capture />
                                    <label htmlFor="profilePic">
                                        <img src={cameraIcon} alt="Change Profile" />
                                    </label>
                                    <img src={pic} alt={username} />
                                </div>
                                <div className="profile__info">
                                    <input value={username} onChange={handleUsernameChange} type="text" name="username" id="username" placeholder="Username" />
                                    <button type="submit">Save</button>
                                </div>
                            </form>
                        </SettingsSection>
                    )
                }
                {
                    tab === 'change_password' && (<SettingsSection title='Change Password'>
                        <form className="changePassword" onSubmit={changePassword}>
                            <input value={currentPassword} onChange={handleCurrentPasswordChange} type="password" name="currentPassword" id="currentPassword" placeholder="Current Password" />
                            <input type="password" value={newPassword} onChange={handleNewPasswordChange} name="newPassword" id="newPassword" placeholder="New Password" />
                            <button type="submit">Change Password</button>
                        </form>
                    </SettingsSection>)
                }

                <ToastContainer
                    position="top-right"
                    autoClose={4000}
                    newestOnTop={true}
                    closeOnClick={false}
                    pauseOnFocusLoss={false}
                    draggable={false}
                    pauseOnHover={false}
                />
            </main>
        </div>
    );
}

export default Settings;