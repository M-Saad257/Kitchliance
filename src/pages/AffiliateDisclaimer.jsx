import React from 'react';

const AffiliateDisclaimer = () => {
    return (
        <div className="min-h-screen flex items-center bg-gray-50 py-16 px-6 md:px-12">
            <div className="max-w-4xl mx-auto bg-white p-10 rounded-xl shadow-lg">
                <h1 className="text-3xl font-bold mb-6 text-[#18274e]">Affiliate Disclaimer</h1>

                <p className="mb-4 text-gray-700">
                    Some of the links on this website are affiliate links, which means that we may earn a small commission if you make a purchase through those links, at no additional cost to you.
                </p>

                <p className="mb-4 text-gray-700">
                    We only recommend products that we personally use, trust, or believe will add value to our visitors. Your support helps us maintain and improve this website.
                </p>

                <p className="mb-4 text-gray-700">
                    Please note that the commissions earned do not influence the content, reviews, or opinions expressed on this website.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2 text-[#18274e]">Contact</h2>
                <p className="text-gray-700">
                    If you have any questions about this disclaimer, feel free to contact us via our contact form.
                </p>
            </div>
        </div>
    );
};

export default AffiliateDisclaimer;