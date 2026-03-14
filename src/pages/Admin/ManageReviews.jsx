import React, { useState, useEffect } from 'react'
import { io } from 'socket.io-client'

const ManageReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingReview, setEditingReview] = useState(null);
    const [editForm, setEditForm] = useState({});

    const fetchReviews = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/reviews');
            const data = await response.json();
            setReviews(data);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();

        const socket = io('http://localhost:5000');
        socket.on('reviewAdded', () => fetchReviews());
        socket.on('reviewUpdated', () => fetchReviews());
        socket.on('reviewDeleted', () => fetchReviews());

        return () => socket.disconnect();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this review?')) {
            try {
                await fetch(`http://localhost:5000/api/reviews/${id}`, {
                    method: 'DELETE',
                });
                fetchReviews();
            } catch (error) {
                console.error('Error deleting review:', error);
            }
        }
    };

    const handleEdit = (review) => {
        setEditingReview(review._id);
        setEditForm(review);
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
            await fetch(`http://localhost:5000/api/reviews/${editingReview}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editForm),
            });
            setEditingReview(null);
            fetchReviews();
        } catch (error) {
            console.error('Error updating review:', error);
        }
    };

    if (loading) {
        return <div className='text-center py-10'>Loading...</div>;
    }

    return (
        <div>

            <h2 className="text-xl mt-14 font-bold mb-6 text-[#18274e]">
                Manage Reviews
            </h2>

            <div className="bg-white p-6 rounded-xl shadow">

                {/* Table for larger screens */}
                <table className="w-full hidden md:table">

                    <thead>
                        <tr className="border-b">
                            <th className="text-left p-2">Name</th>
                            <th className="text-left p-2">Rating</th>
                            <th className="text-left p-2">Comment</th>
                            <th className="text-left p-2">Date</th>
                            <th className="text-left p-2">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {reviews.map(review => (
                            <tr key={review._id} className="border-b">
                                <td className="p-2">{review.name}</td>
                                <td className="p-2">{review.rating} ⭐</td>
                                <td className="p-2">{review.comment}</td>
                                <td className="p-2">{review.date}</td>
                                <td className="p-2">
                                    <button onClick={() => handleEdit(review)} className="cursor-pointer text-blue-500 mr-2">Edit</button>
                                    <button onClick={() => handleDelete(review._id)} className="cursor-pointer text-red-500">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>

                {/* Cards for small screens */}
                <div className="grid grid-cols-1 gap-4 md:hidden">
                    {reviews.map(review => (
                        <div key={review._id} className="border rounded-lg p-4 shadow">
                            <h3 className="font-bold text-lg">{review.name}</h3>
                            <p className="text-gray-600">{review.rating} ⭐</p>
                            <p className="text-gray-500">{review.comment}</p>
                            <p className="text-gray-400 text-sm">{review.date}</p>
                            <div className="mt-2">
                                <button onClick={() => handleEdit(review)} className="cursor-pointer text-blue-500 mr-2">Edit</button>
                                <button onClick={() => handleDelete(review._id)} className="cursor-pointer text-red-500">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            {editingReview && (
                <div className="fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center p-4">
                    <div className="bg-white mt-18 mb-2 rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-4 md:p-6">
                            <h3 className="text-lg font-bold mb-4 text-[#18274e]">Edit Review</h3>
                            <form onSubmit={handleEditSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Reviewer Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={editForm.name || ''}
                                            onChange={handleEditChange}
                                            placeholder="Enter reviewer name"
                                            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#18274e] focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Rating (1-5)</label>
                                        <input
                                            type="number"
                                            name="rating"
                                            value={editForm.rating || ''}
                                            onChange={handleEditChange}
                                            placeholder="5"
                                            min="1"
                                            max="5"
                                            step="1"
                                            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#18274e] focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Review Text</label>
                                        <textarea
                                            name="comment"
                                            value={editForm.comment || ''}
                                            onChange={handleEditChange}
                                            placeholder="Write the review content here"
                                            rows="4"
                                            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#18274e] focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                                        <input
                                            type="date"
                                            name="date"
                                            value={editForm.date ? new Date(editForm.date).toISOString().split('T')[0] : ''}
                                            onChange={handleEditChange}
                                            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#18274e] focus:border-transparent"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                                    <button type="button" onClick={() => setEditingReview(null)} className="flex-1 px-6 py-3 bg-gray-300 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-400 transition-colors font-medium">Cancel</button>
                                    <button type="submit" className="flex-1 px-6 py-3 bg-[#18274e] text-white rounded-lg cursor-pointer hover:bg-[#0f1a3a] transition-colors font-medium">Save Changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default ManageReviews