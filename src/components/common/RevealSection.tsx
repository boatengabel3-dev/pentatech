import React from 'react';
import { motion } from 'framer-motion';

interface RevealSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // Milliseconds
  as?: 'section' | 'div' | 'article';
  id?: string;
  style?: React.CSSProperties;
}

export const RevealSection: React.FC<RevealSectionProps> = ({
  children,
  className = '',
  delay = 0,
  as = 'section',
  id,
  style,
}) => {
  const motionProps = {
    id,
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-40px' },
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      delay: delay > 0 ? delay / 1000 : 0,
    },
    className,
    style,
  };

  if (as === 'div') {
    return <motion.div {...motionProps}>{children}</motion.div>;
  }

  if (as === 'article') {
    return <motion.article {...motionProps}>{children}</motion.article>;
  }

  return <motion.section {...motionProps}>{children}</motion.section>;
};
