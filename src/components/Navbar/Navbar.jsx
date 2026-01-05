import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { FiSun, FiMoon, FiMenu, FiX, FiUser, FiLogOut, FiGrid, FiBriefcase, FiFileText, FiChevronDown } from 'react-icons/fi';

const Navbar = () => {
    const { user, signOutUser } = React.useContext(AuthContext);
    const navigate = useNavigate();
    const { darkMode, toggleDarkMode } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        signOutUser()
            .then(() => {
                navigate('/register');
                setIsProfileOpen(false);
            })
            .catch(err => console.error(err));
    };

    const navLinkClass = ({ isActive }) =>
        `px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/20 ${
            isActive ? 'bg-white/30 text-white font-semibold' : 'text-white/90 hover:text-white'
        }`;

    return (
        <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-gray-800 dark:via-gray-900 dark:to-black shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <NavLink to="/" className="flex items-center space-x-2">
                            <FiBriefcase className="text-3xl text-white" />
                            <span className="text-2xl font-bold text-white">
                                Job<span className="text-yellow-300">Khuji</span>
                            </span>
                        </NavLink>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-1">
                        <NavLink to="/" className={navLinkClass}>
                            Home
                        </NavLink>
                        <NavLink to="/allJobs" className={navLinkClass}>
                            All Jobs
                        </NavLink>
                        <NavLink to="/about" className={navLinkClass}>
                            About
                        </NavLink>
                        <NavLink to="/contact" className={navLinkClass}>
                            Contact
                        </NavLink>
                        <NavLink to="/blog" className={navLinkClass}>
                            Blog
                        </NavLink>
                        
                        {user && (
                            <NavLink to="/dashboard" className={navLinkClass}>
                                Dashboard
                            </NavLink>
                        )}
                    </div>

                    {/* Right Side: Theme Toggle + Auth */}
                    <div className="hidden lg:flex items-center space-x-4">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleDarkMode}
                            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all duration-300"
                            aria-label="Toggle theme"
                        >
                            {darkMode ? <FiSun className="text-xl" /> : <FiMoon className="text-xl" />}
                        </button>

                        {user ? (
                            /* Profile Dropdown */
                            <div className="relative" ref={profileRef}>
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all duration-300"
                                >
                                    {user.photoURL ? (
                                        <img 
                                            src={user.photoURL} 
                                            alt="Profile" 
                                            className="w-8 h-8 rounded-full border-2 border-white"
                                        />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-yellow-300 flex items-center justify-center">
                                            <FiUser className="text-blue-600" />
                                        </div>
                                    )}
                                    <span className="text-white font-medium hidden xl:block">
                                        {user.displayName || 'User'}
                                    </span>
                                    <FiChevronDown className={`text-white transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Dropdown Menu */}
                                {isProfileOpen && (
                                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
                                        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                                            <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                                {user.displayName || 'User'}
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                                {user.email}
                                            </p>
                                        </div>
                                        <div className="py-2">
                                            <button
                                                onClick={() => {
                                                    navigate('/dashboard/profile');
                                                    setIsProfileOpen(false);
                                                }}
                                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700"
                                            >
                                                <FiUser className="mr-3" />
                                                Profile
                                            </button>
                                            <button
                                                onClick={() => {
                                                    navigate('/dashboard');
                                                    setIsProfileOpen(false);
                                                }}
                                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700"
                                            >
                                                <FiGrid className="mr-3" />
                                                Dashboard
                                            </button>
                                            <button
                                                onClick={() => {
                                                    navigate('/dashboard/my-jobs');
                                                    setIsProfileOpen(false);
                                                }}
                                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700"
                                            >
                                                <FiBriefcase className="mr-3" />
                                                My Jobs
                                            </button>
                                            <button
                                                onClick={() => {
                                                    navigate('/dashboard/my-applications');
                                                    setIsProfileOpen(false);
                                                }}
                                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700"
                                            >
                                                <FiFileText className="mr-3" />
                                                My Applications
                                            </button>
                                        </div>
                                        <div className="border-t border-gray-200 dark:border-gray-700">
                                            <button
                                                onClick={handleLogout}
                                                className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                                            >
                                                <FiLogOut className="mr-3" />
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <NavLink
                                to="/register"
                                className="px-6 py-2 bg-yellow-300 hover:bg-yellow-400 text-blue-900 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
                            >
                                Login / Register
                            </NavLink>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden flex items-center space-x-2">
                        <button
                            onClick={toggleDarkMode}
                            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white"
                        >
                            {darkMode ? <FiSun className="text-xl" /> : <FiMoon className="text-xl" />}
                        </button>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white"
                        >
                            {isMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden bg-white dark:bg-gray-800 shadow-lg">
                    <div className="px-4 py-3 space-y-2">
                        <NavLink
                            to="/"
                            onClick={() => setIsMenuOpen(false)}
                            className={({ isActive }) =>
                                `block px-4 py-2 rounded-lg ${
                                    isActive
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700'
                                }`
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/allJobs"
                            onClick={() => setIsMenuOpen(false)}
                            className={({ isActive }) =>
                                `block px-4 py-2 rounded-lg ${
                                    isActive
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700'
                                }`
                            }
                        >
                            All Jobs
                        </NavLink>
                        <NavLink
                            to="/about"
                            onClick={() => setIsMenuOpen(false)}
                            className={({ isActive }) =>
                                `block px-4 py-2 rounded-lg ${
                                    isActive
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700'
                                }`
                            }
                        >
                            About
                        </NavLink>
                        <NavLink
                            to="/contact"
                            onClick={() => setIsMenuOpen(false)}
                            className={({ isActive }) =>
                                `block px-4 py-2 rounded-lg ${
                                    isActive
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700'
                                }`
                            }
                        >
                            Contact
                        </NavLink>
                        <NavLink
                            to="/blog"
                            onClick={() => setIsMenuOpen(false)}
                            className={({ isActive }) =>
                                `block px-4 py-2 rounded-lg ${
                                    isActive
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700'
                                }`
                            }
                        >
                            Blog
                        </NavLink>

                        {user && (
                            <>
                                <NavLink
                                    to="/dashboard"
                                    onClick={() => setIsMenuOpen(false)}
                                    className={({ isActive }) =>
                                        `block px-4 py-2 rounded-lg ${
                                            isActive
                                                ? 'bg-blue-600 text-white'
                                                : 'text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700'
                                        }`
                                    }
                                >
                                    Dashboard
                                </NavLink>
                                <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setIsMenuOpen(false);
                                    }}
                                    className="w-full text-left px-4 py-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                                >
                                    Logout
                                </button>
                            </>
                        )}

                        {!user && (
                            <NavLink
                                to="/register"
                                onClick={() => setIsMenuOpen(false)}
                                className="block px-4 py-2 bg-blue-600 text-white text-center rounded-lg font-semibold"
                            >
                                Login / Register
                            </NavLink>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
