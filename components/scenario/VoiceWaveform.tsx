"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface VoiceWaveformProps {
  isSpeaking: boolean;
}

const VoiceWaveform = ({ isSpeaking }: VoiceWaveformProps) => {
  // Simple animation variants for the bars
  const barVariants = {
    initial: { scaleY: 0.3 },
    animate: (i: number) => ({
      scaleY: isSpeaking ? [0.3, 0.8, 0.4, 0.9, 0.3] : 0.3,
      transition: {
        duration: 0.6,
        repeat: Infinity,
        delay: i * 0.1,
        ease: "easeInOut"
      }
    })
  };

  return (
    <div className="flex items-center justify-center gap-[3px] h-6 w-6">
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          custom={i}
          variants={barVariants}
          initial="initial"
          animate="animate"
          className="w-[3px] h-full bg-white rounded-full origin-center"
        />
      ))}
    </div>
  );
};

export default VoiceWaveform;