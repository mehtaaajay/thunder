import React, { useState, useEffect } from 'react';

import Navbar from '../components/Navbar';
import Login from '../components/Login';
import Register from '../components/Register';

import api from '../api/api';

import { useNavigate } from 'react-router-dom';

import '../style/Auth.css';

const Auth = () => {
    const [showLogin, setShowLogin] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const user = await api.getAccount();
            if(user) navigate('/chat');
        }

        fetchUser();
    }, []);

    const showRegistrationForm = () => {
        setShowLogin(false);
    }

    const showLoginForm = () => {
        setShowLogin(true);
    }
    
    return (
        <div className="auth">
            <Navbar />
            {
                showLogin ? <Login showRegistrationForm={showRegistrationForm} /> : <Register showLoginForm={showLoginForm} />
            }
        </div>
    );
}

export default Auth;