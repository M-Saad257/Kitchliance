import React, { useState } from 'react'

const BlogAdd = () => {
    const [image, setImage] = useState(null);

    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        date: '',
        image: ''
    });

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
        // For now, assume image is uploaded elsewhere and we store URL
        // You might need to implement image upload to a service like Cloudinary
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('excerpt', formData.excerpt);
        formDataToSend.append('date', formData.date);
        if (image) {
            formDataToSend.append('image', image);
        }

        try {
            const response = await fetch('http://localhost:5000/api/blogs', {
                method: 'POST',
                body: formDataToSend,
            });
            if (response.ok) {
                alert('Blog added successfully!');
                setFormData({
                    title: '',
                    excerpt: '',
                    date: '',
                    image: ''
                });
                setImage(null);
            } else {
                alert('Error adding blog');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error adding blog');
        }
    };

    return (
        <div className='mt-12 text-center flex flex-col items-center'>

            <h2 className="text-xl font-bold mb-6 text-[#18274e]">
                Add Blog Post
            </h2>

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-4 max-w-xl">

                <input
                    type="text"
                    name="title"
                    placeholder="Blog Title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded"
                    required
                />

                <textarea
                    name="excerpt"
                    placeholder="Blog Excerpt"
                    value={formData.excerpt}
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

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full border p-2 rounded"
                />

                <button type="submit" className="bg-[#18274e] text-white px-6 py-2 rounded hover:bg-[#0f1a3a] cursor-pointer">
                    Add Blog
                </button>

            </form>

            {image && (
                <div className="bg-white p-6 rounded-xl shadow mt-4">
                    <h3 className="text-lg font-semibold mb-4">Selected Image</h3>
                    <img src={URL.createObjectURL(image)} alt="Selected" className="w-32 h-32 object-cover rounded" />
                </div>
            )}

        </div>
    )
}

export default BlogAdd