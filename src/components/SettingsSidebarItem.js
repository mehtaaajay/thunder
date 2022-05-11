import React from 'react';

import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import '../style/SettingsSidebarItem.css';

const SettingsSidebarItem = ({ href, title, logoutBtn, logoutUser }) => {
    return (
        <div className="settings__sidebarItem">
            {
                logoutBtn ? (
                    <Link to='/' onClick={logoutUser}>
                        <h3>{title}</h3>
                    </Link>
                ) : (
                    <Link to={`${href}`}>
                        <h3>{title}</h3>
                    </Link>
                )
            }
        </div>
    );
}

SettingsSidebarItem.propTypes = {
    href: PropTypes.string,
    title: PropTypes.string.isRequired
}

export default SettingsSidebarItem;