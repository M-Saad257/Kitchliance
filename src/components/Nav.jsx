import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false)
    const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    const GoToAdmin = (e) => {
        e.preventDefault();
        window.location.href = '/admin';
    };

    return (
        <nav className="bg-[#18274e] fixed top-0 w-full z-50 text-white py-4 px-4 md:px-8">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-xl font-bold">
                    <Link to="/" onDoubleClick={GoToAdmin} onClick={scrollTop} className="hover:text-blue-200">Kitchliance</Link>
                </div>
                <div className="flex items-center space-x-5">
                    <div className="hidden md:flex items-center space-x-5">
                        <Link to="/" onClick={scrollTop} className="group inline-flex items-center space-x-2 text-[#fff] hover:scale-120 transition-all duration-300">
                            <img
                                src="/home.svg"
                                alt="Home"
                                className="w-5 h-5 transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300"
                            />
                            <span>Home</span>
                        </Link>
                        <Link to="/categories" onClick={scrollTop} className="group inline-flex items-center space-x-2 text-[#fff] hover:scale-120 transition-all duration-300">
                            <img
                                src="/cat.png"
                                alt="Categories"
                                className="w-4 h-4 transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300"
                            />
                            <span>Categories</span>
                        </Link>
                        <Link to="/about" onClick={scrollTop} className="group inline-flex items-center space-x-2 text-[#fff] hover:scale-120 transition-all duration-300">
                            <img
                                src="/about.svg"
                                alt="About"
                                className="w-4 h-4 transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300"
                            />
                            <span>About</span>
                        </Link>
                        <Link to="/blog" onClick={scrollTop} className="group inline-flex items-center space-x-2 text-[#fff] hover:scale-120 transition-all duration-300">
                            <img
                                src="/blog.png"
                                alt="Blog"
                                className="w-4 h-4 transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300"
                            />
                            <span>Blog</span>
                        </Link>
                        <Link to="/contact" onClick={scrollTop} className="group inline-flex items-center space-x-2 text-[#fff] hover:scale-120 transition-all duration-300">
                            <img
                                src="/contact.png"
                                alt="Contact"
                                className="w-4 h-4 transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300"
                            />
                            <span>Contact</span>
                        </Link>
                    </div>
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-blue-200 transition-colors duration-300 cursor-pointer">
                            {isOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-[#18274e] text-white py-4 px-4 md:px-8 border-t border-gray-600">
                    <span className="flex flex-col space-y-4">
                        <Link to="/" onClick={() => { setIsOpen(false); scrollTop(); }} className="flex items-center space-x-2 text-[#fff] hover:text-blue-200 transition-colors duration-300">
                            <img src="/home.svg" alt="Home" className="w-5 h-5" />
                            <span>Home</span>
                        </Link>
                        <Link to="/categories" onClick={() => { setIsOpen(false); scrollTop(); }} className="flex items-center space-x-2 text-[#fff] hover:text-blue-200 transition-colors duration-300">
                            <img src="/cat.png" alt="Categories" className="w-4 h-4" />
                            <span>Categories</span>
                        </Link>
                        <Link to="/about" onClick={() => { setIsOpen(false); scrollTop(); }} className="flex items-center space-x-2 text-[#fff] hover:text-blue-200 transition-colors duration-300">
                            <img src="/about.svg" alt="About" className="w-4 h-4" />
                            <span>About</span>
                        </Link>
                        <Link to="/blog" onClick={() => { setIsOpen(false); scrollTop(); }} className="flex items-center space-x-2 text-[#fff] hover:text-blue-200 transition-colors duration-300">
                            <img src="/blog.png" alt="Blog" className="w-4 h-4" />
                            <span>Blog</span>
                        </Link>
                        <Link to="/contact" onClick={() => { setIsOpen(false); scrollTop(); }} className="flex items-center space-x-2 text-[#fff] hover:text-blue-200 transition-colors duration-300">
                            <img src="/contact.png" alt="Contact" className="w-4 h-4" />
                            <span>Contact</span>
                        </Link>
                    </span>
                </div>
            )}
        </nav>
    )
}

export default Nav
