import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center px-4 transition-colors duration-200">
            <div className="max-w-lg w-full text-center">
                <div className="mb-8">
                    {/* 404 Illustration */}
                    <div className="relative mb-8">
                        <h1 className="text-9xl font-bold text-gray-200 dark:text-gray-800">404</h1>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <svg 
                                className="w-32 h-32 text-blue-600 dark:text-blue-400" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={1.5} 
                                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                                />
                            </svg>
                        </div>
                    </div>

                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        Page Not Found
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                        Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
                    </p>
                </div>

                <div className="flex gap-4 justify-center flex-wrap">
                    <button
                        onClick={() => navigate(-1)}
                        className="btn btn-outline border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-6 py-3"
                    >
                        <svg 
                            className="w-5 h-5 mr-2" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M10 19l-7-7m0 0l7-7m-7 7h18" 
                            />
                        </svg>
                        Go Back
                    </button>
                    <button
                        onClick={() => navigate("/")}
                        className="btn btn-primary bg-blue-600 hover:bg-blue-700 text-white px-6 py-3"
                    >
                        <svg 
                            className="w-5 h-5 mr-2" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
                            />
                        </svg>
                        Go Home
                    </button>
                    <button
                        onClick={() => navigate("/allJobs")}
                        className="btn btn-outline border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20 px-6 py-3"
                    >
                        <svg 
                            className="w-5 h-5 mr-2" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                            />
                        </svg>
                        Browse Jobs
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
