import React from 'react'
import { useNavigate } from 'react-router-dom'

const FeaturedCard = ({ image = '/Appliances.png', categoryId }) => {
    const navigate = useNavigate()

    const handleClick = () => {
        if (categoryId) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            navigate(`/categories?active=${categoryId}`)
        }
    }
    return (
        <div onClick={handleClick} className="cursor-pointer">
            <div className="bg-neutral-primary-soft max-w-sm border rounded-2xl rounded-base shadow-xs flex">
                <div>
                    <img className="rounded-l-base rounded-l-2xl w-35 h-63 object-cover" src={image} alt="Featured Product" />
                </div>
                <div className="p-6 text-center flex-1">
                    <span className="inline-flex items-center bg-brand-softer border border-brand-subtle text-fg-brand-strong text-xs font-medium px-1.5 py-0.5 rounded-sm">
                        <svg className="w-3 h-3 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#FF4500" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M18.122 17.645a7.185 7.185 0 0 1-2.656 2.495 7.06 7.06 0 0 1-3.52.853 6.617 6.617 0 0 1-3.306-.718 6.73 6.73 0 0 1-2.54-2.266c-2.672-4.57.287-8.846.887-9.668A4.448 4.448 0 0 0 8.07 6.31 4.49 4.49 0 0 0 7.997 4c1.284.965 6.43 3.258 5.525 10.631 1.496-1.136 2.7-3.046 2.846-6.216 1.43 1.061 3.985 5.462 1.754 9.23Z" /></svg>
                        Trending
                    </span>
                    <h5 className="mt-3 mb-6 text-xl md:text-2xl font-semibold tracking-tight text-heading">Streamlining your design process today.</h5>
                    <div className="group inline-flex items-center bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium leading-5 rounded-base focus:outline-none text-white bg-[#18274e] hover:bg-transparent hover:border-[#18274e] hover:border-[1.5px] hover:font-bold hover:text-[#18274e] px-6 py-3 rounded-xl text-lg font-semibold shadow-lg transition-colors duration-300">
                        View more
                        <svg className="w-4 h-4 ms-1.5 rtl:rotate-180 -me-0.5 transform transition-transform duration-300 ease-in-out group-hover:translate-x-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" /></svg>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeaturedCard
