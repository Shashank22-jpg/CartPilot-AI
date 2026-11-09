import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { prefersReducedMotion } from '../../utils/webgl';

/**
 * TiltCard Component
 * Wraps content in a subtle 3D perspective tilt with cursor-following glare highlight.
 * Smooth, non-disruptive, highly readable.
 */
export default function TiltCard({
  children,
  className = '',
  maxTilt = 6, // maximum tilt in degrees (subtle & elegant)
  glare = true,
  onClick,
  ...props
}) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(prefersReducedMotion());
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 220 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  // Map mouse coordinate ratios (-0.5 to 0.5) to tilt angles
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-maxTilt, maxTilt]);

  // Glare position
  const glareX = useTransform(smoothX, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(smoothY, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e) => {
    if (reducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  if (reducedMotion) {
    return (
      <div
        ref={cardRef}
        onClick={onClick}
        className={`transition-all duration-200 hover:-translate-y-0.5 ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        perspective: 1000,
      }}
      transition={{ type: 'spring', damping: 20, stiffness: 200 }}
      className={`relative transform-gpu transition-shadow duration-300 ${
        isHovered ? 'shadow-2xl shadow-electric-500/10' : ''
      } ${className}`}
      {...props}
    >
      {/* Subtle cursor-following light glare */}
      {glare && isHovered && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-30 rounded-2xl opacity-40 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 180px at ${glareX} ${glareY}, rgba(255, 255, 255, 0.12), transparent 80%)`,
          }}
        />
      )}

      {/* Card Content with slight Z translation */}
      <div style={{ transform: isHovered ? 'translateZ(10px)' : 'translateZ(0px)', transition: 'transform 0.2s ease-out' }}>
        {children}
      </div>
    </motion.div>
  );
}
