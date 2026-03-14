import React, { useState } from 'react'

const ProdAdd = () => {
    const [images, setImages] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        category: '',
        customCategory: '',
        longDescription: '',
        images: [],
        link: '',
        featured: false,
        rating: 0
    });
    const [showCustomCategory, setShowCustomCategory] = useState(false);

    const handleImageChange = (e) => {
        setImages(Array.from(e.target.files));
        // For now, assume images are uploaded elsewhere and we store URLs
        // You might need to implement image upload to a service like Cloudinary
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name === 'category') {
            if (value === 'other') {
                setShowCustomCategory(true);
                setFormData({
                    ...formData,
                    category: '',
                    customCategory: ''
                });
            } else {
                setShowCustomCategory(false);
                setFormData({
                    ...formData,
                    category: value,
                    customCategory: ''
                });
            }
        } else {
            setFormData({
                ...formData,
                [name]: type === 'checkbox' ? checked : value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const categoryToSend = showCustomCategory ? formData.customCategory : formData.category;
        if (!categoryToSend) {
            alert('Please select or enter a category');
            return;
        }
        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('price', formData.price);
        formDataToSend.append('category', categoryToSend);
        formDataToSend.append('longDescription', formData.longDescription);
        formDataToSend.append('link', formData.link);
        formDataToSend.append('rating', formData.rating);
        formDataToSend.append('featured', formData.featured);

        images.forEach((image, index) => {
            formDataToSend.append('images', image);
        });

        try {
            const response = await fetch('http://localhost:5000/api/products', {
                method: 'POST',
                body: formDataToSend,
            });
            if (response.ok) {
                alert('Product added successfully!');
                setFormData({
                    title: '',
                    price: '',
                    category: '',
                    customCategory: '',
                    longDescription: '',
                    images: [],
                    link: '',
                    featured: false,
                    rating: 0
                });
                setImages([]);
                setShowCustomCategory(false);
            } else {
                alert('Error adding product');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error adding product');
        }
    };

    const categories = [
        { id: 'airfryer', name: 'Air Fryers' },
        { id: 'blender', name: 'Blenders' },
        { id: 'coffee', name: 'Coffee Makers' },
        { id: 'microwave', name: 'Microwave' },
        { id: 'thermos', name: 'Thermos' },
        { id: 'juicer', name: 'Juicers' },
        { id: 'toaster', name: 'Toasters' },
        { id: 'rice', name: 'Rice Cookers' },
        { id: 'blender-pro', name: 'Blenders Pro' },
        { id: 'kettle', name: 'Electric Kettles' },
        { id: 'other', name: 'Other' }
    ];

    return (
        <div className='mt-12 text-center flex flex-col items-center'>

            <h2 className="text-xl font-bold mb-6 text-[#18274e]">
                Add Product
            </h2>

            <div className="flex space-x-8 items-start">

                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-4 max-w-xl">

                    <input
                        type="text"
                        name="title"
                        placeholder="Product Name"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full border p-2 rounded"
                        required
                    />

                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="w-full border p-2 rounded"
                        required
                    />

                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full border p-2 rounded cursor-pointer"
                        required={!showCustomCategory}
                    >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>

                    {showCustomCategory && (
                        <input
                            type="text"
                            name="customCategory"
                            placeholder="Enter Custom Category"
                            value={formData.customCategory}
                            onChange={handleInputChange}
                            className="w-full border p-2 rounded"
                            required
                        />
                    )}

                    <textarea
                        name="longDescription"
                        placeholder="Product Description"
                        value={formData.longDescription}
                        onChange={handleInputChange}
                        className="w-full border p-2 rounded"
                        required
                    ></textarea>

                    <input
                        type="text"
                        name="link"
                        placeholder="Product Link"
                        value={formData.link}
                        onChange={handleInputChange}
                        className="w-full border p-2 rounded"
                    />

                    <input
                        type="number"
                        name="rating"
                        placeholder="Rating (0-5)"
                        value={formData.rating}
                        onChange={handleInputChange}
                        min="0"
                        max="5"
                        step="0.1"
                        className="w-full border p-2 rounded"
                    />

                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            name="featured"
                            checked={formData.featured}
                            onChange={handleInputChange}
                            className="mr-2"
                        />
                        Featured Product
                    </label>

                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full border p-2 rounded"
                    />

                    <button type="submit" className="bg-[#18274e] text-white px-6 py-2 rounded hover:bg-[#0f1a3a] cursor-pointer">
                        Add Product
                    </button>

                </form>

                {images.length > 0 && (
                    <div className="bg-white p-6 rounded-xl shadow">
                        <h3 className="text-lg font-semibold mb-4">Selected Images</h3>
                        <div className="grid grid-cols-3 gap-2">
                            {images.map((img, index) => (
                                <img key={index} src={URL.createObjectURL(img)} alt={`Selected ${index + 1}`} className="w-20 h-20 object-cover rounded" />
                            ))}
                        </div>
                    </div>
                )}

            </div>

        </div>
    )
}

export default ProdAdd