import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { io } from 'socket.io-client';

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBlogs = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/blogs');
            const data = await response.json();
            setBlogs(data);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();

        const socket = io('http://localhost:5000');
        socket.on('blogAdded', () => fetchBlogs());
        socket.on('blogUpdated', () => fetchBlogs());
        socket.on('blogDeleted', () => fetchBlogs());

        return () => socket.disconnect();
    }, []);

    const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    if (loading) {
        return <div className='text-center py-10'>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            {/* Hero Section */}
            <div className="relative bg-[url('/kitchen-blog-hero.jpg')] bg-cover bg-center h-72 pt-10 flex items-center justify-center">
                <div className="bg-[#18274e] bg-opacity-50 p-8 rounded-lg text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Kitchen Insights & Smart Appliance Tips
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200">
                        Discover the latest trends, recipes, and smart kitchen hacks
                    </p>
                </div>
            </div>

            {/* Blog Cards Section */}
            <div className="container mx-auto px-6 md:px-12">
                <h2 className="text-3xl font-bold mb-12 text-center">Latest Articles</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {blogs.map((blog) => (
                        <div key={blog._id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition overflow-hidden">
                            <div className="relative h-56 w-full">
                                <img
                                    src={`http://localhost:5000${blog.image}`}
                                    alt={blog.title}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                                <p className="text-gray-600 mb-4 line-clamp-3">{blog.excerpt}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-400 text-sm">{blog.date}</span>
                                    <Link
                                        to={`/blog/${blog._id}`}
                                        onClick={scrollTop}
                                        className="text-blue-600 font-medium hover:underline"
                                    >
                                        Read More →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Featured Section */}
            <div className="bg-white py-16">
                <div className="container mx-auto px-6 md:px-12 text-center">
                    <h2 className="text-3xl font-bold mb-6">Featured Tips & Tricks</h2>
                    <p className="text-gray-700 max-w-2xl mx-auto mb-10">
                        Learn how to maximize your smart kitchen appliances, cook faster, and enjoy hassle-free meals.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6">
                        <div className="p-6 bg-gray-100 rounded-xl shadow hover:shadow-lg transition w-72">
                            <h3 className="font-semibold text-lg mb-2">Air Fryer Hacks</h3>
                            <p>Master your air fryer with these little-known tricks to make crispy, healthy meals.</p>
                        </div>
                        <div className="p-6 bg-gray-100 rounded-xl shadow hover:shadow-lg transition w-72">
                            <h3 className="font-semibold text-lg mb-2">Smart Coffee Brewing</h3>
                            <p>Use your smart coffee machine to brew café-quality drinks at home.</p>
                        </div>
                        <div className="p-6 bg-gray-100 rounded-xl shadow hover:shadow-lg transition w-72">
                            <h3 className="font-semibold text-lg mb-2">Blender Recipes</h3>
                            <p>Discover smoothie, soup, and sauce recipes that your smart blender makes easy.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blog