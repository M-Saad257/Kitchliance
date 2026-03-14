import React, { useState } from 'react';

const Reviews = () => {
    const [reviews, setReviews] = useState(reviewsData);
    const [formData, setFormData] = useState({ name: '', rating: 5, comment: '' });
    const [status, setStatus] = useState('');

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        const newReview = {
            id: reviews.length + 1,
            name: formData.name,
            rating: parseInt(formData.rating),
            comment: formData.comment,
            date: new Date().toISOString().split('T')[0] // yyyy-mm-dd
        };
        setReviews([newReview, ...reviews]);
        setFormData({ name: '', rating: 5, comment: '' });
        setStatus('Review added successfully! ✅');
        setTimeout(() => setStatus(''), 3000);
    };

    return (
        <div className="max-w-3xl mx-auto my-18 px-4">
            <h2 className="text-2xl font-bold text-[#18274e] mb-6">Customer Reviews</h2>

            {/* Add Review Form */}
            <form onSubmit={handleSubmit} className="mb-8 space-y-4 bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Add a Review</h3>
                <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#18274e]"
                />
                <select
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#18274e] cursor-pointer"
                >
                    {[5, 4, 3, 2, 1].map(r => (
                        <option key={r} value={r}>{r} Star{r > 1 ? 's' : ''}</option>
                    ))}
                </select>
                <textarea
                    name="comment"
                    placeholder="Write your review..."
                    value={formData.comment}
                    onChange={handleChange}
                    rows="4"
                    required
                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#18274e]"
                ></textarea>
                <button type="submit" className="w-full bg-[#18274e] text-white font-semibold px-4 py-2 rounded-lg cursor-pointer hover:bg-white hover:text-[#18274e] hover:border-2 hover:border-[#18274e] transition">
                    Submit Review
                </button>
                {status && <p className="text-green-600 mt-2">{status}</p>}
            </form>

            {/* Display Reviews */}
            <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-4">
                {reviews.map(review => (
                    <div key={review.id} className="bg-white p-4 rounded-xl shadow-md">
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold text-gray-800">{review.name}</span>
                            <span className="text-yellow-500">{'⭐'.repeat(review.rating)}</span>
                        </div>
                        <p className="text-gray-700 mb-2">{review.comment}</p>
                        <span className="text-gray-400 text-sm">{review.date}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Reviews;