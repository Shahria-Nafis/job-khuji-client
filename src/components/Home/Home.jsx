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
            .get("http://localhost:5000/freelance")
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
            <div className="relative w-full min-h-[60vh] max-h-[70vh] overflow-hidden mb-16">
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

            {/* Categories Section */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
                    Popular Categories
                </h2>
                <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {['Web Development', 'Mobile Apps', 'Design & Creative', 'Writing & Content', 'Digital Marketing', 'Data Science', 'Video & Animation', 'Music & Audio', 'Programming', 'Business'].map((category, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer group"
                        >
                            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                                {['💻', '📱', '🎨', '✍️', '📈', '📊', '🎬', '🎵', '⚙️', '💼'][index]}
                            </div>
                            <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {category}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>

            {/* Testimonials Section */}
            <div className="bg-gray-50 dark:bg-gray-800 py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
                        What Our Users Say
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { name: 'Sarah Johnson', role: 'Freelance Designer', text: 'This platform changed my career! I found amazing clients and doubled my income in just 3 months.', rating: 5 },
                            { name: 'Mike Chen', role: 'Startup Founder', text: 'Found the perfect developer for our project. The quality of talent here is outstanding!', rating: 5 },
                            { name: 'Emma Davis', role: 'Content Writer', text: 'Easy to use, secure payments, and great support. Highly recommended for both clients and freelancers!', rating: 5 }
                        ].map((testimonial, index) => (
                            <div key={index} className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg">
                                <div className="flex mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <span key={i} className="text-yellow-400 text-2xl">⭐</span>
                                    ))}
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 mb-6 italic">"{testimonial.text}"</p>
                                <div className="flex items-center">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mr-4"></div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Stats / Impact Section */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid lg:grid-cols-2 gap-10 items-center">
                    <div>
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Impact that scales</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">Real traction across our marketplace shows how quickly work gets done.</p>
                        <div className="space-y-4">
                            {[{ label: "Projects delivered on time", value: 92 }, { label: "Repeat clients", value: 76 }, { label: "Average rating", value: 4.8, max: 5 }].map((stat, idx) => (
                                <div key={idx}>
                                    <div className="flex justify-between text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                        <span>{stat.label}</span>
                                        <span>{stat.max ? `${stat.value}/${stat.max}` : `${stat.value}%`}</span>
                                    </div>
                                    <div className="w-full h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
                                            style={{ width: stat.max ? `${(stat.value / stat.max) * 100}%` : `${stat.value}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {[{ title: "Active clients", value: "8.4K" }, { title: "Jobs posted this week", value: "1.1K" }, { title: "Avg. budget", value: "$1,250" }, { title: "Countries served", value: "42" }].map((item, idx) => (
                            <div key={idx} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-md">
                                <p className="text-sm text-gray-500 dark:text-gray-400">{item.title}</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{item.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* How It Works Section */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
                    How It Works
                </h2>
                <div className="grid md:grid-cols-4 gap-8">
                    {[
                        { step: '1', title: 'Create Account', desc: 'Sign up in seconds and build your profile' },
                        { step: '2', title: 'Post or Browse', desc: 'Post a job or browse available projects' },
                        { step: '3', title: 'Connect & Work', desc: 'Connect with the right match and start working' },
                        { step: '4', title: 'Get Paid', desc: 'Complete work and receive secure payment' }
                    ].map((item, index) => (
                        <div key={index} className="text-center relative">
                            <div className="w-16 h-16 rounded-full bg-blue-600 text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                                {item.step}
                            </div>
                            {index < 3 && (
                                <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-blue-300 dark:bg-blue-700"></div>
                            )}
                            <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">{item.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-gray-50 dark:bg-gray-800 py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                        {[
                            { q: 'How do I get started?', a: 'Simply create an account, complete your profile, and start browsing jobs or posting projects!' },
                            { q: 'What are the fees?', a: 'We charge a small service fee on completed projects. Posting jobs is completely free.' },
                            { q: 'Is my payment secure?', a: 'Yes! We use industry-standard encryption and secure escrow system for all transactions.' },
                            { q: 'How do I find the right freelancer?', a: 'Use our advanced filters, review portfolios, ratings, and conduct interviews before hiring.' }
                        ].map((faq, index) => (
                            <details key={index} className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 group">
                                <summary className="font-semibold text-gray-900 dark:text-white cursor-pointer list-none flex justify-between items-center">
                                    {faq.q}
                                    <span className="text-2xl group-open:rotate-180 transition-transform">›</span>
                                </summary>
                                <p className="mt-4 text-gray-600 dark:text-gray-400">{faq.a}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </div>

            {/* Newsletter Section */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay in the Loop</h2>
                    <p className="text-xl mb-8">Subscribe to get the latest jobs and opportunities delivered to your inbox</p>
                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-6 py-3 rounded-lg text-gray-900 focus:ring-4 focus:ring-white/50 outline-none"
                        />
                        <button className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>

            {/* Blog Preview Section */}
            <div className="bg-gray-50 dark:bg-gray-800 py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Latest from Our Blog</h2>
                        <button 
                            onClick={() => navigate('/blog')}
                            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                        >
                            View All →
                        </button>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: '10 Tips for Successful Freelancing', date: 'Jan 2, 2026', image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&q=80' },
                            { title: 'Building a Strong Portfolio', date: 'Dec 28, 2025', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80' },
                            { title: 'The Future of Remote Work', date: 'Dec 25, 2025', image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&q=80' }
                        ].map((blog, index) => (
                            <div key={index} className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                                <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
                                <div className="p-6">
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{blog.date}</p>
                                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">{blog.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;


