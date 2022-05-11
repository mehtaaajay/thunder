import React from 'react';

import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import '../style/SidebarItem.css';

const SidebarItem = ({ profileImg, username, online, selected }) => {
    return (
        <Link to={`/chat/${username}`} className={`sidebar__item ${selected ? 'selected' : ''}`}>
            <div className="sidebar__itemProfilePic">
                <img src={profileImg} alt={username} />
            </div>
            <div className="sidebar__itemInfo">
                <h3>{username}</h3>
                <h4>{online ? 'Online' : 'Offline'}</h4>
            </div>
        </Link>
    );
}

SidebarItem.propTypes = {
    profileImg: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    online: PropTypes.bool,
    selected: PropTypes.bool
}

export default SidebarItem;