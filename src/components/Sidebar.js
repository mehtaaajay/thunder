import React from 'react';

import SidebarItem from './SidebarItem';

import '../style/Sidebar.css';

const Sidebar = ({ username, users, selectedUser }) => {
    const filterUsers = event => {
        const value = event.target.value;

        const sidebarItems = [...document.querySelectorAll('.sidebar__item')];

        sidebarItems.forEach(sidebarItem => {
            const username = sidebarItem.querySelector('.sidebar__itemInfo h3').innerText;

            if (username.toLowerCase().includes(value.toLowerCase())) {
                sidebarItem.style.display = 'flex';
            } 
            else {
                sidebarItem.style.display = 'none';
            }
        });
    }

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <input onChange={filterUsers} type="text" placeholder="Search" autoComplete="off" spellCheck="false" />
            </div>            
            <div className="sidebar__items">
                {
                    users.map(user => {
                        if(user.Username === username) return;
                        return <SidebarItem key={user.Username} profileImg={user.ProfilePicID} username={user.Username} online selected={user.Username === selectedUser} />
                    })
                }
            </div>
        </div>
    );
}

export default Sidebar;