import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen mt-8 bg-gray-50 py-16 px-6 md:px-12">
            <div className="max-w-4xl mx-auto bg-white p-10 rounded-xl shadow-lg">
                <h1 className="text-3xl font-bold mb-6 text-[#18274e]">Privacy Policy</h1>

                <p className="mb-4 text-gray-700">
                    Your privacy is important to us. This privacy policy explains how we collect, use, and protect the information you provide on our website.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2 text-[#18274e]">Information We Collect</h2>
                <p className="mb-4 text-gray-700">
                    We may collect your name, email, and message when you submit our contact form. If you submit a review, we may also collect your review content and rating.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2 text-[#18274e]">How We Use Your Information</h2>
                <p className="mb-4 text-gray-700">
                    The information you provide is used only to respond to your inquiries, process your reviews, or improve our services. We do not sell or share your personal information with third parties.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2 text-[#18274e]">Cookies & Analytics</h2>
                <p className="mb-4 text-gray-700">
                    We may use cookies or analytics tools to understand website usage, but no personally identifiable information is stored.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2 text-[#18274e]">Your Rights</h2>
                <p className="mb-4 text-gray-700">
                    You have the right to request access to your information or ask for it to be deleted. Contact us via our contact form for any privacy-related requests.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2 text-[#18274e]">Contact Us</h2>
                <p className="mb-4 text-gray-700">
                    For any questions about this privacy policy, please contact us using our contact form.
                </p>
            </div>
        </div>
    );
};

export default PrivacyPolicy;   