import React from 'react';

import PropTypes from 'prop-types';

import api from '../api/api';

import '../style/ChatItem.css';

const ChatItem = ({ id, message, selfMessage, time }) => {
    const formatTime = time => {
        const hours = time.getHours() > 12 ? time.getHours() - 12 : time.getHours();
        const minutes = time.getMinutes().toString().length === 1 ? `0${time.getMinutes()}` : time.getMinutes();
        const meridiem = time.getHours() >= 12 ? 'PM' : 'AM';

        return `${hours}:${minutes} ${meridiem}`;
    }

    const toggleDropDown = () => {
        const dropdown = document.querySelector(`.chat__item[data-id="id-${id}"] .chat__itemDropDown`);
        if(dropdown.style.display === 'block') {
            dropdown.style.display = 'none';
        }
        else {
            dropdown.style.display = 'block';
        }
    }

    const deleteMessage = async event => {
        const id = event.target.parentElement.parentElement.dataset.id;
        
        await api.deleteMessage(id.slice(3));
        event.target.parentElement.parentElement.style.display = 'none';
    }

    return (
        <div className={`chat__item ${selfMessage ? 'self' : 'other'}`} data-id={`id-${id}`} onContextMenu={toggleDropDown}>
            <p>{message}</p>
            <p>{formatTime(new Date(time))}</p>

            <div className="chat__itemDropDown">
                <span onClick={deleteMessage}>Delete</span>
            </div>
        </div>
    );
}

ChatItem.propTypes = {
    message: PropTypes.string.isRequired,
    selfMessage: PropTypes.bool,
    time: PropTypes.string.isRequired
}

export default ChatItem;