

import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const AllJobs = () => {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://job-khuji-server.vercel.app/:3000/freelance")
      .then(res => {
        setJobs(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [user]);

  if (loading) return <div className="text-center mt-10 text-gray-900 dark:text-gray-100">Loading Jobs...</div>;
  if (jobs.length === 0) return <div className="text-center mt-10 text-gray-500 dark:text-gray-400">No jobs found!</div>;

  return (
    <div className="p-5 min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">All Freelance Jobs</h1>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map(job => (
          <div key={job._id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md p-4 hover:shadow-lg flex flex-col justify-between transition-all duration-200">
            <div>
              <img
                src={job.coverImage ? `https://job-khuji-server.vercel.app/:3000/images/${job.coverImage}` : "https://via.placeholder.com/400x250"}
                alt={job.title}
                className="w-full h-48 object-cover rounded-lg mb-3"
              />
              <h2 className="text-xl font-semibold mb-1 text-gray-900 dark:text-white">{job.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-2">{job.category}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2"><strong>Posted By:</strong> {job.postedBy}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{job.summary?.slice(0, 80)}...</p>
            </div>
            <button
              onClick={() => navigate(`/viewDetails/${job._id}`)}
              className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllJobs;

