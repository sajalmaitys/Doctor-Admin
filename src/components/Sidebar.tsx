import React from 'react';
import {
  Home,
  Globe,
  Quote,
  FileText,
  MessageSquare,
  BookOpen,
  Users,
  Trophy,
  Share2,
  Bell,
  LogOut,
  X,
  Activity,
} from 'lucide-react';
import { NavigationTab } from '../types';

interface SidebarProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  unreadCount?: number;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  unreadCount = 3,
  mobileOpen = false,
  onCloseMobile,
}) => {
  const navItems = [
    { id: 'dashboard' as NavigationTab, label: 'Dashboard', icon: Home },
    { id: 'languages' as NavigationTab, label: 'Languages', icon: Globe },
    { id: 'testimonials' as NavigationTab, label: 'Testimonials', icon: Quote },
    { id: 'case-studies' as NavigationTab, label: 'Case Studies', icon: FileText },
    { id: 'feedback' as NavigationTab, label: 'Doctor Feedback', icon: MessageSquare },
    { id: 'education' as NavigationTab, label: 'Education', icon: BookOpen },
    { id: 'doctors' as NavigationTab, label: 'Doctors', icon: Users },
    { id: 'leaderboard' as NavigationTab, label: 'Leaderboard', icon: Trophy },
    { id: 'referrals' as NavigationTab, label: 'Referrals', icon: Share2 },
    { id: 'notifications' as NavigationTab, label: 'Notifications', icon: Bell, badge: unreadCount },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`w-64 bg-[#111625] text-slate-300 flex flex-col flex-shrink-0 z-50 h-screen fixed lg:static top-0 bottom-0 left-0 transition-transform duration-200 ease-in-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        data-purpose="sidebar"
      >
        {/* Brand Logo Header */}
        <div className="px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#4f46e5] flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <Activity className="w-5 h-5 stroke-[2.2]" />
            </div>
            <span className="font-bold text-lg text-white tracking-tight">Doctor Admin</span>
          </div>

          {/* Close mobile button */}
          <button
            onClick={onCloseMobile}
            className="lg:hidden text-slate-400 hover:text-white p-1"
            title="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 space-y-1 mt-1 text-sm font-medium overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onSelectTab(item.id);
                  if (onCloseMobile) onCloseMobile();
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors text-left ${
                  isActive
                    ? 'bg-[#4f46e5] text-white font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-[#1a2236]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2]' : 'stroke-[1.8]'}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`w-5 h-5 flex items-center justify-center text-xs font-semibold rounded-full tabular-nums ${
                      isActive ? 'bg-white text-[#4f46e5]' : 'bg-blue-600 text-white'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Logout Option */}
        <div className="p-4 border-t border-slate-800/80 flex-shrink-0">
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Are you sure you want to log out of Doctor Admin?')) {
                alert('Session ended safely.');
              }
            }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-[#1a2236] transition-colors text-sm font-medium text-left"
          >
            <LogOut className="w-5 h-5 stroke-[1.8]" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};
