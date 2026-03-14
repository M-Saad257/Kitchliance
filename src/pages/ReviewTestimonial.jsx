import React, { useState, useEffect } from "react";
import { io } from 'socket.io-client';

const ReviewTestimonial = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [current, setCurrent] = useState(0);

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

    const total = reviews.length;

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % total);
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev - 1 + total) % total);
    };

    useEffect(() => {
        if (total > 0) {
            const interval = setInterval(() => {
                nextSlide();
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [total]);

    if (loading) {
        return <div className='text-center py-10'>Loading...</div>;
    }

    if (total === 0) {
        return <div className='text-center py-10'>No reviews yet.</div>;
    }

    return (
        <div className="w-full flex flex-col items-center py-16 bg-gray-50">

            <h2 className="text-3xl font-bold text-[#18274e] mb-10">
                What Our Customers Say
            </h2>

            <div className="relative w-full max-w-3xl overflow-hidden">

                {/* Left Arrow */}
                <button
                    onClick={prevSlide}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 text-3xl px-4 text-gray-400 hover:text-gray-700 cursor-pointer"
                >
                    ‹
                </button>

                {/* Slides */}
                <div
                    className="flex transition-transform duration-700"
                    style={{ transform: `translateX(-${current * 100}%)` }}
                >
                    {reviews.map((review, index) => (
                        <div
                            key={review._id}
                            className="w-full flex-shrink-0 flex justify-center"
                        >
                            <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">

                                <p className="text-gray-600 italic mb-4">
                                    "{review.comment}"
                                </p>

                                <div className="text-yellow-400 mb-2">
                                    {"★".repeat(review.rating)}
                                    {"☆".repeat(5 - review.rating)}
                                </div>

                                <h4 className="font-semibold text-gray-800">
                                    {review.name}
                                </h4>

                                <p className="text-sm text-gray-400">
                                    {review.date}
                                </p>

                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Arrow */}
                <button
                    onClick={nextSlide}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 text-3xl px-4 text-gray-400 hover:text-gray-700 cursor-pointer"
                >
                    ›
                </button>

            </div>

            {/* Dots */}
            <div className="flex gap-2 mt-6">
                {reviews.map((_, index) => (
                    <div
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`w-2 h-2 rounded-full cursor-pointer ${
                            index === current ? "bg-[#18274e]" : "bg-gray-300"
                        }`}
                    />
                ))}
            </div>

        </div>
    );
};

export default ReviewTestimonial;