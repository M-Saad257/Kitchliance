import React, { useState, useEffect } from 'react'
import { io } from 'socket.io-client'

const ManageBlog = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingBlog, setEditingBlog] = useState(null);
    const [editForm, setEditForm] = useState({});

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

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this blog?')) {
            try {
                await fetch(`http://localhost:5000/api/blogs/${id}`, {
                    method: 'DELETE',
                });
                fetchBlogs();
            } catch (error) {
                console.error('Error deleting blog:', error);
            }
        }
    };

    const handleEdit = (blog) => {
        setEditingBlog(blog._id);
        setEditForm(blog);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditForm({
            ...editForm,
            [name]: value
        });
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetch(`http://localhost:5000/api/blogs/${editingBlog}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editForm),
            });
            setEditingBlog(null);
            fetchBlogs();
        } catch (error) {
            console.error('Error updating blog:', error);
        }
    };

    if (loading) {
        return <div className='text-center py-10'>Loading...</div>;
    }

    return (
        <div>

            <h2 className="text-xl font-bold mt-13 mb-6 text-[#18274e]">
                Manage Blog Posts
            </h2>

            <div className="bg-white p-6 rounded-xl shadow">

                {/* Table for larger screens */}
                <table className="w-full hidden md:table">

                    <thead>
                        <tr className="border-b">
                            <th className="text-left p-2">Image</th>
                            <th className="text-left p-2">Title</th>
                            <th className="text-left p-2">Date</th>
                            <th className="text-left p-2">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {blogs.map(blog => (
                            <tr key={blog._id} className="border-b">
                                <td className="p-2"><img src={`http://localhost:5000${blog.image}`} alt="Blog Image" className="w-16 h-16 object-cover rounded" /></td>
                                <td className="p-2">{blog.title}</td>
                                <td className="p-2">{blog.date}</td>
                                <td className="p-2">
                                    <button onClick={() => handleEdit(blog)} className="cursor-pointer text-blue-500 mr-2">Edit</button>
                                    <button onClick={() => handleDelete(blog._id)} className="cursor-pointer text-red-500">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>

                {/* Cards for small screens */}
                <div className="grid grid-cols-1 gap-4 md:hidden">
                    {blogs.map(blog => (
                        <div key={blog._id} className="border rounded-lg p-4 shadow">
                            <div className="flex items-center gap-4 mb-2">
                                <img src={`http://localhost:5000${blog.image}`} alt="Blog Image" className="w-16 h-16 object-cover rounded" />
                                <div className="flex-1">
                                    <h3 className="font-bold text-lg">{blog.title}</h3>
                                    <p className="text-gray-600">{blog.date}</p>
                                </div>
                            </div>
                            <div className="mt-2">
                                <button onClick={() => handleEdit(blog)} className="cursor-pointer text-blue-500 mr-2">Edit</button>
                                <button onClick={() => handleDelete(blog._id)} className="cursor-pointer text-red-500">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            {editingBlog && (
                <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/50 flex items-center justify-center p-4">
                    <div className="bg-white mb-2 rounded-lg mt-18 shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        <div className="p-4 md:p-6">
                            <h3 className="text-lg font-bold mb-4 text-[#18274e]">Edit Blog</h3>
                            <div className="flex flex-col lg:flex-row gap-6">
                                {/* Form Section */}
                                <div className="flex-1">
                                    <form onSubmit={handleEditSubmit} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                            <input
                                                type="text"
                                                name="title"
                                                value={editForm.title || ''}
                                                onChange={handleEditChange}
                                                placeholder="Blog Title"
                                                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#18274e] focus:border-transparent"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
                                            <textarea
                                                name="excerpt"
                                                value={editForm.excerpt || ''}
                                                onChange={handleEditChange}
                                                placeholder="Brief description of the blog post"
                                                rows="3"
                                                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#18274e] focus:border-transparent"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                                            <input
                                                type="date"
                                                name="date"
                                                value={editForm.date || ''}
                                                onChange={handleEditChange}
                                                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#18274e] focus:border-transparent"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                                            <input
                                                type="text"
                                                name="image"
                                                value={editForm.image || ''}
                                                onChange={handleEditChange}
                                                placeholder="https://example.com/image.jpg"
                                                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#18274e] focus:border-transparent"
                                            />
                                        </div>
                                        <div className="flex flex-col sm:flex-row gap-3 pt-4">
                                            <button type="button" onClick={() => setEditingBlog(null)} className="flex-1 px-6 py-3 bg-gray-300 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-400 transition-colors font-medium">Cancel</button>
                                            <button type="submit" className="flex-1 px-6 py-3 bg-[#18274e] text-white rounded-lg cursor-pointer hover:bg-[#0f1a3a] transition-colors font-medium">Save Changes</button>
                                        </div>
                                    </form>
                                </div>
                                
                                {/* Image Preview Section */}
                                <div className="flex-1">
                                    <h4 className="text-md font-semibold mb-3 text-gray-800">Image Preview</h4>
                                    {editForm.image ? (
                                        <div className="border-2 border-gray-200 rounded-lg p-4 bg-gray-50">
                                            <img
                                                src={`http://localhost:5000${editForm.image}`}
                                                alt="Blog preview"
                                                className="w-full h-48 md:h-64 object-cover rounded-lg shadow-sm"
                                                onError={(e) => {
                                                    e.target.src = '/placeholder.jpg';
                                                }}
                                            />
                                            <p className="text-sm text-gray-600 mt-3 text-center">Current blog image</p>
                                        </div>
                                    ) : (
                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 bg-gray-50 text-center">
                                            <div className="text-gray-400 mb-2">
                                                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <p className="text-gray-500 font-medium">No image selected</p>
                                            <p className="text-sm text-gray-400 mt-1">Enter an image URL above to see preview</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default ManageBlog