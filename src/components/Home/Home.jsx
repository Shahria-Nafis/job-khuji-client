import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    const slides = [
        {
            title: "Transform Your Ideas Into Reality",
            subtitle: "Connect with world-class freelancers and bring your vision to life",
            cta1: "Start a Project",
            cta2: "Explore Talent",
            bg: "bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900",
            accent: "from-blue-400 to-purple-400"
        },
        {
            title: "Find Your Next Opportunity",
            subtitle: "Discover exciting projects and grow your freelance career",
            cta1: "Browse Jobs",
            cta2: "Join Now",
            bg: "bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 dark:from-gray-900 dark:via-emerald-900 dark:to-teal-900",
            accent: "from-emerald-400 to-teal-400"
        },
        {
            title: "Quality Work, Guaranteed",
            subtitle: "Trusted platform with verified professionals and secure payments",
            cta1: "Post Your Job",
            cta2: "Learn More",
            bg: "bg-gradient-to-br from-orange-600 via-red-600 to-pink-700 dark:from-gray-900 dark:via-orange-900 dark:to-red-900",
            accent: "from-orange-400 to-red-400"
        },
    ];

    const [currentSlide, setCurrentSlide] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const [jobs, setJobs] = useState([]);
    const [loadingJobs, setLoadingJobs] = useState(true);

    useEffect(() => {
        axios
            .get("https://job-khuji-server.vercel.app/:3000/freelance")
            .then((res) => {
                setJobs(res.data);
                setLoadingJobs(false);
            })
            .catch((err) => {
                console.error(err);
                setLoadingJobs(false);
            });
    }, []);

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
            <div className="relative w-full h-[600px] overflow-hidden mb-16">
                {slides.map((slide, idx) => (
                    <div
                        key={idx}
                        className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 transform ${
                            idx === currentSlide 
                                ? "opacity-100 z-10 scale-100" 
                                : "opacity-0 z-0 scale-105"
                        } ${slide.bg} text-white`}
                    >
                        <div className="absolute inset-0 bg-black opacity-40"></div>
                        <div className="relative text-center px-6 max-w-4xl mx-auto z-10">
                            <div className="mb-6">
                                <div className={`w-20 h-1 bg-gradient-to-r ${slide.accent} mx-auto rounded-full mb-4`}></div>
                            </div>
                            <h1 className={`text-5xl md:text-7xl font-extrabold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r ${slide.accent}`}>
                                {slide.title}
                            </h1>
                            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed">
                                {slide.subtitle}
                            </p>
                            <div className="flex justify-center gap-6 flex-wrap">
                                <button 
                                    onClick={() => navigate('/addJob')}
                                    className={`bg-gradient-to-r ${slide.accent} text-gray-900 font-bold px-8 py-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 transform hover:-translate-y-1`}
                                >
                                    {slide.cta1}
                                </button>
                                <button 
                                    onClick={() => navigate('/allJobs')}
                                    className="bg-transparent border-2 border-white font-bold px-8 py-4 rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105"
                                >
                                    {slide.cta2}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
                    {slides.map((_, idx) => (
                        <button
                            key={idx}
                            className={`w-4 h-4 rounded-full transition-all duration-300 ${
                                idx === currentSlide 
                                    ? "bg-white scale-125 shadow-lg" 
                                    : "bg-white/50 hover:bg-white/70"
                            }`}
                            onClick={() => setCurrentSlide(idx)}
                        ></button>
                    ))}
                </div>
                
                <button
                    onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
                    className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300"
                >
                    ←
                </button>
                <button
                    onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
                    className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300"
                >
                    →
                </button>
            </div>

            <div className="bg-gray-50 py-16 px-6 mb-16">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8 text-center">
                        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                            <div className="text-4xl font-bold text-blue-600 mb-2">10K+</div>
                            <div className="text-gray-600">Active Freelancers</div>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                            <div className="text-4xl font-bold text-green-600 mb-2">5K+</div>
                            <div className="text-gray-600">Projects Completed</div>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                            <div className="text-4xl font-bold text-purple-600 mb-2">98%</div>
                            <div className="text-gray-600">Client Satisfaction</div>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                            <div className="text-4xl font-bold text-orange-600 mb-2">24/7</div>
                            <div className="text-gray-600">Support Available</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-6 mb-16">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-4">
                            Featured Opportunities
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Discover amazing projects waiting for talented freelancers like you
                        </p>
                    </div>
                    
                    {loadingJobs? (
                        <div className="flex justify-center items-center py-16">
                            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400"></div>
                        </div>
                    ): jobs.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z" clipRule="evenodd" />
                                    <path d="M9 8a1 1 0 011-1h4a1 1 0 110 2h-4a1 1 0 01-1-1z" />
                                    <path d="M6 8a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1z" />
                                </svg>
                            </div>
                            <p className="text-xl text-gray-400 mb-4">No jobs available at the moment</p>
                            <button 
                                onClick={() => navigate('/addJob')}
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Post the First Job
                            </button>
                        </div>
                    ) : (
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {jobs.slice(0, 6).map((job) => (
                                <div
                                    key={job._id}
                                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
                                >
                                    <div className="relative overflow-hidden">
                                        <img
                                            src={job.coverImage || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop"}
                                            alt={job.title}
                                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                                                {job.category}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white line-clamp-2">
                                            {job.title}
                                        </h3>
                                        <div className="flex items-center mb-3 text-gray-600 dark:text-gray-400">
                                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-sm">{job.postedBy}</span>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                                            {job.summary || "No description available"}
                                        </p>
                                        
                                        <div className="flex items-center justify-between">
                                            <div className="text-sm text-gray-500 flex items-center">
                                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                                </svg>
                                                <span>Posted recently</span>
                                            </div>
                                            <button
                                                onClick={() => navigate(`/viewDetails/${job._id}`)}
                                                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 font-medium"
                                            >
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    
                    {jobs.length > 6 && (
                        <div className="text-center mt-12">
                            <button
                                onClick={() => navigate('/allJobs')}
                                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 font-bold text-lg"
                            >
                                View All Jobs →
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-gray-100 dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 py-20 px-6 mb-16 transition-colors duration-200">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
                            Why Choose Our Platform?
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                            We're not just another marketplace - we're your partner in success
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center group border border-gray-200 dark:border-gray-600">
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto mb-6 flex items-center justify-center">
                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Verified Experts</h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                Every freelancer is thoroughly vetted and verified to ensure you get top-quality work from trusted professionals.
                            </p>
                        </div>
                        
                        <div className="bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center group border border-gray-200 dark:border-gray-600">
                            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full mx-auto mb-6 flex items-center justify-center">
                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Lightning Fast</h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                Post your project and start receiving proposals within minutes. Our streamlined process gets you results quickly.
                            </p>
                        </div>
                        
                        <div className="bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center group border border-gray-200 dark:border-gray-600">
                            <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-400 rounded-full mx-auto mb-6 flex items-center justify-center">
                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Secure & Safe</h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                Advanced security measures protect your data and payments. Work with confidence knowing everything is secure.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        

            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 dark:from-gray-800 dark:via-blue-900 dark:to-purple-900 py-20 px-6 transition-colors duration-200">
                <div className="max-w-4xl mx-auto text-center text-white">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Ready to Get Started?
                    </h2>
                    <p className="text-xl mb-8 text-gray-100 dark:text-gray-300">
                        Join thousands of satisfied clients and freelancers who trust our platform
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <button 
                            onClick={() => navigate('/addJob')}
                            className="bg-white text-blue-600 dark:bg-gradient-to-r dark:from-blue-500 dark:to-purple-500 dark:text-white font-bold px-8 py-4 rounded-full hover:bg-gray-100 dark:hover:from-blue-600 dark:hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            Post a Project
                        </button>
                        <button 
                            onClick={() => navigate('/allJobs')}
                            className="bg-transparent border-2 border-white font-bold px-8 py-4 rounded-full hover:bg-white hover:text-blue-600 dark:hover:text-gray-900 transition-all duration-300 transform hover:scale-105"
                        >
                            Find Work
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;


