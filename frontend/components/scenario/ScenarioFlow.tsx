"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import IntroScreen from './IntroScreen';
import SimulationScreen from './SimulationScreen';
import CompletionScreen from './CompletionScreen';

type ScreenState = 'intro' | 'simulation' | 'completion';

const ScenarioFlow: React.FC = () => {
  const searchParams = useSearchParams();
  const [currentScreen, setCurrentScreen] = useState<ScreenState>('intro');
  
  // Default values if params are missing (using the user's provided test agent as fallback)
  const agentId = searchParams.get('agent_id') || 'agent_9701kg09nwp2fc5t8ew3d5apd277';
  const title = searchParams.get('title') || 'Customer Service Scenario';
  const description = searchParams.get('description') || 'In this scenario, you will practice handling a customer inquiry about a billing discrepancy. The customer is slightly annoyed but willing to listen.';
  const avatarUrl = searchParams.get('avatar_url') || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80';
  const instructions = searchParams.get('instructions') || 'Listen carefully to the customer\'s concern. Acknowledge their frustration, verify the details, and propose a solution. Speak clearly and maintain a professional tone.';

  const handleStart = () => {
    setCurrentScreen('simulation');
  };

  const handleComplete = () => {
    setCurrentScreen('completion');
  };

  const handleRestart = () => {
    setCurrentScreen('intro');
  };

  return (
    <div className="min-h-screen bg-[#E4EDF3] flex flex-col">
      {/* Header / Nav Placeholder (optional, to match course feel) */}
      <div className="h-2 bg-[#0E1D43] w-full"></div>
      
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {currentScreen === 'intro' && (
          <IntroScreen 
            title={title}
            description={description}
            avatarUrl={avatarUrl}
            instructions={instructions}
            onStart={handleStart}
          />
        )}

        {currentScreen === 'simulation' && (
          <SimulationScreen 
            agentId={agentId}
            avatarUrl={avatarUrl}
            onComplete={handleComplete}
          />
        )}

        {currentScreen === 'completion' && (
          <CompletionScreen 
            onRestart={handleRestart}
          />
        )}
      </main>
      
      {/* Footer Branding */}
      <div className="py-4 text-center text-[#454C55] text-xs opacity-60">
        Powered by ElevenLabs AI
      </div>
    </div>
  );
};

export default ScenarioFlow;

