import React, { useState } from 'react';

import api from '../api/api';

import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../style/Login.css';

const Login = ({ showRegistrationForm }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleEmailChange = event => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = event => {
        setPassword(event.target.value);
    }

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            await api.createSession(email, password);

            toast.success('Logging In...');

            navigate('/chat');
        }
        catch(error) {
            toast.error(error.message);
        }
    }

    return (
        <div className="login">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <input value={email} onChange={handleEmailChange} type="email" name="email" id="email" placeholder="Email" />
                <input value={password} onChange={handlePasswordChange} type="password" name="password" id="password" placeholder="Password" />
                <button type="submit">Login</button>

                <span>Don't have an account? <a onClick={showRegistrationForm}>Register</a></span>

                <ToastContainer 
                    position="top-right"
                    autoClose={4000}
                    newestOnTop={true}
                    closeOnClick={false}
                    pauseOnFocusLoss={false}
                    draggable={false}
                    pauseOnHover={false}
                />
            </form>
        </div>
    );
}

export default Login;