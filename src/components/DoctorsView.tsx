import React from 'react';
import { Plus } from 'lucide-react';
import { Doctor, TopReferrer } from '../types';
import { TopReferrersCard } from './TopReferrersCard';
import { AllDoctorsCard } from './AllDoctorsCard';

interface DoctorsViewProps {
  doctors: Doctor[];
  topReferrers: TopReferrer[];
  selectedDoctor: Doctor | null;
  onSelectDoctor: (doctor: Doctor) => void;
  onOpenAddModal: () => void;
  onViewAllReferrers: () => void;
  onDeleteDoctor: (doctorId: string) => void;
  onToggleStatus: (doctorId: string) => void;
}

export const DoctorsView: React.FC<DoctorsViewProps> = ({
  doctors,
  topReferrers,
  selectedDoctor,
  onSelectDoctor,
  onOpenAddModal,
  onViewAllReferrers,
  onDeleteDoctor,
  onToggleStatus,
}) => {
  const handleSelectByName = (name: string) => {
    const found = doctors.find((d) => d.name.toLowerCase() === name.toLowerCase());
    if (found) {
      onSelectDoctor(found);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Page Header */}
      <header className="mb-6">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-2">
          <span>Dashboard</span>
          <span className="text-slate-400">&gt;</span>
          <span className="text-slate-800 font-semibold">Doctors</span>
        </div>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Doctors</h1>
            <p className="text-sm text-slate-500 mt-1 font-normal">
              Manage doctors, view details, and track their referral activity.
            </p>
          </div>
          {/* Add Doctor Action Button */}
          <button
            onClick={onOpenAddModal}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#4f46e5] hover:bg-[#4338ca] text-white text-sm font-semibold rounded-lg shadow-sm transition-all cursor-pointer"
            type="button"
          >
            <Plus className="w-4 h-4 stroke-[2.2]" />
            Add doctor
          </button>
        </div>
      </header>

      {/* Section: Top Referrers Card */}
      <TopReferrersCard
        referrers={topReferrers}
        onViewAll={onViewAllReferrers}
        onSelectDoctorByName={handleSelectByName}
      />

      {/* Section: All Doctors List Card */}
      <AllDoctorsCard
        doctors={doctors}
        selectedDoctor={selectedDoctor}
        onSelectDoctor={onSelectDoctor}
        onDeleteDoctor={onDeleteDoctor}
        onToggleStatus={onToggleStatus}
      />
    </div>
  );
};
