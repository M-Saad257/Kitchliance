import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <div>
            <footer className="bg-[#18274e] w-full text-white rounded-base shadow-xs border-t">
                <div className="mx-auto p-4 md:py-8">

                    <div className="sm:flex sm:items-center sm:justify-between">

                        {/* Logo */}
                        <Link to="/" onClick={scrollTop} className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                            <img src="/KL-W.png" className="h-7" alt="Logo" />
                        </Link>

                        {/* Links */}
                        <ul className="flex flex-wrap items-center mb-6 text-sm font-medium sm:mb-0">
                            <li>
                                <Link to="/about" onClick={scrollTop} className="hover:underline me-4 md:me-6">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link to="/pp" onClick={scrollTop} className="hover:underline me-4 md:me-6">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/ad" onClick={scrollTop} className="hover:underline me-4 md:me-6">
                                    Affiliate Disclaimer
                                </Link>
                            </li>

                            {/* Social Icons */}
                            <li className="flex gap-3 items-center">
                                <a href="https://www.facebook.com/Kitchliance" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">
                                    <FaFacebookF size={18} style={{ stroke: 'white', strokeWidth: 30 }} />
                                </a>
                                <a href="https://www.instagram.com/Kitchliance" target="_blank" rel="noopener noreferrer" className="hover:text-pink-900">
                                    <FaInstagram size={18} style={{ stroke: 'white', strokeWidth: 30 }} />
                                </a>
                                <a href="https://twitter.com/Kitchliance" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">
                                    <FaTwitter size={18} style={{ stroke: 'white', strokeWidth: 30 }} />
                                </a>
                                <a href="https://youtube.com/@Kitchliance" target="_blank" rel="noopener noreferrer" className="hover:text-red-600">
                                    <FaYoutube size={18} style={{ stroke: 'white', strokeWidth: 30 }} />
                                </a>
                                <a href="https://www.linkedin.com/Kitchliance" target="_blank" rel="noopener noreferrer" className="hover:text-blue-900">
                                    <FaLinkedin size={18} style={{ stroke: 'white', strokeWidth: 30 }} />
                                </a>
                            </li>
                        </ul>
                    </div>

                    <hr className="my-6 border-gray-300 sm:mx-auto lg:my-8" />

                    <span className="block text-sm sm:text-center">
                        © 2026{" "}
                        <Link to="/" onClick={scrollTop} className="hover:underline">
                            Kitchliance<sup>KL</sup>
                        </Link>
                        . All Rights Reserved.
                    </span>

                </div>
            </footer>
        </div>
    );
};

export default Footer;