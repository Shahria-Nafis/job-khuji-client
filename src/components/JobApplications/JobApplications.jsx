import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const JobApplications = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    if (!user?.email) {
      toast.error("Please login to view applications");
      navigate("/register");
      return;
    }

    axios
      .get(`https://job-khuji-server.vercel.app/:3000/applications?posterEmail=${user.email}`)
      .then((res) => {
        setApplications(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching applications:", err);
        toast.error("Failed to load applications");
        setLoading(false);
      });
  }, [user, navigate]);

  const handleApprove = async (id, applicantName) => {
    if (!window.confirm(`Approve application from "${applicantName}"?\n\nThis will add them to accepted tasks.`)) {
      return;
    }

    setProcessingId(id);
    try {
      await axios.patch(`https://job-khuji-server.vercel.app/:3000/applications/${id}`, {
        action: 'approve',
        approverEmail: user.email
      });
      setApplications((prev) => prev.filter((app) => app._id !== id));
      toast.success("Application approved!");
    } catch (err) {
      console.error("Error approving application:", err);
      toast.error(err.response?.data?.error || "Failed to approve application");
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (id, applicantName) => {
    if (!window.confirm(`Reject application from "${applicantName}"?`)) {
      return;
    }

    setProcessingId(id);
    try {
      await axios.patch(`https://job-khuji-server.vercel.app/:3000/applications/${id}`, {
        action: 'reject',
        approverEmail: user.email
      });
      setApplications((prev) => prev.filter((app) => app._id !== id));
      toast.success("Application rejected!");
    } catch (err) {
      console.error("Error rejecting application:", err);
      toast.error(err.response?.data?.error || "Failed to reject application");
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-blue-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200 py-10 px-4">
      <Toaster position="top-center" />
      
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Job Applications
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Review and manage applications for your posted jobs
          </p>
        </div>

        {applications.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
              <svg
                className="w-10 h-10 text-gray-400 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No applications yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              You haven't received any applications for your jobs yet.
            </p>
            <button
              onClick={() => navigate("/myJobs")}
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
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              View My Jobs
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {applications.map((app) => (
              <div
                key={app._id}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden"
              >
                <div className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-semibold px-3 py-1 rounded-full">
                      {app.status || 'pending'}
                    </span>
                    {app.appliedAt && (
                      <span className="text-xs text-gray-500 dark:text-gray-500">
                        {new Date(app.appliedAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>

                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Job Application
                  </h2>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Applicant: <span className="font-medium">{app.applicantName || app.applicantEmail}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {app.applicantEmail}
                    </p>
                  </div>

                  {app.message && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                      "{app.message}"
                    </p>
                  )}

                  {app.status === 'pending' && (
                    <div className="flex gap-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                      <button
                        onClick={() => handleApprove(app._id, app.applicantName || app.applicantEmail)}
                        disabled={processingId === app._id}
                        className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                      >
                        {processingId === app._id ? (
                          <span className="loading loading-spinner loading-sm"></span>
                        ) : (
                          <span>APPROVE</span>
                        )}
                      </button>
                      <button
                        onClick={() => handleReject(app._id, app.applicantName || app.applicantEmail)}
                        disabled={processingId === app._id}
                        className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                      >
                        {processingId === app._id ? (
                          <span className="loading loading-spinner loading-sm"></span>
                        ) : (
                          <span>REJECT</span>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobApplications;

