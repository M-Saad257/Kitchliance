import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
    const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <div className="relative">
            <div className="relative border-b-2 border-[#18274e] opacity-40 min-h-screen bg-[url('/Appliances.png')] bg-cover bg-center bg-no-repeat flex items-center mt-6 justify-center">
                <div className="absolute inset-0 bg-black/40"></div>
            </div>
            <div className="text-center z-10 absolute inset-0 flex flex-col items-center justify-center">
                <img src="/Kitchliance.png" alt="Logo"/>
                <p className="text-[20px] font-bold text-white md:[-webkit-text-stroke:1.2px_black] md:text-3xl mb-6">
                    Best Kitchen Appliances Reviews & Buying Guides
                </p>
                <div className='flex flex-row space-x-4 pt-6'>
                    <Link
                        to="/categories?active=all"
                        onClick={scrollTop}
                        className="bg-[#18274e] hover:bg-transparent hover:border-[#18274e]
                    hover:border-[1.5px] hover:font-bold text-white px-6 py-3 rounded-xl text-sm font-semibold shadow-lg transition-colors duration-300">
                        Explore Products
                    </Link>
                    <Link
                        to="/reviews"
                        onClick={scrollTop}
                        className="bg-[#18274e] hover:bg-transparent hover:border-[#18274e]
                    hover:border-[1.5px] hover:font-bold text-white px-6 py-3 rounded-xl text-sm font-semibold shadow-lg transition-colors duration-300">
                        Read Reviews
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Hero