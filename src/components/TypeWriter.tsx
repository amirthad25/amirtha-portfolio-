import React, { useState, useEffect } from 'react';

interface TypeWriterProps {
  text: string;
  speed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
  className?: string;
}

const TypeWriter: React.FC<TypeWriterProps> = ({
  text,
  speed = 35,
  deleteSpeed = 25,
  pauseDuration = 1500,
  className = '',
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isPaused) {
      timeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(timeout);
    }

    if (isDeleting) {
      if (displayText.length === 0) {
        setIsDeleting(false);
        return;
      }

      timeout = setTimeout(() => {
        setDisplayText(text.slice(0, displayText.length - 1));
      }, deleteSpeed);
    } else {
      if (displayText.length === text.length) {
        setIsPaused(true);
        return;
      }

      timeout = setTimeout(() => {
        setDisplayText(text.slice(0, displayText.length + 1));
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [displayText, text, speed, deleteSpeed, pauseDuration, isDeleting, isPaused]);

  return (
    <div className={`typewriter ${className}`}>
      {displayText}
      <span className="cursor">|</span>
    </div>
  );
};

export default TypeWriter; 