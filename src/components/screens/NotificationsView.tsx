import React from 'react';
import { Bell, CheckCheck, Clock, Share2, FileText, DollarSign } from 'lucide-react';
import { NavigationTab } from '../../types';

interface NotificationsViewProps {
  notifications: Array<{
    id: string;
    title: string;
    time: string;
    unread: boolean;
    detail: string;
    actionLink: string;
  }>;
  onMarkAllAsRead: () => void;
  onNavigate: (tab: NavigationTab) => void;
}

export const NotificationsView: React.FC<NotificationsViewProps> = ({
  notifications,
  onMarkAllAsRead,
  onNavigate,
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-2">
          <span>Doctor Admin</span>
          <span>&gt;</span>
          <span className="text-slate-800 font-semibold">Activity Alerts</span>
        </div>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Notifications</h1>
            <p className="text-sm text-slate-500 mt-1">
              Real-time alerts for doctor registrations, case study submissions, and referral disbursements.
            </p>
          </div>
          <button
            onClick={onMarkAllAsRead}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg shadow-2xs transition-colors"
          >
            <CheckCheck className="w-4 h-4 text-[#4f46e5]" />
            <span>Mark all as read</span>
          </button>
        </div>
      </div>

      {/* Notifications list */}
      <div className="bg-white border border-slate-200/80 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.02)] divide-y divide-slate-100">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`p-4 flex items-start gap-4 transition-colors hover:bg-slate-50 ${
              n.unread ? 'bg-indigo-50/20' : ''
            }`}
          >
            <div
              className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                n.unread ? 'bg-indigo-50 text-[#4f46e5]' : 'bg-slate-100 text-slate-400'
              }`}
            >
              {n.actionLink === 'doctors' ? (
                <Share2 className="w-4 h-4" />
              ) : n.actionLink === 'case-studies' ? (
                <FileText className="w-4 h-4" />
              ) : (
                <DollarSign className="w-4 h-4" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-sm font-bold text-slate-900 truncate">{n.title}</h4>
                <span className="text-[11px] text-slate-400 whitespace-nowrap flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {n.time}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1">{n.detail}</p>
              <div className="mt-2">
                <button
                  onClick={() => onNavigate(n.actionLink as NavigationTab)}
                  className="text-xs font-semibold text-[#4f46e5] hover:underline"
                >
                  View Details &gt;
                </button>
              </div>
            </div>

            {n.unread && (
              <span className="w-2 h-2 rounded-full bg-[#4f46e5] mt-1 flex-shrink-0" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
