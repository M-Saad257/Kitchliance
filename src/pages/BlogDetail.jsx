// src/pages/BlogDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const BlogDetail = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/blogs/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setBlog(data);
                } else {
                    setBlog(null);
                }
            } catch (error) {
                console.error('Error fetching blog:', error);
                setBlog(null);
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-800">
                <p className="text-xl font-semibold">Loading...</p>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-800">
                <p className="text-xl font-semibold">Blog post not found.</p>
            </div>
        );
    }

    const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <div className="min-h-screen mt-15 border-t-2 border-white bg-gray-50 text-gray-800">
            {/* Hero Section */}
            <div className="relative h-96 w-full">
                <img
                    src={`http://localhost:5000${blog.image}`}
                    alt={blog.title}
                    className="object-cover w-full h-full brightness-40"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <h1
                        className={`
                            text-4xl md:text-5xl font-bold px-6 text-center
                            text-[#18274e]
                        `}
                        style={{
                            WebkitTextStroke: '2px white',
                            textStroke: '2px white',
                        }}
                    >
                        {blog.title}
                    </h1>
                </div>
            </div>
            {/* Blog Content */}
            <div className="container mx-auto px-6 md:px-12 py-16 max-w-4xl">
                <div className="flex justify-between mb-6">
                    <span className="text-gray-500">{blog.date}</span>
                    <Link
                        to="/blog"
                        onClick={scrollTop}
                        className="text-blue-600 font-medium hover:underline"
                    >
                        ← Back to Blog
                    </Link>
                </div>

                <div className="prose prose-lg md:prose-xl max-w-none">
                    <p>
                        {blog.excerpt}
                    </p>

                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                        lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod
                        malesuada. In a dui et sapien malesuada sollicitudin non sed
                        turpis. Sed a diam nec sapien fringilla ultricies.
                    </p>

                    <h2>Why This Matters</h2>
                    <p>
                        Your smart kitchen appliances can save time, increase efficiency,
                        and make cooking more enjoyable. Understanding each device's
                        features helps you get the most out of your investment.
                    </p>

                    <h2>Pro Tips</h2>
                    <ul>
                        <li>Always preheat your smart oven for even cooking.</li>
                        <li>Use app-controlled schedules to save time in your daily routine.</li>
                        <li>Regularly clean your appliances to maintain performance.</li>
                        <li>Combine gadgets for multi-step recipes (blender + air fryer + oven).</li>
                    </ul>

                    <p>
                        Incorporate these strategies to turn your kitchen into a smart,
                        modern space where cooking becomes a joy rather than a chore.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;