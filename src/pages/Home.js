import React, { useState, useEffect } from 'react';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Chat from '../components/Chat';

import { useNavigate } from 'react-router-dom';

import api from '../api/api';

import '../style/Home.css';

const Home = () => {
    const [userData, setUserData] = useState({});
    const [selectedUser, setSelectedUser] = useState('');
    const [users, setUsers] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        api.getAccount()
        .then(data => {
            setUserData(data);

            if (document.URL.lastIndexOf('/chat') > -1) {
                let _selectedUser = document.URL.slice(document.URL.lastIndexOf('/chat/') + 6);
                setSelectedUser(_selectedUser);

                if (_selectedUser === data.name) {
                    setSelectedUser('');
                    navigate('/chat');
                }

                api.getUsers()
                .then(userDocs => {
                    setUsers(userDocs.documents);
                    
                    const selectedUserExists = userDocs.documents.filter(user => user.Username === _selectedUser);

                    if (selectedUserExists.length === 0) {
                        navigate('/chat');

                        setSelectedUser('');
                        _selectedUser = '';
                    }
                })
            }
        })
        .catch(() => {
            navigate('/auth');
        })
    }, [document.URL]);

    return (
        <div className="home">
            {
                userData.name && (
                    <Navbar selectedUser={userData.name} showItems />
                )
            }

            <main className="home__container">
                {
                    (userData.name !== undefined && users.length !== 0) && (
                        <Sidebar username={userData.name} users={users} selectedUser={selectedUser} />
                    )
                }
                {
                    userData.name !== undefined && (
                        <Chat username={userData.name} online selectedUser={selectedUser} />
                    )
                }
            </main>
        </div>
    );
}

export default Home;