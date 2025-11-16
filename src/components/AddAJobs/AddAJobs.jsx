
import React, { useState, useContext } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";

const AddAJobs = () => {
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    summary: "",
    coverImage: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in to post a job!");
      return;
    }

    const newJob = {
      ...formData,
      postedBy: user.displayName || "Anonymous",
      userEmail: user.email,
      postedAt: new Date().toISOString(),
    };

    try {
      console.log('Submitting job:', newJob);
      const res = await axios.post("https://job-khuji-server.vercel.app/:3000/freelance", newJob);
      console.log('Response:', res.data);
      
      if (res.data.insertedId || res.data.acknowledged) {
        toast.success("Job added successfully!");
        setFormData({ title: "", category: "", summary: "", coverImage: "" });
      } else {
        toast.error("Failed to add job - No confirmation received");
      }
    } catch (error) {
      console.error('Error details:', error);
      console.error('Error response:', error.response?.data);
      
      const errorMessage = error.response?.data?.details || error.response?.data?.error || error.message || "Failed to add job!";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200 py-10">
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700">
      <Toaster position="top-center" />
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">Add a New Job</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div>
          <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="input input-bordered w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
          />
        </div>

        
        <div>
          <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">Posted By</label>
          <input
            type="text"
            value={user?.displayName || ""}
            disabled
            className="input input-bordered w-full bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600"
          />
        </div>

        
        <div>
          <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">User Email</label>
          <input
            type="email"
            value={user?.email || ""}
            disabled
            className="input input-bordered w-full bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600"
          />
        </div>

       
        <div>
          <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="select select-bordered w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
          >
            <option value="">Select Category</option>
            <option value="Web Development">Web Development</option>
            <option value="Graphics Design">Graphics Design</option>
            <option value="Digital Marketing">Digital Marketing</option>
            <option value="Data Entry">Data Entry</option>
          </select>
        </div>

        
        <div>
          <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">Summary</label>
          <textarea
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            required
            className="textarea textarea-bordered w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
            rows="4"
            placeholder="Write short job summary..."
          ></textarea>
        </div>

        
        <div>
          <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">Cover Image (URL)</label>
          <input
            type="text"
            name="coverImage"
            value={formData.coverImage}
            onChange={handleChange}
            required
            className="input input-bordered w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        
        <button type="submit" className="btn bg-blue-600 hover:bg-blue-700 text-white w-full border-0">
          Add Job
        </button>
      </form>
    </div>
    </div>
  );
};

export default AddAJobs;
