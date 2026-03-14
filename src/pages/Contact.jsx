import React, { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setStatus('Sending...');

        // Fake API delay
        setTimeout(() => {
            setStatus('Message sent successfully! ✅');

            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });

            // Optional: clear message after 4 seconds
            setTimeout(() => {
                setStatus('');
            }, 4000);

        }, 1500); // 1.5 sec fake loading
    };

    return (
        <div className="min-h-screen mt-10 bg-gray-50 py-16 px-6 md:px-12">
            <div className="max-w-3xl mx-auto bg-white p-10 rounded-xl shadow-lg">

                <h2 className="text-3xl font-bold mb-6 text-center text-[#18274e]">
                    Contact Us
                </h2>

                <p className="text-center text-gray-600 mb-8">
                    Have questions or suggestions? Send us a message and we’ll get back to you.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">

                    <input
                        className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#18274e]"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        required
                    />

                    <input
                        className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#18274e]"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your Email"
                        required
                    />

                    <input
                        className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#18274e]"
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Subject"
                        required
                    />

                    <textarea
                        className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#18274e]"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="5"
                        placeholder="Message"
                        required
                    ></textarea>

                    <button
                        type="submit"
                        className="w-full bg-[#18274e] text-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-[#18274e] hover:border-2 hover:border-[#18274e] transition"
                    >
                        Send Message
                    </button>

                    {status && (
                        <p className="mt-4 text-center text-green-600 font-medium">
                            {status}
                        </p>
                    )}

                </form>
            </div>
        </div>
    );
};

export default Contact;