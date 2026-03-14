import React from 'react'

const About = () => {
    return (
        <div className="px-4 md:px-20 py-16 bg-gray-50">

            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-3xl md:text-5xl font-bold text-[#18274e] mb-4">
                    About Kitchliance
                </h1>
                <p className="text-gray-700 text-base md:text-lg max-w-2xl mx-auto">
                    Kitchliance is your one-stop destination for the best kitchen appliances.
                    We carefully curate premium products to make your cooking experience easier, faster, and more enjoyable.
                </p>
            </div>

            {/* Mission / Vision Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-16">

                <div>
                    <img
                        src="/Aboutpage.png"
                        alt="Our Mission"
                        className="rounded-xl shadow-lg w-full object-cover"
                    />
                </div>

                <div className="flex flex-col gap-6">
                    <h2 className="text-2xl md:text-3xl font-semibold text-[#18274e]">
                        Our Mission
                    </h2>
                    <p className="text-gray-700 text-base md:text-lg">
                        Our mission is to provide high-quality kitchen appliances that combine innovation, performance, and style.
                        Whether you’re a home cook or a professional chef, we help you find the right tools for your kitchen.
                    </p>

                    <h2 className="text-2xl md:text-3xl font-semibold text-[#18274e]">
                        Our Vision
                    </h2>
                    <p className="text-gray-700 text-base md:text-lg">
                        We envision a world where every kitchen is equipped with the latest, most reliable appliances, making cooking
                        enjoyable and effortless. Kitchliance is committed to building trust and excellence in every product we feature.
                    </p>
                </div>

            </div>

            {/* Why Choose Us */}
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-[#18274e] mb-6">
                    Why Choose Kitchliance?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto text-left">
                    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                        <h3 className="font-semibold text-lg text-[#18274e] mb-2">Premium Quality</h3>
                        <p className="text-gray-700 text-sm">All our products are sourced from trusted brands and tested for quality.</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                        <h3 className="font-semibold text-lg text-[#18274e] mb-2">Curated Selection</h3>
                        <p className="text-gray-700 text-sm">We handpick appliances that make your kitchen efficient and modern.</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                        <h3 className="font-semibold text-lg text-[#18274e] mb-2">Expert Advice</h3>
                        <p className="text-gray-700 text-sm">Our guides and reviews help you choose the right product for your needs.</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                        <h3 className="font-semibold text-lg text-[#18274e] mb-2">Customer Satisfaction</h3>
                        <p className="text-gray-700 text-sm">We prioritize our customers and provide support for all your kitchen queries.</p>
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="text-center py-12 bg-[#18274e] rounded-xl text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Upgrade Your Kitchen Today!
                </h2>
                <p className="text-lg md:text-xl mb-6">
                    Explore our premium selection of kitchen appliances and make your cooking experience effortless.
                </p>
                <a
                    href="/categories?active=all"
                    className="inline-block bg-white text-[#18274e] font-semibold cursor-pointer hover:bg-transparent hover:text-white hover:border-1 hover:border-white px-8 py-3 rounded-md shadow hover:shadow-lg transition"
                >
                    Browse Products
                </a>
            </div>

        </div>
    )
}

export default About