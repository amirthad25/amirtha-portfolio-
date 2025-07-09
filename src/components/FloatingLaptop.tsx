import React, { useState } from 'react';

const FloatingLaptop: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Dynamic laptop and person illustration
  const laptopImage = `data:image/svg+xml,${encodeURIComponent(`
    <svg width="800" height="600" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Person Silhouette -->
      <g opacity="0.85">
        <!-- Upper Body -->
        <path d="M280 200 Q300 180 320 200 Q340 220 360 200" 
              fill="#1A1A1A" filter="url(#personBlur)"/>
        
        <!-- Head and Shoulders -->
        <path d="M300 160 Q320 140 340 160 Q350 180 340 190 Q320 200 300 190 Q290 180 300 160" 
              fill="#1A1A1A" filter="url(#personBlur)"/>
        
        <!-- Arms -->
        <path d="M290 220 Q310 230 340 250 L420 230" 
              stroke="#1A1A1A" strokeWidth="15" strokeLinecap="round" filter="url(#personBlur)"/>
        
        <!-- Ambient Glow -->
        <path d="M280 160 Q320 120 360 160 Q380 190 360 220 Q320 240 280 220 Q260 190 280 160" 
              fill="url(#personGlow)" opacity="0.15"/>
      </g>

      <!-- Laptop Base with Gradient -->
      <path d="M200 80h400c11 0 20 9 20 20v300c0 11-9 20-20 20H200c-11 0-20-9-20-20V100c0-11 9-20 20-20z" 
            fill="url(#screenGradient)"/>
      
      <!-- Main Screen -->
      <path d="M210 100h380c5.5 0 10 4.5 10 10v260c0 5.5-4.5 10-10 10H210c-5.5 0-10-4.5-10-10V110c0-5.5 4.5-10 10-10z" 
            fill="#0A0A0A"/>
      
      <!-- Code Elements -->
      <g opacity="0.9">
        <!-- Function Declaration -->
        <text x="230" y="140" fill="#FF79C6" font-family="monospace" font-size="12">function</text>
        <text x="290" y="140" fill="#50FA7B" font-family="monospace" font-size="12">analyzeData</text>
        <text x="360" y="140" fill="#F8F8F2" font-family="monospace" font-size="12">(data) {</text>
        
        <!-- Code Lines -->
        <text x="240" y="160" fill="#BD93F9" font-family="monospace" font-size="12">const</text>
        <text x="280" y="160" fill="#F8F8F2" font-family="monospace" font-size="12">result = data.map(item => {</text>
        
        <text x="250" y="180" fill="#F8F8F2" font-family="monospace" font-size="12">return {</text>
        <text x="260" y="200" fill="#8BE9FD" font-family="monospace" font-size="12">id:</text>
        <text x="285" y="200" fill="#F1FA8C" font-family="monospace" font-size="12">item.id,</text>
        
        <text x="260" y="220" fill="#8BE9FD" font-family="monospace" font-size="12">value:</text>
        <text x="305" y="220" fill="#FF79C6" font-family="monospace" font-size="12">process(item.data)</text>
        
        <text x="250" y="240" fill="#F8F8F2" font-family="monospace" font-size="12">});</text>
      </g>
      
      <!-- Base -->
      <path d="M160 420h480l-40 60H200l-40-60z" fill="url(#baseGradient)"/>
      
      <!-- Keyboard Area -->
      <path d="M180 430h440l-30 40H210l-30-40z" fill="#0A0A0A"/>
      
      <!-- Touchpad with Glow -->
      <rect x="350" y="435" width="100" height="25" rx="4" fill="#1A1A1A"/>
      <rect x="350" y="435" width="100" height="25" rx="4" fill="url(#touchpadGlow)" opacity="0.3"/>
      
      <!-- Keyboard Hints with Glow -->
      <g opacity="0.7">
        <rect x="220" y="440" width="12" height="12" rx="2" fill="#1A1A1A"/>
        <rect x="237" y="440" width="12" height="12" rx="2" fill="#1A1A1A"/>
        <rect x="254" y="440" width="12" height="12" rx="2" fill="#1A1A1A"/>
      </g>
      
      <!-- Ambient Effects -->
      <rect x="210" y="100" width="380" height="280" fill="url(#screenGlow)" opacity="0.1"/>
      
      <!-- Camera with Glow -->
      <circle cx="400" cy="90" r="2" fill="#1A1A1A"/>
      <circle cx="400" cy="90" r="3" fill="url(#cameraGlow)" opacity="0.5"/>
      
      <!-- Gradients and Filters -->
      <defs>
        <linearGradient id="screenGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1A1A1A"/>
          <stop offset="100%" stopColor="#2A2A2A"/>
        </linearGradient>
        
        <linearGradient id="baseGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1A1A1A"/>
          <stop offset="100%" stopColor="#2A2A2A"/>
        </linearGradient>
        
        <radialGradient id="screenGlow" cx="0.5" cy="0.5" r="0.8">
          <stop offset="0%" stopColor="#BD93F9" stopOpacity="0.2"/>
          <stop offset="100%" stopColor="#0A0A0A" stopOpacity="0"/>
        </radialGradient>
        
        <radialGradient id="touchpadGlow" cx="0.5" cy="0.5" r="1">
          <stop offset="0%" stopColor="#8BE9FD" stopOpacity="0.1"/>
          <stop offset="100%" stopColor="#0A0A0A" stopOpacity="0"/>
        </radialGradient>
        
        <radialGradient id="cameraGlow" cx="0.5" cy="0.5" r="1">
          <stop offset="0%" stopColor="#FF79C6" stopOpacity="0.3"/>
          <stop offset="100%" stopColor="#0A0A0A" stopOpacity="0"/>
        </radialGradient>
        
        <radialGradient id="personGlow" cx="0.5" cy="0.5" r="1">
          <stop offset="0%" stopColor="#BD93F9" stopOpacity="0.2"/>
          <stop offset="100%" stopColor="#0A0A0A" stopOpacity="0"/>
        </radialGradient>
        
        <filter id="personBlur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1"/>
        </filter>
      </defs>
    </svg>
  `)}`;

  return (
    <img
      src={laptopImage}
      alt="Developer with Laptop Illustration"
      className={`floating-laptop ${isLoaded ? 'loaded' : ''}`}
      onLoad={() => setIsLoaded(true)}
    />
  );
};

export default FloatingLaptop; 