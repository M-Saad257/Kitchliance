import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Hero from './Hero'
import FeaturedCat from './FeaturedCategories'
import FeaturedProd from './FeaturedProducts'
import Bpost from './BlogPost'
import ReviewTestimonial from './ReviewTestimonial'

const Home = () => {
    return (
        <div>
            <Hero/>
            <FeaturedCat/>
            <FeaturedProd/>
            <Bpost/>
            <ReviewTestimonial/>
        </div>
    )
}

export default Home
