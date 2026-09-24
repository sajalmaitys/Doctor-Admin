import React, { useState } from 'react';
import { BookOpen, Video, Award, Users, Plus, Calendar, Clock } from 'lucide-react';

interface Module {
  id: string;
  title: string;
  speaker: string;
  type: 'Live Webinar' | 'Accredited Course' | 'Clinical Guidelines';
  cmeCredits: number;
  enrolledDoctors: number;
  date: string;
  status: 'Upcoming' | 'On-Demand';
}

export const EducationView: React.FC = () => {
  const [modules] = useState<Module[]>([
    {
      id: 'edu-1',
      title: 'Current Guidelines in Heart Failure: SGLT2i & ARNI Protocols',
      speaker: 'Dr rp singh (KGMU Lucknow)',
      type: 'Live Webinar',
      cmeCredits: 2.0,
      enrolledDoctors: 184,
      date: '28 Sep 2026, 06:00 PM',
      status: 'Upcoming',
    },
    {
      id: 'edu-2',
      title: 'Minimally Invasive Robotic Surgery in Gastrointestinal Malignancies',
      speaker: 'Dr. wasim (AIIMS New Delhi)',
      type: 'Accredited Course',
      cmeCredits: 3.5,
      enrolledDoctors: 312,
      date: 'Available On-Demand',
      status: 'On-Demand',
    },
    {
      id: 'edu-3',
      title: 'Emergency Protocols in Acute Trauma & Intracranial Decompression',
      speaker: 'Dr Pawan Kumar Maurya (Jaunpur Trauma)',
      type: 'Clinical Guidelines',
      cmeCredits: 1.5,
      enrolledDoctors: 98,
      date: 'Available On-Demand',
      status: 'On-Demand',
    },
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-2">
          <span>Continuous Learning</span>
          <span>&gt;</span>
          <span className="text-slate-800 font-semibold">Doctor Education & CME</span>
        </div>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Education</h1>
            <p className="text-sm text-slate-500 mt-1">
              Accredited CME credits, clinical masterclasses, and medical webinar management for registered doctors.
            </p>
          </div>
          <button
            onClick={() => alert('Schedule new CME webinar modal opened.')}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#4f46e5] hover:bg-[#4338ca] text-white text-sm font-semibold rounded-lg shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Host CME Session</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {modules.map((m) => (
          <div
            key={m.id}
            className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-[#4f46e5]">
                  {m.type}
                </span>
                <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                  {m.cmeCredits} CME Credits
                </span>
              </div>

              <h3 className="font-bold text-slate-900 text-sm leading-snug mb-2 hover:text-[#4f46e5] cursor-pointer">
                {m.title}
              </h3>
              <p className="text-xs text-slate-500 font-medium">Instructor: {m.speaker}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5" /> {m.enrolledDoctors} doctors
              </span>
              <span className="font-semibold text-slate-700">{m.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
