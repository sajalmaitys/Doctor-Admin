import React, { useState } from 'react';
import { Star, CheckCircle, Clock, Plus, Quote } from 'lucide-react';

interface Testimonial {
  id: string;
  doctorName: string;
  role: string;
  hospital: string;
  quote: string;
  rating: number;
  status: 'Published' | 'Pending';
  date: string;
}

export const TestimonialsView: React.FC = () => {
  const [items, setItems] = useState<Testimonial[]>([
    {
      id: 't-1',
      doctorName: 'Dr rp singh',
      role: 'Senior Consultant Cardiologist',
      hospital: 'King George Medical University, Lucknow',
      quote:
        'The seamless doctor-to-doctor referral flow has transformed how we cross-refer cardiac patients requiring tertiary surgical intervention. The transparency in tracking is outstanding.',
      rating: 5,
      status: 'Published',
      date: '10 Sep 2026',
    },
    {
      id: 't-2',
      doctorName: 'Dr. wasim',
      role: 'Head of Laparoscopic Surgery',
      hospital: 'AIIMS New Delhi',
      quote:
        'Referring fellow surgeons and young fellows into this network has streamlined peer review and specialized operative consults across Northern India.',
      rating: 5,
      status: 'Published',
      date: '08 Sep 2026',
    },
    {
      id: 't-3',
      doctorName: 'Dr Pawan Kumar Maurya',
      role: 'Consultant Neurosurgeon',
      hospital: 'Begumganj Trauma & Neuro Centre, Jaunpur',
      quote:
        'Referral incentives are disbursed transparently, and the clinical case study exchange between tier-2 and tier-1 doctors has greatly enriched our local practice.',
      rating: 5,
      status: 'Pending',
      date: '04 Sep 2026',
    },
  ]);

  const toggleStatus = (id: string) => {
    setItems((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: t.status === 'Published' ? 'Pending' : 'Published' }
          : t
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-2">
          <span>Community</span>
          <span>&gt;</span>
          <span className="text-slate-800 font-semibold">Doctor Testimonials</span>
        </div>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Testimonials</h1>
            <p className="text-sm text-slate-500 mt-1">
              Curate and publish clinician reviews, peer recommendations, and healthcare feedback.
            </p>
          </div>
          <button
            onClick={() => alert('New testimonial submission form opened.')}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#4f46e5] hover:bg-[#4338ca] text-white text-sm font-semibold rounded-lg shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Testimonial</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((t) => (
          <div
            key={t.id}
            className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < t.rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-200'
                      }`}
                    />
                  ))}
                </div>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                    t.status === 'Published'
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-amber-50 text-amber-700'
                  }`}
                >
                  {t.status}
                </span>
              </div>

              <blockquote className="text-xs text-slate-600 italic leading-relaxed mb-4">
                "{t.quote}"
              </blockquote>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-900">{t.doctorName}</p>
                <p className="text-[11px] text-slate-400">{t.role}</p>
                <p className="text-[10px] text-slate-400">{t.hospital}</p>
              </div>
              <button
                onClick={() => toggleStatus(t.id)}
                className="text-xs font-semibold text-[#4f46e5] hover:underline"
              >
                {t.status === 'Published' ? 'Unpublish' : 'Publish'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
