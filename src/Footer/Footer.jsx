import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-200 py-10 mt-16 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-5 grid md:grid-cols-4 gap-8">
        
        <div>
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Job-Khuiji</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Your trusted freelance marketplace. Connect with top professionals
            and get your projects done efficiently.
          </p>
        </div>

        
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors">Home</a></li>
            <li><a href="/allJobs" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors">All Jobs</a></li>
            <li><a href="/addJob" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors">Add a Job</a></li>
            <li><a href="/myAcceptedTasks" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors">My Tasks</a></li>
          </ul>
        </div>

        
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Contact Us</h3>
          <p className="text-gray-600 dark:text-gray-400">Email: support@job-khuiji.com</p>
          <p className="text-gray-600 dark:text-gray-400">Phone: +880 1234 567890</p>
          <p className="text-gray-600 dark:text-gray-400">Address: Dhaka, Bangladesh</p>
        </div>

        
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Follow Us</h3>
          <div className="flex gap-3">
            <a href="#" className="hover:text-white">🌐</a>
            <a href="#" className="hover:text-white">🐦</a>
            <a href="#" className="hover:text-white">📘</a>
            <a href="#" className="hover:text-white">📸</a>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-300 dark:border-gray-700 pt-5 text-center text-gray-500 dark:text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Job-Khuiji. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
