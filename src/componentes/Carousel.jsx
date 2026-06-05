import React, { useRef, useState } from 'react';

export default function Carousel({ children }) {
  const slider = useRef(null);
  const [active, setActive] = useState(false);
  const [start, setStart] = useState(0);
  const [initialScroll, setInitialScroll] = useState(0);

  const onStart = (e) => {
    setActive(true);
    setStart(e.pageX - slider.current.offsetLeft);
    setInitialScroll(slider.current.scrollLeft);
  };

  const onEnd = () => setActive(false);

  const onMove = (e) => {
    if (!active) return;
    e.preventDefault();
    const x = e.pageX - slider.current.offsetLeft;
    const walk = (x - start) * 2;
    slider.current.scrollLeft = initialScroll - walk;
  };

  return (
    <div
      ref={slider}
      className="flex overflow-x-auto gap-4 p-4 cursor-grab active:cursor-grabbing scrollbar-hide select-none"
      onMouseDown={onStart}
      onMouseLeave={onEnd}
      onMouseUp={onEnd}
      onMouseMove={onMove}
      style={{ scrollBehavior: 'smooth' }}
    >
      {children}
    </div>
  );
}