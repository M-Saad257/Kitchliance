import React, { useState, useEffect } from 'react'
import { io } from 'socket.io-client'
import Bcard from '../components/BlogCard.jsx'

const Featured = () => {
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

    if (loading) {
        return <div className='text-center py-10'>Loading...</div>;
    }

    return (
        <div>
            <div className='text-center text-2xl md:text-5xl font-bold py-4 text-[#18274e] [text-shadow: 0px 20px 20px #ffffff;] mb-4'>Latest Blog Posts</div>
            <div className='flex flex-col md:flex-row my-5 space-y-4 md:space-y-0 md:space-x-4 p-3 justify-around items-center'>
                {blogs.slice(0, 3).map((blog) => (
                    <Bcard
                        key={blog._id}
                        id={blog._id}
                        image={blog.image}
                        title={blog.title}
                        excerpt={blog.excerpt}
                        date={blog.date}
                    />
                ))}
            </div>
        </div>
    )
}

export default Featured
