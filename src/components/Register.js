import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import api from '../api/api';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../style/Register.css';

const Register = ({ showLoginForm }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        (async () => {
            const _users = await api.getUsers();
            setUsers(users => _users);
        })();
    }, []);

    const navigate = useNavigate();

    const handleUsernameChange = event => {
        setUsername(event.target.value);
    }

    const handleEmailChange = event => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = event => {
        setPassword(event.target.value);
    }

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            users.documents.forEach(user => {
                if (user.Username === username) {
                    throw new Error('Username already exists');
                }
            });

            const user = await api.createAccount(email, password, username);

            await api.createSession(user.email, password);

            await api.addUser({
                Username: username,
                Email: email,
                ProfilePicID: 'https://dreamvilla.life/wp-content/uploads/2017/07/dummy-profile-pic.png'
            });

            toast.success('Registration Successful');
                
            navigate('/chat');
        }
        catch(error) {
            toast.error(error.message);
        }
    }

    return (
        <div className="register">
            <form onSubmit={handleSubmit}>
                <h2>Register</h2>
                <input value={username} onChange={handleUsernameChange} type="text" name="username" id="username" placeholder="Username" />
                <input value={email} onChange={handleEmailChange} type="email" name="email" id="email" placeholder="Email" />
                <input value={password} onChange={handlePasswordChange} type="password" name="password" id="password" placeholder="Password" />
                <button type="submit">Register</button>

                <span>Already have an account? <a onClick={showLoginForm}>Login</a></span>
            </form>

            <ToastContainer
                position="top-right"
                autoClose={4000}
                newestOnTop={true}
                closeOnClick={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={false}
            />
        </div>
    );
}

export default Register;