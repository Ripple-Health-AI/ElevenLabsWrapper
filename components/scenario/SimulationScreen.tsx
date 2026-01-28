"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, Loader2, X, AlertCircle, RefreshCw } from 'lucide-react';
import { useConversation } from '@elevenlabs/react';

interface SimulationScreenProps {
  agentId: string;
  avatarUrl?: string;
  persona_first_name: string;
  onComplete: () => void;
}

const SimulationScreen: React.FC<SimulationScreenProps> = ({
  agentId,
  avatarUrl,
  persona_first_name,
  onComplete,
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [permissionError, setPermissionError] = useState<boolean>(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  
  const conversation = useConversation({
    onDisconnect: () => {
      // Only trigger complete if we were previously connected or it wasn't an error
      if (!permissionError && !connectionError) {
        onComplete();
      }
    },
    onError: (error) => {
      console.error('Conversation error:', error);
      const errorMessage = typeof error === 'string' ? error : 
                          error instanceof Error ? error.message : 
                          'Unknown error occurred';
      
      if (errorMessage.includes('NotAllowedError') || 
          errorMessage.includes('Permission denied') || 
          errorMessage.includes('microphone')) {
        setPermissionError(true);
      } else {
        setConnectionError('Failed to connect to the agent. Please try again.');
      }
    }
  });

  const { status, isSpeaking } = conversation;

  const startSession = useCallback(async () => {
    setPermissionError(false);
    setConnectionError(null);

    if (!agentId) return;

    try {
      // Request microphone permission explicitly first to trigger browser prompt
      // This helps with "user gesture" requirements
      await navigator.mediaDevices.getUserMedia({ audio: true });

      // @ts-ignore - Handling different SDK versions
      const startFunc = conversation.startSession || conversation.startConversation;
      
      if (typeof startFunc === 'function') {
        await startFunc({
          agentId: agentId,
        });
      } else {
        throw new Error('Start conversation function not found in SDK');
      }
    } catch (err: any) {
      console.error('Failed to start session:', err);
      if (err.name === 'NotAllowedError' || err.message.includes('Permission denied')) {
        setPermissionError(true);
      } else {
        setConnectionError('Could not access microphone or connect to agent.');
      }
    }
  }, [agentId, conversation]);

  // Attempt to start automatically, but handle failure gracefully
  useEffect(() => {
    let mounted = true;
    
    const init = async () => {
      // Small delay to ensure component is fully mounted and previous transitions are done
      await new Promise(resolve => setTimeout(resolve, 500));
      if (mounted) {
        startSession();
      }
    };

    init();
    
    return () => {
      mounted = false;
      // @ts-ignore - Handling different SDK versions
      const endFunc = conversation.endSession || conversation.endConversation;
      if (typeof endFunc === 'function') {
        endFunc();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount

  const handleEndSession = useCallback(async () => {
    // @ts-ignore - Handling different SDK versions
    const endFunc = conversation.endSession || conversation.endConversation;
    if (typeof endFunc === 'function') {
      await endFunc();
    }
    onComplete();
  }, [conversation, onComplete]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    // Note: Real mute implementation would depend on SDK capabilities or MediaStream manipulation
  };

  // Error State UI
  if (permissionError || connectionError) {
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#E4EDF3] p-6 text-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-red-100">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={32} className="text-[#C74B4B]" />
          </div>
          
          <h3 className="text-xl font-bold text-[#0E1D43] mb-2">
            {permissionError ? 'Microphone Access Denied' : 'Connection Error'}
          </h3>
          
          <p className="text-[#454C55] mb-6">
            {permissionError 
              ? "We couldn't access your microphone. Please allow microphone access in your browser settings and try again." 
              : connectionError}
          </p>

          {permissionError && (
            <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800 mb-6 text-left">
              <strong>Note for embedded use:</strong> If this is embedded in a course, ensure the iframe has the <code>allow="microphone"</code> attribute.
            </div>
          )}
          
          <button
            onClick={startSession}
            className="w-full py-3 bg-[#0E1D43] hover:bg-[#1a2f63] text-white rounded-xl font-semibold shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw size={18} />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex flex-col bg-[#E4EDF3] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#C3DBE9]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#C3DBE9]/30 to-transparent" />
      </div>

      {/* Header - Minimal */}
      <div className="relative z-20 flex justify-between items-center p-6">
        <div className="flex items-center gap-3">
          <div className={`w-2.5 h-2.5 rounded-full ${status === 'connected' ? 'bg-[#556B2F] animate-pulse' : 'bg-yellow-400'}`} />
          <span className="text-[#0E1D43] font-medium text-sm tracking-wide uppercase opacity-70">
            {status === 'connected' ? 'Simulation Active' : 'Connecting...'}
          </span>
        </div>
        
        <button 
          onClick={handleEndSession}
          className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 hover:bg-white border border-[#C3DBE9] text-[#454C55] hover:text-[#C74B4B] transition-all duration-300 backdrop-blur-sm"
        >
          <span className="text-sm font-medium">End Conversation</span>
          <X size={18} />
        </button>
      </div>

      {/* Main Content - Centered Avatar */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-8">
        
        {/* Avatar Circle with Ripple */}
        <div className="relative">
          {/* Speaking Ripple Effect */}
          <AnimatePresence>
            {isSpeaking && (
              <>
                <motion.div
                  initial={{ scale: 1, opacity: 0.4 }}
                  animate={{ scale: 1.3, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
                  className="absolute inset-0 rounded-full bg-[#0E1D43]/10 z-0"
                />
                <motion.div
                  initial={{ scale: 1, opacity: 0.4 }}
                  animate={{ scale: 1.6, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ repeat: Infinity, duration: 2, delay: 0.6, ease: "easeOut" }}
                  className="absolute inset-0 rounded-full bg-[#0E1D43]/5 z-0"
                />
              </>
            )}
          </AnimatePresence>

          {/* Avatar Image */}
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-[6px] border-white shadow-2xl relative z-10 bg-[#E4EDF3]">
            {avatarUrl ? (
              <img 
                src={avatarUrl} 
                alt="Agent" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#454C55]">
                <Volume2 size={64} />
              </div>
            )}
          </div>
          
          {/* Status Indicator Badge */}
          {isSpeaking && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
            >
              <span className="px-4 py-1.5 bg-[#0E1D43] text-white text-xs font-bold rounded-full shadow-lg tracking-wider uppercase">
                {persona_first_name} Speaking
              </span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Footer Controls */}
      <div className="relative z-20 p-8 flex justify-center items-center pb-12">
        <div className="flex items-center gap-6 bg-white/40 backdrop-blur-md px-8 py-4 rounded-full border border-white/50 shadow-xl">
          <button
            onClick={toggleMute}
            className={`p-4 rounded-full transition-all duration-300 transform hover:scale-105 ${
              isMuted 
                ? 'bg-[#C74B4B] text-white shadow-lg shadow-[#C74B4B]/30' 
                : 'bg-[#0E1D43] text-white shadow-lg shadow-[#0E1D43]/30 hover:bg-[#1a2f63]'
            }`}
            title={isMuted ? "Unmute Microphone" : "Mute Microphone"}
          >
            {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
          </button>
          
          <div className="h-8 w-[1px] bg-[#454C55]/20 mx-2" />
          
          <div className="flex flex-col">
            <span className="text-xs font-bold text-[#0E1D43] uppercase tracking-wider">Microphone</span>
            <span className="text-xs text-[#454C55]">{isMuted ? 'Off' : 'On'}</span>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {status !== 'connected' && !permissionError && !connectionError && (
        <div className="absolute inset-0 bg-[#E4EDF3]/90 backdrop-blur-sm flex flex-col items-center justify-center z-50">
          <div className="relative">
            <div className="absolute inset-0 bg-[#0E1D43]/20 rounded-full blur-xl animate-pulse"></div>
            <div className="bg-white p-4 rounded-full shadow-xl relative z-10">
              <Loader2 className="w-10 h-10 text-[#0E1D43] animate-spin" />
            </div>
          </div>
          <p className="mt-6 text-[#0E1D43] font-semibold text-lg tracking-tight">Preparing Patient Simulation...</p>
          <p className="text-[#454C55] text-sm mt-2">Entering the room with {persona_first_name}</p>
        </div>
      )}
    </div>
  );
};

export default SimulationScreen;

