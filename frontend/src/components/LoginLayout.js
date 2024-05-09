import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Login from '../forms/Login';
import SignIn from '../forms/SignIn';

const LoginLayout = () => {
    const [isLogin, setIsLogin] = useState(true);
    const { setIsLoggedIn } = useAuth();
    const navigate = useNavigate();

    const toggleForms = () => {
        setIsLogin(!isLogin);
    };

    const loginSuccess = () => {
        setIsLoggedIn(true);
        navigate('/admin');
    };

    return (
        <div className="bg-office h-screen w-full opacity-90 flex justify-center items-center">
            {isLogin ? (
                <Login toggleForms={toggleForms} loginSuccess={loginSuccess} />
            ) : (
                <SignIn toggleForms={toggleForms} loginSuccess={loginSuccess} />
            )}
        </div>
    );
}

export default LoginLayout;
