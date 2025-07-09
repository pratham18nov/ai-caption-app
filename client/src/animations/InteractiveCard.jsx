import React, { useRef } from 'react';

const InteractiveCard = ({ children, className = '' }) => {
  const wrapperRef = useRef(null);
  // const theme = localStorage.getItem("theme")

  const handleMouseMove = (e) => {
    const el = wrapperRef.current;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 35;
    const rotateY = -(x - centerX) / 35;

    el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    // const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = localStorage.getItem("isDark")
    const baseColor = isDark ? '#1a1a1a' : '#E2E8F0';

    el.style.background = `
      radial-gradient(circle at ${x}px ${y}px, rgba(0,255,255,0.3), transparent 60%),
      ${baseColor}
    `;
    el.style.borderRadius = "1rem";
  };

  const handleMouseLeave = () => {
    const el = wrapperRef.current;
    el.style.transform = `rotateX(0deg) rotateY(0deg)`;

    // const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = localStorage.getItem("isDark")
    el.style.background = isDark ? '#1a1a1a' : '#E2E8F0';
    // el.style.background = '#b9b7b7';
  };

  return (
    <div
      ref={wrapperRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`
        transition-[background] duration-200 ease-in-out
        will-change-[background]
        border-2 rounded-lg  
        hover:[border-image:linear-gradient(90deg,#e63946,#f1fa8c,#2a9d8f,#457b9d)_1]
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default InteractiveCard;