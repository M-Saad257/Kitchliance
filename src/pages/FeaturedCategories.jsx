import React from 'react'
import Fcard from '../components/CategoryCard.jsx'

const Featured = () => {
    return (
        <div>
            <div className='text-center text-2xl md:text-5xl font-bold py-4 text-[#18274e] [text-shadow: 0px 20px 20px #ffffff;] mb-4'>Featured Categories</div>
            <div className='flex flex-col px-3 md:flex-row my-5 space-y-4 md:space-y-0 md:space-x-4 justify-around items-center'>
                <Fcard image='/Airfryer.png' categoryId='airfryer' />
                <Fcard image='/Juicer.png' categoryId='juicer' />
                <Fcard image='/Micro.png' categoryId='microwave' />
            </div>
        </div>
    )
}

export default Featured
