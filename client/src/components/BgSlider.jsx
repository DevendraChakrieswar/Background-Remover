import React, { useState } from 'react';
import { assets, categories } from '../assets/assets';

const BgSlider = () => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [activeCategory, setActiveCategory] = useState("People");

    const [fadeTransition, setFadeTransition] = useState(true);

    const handleSliderChange = (e) => {
        setSliderPosition(e.target.value);
    };

    const handleCategoryChange = (category) => {
        setFadeTransition(false); // Start fade-out
        setTimeout(() => {
            setActiveCategory(category);
            setFadeTransition(true); // Start fade-in
        }, 200); // fade-out duration before switching image
    };

    return (
        <div className='mb-16 relative'>

            {/* Section */}
            <h2 className='text-3xl md:text-4xl font-bold mb-12 text-gray-900 text-center'>
                Stunning quality.
            </h2>

            {/* Category Selector */}
            <div className='flex justify-center mb-10 flex-wrap'>
                <div className='inline-flex gap-4 bg-gray-100 p-2 rounded-full flex-wrap justify-center'>
                    {categories.map((categorie) => (
                        <button
                            key={categorie}
                            onClick={() => handleCategoryChange(categorie)}
                            className={`px-6 py-2 hover:cursor-pointer rounded-full font-medium ${
                                activeCategory === categorie
                                    ? 'bg-white text-gray-800 shadow-sm'
                                    : 'text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            {categorie}
                        </button>
                    ))}
                </div>
            </div>

            {/* Image Comparison Slider */}
            <div className='relative w-full max-w-4xl overflow-hidden m-auto rounded-xl shadow-lg'>

                <img
                    src={assets[activeCategory.toLowerCase() + '_org']}
                    alt={activeCategory + ' original'}
                    style={{ clipPath: `inset(0 ${100.2 - sliderPosition}% 0 0)` }}
                    className={`transition-all duration-500 ease-in-out ${fadeTransition ? 'opacity-100' : 'opacity-0'}`}
                />

                <img
                    src={assets[activeCategory.toLowerCase()]}
                    alt={activeCategory + ' background removed'}
                    style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
                    className={`absolute top-0 left-0 w-full h-full transition-all duration-500 ease-in-out ${
                        fadeTransition ? 'opacity-100' : 'opacity-0'
                    }`}
                />

                <input
                    type='range'
                    className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full z-10 slider'
                    min={0}
                    max={100}
                    onChange={handleSliderChange}
                    value={sliderPosition}
                />
            </div>
        </div>
    );
};

export default BgSlider;
