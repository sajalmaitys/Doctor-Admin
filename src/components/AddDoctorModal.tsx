import React, { useState } from 'react';
import { X, RefreshCw, UserPlus } from 'lucide-react';
import { Doctor } from '../types';

interface AddDoctorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddDoctor: (doctor: Doctor) => void;
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

const AVATAR_COLORS = [
  { bg: 'bg-blue-100', text: 'text-indigo-600' },
  { bg: 'bg-indigo-50', text: 'text-indigo-600' },
  { bg: 'bg-purple-100', text: 'text-purple-700' },
  { bg: 'bg-emerald-100', text: 'text-emerald-700' },
  { bg: 'bg-amber-100', text: 'text-amber-700' },
];

export const AddDoctorModal: React.FC<AddDoctorModalProps> = ({
  isOpen,
  onClose,
  onAddDoctor,
}) => {
  const generateCode = () => 'ZH' + Math.floor(100000 + Math.random() * 900000);

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('+91 ');
  const [city, setCity] = useState('Lucknow');
  const [status, setStatus] = useState<'Active' | 'Inactive'>('Active');
  const [code, setCode] = useState(generateCode());
  const [specialization, setSpecialization] = useState('General Medicine');
  const [hospital, setHospital] = useState('');
  const [referred, setReferred] = useState('0');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Please enter doctor name');
      return;
    }

    // Extract initials
    const words = name.trim().replace(/^Dr\.?\s*/i, '').split(/\s+/);
    let initials = 'DR';
    if (words.length >= 2) {
      initials = (words[0][0] + words[1][0]).toUpperCase();
    } else if (words.length === 1 && words[0].length >= 2) {
      initials = words[0].substring(0, 2).toUpperCase();
    }

    const randomColor = AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];
    const now = new Date();
    const formattedDate = `${now.getDate()} ${now.toLocaleString('default', { month: 'short' })} ${now.getFullYear()}`;
    const timeFormatted = `${formattedDate}, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    const newDoc: Doctor = {
      id: `doc-${Date.now()}`,
      name: name.trim().startsWith('Dr') ? name.trim() : `Dr. ${name.trim()}`,
      code,
      initials,
      avatarBg: randomColor.bg,
      avatarText: randomColor.text,
      mobile: mobile.trim(),
      city,
      status,
      lastUpdated: formattedDate,
      createdDate: timeFormatted,
      updatedBy: 'Admin User',
      doctorsReferred: parseInt(referred, 10) || 0,
      specialization,
      hospital: hospital.trim() || `${city} Medical Center`,
    };

    onAddDoctor(newDoc);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-[#4f46e5] flex items-center justify-center">
              <UserPlus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Add New Doctor</h3>
              <p className="text-xs text-slate-500">Register a doctor to referral network</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Doctor Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Dr. Rajesh Verma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#4f46e5] focus:ring-1 focus:ring-[#4f46e5]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#4f46e5] focus:ring-1 focus:ring-[#4f46e5]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                City <span className="text-red-500">*</span>
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800 bg-white focus:outline-none focus:border-[#4f46e5] focus:ring-1 focus:ring-[#4f46e5] cursor-pointer"
              >
                {CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Specialization
              </label>
              <input
                type="text"
                placeholder="e.g. Cardiology"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#4f46e5] focus:ring-1 focus:ring-[#4f46e5]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Hospital / Clinic
              </label>
              <input
                type="text"
                placeholder="e.g. Apollo Hospital"
                value={hospital}
                onChange={(e) => setHospital(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#4f46e5] focus:ring-1 focus:ring-[#4f46e5]"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700">Referral Code</label>
                <button
                  type="button"
                  onClick={() => setCode(generateCode())}
                  className="text-[11px] text-[#4f46e5] hover:underline flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Regenerate</span>
                </button>
              </div>
              <input
                type="text"
                readOnly
                value={code}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-600 bg-slate-50 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as 'Active' | 'Inactive')}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800 bg-white focus:outline-none focus:border-[#4f46e5] focus:ring-1 focus:ring-[#4f46e5]"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Initial Doctors Referred
              </label>
              <input
                type="number"
                min="0"
                value={referred}
                onChange={(e) => setReferred(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#4f46e5] focus:ring-1 focus:ring-[#4f46e5]"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-[#4f46e5] hover:bg-[#4338ca] rounded-lg shadow-sm transition-colors"
            >
              Add Doctor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
