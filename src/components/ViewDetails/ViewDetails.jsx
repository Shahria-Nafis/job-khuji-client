import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";

const ViewDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const [applications, setApplications] = useState([]);
    const [loadingApps, setLoadingApps] = useState(false);
    const [processingAppId, setProcessingAppId] = useState(null);
    const [hasApplied, setHasApplied] = useState(false);

    useEffect(() => {
        axios.get(`https://job-khuji-server.vercel.app/:3000/freelance/job/${id}`)
            .then(res => {
                setJob(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    useEffect(() => {
        if (!job || !user) return;

        if (job.userEmail === user.email) {
            setLoadingApps(true);
            axios.get(`https://job-khuji-server.vercel.app/:3000/applications?jobId=${job._id}`)
                .then(res => {
                    setApplications(res.data || []);
                    setLoadingApps(false);
                })
                .catch(err => {
                    console.error('Error loading applications:', err);
                    setLoadingApps(false);
                });
        } else {
            axios.get(`https://job-khuji-server.vercel.app/:3000/applications?jobId=${job._id}&applicantEmail=${user.email}`)
                .then(res => {
                    setHasApplied((res.data || []).length > 0);
                })
                .catch(err => {
                    console.error('Error checking application status:', err);
                });
        }
    }, [job, user]);


    const handleApply = async (message = '') => {
        if (!user) {
            toast.error('Please login to apply');
            navigate('/register');
            return;
        }
        if (job.userEmail === user.email) {
            toast.error('You cannot apply to your own job');
            return;
        }
        try {
            const payload = {
                jobId: job._id,
                applicantEmail: user.email,
                applicantName: user.displayName || user.email,
                message,
                appliedAt: new Date().toISOString(),
                status: 'pending'
            };
            await axios.post('https://job-khuji-server.vercel.app/:3000/applications', payload);
            setHasApplied(true);
            toast.success('Application submitted');
        } catch (err) {
            console.error('Apply error:', err);
            toast.error('Failed to submit application');
        }
    };

    const updateApplication = async (appId, action) => {
        if (!user) {
            toast.error('Please login');
            navigate('/register');
            return;
        }
        setProcessingAppId(appId);
        try {
            await axios.patch(`https://job-khuji-server.vercel.app/:3000/applications/${appId}`, { action, approverEmail: user.email });
            if (action === 'approve') {
                toast.success('Applicant approved — added to accepted tasks');
            } else {
                toast.success('Application rejected');
            }
            setApplications(prev => prev.filter(a => a._id !== appId));
        } catch (err) {
            console.error('Error updating application:', err);
            toast.error(err.response?.data?.error || 'Failed to update application');
        } finally {
            setProcessingAppId(null);
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
            <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="mt-4 text-gray-900 dark:text-gray-100">Loading Job Details...</p>
            </div>
        </div>
    );
    
    if (!job) return (
        <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
            <div className="text-center text-red-500">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="mt-4 text-lg font-semibold">Job not found!</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 py-10 px-4">
            <Toaster position="top-center" />
            <div className="max-w-4xl mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                    <div className="relative h-80 bg-gradient-to-r from-blue-500 to-purple-600">
                        <img
                            src={job.coverImage || "https://via.placeholder.com/800x400"}
                            alt={job.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.src = "https://via.placeholder.com/800x400?text=Job+Image";
                            }}
                        />
                        <div className="absolute top-4 right-4">
                            <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                                {job.category}
                            </span>
                        </div>
                    </div>

                    <div className="p-8">
                        <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                            {job.title}
                        </h1>

                        <div className="flex flex-wrap gap-6 mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Posted By</p>
                                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{job.postedBy}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                                </svg>
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Category</p>
                                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{job.category}</p>
                                </div>
                            </div>

                            {job.postedAt && (
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Posted On</p>
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                            {new Date(job.postedAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                                Job Description
                            </h2>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                                {job.summary}
                            </p>
                        </div>

                        {job.userEmail && (
                            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 mb-8">
                                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                                    Contact Information
                                </h3>
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <span className="text-gray-700 dark:text-gray-300">{job.userEmail}</span>
                                </div>
                            </div>
                        )}

                        <div className="flex gap-4 flex-wrap">
                                {user && job.userEmail === user.email ? (
                                    <div className="w-full">
                                        <div className="mb-4">
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Applications</h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Review and approve applicants for this job</p>
                                        </div>

                                        {loadingApps ? (
                                            <div className="py-6 text-center">Loading applications...</div>
                                        ) : applications.length === 0 ? (
                                            <div className="py-6 text-gray-600 dark:text-gray-400">No applications yet.</div>
                                        ) : (
                                            <div className="space-y-3">
                                                {applications.map(app => (
                                                    <div key={app._id} className="flex items-start justify-between gap-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                                                        <div className="flex-1">
                                                            <div className="flex items-center justify-between">
                                                                <h4 className="font-semibold text-gray-900 dark:text-white">{app.applicantName || app.applicantEmail}</h4>
                                                                <span className="text-xs text-gray-500">{new Date(app.appliedAt).toLocaleString()}</span>
                                                            </div>
                                                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 whitespace-pre-wrap">{app.message || 'No message provided'}</p>
                                                            <p className="mt-2 text-xs text-gray-500">Status: <strong>{app.status}</strong></p>
                                                        </div>
                                                        <div className="flex flex-col gap-2">
                                                            <button onClick={() => updateApplication(app._id, 'approve')} disabled={processingAppId === app._id} className="btn bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded">
                                                                {processingAppId === app._id ? 'Processing...' : 'Approve'}
                                                            </button>
                                                            <button onClick={() => updateApplication(app._1d, 'reject')} disabled={processingAppId === app._id} className="btn bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded">
                                                                {processingAppId === app._id ? 'Processing...' : 'Reject'}
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="w-full">
                                        {hasApplied ? (
                                            <div className="px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-center text-gray-600">You have already applied for this job</div>
                                        ) : (
                                            <div className="flex gap-3">
                                                <button onClick={() => handleApply('') } className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg">Apply</button>
                                                <button onClick={() => navigate('/allJobs')} className="bg-gray-200 dark:bg-gray-700 px-4 rounded">Back</button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            
                            <button
                                onClick={() => navigate('/allJobs')}
                                className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                <span>Back to Jobs</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewDetails;

