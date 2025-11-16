import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const MyAcceptedTasks = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load accepted tasks assigned to this user
  useEffect(() => {
    if (!user?.email) {
      toast.error("Please login to view your tasks");
      navigate("/register");
      return;
    }

    axios
      .get(`https://job-khuji-server.vercel.app/:3000/acceptedTasks?userEmail=${user.email}`)
      .then((res) => {
        setTasks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching tasks:", err);
        toast.error("Failed to load tasks");
        setLoading(false);
      });
  }, [user, navigate]);

  const handleComplete = async (id, jobTitle) => {
    if (!window.confirm(`Mark "${jobTitle}" as completed?`)) {
      return;
    }

    try {
      await axios.patch(`https://job-khuji-server.vercel.app/:3000/acceptedTasks/${id}`, {
        status: 'completed'
      });
      setTasks((prev) => prev.map(task => 
        task._id === id ? { ...task, status: 'completed' } : task
      ));
      toast.success("Task marked as completed!");
    } catch (err) {
      console.error("Error completing task:", err);
      toast.error("Failed to complete task");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-blue-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading your tasks...</p>
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
            My Accepted Tasks
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Tasks you have accepted and are working on
          </p>
        </div>

        {tasks.length === 0 ? (
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
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No accepted tasks yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              You haven't accepted any tasks yet. Browse jobs and apply!
            </p>
            <button
              onClick={() => navigate("/allJobs")}
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              Browse Jobs
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden"
              >
                <div className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${
                      task.status === 'completed' 
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                        : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    }`}>
                      {task.status || 'in-progress'}
                    </span>
                    {task.acceptedAt && (
                      <span className="text-xs text-gray-500 dark:text-gray-500">
                        {new Date(task.acceptedAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>

                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {task.jobTitle || 'Task'}
                  </h2>
                  
                  {task.jobCategory && (
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
                          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                        />
                      </svg>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {task.jobCategory}
                      </p>
                    </div>
                  )}

                  {task.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                      {task.description}
                    </p>
                  )}

                  {task.budget && (
                    <div className="flex items-center gap-2 mb-4">
                      <svg
                        className="w-4 h-4 text-green-600 dark:text-green-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                        ${task.budget}
                      </p>
                    </div>
                  )}

                  {task.status !== 'completed' && (
                    <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                      <button
                        onClick={() => handleComplete(task._id, task.jobTitle || 'Task')}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200"
                      >
                        MARK AS DONE
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

export default MyAcceptedTasks;
