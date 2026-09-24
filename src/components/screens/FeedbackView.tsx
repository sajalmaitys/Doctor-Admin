import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, Send, CheckCircle2 } from 'lucide-react';

interface FeedbackItem {
  id: string;
  doctorName: string;
  doctorCode: string;
  date: string;
  category: string;
  rating: number;
  comment: string;
  reply?: string;
  status: 'Reviewed' | 'Needs Reply';
}

export const FeedbackView: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([
    {
      id: 'fb-1',
      doctorName: 'Dr rp singh',
      doctorCode: 'ZH778562',
      date: '12 Sep 2026',
      category: 'Referral tracking',
      rating: 5,
      comment:
        'The live status update when my referred specialist completes onboarding was super smooth. Would love an SMS alert as well.',
      reply: 'Thanks Dr. Singh! SMS alerts are being enabled this month in v2.4.',
      status: 'Reviewed',
    },
    {
      id: 'fb-2',
      doctorName: 'Rishi Keshari',
      doctorCode: 'ZH662421',
      date: '10 Sep 2026',
      category: 'Platform UI',
      rating: 5,
      comment: 'Very clean dashboard. The drawer makes editing doctor credentials instantaneous.',
      status: 'Reviewed',
    },
    {
      id: 'fb-3',
      doctorName: 'Dr. wasim',
      doctorCode: 'ZH771230',
      date: '09 Sep 2026',
      category: 'CME Webinars',
      rating: 4,
      comment:
        'The surgical robotics webinar was exceptional. Please include CME accreditation certificates for Delhi Medical Council.',
      status: 'Needs Reply',
    },
  ]);

  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const submitReply = (id: string) => {
    if (!replyText.trim()) return;
    setFeedbacks((prev) =>
      prev.map((fb) =>
        fb.id === id ? { ...fb, reply: replyText.trim(), status: 'Reviewed' } : fb
      )
    );
    setReplyText('');
    setActiveReplyId(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-2">
          <span>Feedback</span>
          <span>&gt;</span>
          <span className="text-slate-800 font-semibold">Doctor Feedback & NPS</span>
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Doctor Feedback</h1>
          <p className="text-sm text-slate-500 mt-1">
            Monitor physician satisfaction, portal suggestions, and respond to doctor inquiries.
          </p>
        </div>
      </div>

      {/* Summary KPI Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Average Satisfaction
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 tabular-nums">4.8</span>
            <span className="text-xs text-slate-400">/ 5.0 rating</span>
          </div>
          <p className="text-xs text-emerald-600 font-medium mt-1">96% positive sentiment</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Net Promoter Score (NPS)
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 tabular-nums">+68</span>
            <span className="text-xs text-emerald-600 font-semibold">World-Class</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Benchmark: Healthcare avg +42</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Response Rate
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 tabular-nums">&lt; 2 hrs</span>
            <span className="text-xs text-slate-400">average turnaround</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Admin moderation active</p>
        </div>
      </div>

      {/* Feedback Feed */}
      <div className="space-y-4">
        {feedbacks.map((fb) => (
          <div
            key={fb.id}
            className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-sm">{fb.doctorName}</span>
                <span className="text-xs text-slate-400 font-mono">({fb.doctorCode})</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600">
                  {fb.category}
                </span>
              </div>
              <span className="text-xs text-slate-400 tabular-nums">{fb.date}</span>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed mt-1">{fb.comment}</p>

            {fb.reply && (
              <div className="mt-3 p-3 bg-indigo-50/60 border border-indigo-100/80 rounded-lg text-xs">
                <div className="flex items-center gap-1.5 font-semibold text-[#4f46e5] mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Admin Reply:</span>
                </div>
                <p className="text-slate-700 leading-relaxed">{fb.reply}</p>
              </div>
            )}

            {!fb.reply && activeReplyId !== fb.id && (
              <div className="mt-3 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setActiveReplyId(fb.id);
                    setReplyText('');
                  }}
                  className="px-3 py-1.5 text-xs text-[#4f46e5] font-semibold hover:bg-indigo-50 rounded-lg transition-colors border border-indigo-200"
                >
                  Reply to Doctor
                </button>
              </div>
            )}

            {activeReplyId === fb.id && (
              <div className="mt-3 pt-3 border-t border-slate-100 space-y-2">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your response to the doctor..."
                  rows={2}
                  className="w-full p-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-[#4f46e5] focus:ring-1 focus:ring-[#4f46e5]"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveReplyId(null)}
                    className="px-3 py-1 text-xs text-slate-500 hover:bg-slate-100 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => submitReply(fb.id)}
                    className="px-3 py-1 text-xs font-semibold text-white bg-[#4f46e5] hover:bg-[#4338ca] rounded flex items-center gap-1"
                  >
                    <Send className="w-3 h-3" />
                    Send Reply
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
