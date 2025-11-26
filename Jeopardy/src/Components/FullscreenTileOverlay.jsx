import React, { useState, useEffect } from 'react';


function FullscreenTileOverlay({ rect, value, onDone }) {
  const [style, setStyle] = useState({
    position: 'fixed',
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height,
  });

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setStyle(prev => ({
        ...prev,
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
      }));
    });

    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div
      style={style}
      className="
        z-50 
        bg-[#17339a] 
        text-yellow-300 
        flex items-center justify-center 
        text-[7em]
        transition-all duration-500 ease-out
      "
      onTransitionEnd={onDone}
    >
      {value}
    </div>
  );
}


export default FullscreenTileOverlay