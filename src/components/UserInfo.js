import React from 'react';
import './UserInfo.css';

const UserInfo = ({ isLoggedIn, userName }) => {
    return (
        <div className="user-info">
            {isLoggedIn && <span>Welcome, {userName}!</span>}
        </div>
    );
}

export default UserInfo;
