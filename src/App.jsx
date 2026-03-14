import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Home from './pages/Home'
import Categories from './pages/Categories'
import About from './pages/About'
import Navbar from './components/Nav'
import Footer from './components/Footer'
import ProductDetail from './pages/ProductDetail'
import Blog from './pages/Blog'
import BlogDetail from './pages/BlogDetail'
import Contact from './pages/Contact'
import Reviews from './components/Reviews'
import Pp from './pages/PrivacyPolicy'
import Ad from './pages/AffiliateDisclaimer'

import AdminPanel from './pages/Admin/AdminPanel'

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/pp" element={<Pp />} />
            <Route path="/ad" element={<Ad />} />

            <Route path="/admin/*" element={<AdminPanel />} />
          </Routes>
        </main>

        <Footer />

      </div>
    </Router>
  )
}

export default App