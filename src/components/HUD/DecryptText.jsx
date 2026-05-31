import React, { useState, useEffect, useRef } from 'react';

const CYBER_GLYPHS = 'ΞΨΦΩΔΛΣ█▓░▰▱◤◥01$&@%*#<>[]=+-_/\\';

export default function DecryptText({ 
  text, 
  speed = 35, 
  delay = 0, 
  className = '', 
  forceDecrypt = false 
}) {
  const [displayText, setDisplayText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [animating, setAnimating] = useState(false);
  
  const originalText = text || '';
  const intervalRef = useRef(null);
  const timeoutsRef = useRef([]);

  // Encrypt string with random glyphs
  const encryptString = (str) => {
    return str
      .split('')
      .map((char) => {
        if (char === ' ') return ' ';
        return CYBER_GLYPHS[Math.floor(Math.random() * CYBER_GLYPHS.length)];
      })
      .join('');
  };

  useEffect(() => {
    // Initially encrypted state
    setDisplayText(encryptString(originalText));
    
    return () => {
      clearAllTimers();
    };
  }, [originalText]);

  // Clean up all timers
  const clearAllTimers = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    timeoutsRef.current.forEach((t) => clearTimeout(t));
    timeoutsRef.current = [];
  };

  // Run the decryption sequence
  const startDecryption = () => {
    clearAllTimers();
    setAnimating(true);

    let currentIteration = 0;
    const maxIterations = originalText.length;
    
    // Animate character cycling
    intervalRef.current = setInterval(() => {
      setDisplayText((prev) => {
        return originalText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            
            // If we have resolved this index
            if (index < currentIteration) {
              return originalText[index];
            }
            
            // Random character cycling
            return CYBER_GLYPHS[Math.floor(Math.random() * CYBER_GLYPHS.length)];
          })
          .join('');
      });
    }, speed);

    // Resolve letters from left to right
    for (let i = 0; i <= maxIterations; i++) {
      const timeout = setTimeout(() => {
        currentIteration = i;
        if (i === maxIterations) {
          clearInterval(intervalRef.current);
          setDisplayText(originalText);
          setAnimating(false);
        }
      }, delay + i * (speed * 1.5));
      
      timeoutsRef.current.push(timeout);
    }
  };

  // Run encryption sequence back
  const startEncryption = () => {
    clearAllTimers();
    setAnimating(true);
    
    let currentIteration = originalText.length;
    
    intervalRef.current = setInterval(() => {
      setDisplayText((prev) => {
        return originalText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            
            if (index >= currentIteration) {
              return CYBER_GLYPHS[Math.floor(Math.random() * CYBER_GLYPHS.length)];
            }
            return originalText[index];
          })
          .join('');
      });
    }, speed);

    for (let i = originalText.length; i >= 0; i--) {
      const timeout = setTimeout(() => {
        currentIteration = i;
        if (i === 0) {
          clearInterval(intervalRef.current);
          setDisplayText(encryptString(originalText));
          setAnimating(false);
        }
      }, (originalText.length - i) * (speed * 0.8));
      
      timeoutsRef.current.push(timeout);
    }
  };

  // Trigger decryption based on user hover or global declassify state
  useEffect(() => {
    if (forceDecrypt || isHovered) {
      startDecryption();
    } else {
      startEncryption();
    }
  }, [forceDecrypt, isHovered]);

  return (
    <span 
      className={`decrypt-text-node ${className} ${animating ? 'is-animating' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        fontFamily: isHovered || forceDecrypt ? 'inherit' : 'var(--font-mono)',
        letterSpacing: isHovered || forceDecrypt ? 'inherit' : '0.08em',
        transition: 'color 0.2s',
        color: animating ? 'var(--accent-green)' : (isHovered || forceDecrypt ? 'inherit' : 'var(--accent-cyan)'),
        textShadow: animating ? '0 0 8px rgba(0, 255, 136, 0.4)' : 'none'
      }}
    >
      {displayText}
    </span>
  );
}
