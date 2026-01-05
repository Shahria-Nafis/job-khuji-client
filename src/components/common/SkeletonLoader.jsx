import React from 'react';

export const JobCardSkeleton = () => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 animate-pulse">
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6 mb-4"></div>
            <div className="flex gap-2 mb-4">
                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-20"></div>
                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
            </div>
            <div className="flex justify-between items-center">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
                <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-28"></div>
            </div>
        </div>
    );
};

export const TableSkeleton = ({ rows = 5, columns = 4 }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr>
                        {Array.from({ length: columns }).map((_, i) => (
                            <th key={i} className="px-4 py-3">
                                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: rows }).map((_, rowIndex) => (
                        <tr key={rowIndex}>
                            {Array.from({ length: columns }).map((_, colIndex) => (
                                <td key={colIndex} className="px-4 py-3">
                                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export const ProfileSkeleton = () => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 animate-pulse">
            <div className="flex items-center gap-6 mb-6">
                <div className="w-24 h-24 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                <div className="flex-1">
                    <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-48 mb-2"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-64"></div>
                </div>
            </div>
            <div className="space-y-4">
                {[1, 2, 3, 4].map(i => (
                    <div key={i}>
                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-24 mb-2"></div>
                        <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};
