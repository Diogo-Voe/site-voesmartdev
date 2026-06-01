import React, { useState, useEffect } from 'react';

export default function BlurDecrypt({ 
  text, 
  className = '', 
  forceDecrypt = false 
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDecrypted, setIsDecrypted] = useState(false);

  useEffect(() => {
    if (forceDecrypt || isHovered) {
      setIsDecrypted(true);
    } else {
      setIsDecrypted(false);
    }
  }, [forceDecrypt, isHovered]);

  return (
    <span 
      className={`inline-block relative transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        filter: isDecrypted ? 'blur(0px)' : 'blur(7px) contrast(120%)',
        opacity: isDecrypted ? 1 : 0.35,
        transform: isDecrypted ? 'scale(1)' : 'scale(0.98) skewX(-2deg)',
        color: isDecrypted ? 'inherit' : 'var(--accent-violet)',
        textShadow: isDecrypted ? 'none' : '0 0 10px rgba(139, 92, 246, 0.4)',
        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {text}
      
      {/* Sleek Scanning Beam indicator */}
      {!isDecrypted && (
        <span 
          className="absolute inset-y-0 w-[1px] bg-gradient-to-b from-transparent via-violet-400 to-transparent left-0 animate-pulse"
          style={{
            animationDuration: '2s',
            boxShadow: '0 0 8px var(--accent-violet)'
          }}
        />
      )}
    </span>
  );
}
