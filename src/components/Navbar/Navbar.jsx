// components/Navbar/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
    const { user, signOutUser } = React.useContext(AuthContext);
    const navigate = useNavigate();

    // Initialize dark mode from localStorage or default to false (light/white)
    const [darkMode, setDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode !== null ? JSON.parse(savedMode) : false;
    });

    // Apply dark mode on mount and when it changes
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            document.body.classList.add('dark');
            localStorage.setItem('darkMode', 'true');
        } else {
            document.documentElement.classList.remove('dark');
            document.body.classList.remove('dark');
            localStorage.setItem('darkMode', 'false');
        }
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const links = (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        "px-3 py-1 rounded hover:bg-blue-500 hover:text-white transition-colors" +
                        (isActive ? " font-bold underline" : "")
                    }
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/allJobs"
                    className={({ isActive }) =>
                        "px-3 py-1 rounded hover:bg-blue-500 hover:text-white transition-colors" +
                        (isActive ? " font-bold underline" : "")
                    }
                >
                    All Jobs
                </NavLink>
            </li>
            {user && (
                <>
                    <li>
                        <NavLink
                            to="/addaJob"
                            className={({ isActive }) =>
                                "px-3 py-1 rounded hover:bg-blue-500 hover:text-white transition-colors" +
                                (isActive ? " font-bold underline" : "")
                            }
                        >
                            Add Job
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/myJobs"
                            className={({ isActive }) =>
                                "px-3 py-1 rounded hover:bg-blue-500 hover:text-white transition-colors" +
                                (isActive ? " font-bold underline" : "")
                            }
                        >
                            My Added Jobs
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/myAcceptedTasks"
                            className={({ isActive }) =>
                                "px-3 py-1 rounded hover:bg-blue-500 hover:text-white transition-colors" +
                                (isActive ? " font-bold underline" : "")
                            }
                        >
                            My Accepted Tasks
                        </NavLink>
                    </li>
                </>
            )}
        </>
    );

    const handleLogout = () => {
        signOutUser()
            .then(() => navigate('/register'))
            .catch(err => console.error(err));
    };

    return (
        <nav className="navbar bg-base-100 dark:bg-gray-800 dark:text-white shadow-sm px-4">
            {/* Left: Logo */}
            <div className="navbar-start">
                <NavLink to="/" className="btn btn-ghost text-xl">
                    Job-<span className="text-blue-600">Khuiji</span>
                </NavLink>
            </div>

            {/* Center: Desktop Menu */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">{links}</ul>
            </div>

            {/* Right-end: User Info + Dark Mode */}
            <div className="navbar-end flex items-center gap-3 relative">
                {/* Dark Mode Toggle */}
                <button
                    onClick={toggleDarkMode}
                    className="btn btn-sm bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white transition-colors"
                    title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                >
                    {darkMode ? (
                        <span className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                            </svg>
                            Light
                        </span>
                    ) : (
                        <span className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                            </svg>
                            Dark
                        </span>
                    )}
                </button>

                {user ? (
                    <>
                        {/* User photo */}
                        {user.photoURL && (
                            <div className="relative group">
                                <img
                                    src={user.photoURL}
                                    alt="User"
                                    className="w-10 h-10 rounded-full border border-gray-300 cursor-pointer"
                                />
                                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    {user.displayName || 'User'}
                                </span>
                            </div>
                        )}

                        <button onClick={handleLogout} className="btn btn-sm">
                            Logout
                        </button>
                    </>
                ) : (
                    <NavLink to="/register" className="btn">
                        Login / Register
                    </NavLink>
                )}
            </div>
        </nav>
    );
};

export default Navbar;