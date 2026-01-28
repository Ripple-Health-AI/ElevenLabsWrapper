"use client";


import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import IntroScreen from './IntroScreen';
import SimulationScreen from './SimulationScreen';
import DisclaimerModal from './DisclaimerModal';
import CompletionScreen from './CompletionScreen';


type ScreenState = 'intro' | 'simulation' | 'completion';


const ScenarioFlow: React.FC = () => {
 const searchParams = useSearchParams();
 const [currentScreen, setCurrentScreen] = useState<ScreenState>('intro');
 const [dbScenario, setDbScenario] = useState<any>(null);
 const [loading, setLoading] = useState(true);


 const [showDisclaimer, setShowDisclaimer] = useState(false);

 const scenarioId = searchParams.get('scenario_id');


 // This is the "Brain" that pulls from Firestore
 useEffect(() => {
   const fetchFromFirebase = async () => {
     if (scenarioId) {
       try {
         const docRef = doc(db, "scenarios", scenarioId);
         const docSnap = await getDoc(docRef);
         if (docSnap.exists()) {
           setDbScenario(docSnap.data());
         }
       } catch (error) {
         console.error("Error fetching scenario from Firestore:", error);
       }
     }
     setLoading(false);
   };


   fetchFromFirebase();
 }, [scenarioId]);


 // Hierarchical Logic: 1. Firestore Data > 2. URL Params > 3. Hardcoded Defaults
 const agentId = dbScenario?.agent_id || searchParams.get('agent_id') || 'agent_9701kg09nwp2fc5t8ew3d5apd277';
 const title = dbScenario?.title || searchParams.get('title') || 'Healthcare Communication Simulation';
 const description = dbScenario?.scenario_description || searchParams.get('scenario_description') || 'Practice speaking with a patient.';
 const avatarUrl = dbScenario?.avatar_url || searchParams.get('avatar_url') || '//firebasestorage.googleapis.com/v0/b/eleven-labs-wrapper.firebasestorage.app/o/download%20(1)%20(1).png?alt=media&token=abe30b98-29f9-4be2-b0f3-06ce40ea08e4';
 const instructions = dbScenario?.clinician_objective || searchParams.get('clinician_objective') || 'Focus on connecting and building trust with the patient.';
 const goal = dbScenario?.communication_goal || searchParams.get('communication_goal_') || 'The 4 Cs of Relational Care';


 const handleStart = () => {
  setShowDisclaimer(true);
 };   
 
 const handleConfirmDisclaimer = () => {
  setShowDisclaimer(false);
  setCurrentScreen('simulation');
 }

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
           scenario_description={description}
           avatarUrl={avatarUrl}
           clinician_objective={instructions}
           onStart={handleStart}
         />
       )}
       
       {
       <DisclaimerModal
        isOpen={showDisclaimer}
        onConfirm={handleConfirmDisclaimer}
       />

       currentScreen === 'simulation' && (
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
