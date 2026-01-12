import React, { useState, useEffect, useContext, useMemo } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { FiBriefcase, FiFileText, FiCheckSquare, FiClock, FiDollarSign, FiTrendingUp } from 'react-icons/fi';

const DashboardHome = () => {
    const { user } = useContext(AuthContext);
    const [stats, setStats] = useState({
        totalJobs: 0,
        myJobs: 0,
        applications: 0,
        acceptedTasks: 0,
    });
    const [jobs, setJobs] = useState([]);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [allJobsRes, myJobsRes, myApplicationsRes, myAcceptedTasksRes] = await Promise.all([
                    axios.get('https://job-khuji-server.vercel.app/freelance'),
                    axios.get(`https://job-khuji-server.vercel.app/freelance/${user?.email}`),
                    axios.get(`https://job-khuji-server.vercel.app/applications?applicantEmail=${user?.email}`),
                    axios.get(`https://job-khuji-server.vercel.app/acceptedTasks?userEmail=${user?.email}`),
                ]);

                setStats({
                    totalJobs: allJobsRes.data.length,
                    myJobs: myJobsRes.data.length,
                    applications: myApplicationsRes.data.length,
                    acceptedTasks: myAcceptedTasksRes.data.length,
                });
                setJobs(allJobsRes.data.slice(0, 5));
                setApplications(myApplicationsRes.data || []);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
                setLoading(false);
            }
        };

        if (user) {
            fetchData();
        }
    }, [user]);

    const overviewCards = [
        { icon: FiBriefcase, label: 'Total Jobs', value: stats.totalJobs, color: 'bg-blue-500', trend: '+12%' },
        { icon: FiFileText, label: 'My Posted Jobs', value: stats.myJobs, color: 'bg-green-500', trend: '+5%' },
        { icon: FiCheckSquare, label: 'Applications', value: stats.applications, color: 'bg-purple-500', trend: '+8%' },
        { icon: FiClock, label: 'Accepted Tasks', value: stats.acceptedTasks, color: 'bg-orange-500', trend: '+15%' },
    ];

    const categoryData = useMemo(() => {
        const colors = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#06B6D4'];
        const counts = jobs.reduce((acc, job) => {
            const key = job.category || 'General';
            acc[key] = (acc[key] || 0) + 1;
            return acc;
        }, {});
        return Object.entries(counts).map(([name, value], idx) => ({ name, value, color: colors[idx % colors.length] }));
    }, [jobs]);

    const monthlyData = useMemo(() => {
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const byMonth = {};

        const addDate = (dateStr, key) => {
            if (!dateStr) return;
            const d = new Date(dateStr);
            if (isNaN(d)) return;
            const label = monthNames[d.getMonth()];
            byMonth[label] = byMonth[label] || { month: label, jobs: 0, applications: 0 };
            byMonth[label][key] += 1;
        };

        jobs.forEach((j) => addDate(j.postedAt || j.createdAt || j.updatedAt, 'jobs'));
        applications.forEach((a) => addDate(a.createdAt || a.appliedAt || a.updatedAt, 'applications'));

        const ordered = monthNames.map((m) => byMonth[m]).filter(Boolean).slice(-6);
        return ordered.length ? ordered : monthNames.slice(0, 6).map((m) => ({ month: m, jobs: 0, applications: 0 }));
    }, [jobs, applications]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-6 text-white">
                <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.displayName || 'User'}!</h1>
                <p className="text-blue-100">Here's what's happening with your jobs today.</p>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {overviewCards.map((card, index) => {
                    const Icon = card.icon;
                    return (
                        <div
                            key={index}
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`${card.color} p-3 rounded-lg`}>
                                    <Icon className="text-2xl text-white" />
                                </div>
                                <span className="text-green-500 text-sm font-semibold flex items-center">
                                    <FiTrendingUp className="mr-1" />
                                    {card.trend}
                                </span>
                            </div>
                            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">{card.label}</h3>
                            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{card.value}</p>
                        </div>
                    );
                })}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Bar Chart */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Monthly Overview</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={monthlyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="jobs" fill="#3B82F6" name="Jobs Posted" />
                            <Bar dataKey="applications" fill="#10B981" name="Applications" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Pie Chart */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Jobs by Category</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={categoryData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {categoryData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Recent Jobs Table */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recent Jobs</h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Title
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Category
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Budget
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {jobs.map((job, index) => (
                                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                        {job.title || job.jobTitle || 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        {job.category || 'General'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        ${job.budget || job.minBudget || '0'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                            Active
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
