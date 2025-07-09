import React, { useState, useEffect } from 'react';

const CodingIllustration: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentSnippet, setCurrentSnippet] = useState(0);
  
  const codeSnippets = [
    'const AI = new Intelligence();',
    'model.train(data);',
    'predict(future);'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSnippet((prev) => (prev + 1) % codeSnippets.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <svg
      className="coding-illustration"
      viewBox="0 0 800 600"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        filter: isHovered ? 'brightness(1.2)' : 'brightness(1)',
        transition: 'filter 0.3s ease'
      }}
    >
      {/* Laptop Base with Gradient */}
      <defs>
        <linearGradient id="screenGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2a2a4a"/>
          <stop offset="100%" stopColor="#1a1a2a"/>
        </linearGradient>
        <linearGradient id="keyboardGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a2a4a"/>
          <stop offset="100%" stopColor="#1a1a2a"/>
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Laptop Base */}
      <rect x="200" y="200" width="400" height="250" rx="20" fill="url(#screenGradient)"/>
      <path d="M150 450 L650 450 L600 500 L200 500 Z" fill="url(#keyboardGradient)"/>

      {/* Screen Content */}
      <rect x="220" y="220" width="360" height="210" rx="10" fill="#0a0a1a"/>

      {/* Code Editor Interface */}
      <g className="code-interface">
        {/* Window Controls */}
        <circle cx="240" cy="240" r="5" fill="#ff5f56"/>
        <circle cx="260" cy="240" r="5" fill="#ffbd2e"/>
        <circle cx="280" cy="240" r="5" fill="#27c93f"/>

        {/* Code Lines */}
        <g fill="#8be9fd">
          <text x="240" y="280" fontSize="14" fontFamily="monospace">
            <tspan fill="#bd93f9">import</tspan>
            <tspan fill="#f8f8f2"> AI </tspan>
            <tspan fill="#bd93f9">from</tspan>
            <tspan fill="#f1fa8c"> 'future';</tspan>
          </text>
          
          {/* Animated Code Line */}
          <text x="240" y="310" fontSize="14" fontFamily="monospace" fill="#50fa7b">
            {codeSnippets[currentSnippet]}
          </text>

          <text x="240" y="340" fontSize="14" fontFamily="monospace">
            <tspan fill="#ff79c6">function</tspan>
            <tspan fill="#50fa7b"> process</tspan>
            <tspan fill="#f8f8f2">(data) {`{`}</tspan>
          </text>
        </g>

        {/* Blinking Cursor */}
        <rect
          x="240"
          y="350"
          width="8"
          height="2"
          fill="#f8f8f2"
          style={{
            animation: 'blink 1s step-end infinite'
          }}
        >
          <animate
            attributeName="opacity"
            values="0;1;0"
            dur="1s"
            repeatCount="indefinite"
          />
        </rect>
      </g>

      {/* Floating Elements */}
      <g className="floating-elements" filter="url(#glow)">
        <g style={{ animation: 'float 3s ease-in-out infinite' }}>
          <circle cx="150" cy="150" r="5" fill="#8be9fd">
            <animate
              attributeName="cy"
              values="150;140;150"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
        <g style={{ animation: 'float 4s ease-in-out infinite' }}>
          <circle cx="650" cy="200" r="4" fill="#bd93f9">
            <animate
              attributeName="cy"
              values="200;190;200"
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
        <g style={{ animation: 'float 5s ease-in-out infinite' }}>
          <rect
            x="600"
            y="300"
            width="8"
            height="8"
            fill="#50fa7b"
            transform="rotate(45, 604, 304)"
          >
            <animate
              attributeName="y"
              values="300;290;300"
              dur="4s"
              repeatCount="indefinite"
            />
          </rect>
        </g>
      </g>
    </svg>
  );
};

export default CodingIllustration; 