"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Play, Info, User } from 'lucide-react';

interface IntroScreenProps {
  title: string;
  scenario_description: string;
  avatarUrl?: string;
  clinician_objective: string;
  persona_name_age: string;
  communication_goal: string;
  onStart: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({
  title,
  scenario_description,
  avatarUrl,
  persona_name_age,
  clinician_objective,
  communication_goal,
  onStart,
}) => {
  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto p-6 md:p-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[#C3DBE9]"
      >
        <div className="bg-[#0E1D43] p-6 text-white">
          <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
          <p className="text-[#C3DBE9] mt-2 opacity-90">A Ripple Health AI Simulation</p>
        </div>

        <div className="p-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Avatar Section */}
            <div className="w-full md:w-1/3 flex flex-col items-center">
              <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-[#E4EDF3] shadow-lg bg-[#E4EDF3] flex items-center justify-center">
                {avatarUrl ? (
                  <img 
                    src={avatarUrl} 
                    alt="Agent Avatar" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={64} className="text-[#454C55] opacity-50" />
                )}
              </div>
              <div className="mt-4 text-center">
                <span className="inline-block px-3 py-1 bg-[#E4EDF3] text-[#0E1D43] text-sm font-semibold rounded-full">
                  {persona_name_age}
                </span>
              </div>

              <p className="mt-3 text-sm font-medium text-[#0E1D43] opacity-80 italic text-center">
                Communication Goal: {communication_goal}
              </p>
            </div>

            {/* Content Section */}
            <div className="w-full md:w-2/3 space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-[#0E1D43] flex items-center gap-2 mb-3">
                  <Info size={20} className="text-[#556B2F]" />
                  Scenario Description
                </h2>
                <p className="text-[#454C55] leading-relaxed">
                  {scenario_description}
                </p>
              </div>

              <div className="bg-[#E4EDF3]/50 p-5 rounded-xl border border-[#C3DBE9]">
                <h3 className="font-semibold text-[#0E1D43] mb-2">Clinician Objective</h3>
                <p className="text-[#454C55] text-sm">
                  {clinician_objective}
                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={onStart}
                  className="group w-full md:w-auto px-8 py-4 bg-[#0E1D43] hover:bg-[#1a2f63] text-white rounded-xl font-semibold shadow-lg shadow-[#0E1D43]/20 transition-all duration-300 flex items-center justify-center gap-3 hover:scale-[1.02]"
                >
                  <Play size={20} className="fill-current" />
                  Start Simulation
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default IntroScreen;

