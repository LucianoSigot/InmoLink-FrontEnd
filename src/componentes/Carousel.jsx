import React, { useRef, useState } from 'react';

const Carousel = ({ children }) => {
    const sliderRef = useRef(null); //Mantiene referencia mutable de sliderRef
    const [isDown, setIsDown] = useState(false); //Indica si el usuario está presionando el mouse
    const [startX, setStartX] = useState(0); //Guarda la posición inicial del mouse
    const [scrollLeft, setScrollLeft] = useState(0); //Guarda la posición inicial del scroll

    const handleMouseDown = (e) => {
        setIsDown(true);
        sliderRef.current.classList.add('active');
        setStartX(e.pageX - sliderRef.current.offsetLeft);
        setScrollLeft(sliderRef.current.scrollLeft);
    };

    const handleMouseLeave = () => {
        setIsDown(false);
        sliderRef.current.classList.remove('active');
    };

    const handleMouseUp = () => {
        setIsDown(false);
        sliderRef.current.classList.remove('active');
    };

    const handleMouseMove = (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - sliderRef.current.offsetLeft;
        const walk = (x - startX) * 2; // Scroll-fast
        sliderRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <div
            ref={sliderRef}
            className="flex overflow-x-auto gap-4 p-4 cursor-grab active:cursor-grabbing scrollbar-hide select-none"
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            style={{ scrollBehavior: 'smooth' }}
        >
            {children}
        </div>
    );
};

export default Carousel;
