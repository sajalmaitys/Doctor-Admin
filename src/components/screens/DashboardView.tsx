import React from 'react';
import {
  TrendingUp,
  Award,
  Users,
  CheckCircle,
  Share2,
  DollarSign,
  ArrowRight,
} from 'lucide-react';
import { Doctor } from '../../types';

interface DashboardViewProps {
  doctors: Doctor[];
  onNavigateToDoctors: () => void;
  onNavigateToLeaderboard: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  doctors,
  onNavigateToDoctors,
  onNavigateToLeaderboard,
}) => {
  const totalReferred = doctors.reduce((sum, d) => sum + d.doctorsReferred, 0);
  const activeDoctors = doctors.filter((d) => d.status === 'Active').length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-2">
          <span>Overview</span>
          <span>&gt;</span>
          <span className="text-slate-800 font-semibold">Executive Dashboard</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Dashboard</h1>
            <p className="text-sm text-slate-500 mt-1">
              Network health, referral conversion rates, and doctor performance analytics.
            </p>
          </div>
          <button
            onClick={onNavigateToDoctors}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#4f46e5] hover:bg-[#4338ca] text-white text-sm font-semibold rounded-lg shadow-sm transition-all"
          >
            <span>Manage Doctors</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Doctors
            </span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-[#4f46e5] flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 tabular-nums">{doctors.length}</span>
            <span className="text-xs font-medium text-emerald-600 flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> +14.2%
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">{activeDoctors} active in network</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Doctors Referred
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Share2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 tabular-nums">{totalReferred}</span>
            <span className="text-xs font-medium text-emerald-600 flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> +28.5%
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Across 6 regional hubs</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Referral Payouts
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 tabular-nums">₹1,45,000</span>
            <span className="text-xs font-medium text-slate-400">Sep cycle</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">100% on-time disbursement</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Verification Rate
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 tabular-nums">98.2%</span>
            <span className="text-xs font-medium text-emerald-600">Compliant</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Medical council verified</p>
        </div>
      </div>

      {/* Visual Activity & Regional Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Referral Velocity Chart Simulation */}
        <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-bold text-slate-800 text-base">Monthly Referral Growth</h2>
              <p className="text-xs text-slate-400">Total doctor onboarding across last 6 months</p>
            </div>
            <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
              2026 Year-to-date
            </span>
          </div>

          {/* Bar representation */}
          <div className="h-52 flex items-end justify-between gap-3 pt-6 pb-2 px-2">
            {[
              { month: 'Apr', count: 18, height: '35%' },
              { month: 'May', count: 24, height: '48%' },
              { month: 'Jun', count: 32, height: '62%' },
              { month: 'Jul', count: 41, height: '78%' },
              { month: 'Aug', count: 39, height: '74%' },
              { month: 'Sep', count: 52, height: '96%', active: true },
            ].map((bar) => (
              <div key={bar.month} className="flex-1 flex flex-col items-center gap-2 group">
                <span className="text-[11px] font-semibold text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity tabular-nums">
                  {bar.count}
                </span>
                <div className="w-full bg-slate-100 rounded-t-lg h-36 flex items-end">
                  <div
                    style={{ height: bar.height }}
                    className={`w-full rounded-t-lg transition-all duration-300 ${
                      bar.active
                        ? 'bg-[#4f46e5] group-hover:bg-[#4338ca]'
                        : 'bg-indigo-200 group-hover:bg-indigo-300'
                    }`}
                  />
                </div>
                <span className="text-xs font-medium text-slate-500">{bar.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Cities */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-slate-800 text-base">Key Hubs</h2>
              <button
                onClick={onNavigateToLeaderboard}
                className="text-xs text-[#4f46e5] hover:underline font-semibold"
              >
                Leaderboard &gt;
              </button>
            </div>
            <p className="text-xs text-slate-400 mb-4">Doctor distribution by regional medical hubs</p>

            <div className="space-y-3">
              {[
                { city: 'Varanasi', count: 4, pct: 57 },
                { city: 'Lucknow', count: 1, pct: 14 },
                { city: 'Delhi', count: 1, pct: 14 },
                { city: 'Jaunpur', count: 2, pct: 28 },
                { city: 'Azamgarh', count: 1, pct: 14 },
              ].map((hub) => (
                <div key={hub.city} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700">{hub.city}</span>
                    <span className="text-slate-500 tabular-nums">{hub.count} doctors</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#4f46e5] rounded-full"
                      style={{ width: `${Math.min(100, hub.pct * 1.5)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-600">Need regional expansion?</span>
            <button
              onClick={onNavigateToDoctors}
              className="text-[#4f46e5] font-semibold hover:underline"
            >
              Add Doctor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
