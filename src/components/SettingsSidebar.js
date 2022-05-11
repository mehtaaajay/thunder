import React from 'react';

import SettingsSidebarItem from './SettingsSidebarItem';

import { useNavigate } from 'react-router-dom';

import api from '../api/api';

import '../style/SettingsSidebar.css';

const SettingsSidebar = () => {
    const navigate = useNavigate();
    
    const logoutUser = async () => {
        await api.deleteSession();

        navigate('/auth');
    }

    return (
        <div className="settings__sidebar">
            <div className="settings__sidebarHeader">
                <h2>Settings</h2>
            </div>
            <div className="settings__sidebarItems">
                <SettingsSidebarItem href='profile' title='Profile' />
                {/* <SettingsSidebarItem href='display' title='Display' /> */}
                <SettingsSidebarItem href='change_password' title='Change Password' />
                <SettingsSidebarItem title='Logout' logoutBtn logoutUser={logoutUser} />
            </div>
        </div>
    );
}

export default SettingsSidebar;