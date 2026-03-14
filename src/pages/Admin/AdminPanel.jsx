import React, { useState } from 'react'
import { NavLink, Routes, Route } from 'react-router-dom'

import ProdAdd from './ProdAdd'
import BlogAdd from './BlogAdd'
import ReviewAdd from './ReviewAdd'
import ManageBlog from './ManageBlog'
import ManageProd from './ManageProd'
import ManageReviews from './ManageReviews'
import Login from './Login'

const AdminPanel = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem('adminLoggedIn') === 'true');

    const handleLogin = () => {
        setIsLoggedIn(true);
        sessionStorage.setItem('adminLoggedIn', 'true');
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        sessionStorage.removeItem('adminLoggedIn');
    };

    if (!isLoggedIn) {
        return <Login onLogin={handleLogin} />;
    }

    return (
        <div className="flex min-h-screen bg-gray-100">

            {/* Sidebar */}
            <div className={`w-64 bg-[#18274e] text-white p-6 fixed inset-y-0 left-0 z-50 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 md:translate-x-0 md:static md:inset-0`}>

                <h2 className="text-xl font-bold mb-8">Admin Panel</h2>

                <nav className="flex flex-col gap-4">

                    <NavLink to="/admin/" className="hover:bg-white hover:text-[#18274e] p-2 rounded transition-all duration-300" onClick={() => setSidebarOpen(false)}>
                        Add Product
                    </NavLink>

                    <NavLink to="/admin/manage-products" className="hover:bg-white hover:text-[#18274e] p-2 rounded transition-all duration-300" onClick={() => setSidebarOpen(false)}>
                        Manage Products
                    </NavLink>

                    <NavLink to="/admin/add-blog" className="hover:bg-white hover:text-[#18274e] p-2 rounded transition-all duration-300" onClick={() => setSidebarOpen(false)}>
                        Add Blog
                    </NavLink>

                    <NavLink to="/admin/manage-blog" className="hover:bg-white hover:text-[#18274e] p-2 rounded transition-all duration-300" onClick={() => setSidebarOpen(false)}>
                        Manage Blog
                    </NavLink>

                    <NavLink to="/admin/add-review" className="hover:bg-white hover:text-[#18274e] p-2 rounded transition-all duration-300" onClick={() => setSidebarOpen(false)}>
                        Add Review
                    </NavLink>

                    <NavLink to="/admin/manage-reviews" className="hover:bg-white hover:text-[#18274e] p-2 rounded transition-all duration-300" onClick={() => setSidebarOpen(false)}>
                        Manage Reviews
                    </NavLink>

                </nav>

                <button onClick={handleLogout} className="mt-6 hover:bg-white hover:scale-125 cursor-pointer hover:text-[#18274e] p-2 rounded transition-all duration-300">
                    Logout
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 p-8 md:ml-0">

                <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden mt-10 mb-4 p-2 bg-[#18274e] text-white rounded cursor-pointer">
                    ☰
                </button>

                <Routes>

                    <Route index element={<ProdAdd />} />
                    <Route path="add-product" element={<ProdAdd />} />
                    <Route path="manage-products" element={<ManageProd />} />
                    <Route path="add-blog" element={<BlogAdd />} />
                    <Route path="manage-blog" element={<ManageBlog />} />
                    <Route path="add-review" element={<ReviewAdd />} />
                    <Route path="manage-reviews" element={<ManageReviews />} />

                </Routes>

            </div>

        </div>
    )
}

export default AdminPanel