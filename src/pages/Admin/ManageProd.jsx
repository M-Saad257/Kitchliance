import React, { useState, useEffect } from 'react'
import { io } from 'socket.io-client'

const ManageProd = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingProduct, setEditingProduct] = useState(null);
    const [editForm, setEditForm] = useState({});

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/products');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();

        const socket = io('http://localhost:5000');
        socket.on('productAdded', () => fetchProducts());
        socket.on('productUpdated', () => fetchProducts());
        socket.on('productDeleted', () => fetchProducts());

        return () => socket.disconnect();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await fetch(`http://localhost:5000/api/products/${id}`, {
                    method: 'DELETE',
                });
                fetchProducts();
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product._id);
        setEditForm(product);
    };

    const handleEditChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEditForm({
            ...editForm,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetch(`http://localhost:5000/api/products/${editingProduct}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editForm),
            });
            setEditingProduct(null);
            fetchProducts();
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    if (loading) {
        return <div className='text-center py-10'>Loading...</div>;
    }

    return (
        <div>

            <h2 className="text-xl font-bold mb-6 text-[#18274e]">
                Manage Products
            </h2>

            <div className="bg-white p-6 rounded-xl shadow">

                {/* Table for larger screens */}
                <table className="w-full hidden md:table">

                    <thead>
                        <tr className="border-b">
                            <th className="text-left p-2">Image</th>
                            <th className="text-left p-2">Product</th>
                            <th className="text-left p-2">Price</th>
                            <th className="text-left p-2">Category</th>
                            <th className="text-left p-2">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map(product => (
                            <tr key={product._id} className="border-b">
                                <td className="p-2">
                                    <div className="flex space-x-1">
                                        {product.images && product.images.map((img, index) => (
                                            <img key={index} src={`http://localhost:5000${img}`} alt={product.title} className="w-8 h-8 object-cover rounded" />
                                        ))}
                                    </div>
                                </td>
                                <td className="p-2">{product.title}</td>
                                <td className="p-2">${product.price}</td>
                                <td className="p-2 uppercase">{product.category}</td>
                                <td className="p-2">
                                    <button onClick={() => handleEdit(product)} className="cursor-pointer text-blue-500 mr-2">Edit</button>
                                    <button onClick={() => handleDelete(product._id)} className="cursor-pointer text-red-500">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>

                {/* Cards for small screens */}
                <div className="grid grid-cols-1 gap-4 md:hidden">
                    {products.map(product => (
                        <div key={product._id} className="border rounded-lg p-4 shadow">
                            <div className="flex space-x-2 mb-2">
                                {product.images && product.images.map((img, index) => (
                                    <img key={index} src={`http://localhost:5000${img}`} alt={product.title} className="w-12 h-12 object-cover rounded" />
                                ))}
                            </div>
                            <h3 className="font-bold text-lg">{product.title}</h3>
                            <p className="text-gray-600">${product.price}</p>
                            <p className="text-gray-500 uppercase">{product.category}</p>
                            <div className="mt-2">
                                <button onClick={() => handleEdit(product)} className="cursor-pointer text-blue-500 mr-2">Edit</button>
                                <button onClick={() => handleDelete(product._id)} className="cursor-pointer text-red-500">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            {editingProduct && (
                <div className="fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg mt-18 mb-2 shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-4 md:p-6">
                            <h3 className="text-lg font-bold mb-4 text-[#18274e]">Edit Product</h3>
                            <form onSubmit={handleEditSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Product Title</label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={editForm.title || ''}
                                            onChange={handleEditChange}
                                            placeholder="Enter product name"
                                            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#18274e] focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                                        <input
                                            type="number"
                                            name="price"
                                            value={editForm.price || ''}
                                            onChange={handleEditChange}
                                            placeholder="0.00"
                                            step="0.01"
                                            min="0"
                                            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#18274e] focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                        <input
                                            type="text"
                                            name="category"
                                            value={editForm.category || ''}
                                            onChange={handleEditChange}
                                            placeholder="e.g., Blenders, Coffee Makers"
                                            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#18274e] focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                        <textarea
                                            name="longDescription"
                                            value={editForm.longDescription || ''}
                                            onChange={handleEditChange}
                                            placeholder="Detailed product description"
                                            rows="4"
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
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Product Link</label>
                                        <input
                                            type="text"
                                            name="link"
                                            value={editForm.link || ''}
                                            onChange={handleEditChange}
                                            placeholder="https://store.com/product"
                                            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#18274e] focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Rating (0-5)</label>
                                        <input
                                            type="number"
                                            name="rating"
                                            value={editForm.rating || ''}
                                            onChange={handleEditChange}
                                            placeholder="4.5"
                                            min="0"
                                            max="5"
                                            step="0.1"
                                            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#18274e] focus:border-transparent"
                                        />
                                    </div>
                                    <div className="flex items-center">
                                        <label className="flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                name="featured"
                                                checked={editForm.featured || false}
                                                onChange={handleEditChange}
                                                className="mr-3 w-4 h-4 text-[#18274e] focus:ring-[#18274e] border-gray-300 rounded"
                                            />
                                            <span className="text-sm font-medium text-gray-700">Mark as Featured Product</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                                    <button type="button" onClick={() => setEditingProduct(null)} className="flex-1 px-6 py-3 bg-gray-300 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-400 transition-colors font-medium">Cancel</button>
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

export default ManageProd