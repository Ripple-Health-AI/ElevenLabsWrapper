"use client";

import React, { Suspense } from 'react';
import ScenarioFlow from '@/components/scenario/ScenarioFlow';

// We need Suspense because ScenarioFlow uses useSearchParams
export default function Page() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#E4EDF3] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-[#0E1D43] border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <ScenarioFlow />
    </Suspense>
  );
}

