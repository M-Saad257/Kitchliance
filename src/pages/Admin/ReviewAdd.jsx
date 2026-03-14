import React, { useState } from 'react'

const ReviewAdd = () => {
    const [formData, setFormData] = useState({
        name: '',
        rating: '',
        comment: '',
        date: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    rating: parseInt(formData.rating)
                }),
            });
            if (response.ok) {
                alert('Review added successfully!');
                setFormData({
                    name: '',
                    rating: '',
                    comment: '',
                    date: ''
                });
            } else {
                alert('Error adding review');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error adding review');
        }
    };

    return (
        <div className='mt-12 text-center flex flex-col items-center'>

            <h2 className="text-xl font-bold mb-6 text-[#18274e]">
                Add Review
            </h2>

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-4 max-w-xl">

                <input
                    type="text"
                    name="name"
                    placeholder="Reviewer Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded"
                    required
                />

                <input
                    type="number"
                    name="rating"
                    placeholder="Rating (1-5)"
                    value={formData.rating}
                    onChange={handleInputChange}
                    min="1"
                    max="5"
                    className="w-full border p-2 rounded"
                    required
                />

                <textarea
                    name="comment"
                    placeholder="Review Comment"
                    value={formData.comment}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded"
                    required
                ></textarea>

                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded"
                    required
                />

                <button type="submit" className="bg-[#18274e] text-white px-6 py-2 rounded hover:bg-[#0f1a3a] cursor-pointer">
                    Add Review
                </button>

            </form>

        </div>
    )
}

export default ReviewAdd