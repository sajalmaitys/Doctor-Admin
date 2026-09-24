import React from 'react';
import { Users } from 'lucide-react';
import { TopReferrer } from '../types';

interface TopReferrersCardProps {
  referrers: TopReferrer[];
  onViewAll?: () => void;
  onSelectDoctorByName?: (name: string) => void;
}

export const TopReferrersCard: React.FC<TopReferrersCardProps> = ({
  referrers,
  onViewAll,
  onSelectDoctorByName,
}) => {
  return (
    <section
      className="bg-white border border-slate-200/80 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.02)] p-5 mb-6"
      data-purpose="top-referrers-section"
    >
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-50 text-[#4f46e5] flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-slate-800 text-base">Top referrers</h2>
          </div>
        </div>
        <button
          type="button"
          onClick={onViewAll}
          className="text-sm font-semibold text-[#4f46e5] hover:text-[#4338ca] hover:underline cursor-pointer"
        >
          View all
        </button>
      </div>

      {/* Top Referrers Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-[11px] font-bold text-slate-700 uppercase tracking-wider border-b border-slate-100">
              <th className="py-2.5 px-4 w-12 text-slate-900">#</th>
              <th className="py-2.5 px-4">Name</th>
              <th className="py-2.5 px-4">Code</th>
              <th className="py-2.5 px-4">City</th>
              <th className="py-2.5 px-4 text-left">Doctors referred</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-600 font-medium">
            {referrers.map((referrer) => {
              return (
                <tr
                  key={`${referrer.rank}-${referrer.code}`}
                  onClick={() => onSelectDoctorByName && onSelectDoctorByName(referrer.name)}
                  className="hover:bg-slate-50/70 transition-colors cursor-pointer group"
                  title="Click to view details"
                >
                  <td className="py-3 px-4">
                    {referrer.rank === 1 ? (
                      <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold inline-flex items-center justify-center tabular-nums">
                        1
                      </span>
                    ) : referrer.rank === 2 ? (
                      <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 text-xs font-bold inline-flex items-center justify-center tabular-nums">
                        2
                      </span>
                    ) : referrer.rank === 3 ? (
                      <span className="w-5 h-5 rounded-full bg-amber-700/10 text-amber-900 text-xs font-bold inline-flex items-center justify-center tabular-nums">
                        3
                      </span>
                    ) : (
                      <span className="text-slate-400 font-medium pl-2 tabular-nums">
                        {referrer.rank}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-800 group-hover:text-[#4f46e5] transition-colors">
                    {referrer.name}
                  </td>
                  <td className="py-3 px-4 text-slate-500 font-normal font-mono text-xs">
                    {referrer.code}
                  </td>
                  <td className="py-3 px-4 text-slate-500">{referrer.city}</td>
                  <td className="py-3 px-4 text-slate-800 font-semibold tabular-nums">
                    {referrer.doctorsReferred}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};
