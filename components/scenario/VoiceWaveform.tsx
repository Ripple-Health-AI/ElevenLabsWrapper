"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface VoiceWaveformProps {
  volume: number; // Changed from isSpeaking: boolean
}

const VoiceWaveform = ({ volume }: VoiceWaveformProps) => {
  return (
    <div className="flex items-center justify-center gap-[3px] h-6 w-6">
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          animate={{ 
            // Scale based on volume + a little random variation for organic feel
            scaleY: 0.2 + (volume * (1 + Math.random() * 0.5)) 
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="w-[3px] h-full bg-white rounded-full origin-center"
        />
      ))}
    </div>
  );
};

export default VoiceWaveform;