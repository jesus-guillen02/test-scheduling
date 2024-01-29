import React, { useState } from 'react';
import './Login.css'; // Importing the CSS file

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginMessage, setLoginMessage] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed');
            }

            const data = await response.json();
            localStorage.setItem('userToken', data.token);
            // Redirect or update the state as needed
        } catch (error) {
            setLoginMessage(error.message);
        }
    };

    return (
        <div id="loginContainer">
            <form id="loginForm" onSubmit={handleLogin}>
                <h2>Login</h2>
                <input 
                    type="email" 
                    id="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    id="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button type="submit">Login</button>
            </form>
            {loginMessage && <div id="loginMessage">{loginMessage}</div>}
        </div>
    );
};

export default Login;
