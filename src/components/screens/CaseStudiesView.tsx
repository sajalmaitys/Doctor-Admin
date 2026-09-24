import React, { useState } from 'react';
import { FileText, Download, CheckCircle, Clock, Plus, Tag } from 'lucide-react';

interface CaseStudy {
  id: string;
  title: string;
  author: string;
  authorCode: string;
  specialty: string;
  date: string;
  downloads: number;
  status: 'Approved' | 'Under Review';
}

export const CaseStudiesView: React.FC = () => {
  const [studies, setStudies] = useState<CaseStudy[]>([
    {
      id: 'cs-1',
      title: 'Transcatheter Aortic Valve Replacement (TAVR) in High-Risk Octogenarians',
      author: 'Dr rp singh',
      authorCode: 'ZH778562',
      specialty: 'Cardiology',
      date: '11 Sep 2026',
      downloads: 142,
      status: 'Approved',
    },
    {
      id: 'cs-2',
      title: 'Single-Incision Laparoscopic Cholecystectomy: A 250-Patient Retrospective Audit',
      author: 'Dr. wasim',
      authorCode: 'ZH771230',
      specialty: 'Surgery',
      date: '09 Sep 2026',
      downloads: 89,
      status: 'Approved',
    },
    {
      id: 'cs-3',
      title: 'Management of Acute Subdural Hematoma with Rapid Neurological Recovery',
      author: 'Dr Pawan Kumar Maurya',
      authorCode: 'ZH112233',
      specialty: 'Neurology',
      date: '06 Sep 2026',
      downloads: 38,
      status: 'Under Review',
    },
    {
      id: 'cs-4',
      title: 'Complex Peri-articular Tibial Plateau Fractures: Dual Plating Approaches',
      author: 'Rishi Keshari',
      authorCode: 'ZH662421',
      specialty: 'Orthopedics',
      date: '02 Sep 2026',
      downloads: 64,
      status: 'Approved',
    },
  ]);

  const handleDownload = (title: string) => {
    alert(`Downloading clinical PDF report: "${title}"`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-2">
          <span>Clinical Knowledge</span>
          <span>&gt;</span>
          <span className="text-slate-800 font-semibold">Doctor Case Studies</span>
        </div>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Case Studies</h1>
            <p className="text-sm text-slate-500 mt-1">
              Peer-reviewed clinical case presentations and outcomes submitted by doctors.
            </p>
          </div>
          <button
            onClick={() => alert('Submit new clinical case study modal opened.')}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#4f46e5] hover:bg-[#4338ca] text-white text-sm font-semibold rounded-lg shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Submit Case Study</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {studies.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#4f46e5] bg-indigo-50 px-2.5 py-0.5 rounded-full">
                  <Tag className="w-3 h-3" />
                  {item.specialty}
                </span>
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                    item.status === 'Approved'
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-amber-50 text-amber-700'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      item.status === 'Approved' ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}
                  />
                  {item.status}
                </span>
              </div>

              <h3 className="font-bold text-slate-900 text-sm leading-snug hover:text-[#4f46e5] cursor-pointer">
                {item.title}
              </h3>
              <p className="text-xs text-slate-500 mt-2 font-medium">
                Author: <span className="text-slate-800 font-semibold">{item.author}</span> (
                {item.authorCode})
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Published {item.date} · {item.downloads} downloads</span>
              <button
                type="button"
                onClick={() => handleDownload(item.title)}
                className="inline-flex items-center gap-1 text-[#4f46e5] font-semibold hover:underline"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
