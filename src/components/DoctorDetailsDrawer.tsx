import React, { useState, useEffect } from 'react';
import { X, User, Briefcase, Link as LinkIcon, Clock, Check, Copy } from 'lucide-react';
import { Doctor, ActivityItem } from '../types';

interface DoctorDetailsDrawerProps {
  doctor: Doctor | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedDoctor: Doctor) => void;
  activities: ActivityItem[];
  onAddActivity?: (activity: Omit<ActivityItem, 'id'>) => void;
}

const CITIES = [
  'Lucknow',
  'Varanasi',
  'Delhi',
  'Purani bazar jaunpur',
  'Begumganj chungi jaunpur',
  'Bhira market Azamgarh',
  'Mumbai',
  'Kolkata',
  'Bangalore',
];

export const DoctorDetailsDrawer: React.FC<DoctorDetailsDrawerProps> = ({
  doctor,
  isOpen,
  onClose,
  onSave,
  activities,
  onAddActivity,
}) => {
  const [activeTab, setActiveTab] = useState<'details' | 'activity'>('details');
  const [formData, setFormData] = useState<Doctor | null>(null);
  const [copied, setCopied] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (doctor) {
      setFormData({ ...doctor });
    }
  }, [doctor]);

  if (!isOpen || !doctor || !formData) {
    return null;
  }

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(formData.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.mobile.trim()) {
      alert('Please fill out the required Name and Mobile fields.');
      return;
    }

    const now = new Date();
    const formattedDate = `${now.getDate()} ${now.toLocaleString('default', { month: 'short' })} ${now.getFullYear()}`;

    const updated = {
      ...formData,
      lastUpdated: formattedDate,
      updatedBy: 'Admin User',
    };

    onSave(updated);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 2000);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim() || !onAddActivity) return;

    const now = new Date();
    const timeString = `${now.getDate()} ${now.toLocaleString('default', { month: 'short' })} ${now.getFullYear()}, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    onAddActivity({
      doctorId: doctor.id,
      title: 'Admin verification note',
      timestamp: timeString,
      description: newNote.trim(),
      type: 'profile',
    });
    setNewNote('');
  };

  const doctorActivities = activities.filter((act) => act.doctorId === doctor.id);

  return (
    <aside
      className="w-full md:w-[370px] bg-white border-l border-slate-200 flex flex-col flex-shrink-0 h-screen sticky top-0 right-0 z-40 shadow-[-4px_0_12px_rgba(0,0,0,0.02)]"
      data-purpose="details-drawer"
    >
      {/* Drawer Header */}
      <div className="p-5 flex items-center justify-between border-b border-slate-100 flex-shrink-0 bg-white">
        <h2 className="text-base font-bold text-slate-900">Doctor details</h2>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-md hover:bg-slate-100 cursor-pointer"
          type="button"
          aria-label="Close doctor details"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Drawer Scrollable Body */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {/* Doctor Profile Overview Card */}
        <div className="flex items-center gap-4">
          <div
            className={`w-14 h-14 rounded-full ${formData.avatarBg} ${formData.avatarText} flex items-center justify-center font-bold text-lg`}
          >
            {formData.initials}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-900 text-base">{formData.name}</h3>
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                  formData.status === 'Active'
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {formData.status}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Code: {formData.code}</p>
            <p className="text-xs text-slate-400 mt-0.5">Last updated {formData.lastUpdated}</p>
          </div>
        </div>

        {/* Navigation Tabs inside Drawer */}
        <div className="flex border-b border-slate-200 gap-6 text-sm font-medium">
          <button
            type="button"
            onClick={() => setActiveTab('details')}
            className={`pb-2 transition-colors ${
              activeTab === 'details'
                ? 'text-[#4f46e5] border-b-2 border-[#4f46e5] font-semibold'
                : 'text-slate-500 hover:text-slate-700 font-normal'
            }`}
          >
            Details
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('activity')}
            className={`pb-2 transition-colors relative ${
              activeTab === 'activity'
                ? 'text-[#4f46e5] border-b-2 border-[#4f46e5] font-semibold'
                : 'text-slate-500 hover:text-slate-700 font-normal'
            }`}
          >
            Activity
            {doctorActivities.length > 0 && (
              <span className="ml-1.5 px-1.5 py-0.2 bg-slate-100 text-slate-600 rounded-full text-[10px]">
                {doctorActivities.length}
              </span>
            )}
          </button>
        </div>

        {activeTab === 'details' ? (
          <form id="doctor-edit-form" onSubmit={handleSave} className="space-y-6">
            {/* Section 1: Contact Information */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase tracking-wider">
                <User className="w-4 h-4 text-[#4f46e5]" />
                <span>Contact information</span>
              </div>

              {/* Name Field */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#4f46e5] focus:ring-1 focus:ring-[#4f46e5] transition-shadow"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              {/* Mobile Field */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mobile <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#4f46e5] focus:ring-1 focus:ring-[#4f46e5] transition-shadow"
                  type="text"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  required
                />
              </div>

              {/* City Field */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  City <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800 bg-white focus:outline-none focus:border-[#4f46e5] focus:ring-1 focus:ring-[#4f46e5] cursor-pointer"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  >
                    {CITIES.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Section 2: Professional Details */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase tracking-wider">
                <Briefcase className="w-4 h-4 text-[#4f46e5]" />
                <span>Professional details</span>
              </div>

              {/* Status Field */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Status <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    className="w-full px-3 py-2 pl-7 text-xs border border-slate-200 rounded-lg text-slate-800 bg-white focus:outline-none focus:border-[#4f46e5] focus:ring-1 focus:ring-[#4f46e5] cursor-pointer"
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value as 'Active' | 'Inactive',
                      })
                    }
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        formData.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Referral Information */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase tracking-wider">
                <LinkIcon className="w-4 h-4 text-[#4f46e5]" />
                <span>Referral information</span>
              </div>

              {/* Referral Code Field */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-medium text-slate-600">Referral code</label>
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="text-[11px] text-[#4f46e5] hover:underline flex items-center gap-1"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                <input
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-600 bg-slate-50 cursor-not-allowed font-mono"
                  readOnly
                  type="text"
                  value={formData.code}
                />
              </div>

              {/* Doctors Referred Field */}
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Doctors referred</label>
                <input
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#4f46e5] focus:ring-1 focus:ring-[#4f46e5] tabular-nums"
                  type="number"
                  min="0"
                  value={formData.doctorsReferred}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      doctorsReferred: Math.max(0, parseInt(e.target.value, 10) || 0),
                    })
                  }
                />
              </div>
            </div>

            {/* Section 4: Audit Details Box */}
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 space-y-2 text-xs">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 w-full">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Created date</span>
                    <span className="font-medium text-slate-700 text-[11px]">{formData.createdDate}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Last updated</span>
                    <span className="font-medium text-slate-700 text-[11px]">{formData.lastUpdated}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-400 block text-[11px]">Updated by</span>
                    <span className="font-medium text-slate-700 text-[11px]">{formData.updatedBy}</span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        ) : (
          /* Activity Timeline Tab */
          <div className="space-y-4">
            <div className="text-xs text-slate-500">
              Audit log of referral commissions, profile updates, and account credentials.
            </div>

            <div className="relative pl-4 border-l border-slate-200 space-y-4">
              {doctorActivities.length > 0 ? (
                doctorActivities.map((act) => (
                  <div key={act.id} className="relative group">
                    <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#4f46e5] ring-4 ring-white" />
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-800">{act.title}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{act.description}</p>
                      <span className="text-[10px] text-slate-400 block mt-1">{act.timestamp}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-xs text-slate-400 py-3">No activity records logged for this doctor yet.</div>
              )}
            </div>

            {/* Quick add admin note */}
            <form onSubmit={handleAddNote} className="pt-4 border-t border-slate-100">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Add Admin Note</label>
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                rows={2}
                placeholder="Type note or call log update..."
                className="w-full p-2 text-xs border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#4f46e5] focus:ring-1 focus:ring-[#4f46e5]"
              />
              <button
                type="submit"
                disabled={!newNote.trim()}
                className="mt-2 w-full py-1.5 px-3 bg-slate-800 hover:bg-slate-900 disabled:opacity-50 text-white text-xs font-medium rounded-lg transition-colors"
              >
                Log Note
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Drawer Bottom Actions Footer - Fixed at bottom */}
      <div className="p-4 border-t border-slate-200/80 flex items-center justify-end gap-3 bg-white flex-shrink-0 sticky bottom-0 z-10 shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
        <button
          onClick={onClose}
          className="px-4 py-2 border border-slate-200 text-xs font-semibold text-slate-700 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
          type="button"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="px-4 py-2 bg-[#4f46e5] hover:bg-[#4338ca] text-xs font-semibold text-white rounded-lg shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer active:scale-95"
        >
          {saveSuccess ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Saved!</span>
            </>
          ) : (
            'Save changes'
          )}
        </button>
      </div>
    </aside>
  );
};
