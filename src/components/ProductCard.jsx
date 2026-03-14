import React from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
    const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    if (!product) return null

    const stars = "⭐".repeat(Math.round(product.rating))

    return (
        <Link to={`/product/${product._id || product.id}`} onClick={scrollTop} className="w-full max-w-xs mx-auto transform hover:-translate-y-1 transition duration-300">
            <div className="relative flex flex-col bg-white rounded-se-3xl rounded-xl overflow-hidden border border-gray-200 shadow-md hover:shadow-xl">

                {/* Featured Badge */}
                {product.featured && (
                    <span className="absolute right-0 top-0 bg-yellow-500 text-white text-xs px-3 py-1 rounded-bl-xl uppercase z-20">
                        Featured
                    </span>
                )}

                {/* Category Badge */}
                <span className="absolute left-0 top-0 bg-[#18274e] text-white text-xs px-4 py-1 rounded-br-xl uppercase z-20">
                    {product.category}
                </span>

                <div className="overflow-hidden">
                    <img
                        src={product.image ? `http://localhost:5000${product.image}` : '/placeholder.jpg'}
                        alt={product.title}
                        className="h-44 sm:h-52 w-full object-contain p-3 transition-transform duration-300 hover:scale-105"
                    />
                </div>

                <div className="p-4 flex flex-col gap-2 text-center">

                    <h3 className="text-lg font-semibold text-gray-900">
                        {product.title}
                    </h3>

                    <div className="text-yellow-500 text-lg">
                        {stars}
                    </div>

                    <p className="text-lg font-semibold text-gray-900">
                        ${product.price}
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2 mt-3">
                        <a
                            href={product.link}
                            target="_blank"
                            className="flex items-center justify-center gap-2 flex-1 rounded-md border border-[#18274e] bg-[#18274e] py-2 text-xs font-medium tracking-widest text-white uppercase transition hover:bg-white hover:text-[#18274e]"
                        >
                            <img src="/amazon.png" className="w-4" />
                            Amazon
                        </a>
                    </div>

                </div>
            </div>
        </Link>
    )
}

export default ProductCard