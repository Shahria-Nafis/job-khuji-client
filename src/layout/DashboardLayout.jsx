import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { FiGrid, FiUser, FiLogOut, FiBriefcase, FiFileText, FiPlus, FiMenu, FiX, FiSun, FiMoon, FiCheckSquare } from 'react-icons/fi';

const DashboardLayout = () => {
    const { user, signOutUser } = React.useContext(AuthContext);
    const { darkMode, toggleDarkMode } = useTheme();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = () => {
        signOutUser()
            .then(() => navigate('/'))
            .catch(err => console.error(err));
    };

    const sidebarLinks = [
        { to: '/dashboard', icon: FiGrid, label: 'Overview', end: true },
        { to: '/dashboard/profile', icon: FiUser, label: 'Profile' },
        { to: '/dashboard/my-jobs', icon: FiBriefcase, label: 'My Jobs' },
        { to: '/dashboard/my-applications', icon: FiFileText, label: 'My Applications' },
        { to: '/dashboard/add-job', icon: FiPlus, label: 'Add Job' },
        { to: '/myAcceptedTasks', icon: FiCheckSquare, label: 'Accepted Tasks' },
    ];

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            {/* Top Navbar */}
            <nav className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Left */}
                        <div className="flex items-center">
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden"
                            >
                                {sidebarOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
                            </button>
                            <NavLink to="/" className="ml-4 lg:ml-0 flex items-center space-x-2">
                                <FiBriefcase className="text-2xl text-blue-600" />
                                <span className="text-xl font-bold text-gray-900 dark:text-white">
                                    Job<span className="text-blue-600">Khuji</span>
                                </span>
                            </NavLink>
                            <span className="ml-4 text-sm text-gray-500 dark:text-gray-400 hidden md:block">
                                Dashboard
                            </span>
                        </div>

                        {/* Right */}
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={toggleDarkMode}
                                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                            >
                                {darkMode ? <FiSun className="text-yellow-400" /> : <FiMoon className="text-gray-600" />}
                            </button>

                            {/* Profile Dropdown */}
                            <div className="flex items-center space-x-3">
                                {user?.photoURL && (
                                    <img
                                        src={user.photoURL}
                                        alt="Profile"
                                        className="w-8 h-8 rounded-full border-2 border-blue-600"
                                    />
                                )}
                                <div className="hidden md:block">
                                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {user?.displayName || 'User'}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {user?.email}
                                    </p>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                    title="Logout"
                                >
                                    <FiLogOut />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="flex">
                {/* Sidebar */}
                <aside
                    className={`fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
                        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } mt-16 lg:mt-0`}
                >
                    <div className="h-full overflow-y-auto py-6 px-4">
                        <nav className="space-y-2">
                            {sidebarLinks.map((link) => {
                                const Icon = link.icon;
                                return (
                                    <NavLink
                                        key={link.to}
                                        to={link.to}
                                        end={link.end}
                                        onClick={() => setSidebarOpen(false)}
                                        className={({ isActive }) =>
                                            `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                                                isActive
                                                    ? 'bg-blue-600 text-white shadow-lg'
                                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                            }`
                                        }
                                    >
                                        <Icon className="text-xl" />
                                        <span className="font-medium">{link.label}</span>
                                    </NavLink>
                                );
                            })}
                        </nav>

                        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                            <NavLink
                                to="/"
                                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                                <FiGrid className="text-xl" />
                                <span className="font-medium">Back to Home</span>
                            </NavLink>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-6 lg:p-8">
                    <Outlet />
                </main>
            </div>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}
        </div>
    );
};

export default DashboardLayout;
