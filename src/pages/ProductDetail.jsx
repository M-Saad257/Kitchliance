import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const ProductDetail = () => {
    const { id } = useParams()
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/products/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setProduct(data);
                } else {
                    setProduct(null);
                }
            } catch (error) {
                console.error('Error fetching product:', error);
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) {
        return <div className='text-center py-10'>Loading...</div>;
    }

    if (!product) return <p>Product not found!</p>

    // build gallery array and manage index
    const gallery = product?.images && product.images.length > 0
        ? product.images
        : (product?.image ? [product.image] : [])

    const selectedImage = gallery[selectedIndex] || ""

    const prevImage = () => {
        setSelectedIndex(i => (i > 0 ? i - 1 : gallery.length - 1))
    }
    const nextImage = () => {
        setSelectedIndex(i => (i < gallery.length - 1 ? i + 1 : 0))
    }

    const stars = "⭐".repeat(Math.round(product.rating))

    return (
        <div className="max-w-5xl mx-auto mt-18 p-6 flex flex-col md:flex-row gap-6">

            {/* Images Section */}
            <div className="flex flex-col gap-4 md:w-1/2 relative">
                {/* sliding carousel container */}
                <div className="relative overflow-hidden w-full h-96 rounded-xl shadow-lg">
                    <div
                        className="flex h-full transition-transform duration-500"
                        style={{ transform: `translateX(-${selectedIndex * 100}%)` }}
                    >
                        {gallery.map((img, idx) => (
                            <img
                                key={idx}
                                src={`http://localhost:5000${img}`}
                                alt={`${product.title}-${idx}`}
                                className="w-full h-full object-contain flex-shrink-0"
                            />
                        ))}
                    </div>
                </div>
                {gallery.length > 1 && (
                    <>
                        <button
                            onClick={prevImage}
                            className="absolute px-3 py-1 text-xl font-bold left-2 top-1/2 transform -translate-y-1/2 cursor-pointer bg-white bg-opacity-75 rounded-4xl hover:bg-opacity-100"
                        >
                            ‹
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute px-3 py-1 text-xl font-bold right-2 top-1/2 transform -translate-y-1/2 cursor-pointer bg-white bg-opacity-75 rounded-4xl hover:bg-opacity-100"
                        >
                            ›
                        </button>
                    </>
                )}
                <div className="flex gap-2 mt-2">
                    {gallery.map((img, idx) => (
                        <img
                            key={idx}
                            src={`http://localhost:5000${img}`}
                            alt={`${product.title}-${idx}`}
                            className={`w-20 h-20 object-contain rounded-lg border-2 cursor-pointer ${selectedIndex === idx ? 'border-[#18274e]' : 'border-gray-300'
                                }`}
                            onClick={() => setSelectedIndex(idx)}
                        />
                    ))}
                </div>
            </div>

            {/* Product Info */}
            <div className="md:w-1/2 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold text-gray-900">{product.title}</h1>
                    <span className="text-sm text-white bg-[#18274e] px-2 py-1 rounded uppercase">
                        {product.category}
                    </span>
                </div>
                <div className="text-yellow-500 text-lg">{stars}</div>
                <p className="text-xl font-semibold text-gray-800">${product.price}</p>

                {product.featured && (
                    <span className="block bg-yellow-500 text-white px-3 py-1 rounded-lg uppercase text-sm">
                        Featured
                    </span>
                )}

                <p className="text-gray-700 mt-4">{product.longDescription}</p>

                <a
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 bg-[#18274e] flex justify-center hover:text-[#18274e] hover:bg-white hover:border-1 hover:border-[#18274e] text-white py-4 px-6 rounded-lg text-center w-full transition"
                >
                    <span className='flex flex-row gap-3'>
                        Buy Now<img src="/amazon.png" alt="Amazon Logo" className='w-6' />
                    </span>
                </a>
            </div>

        </div>
    )
}

export default ProductDetail