"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface VoiceWaveformProps {
  isSpeaking: boolean;
}

const VoiceWaveform = ({ isSpeaking }: VoiceWaveformProps) => {
  // We define "initial" as static and "animate" as the dancing sequence
  const barVariants = {
    initial: { 
      scaleY: 0.3,
      transition: { duration: 0.2 } 
    },
    animate: (i: number) => ({
      scaleY: [0.3, 0.8, 0.4, 0.9, 0.3],
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
          // THIS IS THE KEY CHANGE: 
          // We toggle the state here based on the prop
          animate={isSpeaking ? "animate" : "initial"}
          className="w-[3px] h-full bg-white rounded-full origin-center"
        />
      ))}
    </div>
  );
};

export default VoiceWaveform;