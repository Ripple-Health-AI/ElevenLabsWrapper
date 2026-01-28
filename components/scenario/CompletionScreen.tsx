"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, RotateCcw } from 'lucide-react';

interface CompletionScreenProps {
  onRestart: () => void;
}

const CompletionScreen: React.FC<CompletionScreenProps> = ({ onRestart }) => {
  return (
    <div className="flex flex-col h-full items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-lg w-full text-center border border-[#C3DBE9]"
      >
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-[#E4EDF3] rounded-full flex items-center justify-center">
            <CheckCircle size={48} className="text-[#556B2F]" />
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-[#0E1D43] mb-4">Simulation Complete!</h2>
        
        <p className="text-[#454C55] mb-8 leading-relaxed">
          Great job! You have successfully completed this simulation. 
          Feel free to restart if you'd like to practice again.
        </p>
        
        <button
          onClick={onRestart}
          className="w-full py-4 bg-[#0E1D43] hover:bg-[#1a2f63] text-white rounded-xl font-semibold shadow-lg transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02]"
        >
          <RotateCcw size={20} />
          Restart Simulation
        </button>
      </motion.div>
    </div>
  );
};

export default CompletionScreen;

