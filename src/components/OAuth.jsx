// OAuth.js
import React from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useAuth } from '../auth/AuthContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const OAuth = () => {
    const { setIsAuthenticated, setUser } = useAuth();
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const navigate = useNavigate();
    const handleGoogleClick = async () => {
        try {
            const auth = getAuth(app);
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);

            const user = result.user;

            const res = await fetch(`${API_BASE_URL}/api/auth/google`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL,
                }),
                credentials: 'include',
            });

            const data = await res.json();
            //console.log(data);
            setIsAuthenticated(true);
            setUser(data);
            localStorage.setItem('isAuthenticated', JSON.stringify(true));
            localStorage.setItem('user', JSON.stringify(data));
            navigate("/");
        } catch (error) {
            console.error('Google login error:', error);
        }
    };

    return (
        <Button type="button" onClick={handleGoogleClick} className='bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95 w-full'>
            Continue with Google
        </Button>
    );
};

export default OAuth;
