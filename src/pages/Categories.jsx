import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { io } from 'socket.io-client'
import Pcard from '../components/ProductCard'

const Categories = () => {

    const [searchParams] = useSearchParams()
    const [active, setActive] = useState("all")
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        const activeParam = searchParams.get('active')
        if (activeParam) {
            setActive(activeParam)
        }
    }, [searchParams])

    const categories = [
        { id: 'all', name: 'All', icon: '/all-icon.png' },
        { id: 'airfryer', name: 'Air Fryers', icon: '/Airfryer-icon.png' },
        { id: 'blender', name: 'Blenders', icon: '/Blender-icon.png' },
        { id: 'coffee', name: 'Coffee Makers', icon: '/coffee-icon.png' },
        { id: 'microwave', name: 'Microwave', icon: '/microwave-icon.png' },
        { id: 'thermos', name: 'Thermos', icon: '/thermos-icon.png' },
        { id: 'juicer', name: 'Juicers', icon: '/juicer-icon.png' },
        { id: 'toaster', name: 'Toasters', icon: '/toaster-icon.png' },
        { id: 'rice', name: 'Rice Cookers', icon: '/ricecooker-icon.png' },
        { id: 'blender-pro', name: 'Blenders Pro', icon: '/Blender-pro-icon.png' },
        { id: 'kettle', name: 'Electric Kettles', icon: '/ekettle-icon.png' }
    ]


    const filteredProducts =
        active === "all"
            ? products
            : products.filter((prod) => prod.category === active)

    if (loading) {
        return <div className='text-center py-10'>Loading...</div>;
    }

    return (
        <div className="p-10 mt-10">

            {/* Categories */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 text-center">

                {categories.map((cat) => (
                    <div
                        key={cat.id}
                        onClick={() => setActive(cat.id)}
                        className={`group relative p-6 cursor-pointer border border-[#18274e] shadow rounded-xl transition-all duration-300
                        ${cat.id === "all" ? "col-span-2 sm:col-span-1 lg:row-span-2 flex text-2xl items-center justify-center" : "row-span-1"}
                        ${active === cat.id
                                ? "bg-[#18274e] text-white scale-105"
                                : "bg-white hover:bg-[#18274e] hover:text-white"
                            }`}
                    >
                        <span className="relative right-3">
                            {cat.name}
                        </span>

                        <img
                            src={cat.icon}
                            alt={cat.name}
                            className={`absolute right-4 top-1/2 -translate-y-1/2 w-8 transition-all duration-300
            ${active === cat.id
                                    ? "opacity-100 translate-x-0"
                                    : "opacity-0 translate-x-6 group-hover:opacity-100 group-hover:translate-x-0"
                                }`}
                        />
                    </div>
                ))}

            </div>


            {/* Products */}
            <div className='px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-14 gap-y-10 py-10 justify-items-center'>

                {filteredProducts.map((prod) => (
                    <Pcard key={prod._id} product={prod} />
                ))}

            </div>

        </div>
    )
}

export default Categories