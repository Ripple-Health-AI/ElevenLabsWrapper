"use client";

import { useEffect, useRef, useState } from 'react';

export const useAudioVisualizer = (isActive: boolean) => {
  const [volume, setVolume] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isActive) {
      setVolume(0);
      return;
    }

    const initAudio = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        analyserRef.current = audioContextRef.current.createAnalyser();
        analyserRef.current.fftSize = 32; // Small size for simple 5-bar waveform
        
        sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
        sourceRef.current.connect(analyserRef.current);

        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
        
        const update = () => {
          if (analyserRef.current) {
            analyserRef.current.getByteFrequencyData(dataArray);
            // Get average volume
            const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
            setVolume(average / 255); // Normalize to 0-1
          }
          animationRef.current = requestAnimationFrame(update);
        };
        update();
      } catch (err) {
        console.error("Visualizer error:", err);
      }
    };

    initAudio();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, [isActive]);

  return volume;
};