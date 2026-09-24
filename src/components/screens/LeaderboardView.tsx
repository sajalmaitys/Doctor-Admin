import React, { useState } from 'react';
import { Trophy, Award, Medal, Star, Flame, Sparkles } from 'lucide-react';
import { TopReferrer, Doctor } from '../../types';

interface LeaderboardViewProps {
  topReferrers: TopReferrer[];
  doctors: Doctor[];
  onSelectDoctorByName: (name: string) => void;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  topReferrers,
  doctors,
  onSelectDoctorByName,
}) => {
  const [period, setPeriod] = useState<'monthly' | 'all-time'>('monthly');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-2">
          <span>Doctors</span>
          <span>&gt;</span>
          <span className="text-slate-800 font-semibold">Doctor Referral Leaderboard</span>
        </div>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Leaderboard</h1>
            <p className="text-sm text-slate-500 mt-1">
              Top performing doctors and specialists driving network growth.
            </p>
          </div>

          {/* Period selector */}
          <div className="flex items-center p-1 bg-slate-100 rounded-lg border border-slate-200">
            <button
              onClick={() => setPeriod('monthly')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                period === 'monthly'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              September 2026
            </button>
            <button
              onClick={() => setPeriod('all-time')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                period === 'all-time'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Time
            </button>
          </div>
        </div>
      </div>

      {/* Podium for Top 3 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        {/* Rank 2 - Silver */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col items-center text-center relative order-2 md:order-1">
          <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-sm mb-2">
            2
          </div>
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center text-xl font-bold mb-2">
            SS
          </div>
          <h3 className="font-bold text-slate-900">Dr S Sharma</h3>
          <p className="text-xs text-slate-400 font-mono">ZH149069 · Varanasi</p>
          <div className="mt-3 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
            1 Referral · Silver Tier
          </div>
        </div>

        {/* Rank 1 - Gold */}
        <div className="bg-gradient-to-b from-amber-50/50 to-white border-2 border-amber-300 rounded-xl p-6 shadow-sm flex flex-col items-center text-center relative order-1 md:order-2 -mt-2">
          <div className="absolute -top-3 px-3 py-0.5 bg-amber-400 text-amber-950 text-[11px] font-bold rounded-full uppercase tracking-wider flex items-center gap-1 shadow-xs">
            <Trophy className="w-3 h-3" /> Champion
          </div>
          <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-base mb-2">
            1
          </div>
          <div className="w-20 h-20 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center text-2xl font-bold mb-2 shadow-inner">
            PG
          </div>
          <h3 className="font-bold text-slate-900 text-lg">Priya Goyal</h3>
          <p className="text-xs text-slate-500 font-mono">ZH042957 · Varanasi</p>
          <div className="mt-3 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            2 Referrals · Gold Tier
          </div>
        </div>

        {/* Rank 3 - Bronze */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col items-center text-center relative order-3">
          <div className="w-10 h-10 rounded-full bg-amber-700/10 text-amber-900 flex items-center justify-center font-bold text-sm mb-2">
            3
          </div>
          <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-800 flex items-center justify-center text-xl font-bold mb-2">
            SP
          </div>
          <h3 className="font-bold text-slate-900">Subhamay Panday</h3>
          <p className="text-xs text-slate-400 font-mono">ZH234617 · Varanasi</p>
          <div className="mt-3 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold">
            1 Referral · Bronze Tier
          </div>
        </div>
      </div>

      {/* Leaderboard Full Table */}
      <div className="bg-white border border-slate-200/80 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.02)] p-5">
        <h2 className="font-bold text-slate-800 text-base mb-4">Complete Rankings</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-xs font-semibold text-slate-500 border-b border-slate-100 bg-slate-50/50">
                <th className="py-2.5 px-4 w-16">Rank</th>
                <th className="py-2.5 px-4">Doctor</th>
                <th className="py-2.5 px-4">Code</th>
                <th className="py-2.5 px-4">City</th>
                <th className="py-2.5 px-4">Tier Badge</th>
                <th className="py-2.5 px-4 text-right">Doctors Referred</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-600">
              {topReferrers.map((ref) => (
                <tr
                  key={ref.code}
                  onClick={() => onSelectDoctorByName(ref.name)}
                  className="hover:bg-slate-50 transition-colors cursor-pointer group"
                >
                  <td className="py-3 px-4 font-bold text-slate-800">
                    {ref.rank === 1 ? (
                      <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 inline-flex items-center justify-center">
                        1
                      </span>
                    ) : ref.rank === 2 ? (
                      <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 inline-flex items-center justify-center">
                        2
                      </span>
                    ) : ref.rank === 3 ? (
                      <span className="w-6 h-6 rounded-full bg-amber-700/10 text-amber-900 inline-flex items-center justify-center">
                        3
                      </span>
                    ) : (
                      <span className="pl-2">{ref.rank}</span>
                    )}
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-900 group-hover:text-[#4f46e5] transition-colors">
                    {ref.name}
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-500">{ref.code}</td>
                  <td className="py-3 px-4 text-slate-600">{ref.city}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium ${
                        ref.doctorsReferred >= 2
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                      }`}
                    >
                      {ref.doctorsReferred >= 2 ? 'Gold Tier' : 'Silver Tier'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-slate-900 tabular-nums">
                    {ref.doctorsReferred}
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
