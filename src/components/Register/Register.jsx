// components/Register/Register.jsx
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router';

const Register = () => {
    const { signInWithGoogle, createUser, signInUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [isLoginMode, setIsLoginMode] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result.user);
                navigate('/'); // Google login এর পরে home redirect
            })
            .catch(err => setError(err.message));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (isLoginMode) {
            // Login mode
            signInUser(email, password)
                .then(result => {
                    console.log(result.user);
                    navigate('/');
                })
                .catch(err => setError(err.message));
        } else {
            // Register mode - Name validation
            const uppercaseRegex = /[A-Z]/;
            const lowercaseRegex = /[a-z]/;

            if (name.length < 6) {
                setError('Name must be at least 6 characters long');
                return;
            }
            if (!uppercaseRegex.test(name)) {
                setError('Name must contain at least one uppercase letter');
                return;
            }
            if (!lowercaseRegex.test(name)) {
                setError('Name must contain at least one lowercase letter');
                return;
            }

            createUser(email, password)
                .then(result => {
                    console.log(result.user);
                    navigate('/');
                })
                .catch(err => setError(err.message));
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
                    {isLoginMode ? 'Welcome Back' : 'Create Account'}
                </h2>
                
                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg mb-4 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLoginMode && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {!isLoginMode && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Photo URL (Optional)
                            </label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                placeholder="https://example.com/photo.jpg"
                                value={photoURL}
                                onChange={(e) => setPhotoURL(e.target.value)}
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors"
                    >
                        {isLoginMode ? 'Sign In' : 'Register'}
                    </button>
                </form>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                            Or continue with
                        </span>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                    <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                    </svg>
                    Continue with Google
                </button>

                <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
                    {isLoginMode ? "Don't have an account?" : 'Already have an account?'}{' '}
                    <button
                        type="button"
                        onClick={() => {
                            setIsLoginMode(!isLoginMode);
                            setError('');
                        }}
                        className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                    >
                        {isLoginMode ? 'Create account' : 'Sign in'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Register;
