/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Menu, PanelRightOpen } from 'lucide-react';
import { Doctor, ActivityItem, NavigationTab } from './types';
import {
  INITIAL_DOCTORS,
  INITIAL_TOP_REFERRERS,
  INITIAL_ACTIVITIES,
  NOTIFICATIONS_DATA,
} from './data/mockData';
import { Sidebar } from './components/Sidebar';
import { DoctorsView } from './components/DoctorsView';
import { DoctorDetailsDrawer } from './components/DoctorDetailsDrawer';
import { AddDoctorModal } from './components/AddDoctorModal';

import { DashboardView } from './components/screens/DashboardView';
import { LeaderboardView } from './components/screens/LeaderboardView';
import { ReferralsView } from './components/screens/ReferralsView';
import { LanguagesView } from './components/screens/LanguagesView';
import { TestimonialsView } from './components/screens/TestimonialsView';
import { CaseStudiesView } from './components/screens/CaseStudiesView';
import { FeedbackView } from './components/screens/FeedbackView';
import { EducationView } from './components/screens/EducationView';
import { NotificationsView } from './components/screens/NotificationsView';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('doctors');
  const [doctors, setDoctors] = useState<Doctor[]>(INITIAL_DOCTORS);
  const [topReferrers, setTopReferrers] = useState(INITIAL_TOP_REFERRERS);
  const [activities, setActivities] = useState<ActivityItem[]>(INITIAL_ACTIVITIES);
  const [notifications, setNotifications] = useState(NOTIFICATIONS_DATA);

  // Selected doctor in drawer (default: Dr rp singh)
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(INITIAL_DOCTORS[0]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Update doctor from drawer
  const handleSaveDoctor = (updated: Doctor) => {
    setDoctors((prev) => prev.map((d) => (d.id === updated.id ? updated : d)));
    setSelectedDoctor(updated);

    // If referral count changed, sync top referrers
    setTopReferrers((prev) => {
      const matchIndex = prev.findIndex(
        (tr) => tr.code === updated.code || tr.name === updated.name
      );
      if (matchIndex >= 0) {
        const next = [...prev];
        next[matchIndex] = {
          ...next[matchIndex],
          name: updated.name,
          city: updated.city,
          doctorsReferred: updated.doctorsReferred,
        };
        return next.sort((a, b) => b.doctorsReferred - a.doctorsReferred);
      }
      return prev;
    });
  };

  // Add new doctor
  const handleAddDoctor = (newDoc: Doctor) => {
    setDoctors((prev) => [newDoc, ...prev]);
    setSelectedDoctor(newDoc);
    setIsDrawerOpen(true);

    // Add activity record
    const newAct: ActivityItem = {
      id: `act-${Date.now()}`,
      doctorId: newDoc.id,
      title: 'Doctor registered',
      timestamp: newDoc.createdDate,
      description: `${newDoc.name} registered into doctor network with referral code ${newDoc.code}.`,
      type: 'profile',
    };
    setActivities((prev) => [newAct, ...prev]);
  };

  // Delete doctor
  const handleDeleteDoctor = (doctorId: string) => {
    setDoctors((prev) => prev.filter((d) => d.id !== doctorId));
    if (selectedDoctor?.id === doctorId) {
      setSelectedDoctor(null);
      setIsDrawerOpen(false);
    }
  };

  // Toggle active/inactive
  const handleToggleStatus = (doctorId: string) => {
    setDoctors((prev) =>
      prev.map((d) => {
        if (d.id === doctorId) {
          const nextStatus = d.status === 'Active' ? 'Inactive' : 'Active';
          const updated = { ...d, status: nextStatus as 'Active' | 'Inactive' };
          if (selectedDoctor?.id === doctorId) {
            setSelectedDoctor(updated);
          }
          return updated;
        }
        return d;
      })
    );
  };

  // Add activity item
  const handleAddActivity = (item: Omit<ActivityItem, 'id'>) => {
    const newAct: ActivityItem = {
      ...item,
      id: `act-${Date.now()}`,
    };
    setActivities((prev) => [newAct, ...prev]);
  };

  // Select doctor and show drawer
  const handleSelectDoctor = (doc: Doctor) => {
    setSelectedDoctor(doc);
    setIsDrawerOpen(true);
  };

  // Unread notification count
  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
    <div className="flex h-screen w-full bg-[#f8fafc] text-slate-800 antialiased overflow-hidden">
      {/* Left Sidebar */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        unreadCount={unreadCount}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Viewport */}
      <main
        className="flex-1 flex flex-col min-w-0 bg-[#f8fafc] px-4 sm:px-6 lg:px-8 py-6 overflow-y-auto h-screen"
        data-purpose="content-area"
      >
        {/* Mobile top bar toggle button */}
        <div className="lg:hidden flex items-center justify-between pb-4 mb-2 border-b border-slate-200">
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(true)}
            className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-bold text-base text-slate-800">Doctor Admin</span>
          {selectedDoctor && !isDrawerOpen && (
            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              className="p-2 text-[#4f46e5] hover:bg-indigo-50 rounded-lg"
              title="Open Doctor Details"
            >
              <PanelRightOpen className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* View Switcher based on currentTab */}
        {currentTab === 'doctors' && (
          <DoctorsView
            doctors={doctors}
            topReferrers={topReferrers}
            selectedDoctor={selectedDoctor}
            onSelectDoctor={handleSelectDoctor}
            onOpenAddModal={() => setIsAddModalOpen(true)}
            onViewAllReferrers={() => setCurrentTab('leaderboard')}
            onDeleteDoctor={handleDeleteDoctor}
            onToggleStatus={handleToggleStatus}
          />
        )}

        {currentTab === 'dashboard' && (
          <DashboardView
            doctors={doctors}
            onNavigateToDoctors={() => setCurrentTab('doctors')}
            onNavigateToLeaderboard={() => setCurrentTab('leaderboard')}
          />
        )}

        {currentTab === 'leaderboard' && (
          <LeaderboardView
            topReferrers={topReferrers}
            doctors={doctors}
            onSelectDoctorByName={(name) => {
              const doc = doctors.find((d) => d.name.toLowerCase() === name.toLowerCase());
              if (doc) {
                setSelectedDoctor(doc);
                setCurrentTab('doctors');
                setIsDrawerOpen(true);
              }
            }}
          />
        )}

        {currentTab === 'referrals' && (
          <ReferralsView
            doctors={doctors}
            onSelectDoctor={(doc) => {
              setSelectedDoctor(doc);
              setCurrentTab('doctors');
              setIsDrawerOpen(true);
            }}
          />
        )}

        {currentTab === 'languages' && <LanguagesView />}

        {currentTab === 'testimonials' && <TestimonialsView />}

        {currentTab === 'case-studies' && <CaseStudiesView />}

        {currentTab === 'feedback' && <FeedbackView />}

        {currentTab === 'education' && <EducationView />}

        {currentTab === 'notifications' && (
          <NotificationsView
            notifications={notifications}
            onMarkAllAsRead={handleMarkAllNotificationsRead}
            onNavigate={setCurrentTab}
          />
        )}
      </main>

      {/* Right Drawer: Doctor Details (Visible when on 'doctors' tab and isDrawerOpen is true) */}
      {currentTab === 'doctors' && isDrawerOpen && (
        <DoctorDetailsDrawer
          doctor={selectedDoctor}
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          onSave={handleSaveDoctor}
          activities={activities}
          onAddActivity={handleAddActivity}
        />
      )}

      {/* Re-open drawer button if closed on doctors page */}
      {currentTab === 'doctors' && !isDrawerOpen && selectedDoctor && (
        <button
          type="button"
          onClick={() => setIsDrawerOpen(true)}
          className="fixed bottom-6 right-6 hidden md:flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 shadow-md rounded-xl hover:bg-slate-50 transition-all z-30 font-semibold text-xs text-[#4f46e5]"
          title="Open Doctor Details Drawer"
        >
          <PanelRightOpen className="w-4 h-4 text-[#4f46e5]" />
          <span>Doctor details ({selectedDoctor.name})</span>
        </button>
      )}

      {/* Add Doctor Modal Dialog */}
      <AddDoctorModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddDoctor={handleAddDoctor}
      />
    </div>
  );
}
