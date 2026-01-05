import React from 'react';
import { FiTarget, FiEye, FiUsers, FiAward, FiCheck } from 'react-icons/fi';

const AboutPage = () => {
    const features = [
        { icon: FiUsers, title: 'Global Talent Pool', description: 'Access to 10,000+ skilled freelancers worldwide' },
        { icon: FiAward, title: 'Quality Assured', description: 'All freelancers are verified and rated by clients' },
        { icon: FiCheck, title: 'Secure Payments', description: 'Escrow payment system for peace of mind' },
        { icon: FiTarget, title: 'Project Management', description: 'Built-in tools to track and manage projects' },
    ];

    const team = [
        { name: 'John Doe', role: 'CEO & Founder', image: 'https://i.pravatar.cc/150?img=12' },
        { name: 'Jane Smith', role: 'CTO', image: 'https://i.pravatar.cc/150?img=5' },
        { name: 'Mike Johnson', role: 'Head of Marketing', image: 'https://i.pravatar.cc/150?img=33' },
        { name: 'Sarah Williams', role: 'Customer Success', image: 'https://i.pravatar.cc/150?img=9' },
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl font-bold text-white mb-6">About JobKhuji</h1>
                    <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                        Connecting talented freelancers with amazing opportunities since 2020. 
                        We're building the future of work, one project at a time.
                    </p>
                </div>
            </div>

            {/* Mission & Vision */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid md:grid-cols-2 gap-12">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                        <div className="flex items-center mb-4">
                            <FiTarget className="text-4xl text-blue-600 mr-4" />
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Mission</h2>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                            To empower freelancers and businesses by providing a reliable, transparent, and 
                            efficient platform that facilitates meaningful collaborations and drives success 
                            for both parties.
                        </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                        <div className="flex items-center mb-4">
                            <FiEye className="text-4xl text-purple-600 mr-4" />
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Vision</h2>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                            To become the world's most trusted freelance marketplace, where talent meets 
                            opportunity, and where every project contributes to professional growth and 
                            business success.
                        </p>
                    </div>
                </div>
            </div>

            {/* Features */}
            <div className="bg-gray-50 dark:bg-gray-800 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
                        Why Choose Us
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={index}
                                    className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow"
                                >
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
                                        <Icon className="text-3xl text-blue-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Team Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
                    Meet Our Team
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {team.map((member, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow"
                        >
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-blue-600"
                            />
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                                {member.name}
                            </h3>
                            <p className="text-blue-600 dark:text-blue-400 font-medium">{member.role}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8 text-center text-white">
                        <div>
                            <div className="text-5xl font-bold mb-2">10,000+</div>
                            <div className="text-blue-100">Active Freelancers</div>
                        </div>
                        <div>
                            <div className="text-5xl font-bold mb-2">5,000+</div>
                            <div className="text-blue-100">Projects Completed</div>
                        </div>
                        <div>
                            <div className="text-5xl font-bold mb-2">98%</div>
                            <div className="text-blue-100">Client Satisfaction</div>
                        </div>
                        <div>
                            <div className="text-5xl font-bold mb-2">150+</div>
                            <div className="text-blue-100">Countries</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
