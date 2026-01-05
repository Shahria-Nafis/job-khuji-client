import React from "react";
import { Link } from "react-router-dom";
import { FiFacebook, FiTwitter, FiLinkedin, FiInstagram, FiMail, FiPhone, FiMapPin, FiBriefcase } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-300 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <FiBriefcase className="text-3xl text-blue-500" />
              <h3 className="text-2xl font-bold text-white">
                Job<span className="text-blue-500">Khuji</span>
              </h3>
            </div>
            <p className="text-gray-400 mb-4">
              Your trusted freelance marketplace. Connect with top professionals
              and get your projects done efficiently.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-colors"
              >
                <FiFacebook className="text-xl" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-400 flex items-center justify-center transition-colors"
              >
                <FiTwitter className="text-xl" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-700 flex items-center justify-center transition-colors"
              >
                <FiLinkedin className="text-xl" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-pink-600 flex items-center justify-center transition-colors"
              >
                <FiInstagram className="text-xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-blue-500 transition-colors flex items-center">
                  <span className="mr-2">→</span> Home
                </Link>
              </li>
              <li>
                <Link to="/allJobs" className="hover:text-blue-500 transition-colors flex items-center">
                  <span className="mr-2">→</span> All Jobs
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-500 transition-colors flex items-center">
                  <span className="mr-2">→</span> About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-500 transition-colors flex items-center">
                  <span className="mr-2">→</span> Contact
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-blue-500 transition-colors flex items-center">
                  <span className="mr-2">→</span> Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* For Freelancers */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">For Freelancers</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/allJobs" className="hover:text-blue-500 transition-colors flex items-center">
                  <span className="mr-2">→</span> Find Jobs
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-blue-500 transition-colors flex items-center">
                  <span className="mr-2">→</span> Dashboard
                </Link>
              </li>
              <li>
                <Link to="/myAcceptedTasks" className="hover:text-blue-500 transition-colors flex items-center">
                  <span className="mr-2">→</span> My Tasks
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 transition-colors flex items-center">
                  <span className="mr-2">→</span> Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 transition-colors flex items-center">
                  <span className="mr-2">→</span> Success Stories
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <FiMail className="text-blue-500 mt-1 flex-shrink-0" />
                <div>
                  <a href="mailto:support@jobkhuji.com" className="hover:text-blue-500 transition-colors">
                    support@jobkhuji.com
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <FiPhone className="text-blue-500 mt-1 flex-shrink-0" />
                <div>
                  <a href="tel:+15551234567" className="hover:text-blue-500 transition-colors">
                    +1 (555) 123-4567
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <FiMapPin className="text-blue-500 mt-1 flex-shrink-0" />
                <div>
                  <span>123 Business St<br />New York, NY 10001<br />United States</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-xl font-bold text-white mb-2">Stay Updated</h3>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter for the latest jobs and updates</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} JobKhuji. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="hover:text-blue-500 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-blue-500 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-blue-500 transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
