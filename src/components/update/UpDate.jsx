import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";

const UpDate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [job, setJob] = useState({
        title: "",
        category: "",
        postedBy: "",
        summary: "",
        coverImage: "",
        userEmail: "",
    });
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        if (!id) {
            toast.error("No job ID provided");
            navigate("/allJobs");
            return;
        }

        axios
            .get(`http://localhost:5000/freelance/job/${id}`)
            .then((res) => {
                const jobData = res.data;
                
                // Check if user owns this job
                if (jobData.userEmail && user?.email && jobData.userEmail !== user.email) {
                    toast.error("You can only edit your own jobs");
                    navigate("/allJobs");
                    return;
                }
                
                setJob(jobData);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching job:", err);
                toast.error("Failed to load job data");
                setTimeout(() => navigate("/allJobs"), 1500);
                setLoading(false);
            });
    }, [id, user, navigate]);

    // 🔹 Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setJob({ ...job, [name]: value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setUpdating(true);
        
        try {
            await axios.put(`http://localhost:5000/freelance/${id}`, job);
            toast.success("Job updated successfully!");
            setTimeout(() => navigate("/allJobs"), 1500);
        } catch (err) {
            console.error("Update failed:", err);
            toast.error(err.response?.data?.error || "Failed to update job");
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-center">
                    <div className="loading loading-spinner loading-lg text-blue-600"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">Loading job information...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 py-10 px-4 transition-colors duration-200">
            <Toaster position="top-center" />
            <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                <h1 className="text-3xl font-bold text-center mb-6 text-blue-600 dark:text-blue-400">
                    Update Job
                </h1>

                <form onSubmit={handleUpdate} className="space-y-5">
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Job Title</label>
                        <input
                            type="text"
                            name="title"
                            value={job.title}
                            onChange={handleChange}
                            className="input input-bordered w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                            placeholder="Enter job title"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Category</label>
                        <select
                            name="category"
                            value={job.category}
                            onChange={handleChange}
                            className="select select-bordered w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                            required
                        >
                            <option value="">Select a category</option>
                            <option value="Web Development">Web Development</option>
                            <option value="Graphics Design">Graphics Design</option>
                            <option value="Digital Marketing">Digital Marketing</option>
                            <option value="Data Entry">Data Entry</option>
                            <option value="Content Writing">Content Writing</option>
                            <option value="Video Editing">Video Editing</option>
                            <option value="Mobile Development">Mobile Development</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Posted By</label>
                        <input
                            type="text"
                            name="postedBy"
                            value={job.postedBy}
                            onChange={handleChange}
                            className="input input-bordered w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                            placeholder="Your name"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Summary</label>
                        <textarea
                            name="summary"
                            value={job.summary}
                            onChange={handleChange}
                            className="textarea textarea-bordered w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                            rows="5"
                            placeholder="Describe the job in detail..."
                            required
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Cover Image URL</label>
                        <input
                            type="url"
                            name="coverImage"
                            value={job.coverImage}
                            onChange={handleChange}
                            className="input input-bordered w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                            placeholder="https://example.com/image.jpg"
                        />
                        {job.coverImage && (
                            <img 
                                src={job.coverImage} 
                                alt="Preview" 
                                className="mt-3 w-full h-48 object-cover rounded-lg border border-gray-300 dark:border-gray-600"
                                onError={(e) => e.target.style.display = 'none'}
                            />
                        )}
                    </div>

                    <div className="flex justify-center gap-4 mt-8">
                        <button
                            type="button"
                            onClick={() => navigate("/allJobs")}
                            className="btn btn-outline border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-6"
                            disabled={updating}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary bg-blue-600 hover:bg-blue-700 text-white px-8"
                            disabled={updating}
                        >
                            {updating ? (
                                <>
                                    <span className="loading loading-spinner loading-sm"></span>
                                    Updating...
                                </>
                            ) : (
                                "Save Changes"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpDate;
