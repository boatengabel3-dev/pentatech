import React, { useEffect, useRef, useState } from 'react';

interface RevealSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // Milliseconds
  threshold?: number;
  rootMargin?: string;
  as?: 'section' | 'div' | 'article';
  id?: string;
}

export const RevealSection: React.FC<RevealSectionProps> = ({
  children,
  className = '',
  delay = 0,
  threshold = 0.12,
  rootMargin = '0px 0px -50px 0px',
  as: Component = 'section',
  id,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Check for reduced motion preference
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    // Fallback if IntersectionObserver is not available
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const currentElem = domRef.current;
    if (!currentElem) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(currentElem);

    return () => {
      if (currentElem) {
        observer.unobserve(currentElem);
      }
    };
  }, [threshold, rootMargin]);

  return (
    <Component
      id={id}
      ref={domRef as React.RefObject<any>}
      style={{
        transitionDuration: '700ms',
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className={`transition-all ${
        isVisible
          ? 'opacity-100 translate-y-0 filter-none'
          : 'opacity-0 translate-y-7 pointer-events-none'
      } ${className}`}
    >
      {children}
    </Component>
  );
};
