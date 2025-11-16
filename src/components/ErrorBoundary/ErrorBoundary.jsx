import React from "react";
import { useRouteError, useNavigate } from "react-router-dom";

const ErrorBoundary = () => {
    const error = useRouteError();
    const navigate = useNavigate();

    console.error("Route error:", error);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
                <div className="mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
                        <svg 
                            className="w-10 h-10 text-red-600 dark:text-red-400" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                            />
                        </svg>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                        {error?.status || "Error"}
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
                        {error?.statusText || "Something went wrong"}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mb-8">
                        {error?.data || error?.message || "The page you're looking for doesn't exist or an error occurred."}
                    </p>
                </div>

                <div className="flex gap-4 justify-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="btn btn-outline border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-6"
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
                        className="btn btn-primary bg-blue-600 hover:bg-blue-700 text-white px-6"
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
                </div>

                {import.meta.env.DEV && error?.stack && (
                    <details className="mt-8 text-left">
                        <summary className="cursor-pointer text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                            Show error details (dev only)
                        </summary>
                        <pre className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs overflow-auto text-gray-800 dark:text-gray-200">
                            {error.stack}
                        </pre>
                    </details>
                )}
            </div>
        </div>
    );
};

export default ErrorBoundary;
