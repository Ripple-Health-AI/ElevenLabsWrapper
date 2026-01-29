"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Download, RotateCcw, Home } from 'lucide-react';

interface ReportProps {
  transcript: {role: string, text: string}[];
  onRestart: () => void;
  onHome: () => void;
}

const PerformanceReport = ({ transcript, onRestart, onHome }: ReportProps) => {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 bg-[#F8FAFC]">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#0E1D43]">Performance Report</h1>
        <img src="https://firebasestorage.googleapis.com/v0/b/eleven-labs-wrapper.firebasestorage.app/o/Ripple%20Square%20Logo.png?alt=media&token=353bfdd6-c85f-41dd-9681-4e60ec8d658f" alt="Ripple" className="h-10" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Dimensions */}
        <Card className="border-[#C3DBE9]">
          <CardHeader>
            <CardTitle className="text-[#0E1D43]">Dimensions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-[#E4EDF3]/50">
                  <TableHead className="font-bold text-[#0E1D43]">The 4 C's of Relational Care</TableHead>
                  <TableHead className="text-right font-bold text-[#0E1D43]">4/5</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {['Connection', 'Curiosity', 'Compassion', 'Commitment'].map((dim) => (
                  <TableRow key={dim}>
                    <TableCell className="text-[#454C55]">{dim}</TableCell>
                    <TableCell className="text-right font-mono">4/5</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Right: Transcript */}
        <Card className="border-[#C3DBE9]">
          <CardHeader>
            <CardTitle className="text-[#0E1D43]">Transcript</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-4">
                {transcript.map((msg, i) => (
                  <div key={i} className="text-sm">
                    <span className="font-bold text-[#0E1D43]">{msg.role}:</span>
                    <p className="text-[#454C55] mt-1 italic">"{msg.text}"</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Qualitative Feedback */}
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-2">
          <h3 className="font-bold text-[#0E1D43]">What went well:</h3>
          <ul className="list-disc pl-5 text-[#454C55] space-y-1">
            <li>Successfully followed the Ask-Tell-Ask framework.</li>
          </ul>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex justify-center gap-4 pt-6">
        <Button variant="outline" onClick={onRestart} className="gap-2 border-[#C3DBE9]">
          <RotateCcw size={18} /> Practice again
        </Button>
        <Button className="bg-[#556B2F] hover:bg-[#455a26] gap-2">
          <Download size={18} /> Download PDF
        </Button>
        <Button variant="ghost" onClick={onHome} className="gap-2 text-[#454C55]">
          <Home size={18} /> Return home
        </Button>
      </div>
    </div>
  );
};

export default PerformanceReport;