
import React, { useState, useEffect, useRef } from 'react';

interface LazyRenderProps {
  children: React.ReactNode;
  threshold?: number;
  height?: string;
  className?: string;
}

export const LazyRender: React.FC<LazyRenderProps> = ({ 
  children, 
  threshold = 0.1, 
  height = '400px',
  className = '' 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only trigger once
        }
      },
      { rootMargin: '100px', threshold }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return (
    <div ref={containerRef} className={className} style={{ minHeight: isVisible ? 'auto' : height }}>
      {isVisible ? children : null}
    </div>
  );
};
