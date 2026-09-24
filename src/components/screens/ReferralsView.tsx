import React, { useState } from 'react';
import { Share2, Check, Clock, AlertCircle, ArrowUpRight, DollarSign } from 'lucide-react';
import { Doctor } from '../../types';

interface ReferralsViewProps {
  doctors: Doctor[];
  onSelectDoctor: (doctor: Doctor) => void;
}

interface ReferralRecord {
  id: string;
  referrerName: string;
  referrerCode: string;
  referredDoctor: string;
  specialty: string;
  date: string;
  commission: string;
  status: 'Verified' | 'Pending' | 'Paid';
}

export const ReferralsView: React.FC<ReferralsViewProps> = ({ doctors }) => {
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [records, setRecords] = useState<ReferralRecord[]>([
    {
      id: 'ref-1',
      referrerName: 'Dr rp singh',
      referrerCode: 'ZH778562',
      referredDoctor: 'Dr. Sneha Verma',
      specialty: 'Cardiology',
      date: '12 Sep 2026',
      commission: '₹5,000',
      status: 'Verified',
    },
    {
      id: 'ref-2',
      referrerName: 'Dr rp singh',
      referrerCode: 'ZH778562',
      referredDoctor: 'Dr. Anil Saxena',
      specialty: 'Internal Medicine',
      date: '08 Sep 2026',
      commission: '₹5,000',
      status: 'Paid',
    },
    {
      id: 'ref-3',
      referrerName: 'Priya Goyal',
      referrerCode: 'ZH042957',
      referredDoctor: 'Dr. Meena Agarwal',
      specialty: 'Gynecology',
      date: '05 Sep 2026',
      commission: '₹5,000',
      status: 'Paid',
    },
    {
      id: 'ref-4',
      referrerName: 'Rishi Keshari',
      referrerCode: 'ZH662421',
      referredDoctor: 'Dr. Rohit Gupta',
      specialty: 'Orthopedics',
      date: '02 Sep 2026',
      commission: '₹5,000',
      status: 'Pending',
    },
    {
      id: 'ref-5',
      referrerName: 'Dr. wasim',
      referrerCode: 'ZH771230',
      referredDoctor: 'Dr. Farhan Qureshi',
      specialty: 'Anesthesiology',
      date: '28 Aug 2026',
      commission: '₹5,000',
      status: 'Paid',
    },
  ]);

  const filtered = records.filter(
    (r) => filterStatus === 'All' || r.status === filterStatus
  );

  const handleMarkPaid = (id: string) => {
    setRecords((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'Paid' } : r))
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-2">
          <span>Doctor Admin</span>
          <span>&gt;</span>
          <span className="text-slate-800 font-semibold">Referrals Ledger</span>
        </div>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Referrals</h1>
            <p className="text-sm text-slate-500 mt-1">
              Track doctor-to-doctor onboarding referrals, verification stages, and commission payouts.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Filter:</span>
            {['All', 'Verified', 'Pending', 'Paid'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                  filterStatus === st
                    ? 'bg-[#4f46e5] text-white border-[#4f46e5]'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Referrals Table */}
      <div className="bg-white border border-slate-200/80 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.02)] p-5">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-xs font-semibold text-slate-500 border-b border-slate-100 bg-slate-50/50">
                <th className="py-2.5 px-4">Referring Doctor</th>
                <th className="py-2.5 px-4">Referral Code</th>
                <th className="py-2.5 px-4">New Doctor Onboarded</th>
                <th className="py-2.5 px-4">Specialty</th>
                <th className="py-2.5 px-4">Date</th>
                <th className="py-2.5 px-4">Incentive</th>
                <th className="py-2.5 px-4">Status</th>
                <th className="py-2.5 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-600">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-semibold text-slate-900">{item.referrerName}</td>
                  <td className="py-3 px-4 font-mono text-slate-500">{item.referrerCode}</td>
                  <td className="py-3 px-4 font-medium text-slate-800">{item.referredDoctor}</td>
                  <td className="py-3 px-4 text-slate-500">{item.specialty}</td>
                  <td className="py-3 px-4 tabular-nums">{item.date}</td>
                  <td className="py-3 px-4 font-bold text-slate-900 tabular-nums">
                    {item.commission}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                        item.status === 'Paid'
                          ? 'bg-emerald-50 text-emerald-700'
                          : item.status === 'Verified'
                          ? 'bg-blue-50 text-blue-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          item.status === 'Paid'
                            ? 'bg-emerald-500'
                            : item.status === 'Verified'
                            ? 'bg-blue-500'
                            : 'bg-amber-500'
                        }`}
                      />
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    {item.status !== 'Paid' ? (
                      <button
                        onClick={() => handleMarkPaid(item.id)}
                        className="px-2.5 py-1 text-[11px] font-semibold text-indigo-600 border border-indigo-200 rounded hover:bg-indigo-50 transition-colors"
                      >
                        Approve Payout
                      </button>
                    ) : (
                      <span className="text-[11px] text-slate-400">Completed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
