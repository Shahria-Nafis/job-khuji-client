import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";

const MyJobs = () => {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.email) {
      toast.error("Please login to view your jobs");
      navigate("/register");
      return;
    }

    axios
      .get(`https://job-khuji-server.vercel.app/:3000/freelance/${user.email}`)
      .then((res) => {
        setJobs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching jobs:", err);
        toast.error("Failed to load your jobs");
        setLoading(false);
      });
  }, [user, navigate]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      await axios.delete(`https://job-khuji-server.vercel.app/:3000/freelance/${id}`);
      setJobs((prev) => prev.filter((job) => job._id !== id));
      toast.success("Job deleted successfully!");
    } catch (err) {
      console.error("Error deleting job:", err);
      toast.error("Failed to delete job");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-blue-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading your jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-5 bg-white dark:bg-gray-900 transition-colors duration-200">
      <Toaster position="top-center" />
      
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            My Added Jobs
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage all the jobs you've posted
          </p>
        </div>

        {jobs.length === 0 ? (
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
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No jobs posted yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Start by posting your first job!
            </p>
            <button
              onClick={() => navigate("/addaJob")}
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Post a Job
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden"
              >
                <img
                  src={job.coverImage || "https://via.placeholder.com/400x250"}
                  alt={job.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/400x250?text=No+Image";
                  }}
                />
                
                <div className="p-5">
                  <div className="mb-3">
                    <span className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-semibold px-3 py-1 rounded-full">
                      {job.category}
                    </span>
                  </div>
                  
                  <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white line-clamp-2">
                    {job.title}
                  </h2>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {job.summary}
                  </p>
                  
                  {job.postedAt && (
                    <p className="text-xs text-gray-500 dark:text-gray-500 mb-4">
                      Posted on {new Date(job.postedAt).toLocaleDateString()}
                    </p>
                  )}
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/viewDetails/${job._id}`)}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                    >
                      View
                    </button>
                    <button
                      onClick={() => navigate(`/updateJob/${job._id}`)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(job._id)}
                      className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyJobs;
