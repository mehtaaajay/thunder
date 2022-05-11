import React from 'react';

import '../style/SettingsSection.css';

const SettingsSection = props => {
    return (
        <div className="settings__section">
            <div className="settings__sectionHeader">
                <h2>{props.title}</h2>
            </div>
            <div className="settings__sectionContent">
                {props.children}
            </div>
        </div>
    );
}

export default SettingsSection;