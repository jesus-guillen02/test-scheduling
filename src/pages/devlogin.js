import React, { useState } from 'react';
import './devlogin.css'; // Importing the CSS file for styling

const DevLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginMessage, setLoginMessage] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();
    
        try {
            const response = await fetch('http://localhost:3002/api/developers/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
    
            // Read the response as text only once
            const responseBody = await response.text();
    
            if (!response.ok) {
                try {
                    // Attempt to parse the text as JSON
                    const errorData = JSON.parse(responseBody);
                    throw new Error(errorData.message || 'Login failed');
                } catch (jsonParseError) {
                    // If parsing as JSON fails, use the response text as the error message
                    throw new Error(responseBody || 'Login failed');
                }
            }
    
            // If response is OK, parse the text as JSON for further processing
            const data = JSON.parse(responseBody);
            localStorage.setItem('developerToken', data.token);
    
            // Redirect or handle login success
        } catch (error) {
            setLoginMessage(error.message);
        }
    };
    
    

    return (
        <div className="dev-login-container">
            <form className="dev-login-form" onSubmit={handleLogin}>
                <h2>Developer Login</h2>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Email" 
                    required 
                />
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Password" 
                    required 
                />
                <button type="submit">Login</button>
                {loginMessage && <div className="dev-login-message">{loginMessage}</div>}
            </form>
        </div>
    );
};

export default DevLogin;
