import React, { useState } from 'react';
import { FiCalendar, FiUser, FiClock, FiTag, FiSearch } from 'react-icons/fi';

const BlogPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', 'Freelancing Tips', 'Success Stories', 'Industry News', 'Career Advice', 'Technology'];

    const blogPosts = [
        {
            id: 1,
            title: '10 Tips for Successful Freelancing in 2026',
            excerpt: 'Master the art of freelancing with these proven strategies that will help you stand out in a competitive market.',
            author: 'Sarah Johnson',
            date: 'Jan 2, 2026',
            readTime: '5 min read',
            category: 'Freelancing Tips',
            image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&q=80',
        },
        {
            id: 2,
            title: 'How to Build a Strong Portfolio That Gets Clients',
            excerpt: 'Learn how to showcase your work effectively and attract high-paying clients with a professional portfolio.',
            author: 'Mike Chen',
            date: 'Dec 28, 2025',
            readTime: '7 min read',
            category: 'Career Advice',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80',
        },
        {
            id: 3,
            title: 'Success Story: From Part-Time to Full-Time Freelancer',
            excerpt: 'John\'s inspiring journey from working 9-5 to building a thriving freelance business earning six figures.',
            author: 'Emma Davis',
            date: 'Dec 25, 2025',
            readTime: '6 min read',
            category: 'Success Stories',
            image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&q=80',
        },
        {
            id: 4,
            title: 'The Future of Remote Work: Trends to Watch',
            excerpt: 'Explore the latest trends shaping the future of remote work and freelancing in the digital age.',
            author: 'David Lee',
            date: 'Dec 20, 2025',
            readTime: '8 min read',
            category: 'Industry News',
            image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=500&q=80',
        },
        {
            id: 5,
            title: 'Essential Tools Every Freelancer Needs in 2026',
            excerpt: 'Discover the must-have tools and software that will boost your productivity and streamline your workflow.',
            author: 'Lisa Anderson',
            date: 'Dec 15, 2025',
            readTime: '6 min read',
            category: 'Technology',
            image: 'https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?w=500&q=80',
        },
        {
            id: 6,
            title: 'How to Set Your Freelance Rates with Confidence',
            excerpt: 'A comprehensive guide to pricing your services competitively while ensuring you get paid what you deserve.',
            author: 'Robert Taylor',
            date: 'Dec 10, 2025',
            readTime: '5 min read',
            category: 'Freelancing Tips',
            image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&q=80',
        },
    ];

    const filteredPosts = blogPosts.filter(post => {
        const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            {/* Hero */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl font-bold text-white mb-6">Our Blog</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
                        Insights, tips, and stories from the world of freelancing
                    </p>
                    
                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto relative">
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-6 py-4 pr-12 rounded-full text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-4 focus:ring-blue-300 outline-none"
                        />
                        <FiSearch className="absolute right-5 top-1/2 transform -translate-y-1/2 text-2xl text-gray-400" />
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-6 py-2 rounded-full font-medium transition-all ${
                                selectedCategory === category
                                    ? 'bg-blue-600 text-white shadow-lg'
                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Blog Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.map(post => (
                        <article
                            key={post.id}
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow group cursor-pointer"
                        >
                            <div className="relative overflow-hidden">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-semibold">
                                        <FiTag className="mr-1" />
                                        {post.category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-6">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {post.title}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                                    {post.excerpt}
                                </p>
                                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                                    <div className="flex items-center space-x-4">
                                        <span className="flex items-center">
                                            <FiUser className="mr-1" />
                                            {post.author}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mt-2">
                                    <span className="flex items-center">
                                        <FiCalendar className="mr-1" />
                                        {post.date}
                                    </span>
                                    <span className="flex items-center">
                                        <FiClock className="mr-1" />
                                        {post.readTime}
                                    </span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {filteredPosts.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-xl text-gray-600 dark:text-gray-400">
                            No articles found. Try a different search or category.
                        </p>
                    </div>
                )}
            </div>

            {/* Newsletter Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">Subscribe to Our Newsletter</h2>
                    <p className="text-blue-100 mb-8">
                        Get the latest articles and updates delivered straight to your inbox.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-6 py-3 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-4 focus:ring-blue-300 outline-none"
                        />
                        <button className="px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-lg transition-colors">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogPage;
