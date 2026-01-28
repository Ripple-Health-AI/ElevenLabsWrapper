"use client";

import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle2, Mic } from 'lucide-react';

interface DisclaimerProps {
  isOpen: boolean;
  onConfirm: () => void;
}

const DisclaimerModal = ({ isOpen, onConfirm }: DisclaimerProps) => {
  return (
    <Dialog.Root open={isOpen}>
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" 
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[90vw] max-w-md bg-white rounded-2xl shadow-2xl p-8 z-50 border border-[#C3DBE9]"
              >
                <div className="flex flex-col items-center text-center space-y-6">
                  <div className="w-16 h-16 bg-[#E4EDF3] rounded-full flex items-center justify-center text-[#0E1D43]">
                    <Mic size={32} />
                  </div>
                  
                  <Dialog.Title className="text-2xl font-bold text-[#0E1D43]">
                    Before you Begin
                  </Dialog.Title>
                  
                  <div className="space-y-4 text-left">
                    <div className="flex gap-3">
                      <AlertCircle className="text-[#556B2F] shrink-0" size={20} />
                      <p className="text-sm text-[#454C55]">
                        Simulations are designed to practice communication skills. They are not designed to assess the accuracy of clinical knowledge. The conversation and responses from the AI persona should not be taken as clinical recommendations.
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <CheckCircle2 className="text-[#556B2F] shrink-0" size={20} />
                      <p className="text-sm text-[#454C55]">
                        Additionally, Ripple Health AI will store a copy of your simulated conversation and a summary of the feedback in case you require access to it in the future.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={onConfirm}
                    className="w-full py-4 bg-[#0E1D43] hover:bg-[#1a2f63] text-white rounded-xl font-semibold shadow-lg transition-all duration-300 active:scale-95"
                  >
                    Accept and Begin
                  </button>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};

export default DisclaimerModal;