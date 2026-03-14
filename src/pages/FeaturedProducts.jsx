import React, { useState, useEffect } from 'react'
import { io } from 'socket.io-client'
import ProductCard from '../components/ProductCard'

const FeaturedProducts = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/products');
            const products = await response.json();
            const featured = products.filter(p => p.featured);
            setFeaturedProducts(featured);
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

    if (loading) {
        return <div className='text-center py-10'>Loading...</div>;
    }

    return (
        <div>

            <div className='text-center text-2xl md:text-5xl font-bold py-4 text-[#18274e] mb-4'>
                Featured Products
            </div>

            <div className='px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 gap-y-10 py-10 justify-items-center'>

                {featuredProducts.map(product => (
                    <ProductCard key={product._id} product={product}/>
                ))}

            </div>

        </div>
    )
}

export default FeaturedProducts