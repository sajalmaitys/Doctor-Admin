import React, { useState } from 'react';
import {
  Users,
  Search,
  ArrowUpDown,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Eye,
  Trash2,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { Doctor } from '../types';

interface AllDoctorsCardProps {
  doctors: Doctor[];
  selectedDoctor: Doctor | null;
  onSelectDoctor: (doctor: Doctor) => void;
  onDeleteDoctor: (doctorId: string) => void;
  onToggleStatus: (doctorId: string) => void;
}

type SortField = 'name' | 'city' | 'status' | 'lastUpdated';
type SortOrder = 'asc' | 'desc';

export const AllDoctorsCard: React.FC<AllDoctorsCardProps> = ({
  doctors,
  selectedDoctor,
  onSelectDoctor,
  onDeleteDoctor,
  onToggleStatus,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('All cities');
  const [selectedStatus, setSelectedStatus] = useState('All status');
  const [selectedIds, setSelectedIds] = useState<string[]>(['doc-1']);
  const [sortField, setSortField] = useState<SortField>('lastUpdated');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [openActionId, setOpenActionId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Extract unique cities
  const cities = ['All cities', ...Array.from(new Set(doctors.map((d) => d.city)))];

  // Filtering logic
  const filteredDoctors = doctors.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.mobile.includes(searchTerm);

    const matchesCity = selectedCity === 'All cities' || doc.city === selectedCity;
    const matchesStatus = selectedStatus === 'All status' || doc.status === selectedStatus;

    return matchesSearch && matchesCity && matchesStatus;
  });

  // Sorting logic
  const sortedDoctors = [...filteredDoctors].sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];

    if (sortField === 'lastUpdated') {
      // Simple string comparison or date
      return sortOrder === 'asc'
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }

    if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  // Pagination logic
  const totalPages = Math.max(1, Math.ceil(sortedDoctors.length / itemsPerPage));
  const paginatedDoctors = sortedDoctors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const handleToggleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filteredDoctors.map((d) => d.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleSelectOne = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isAllSelected =
    filteredDoctors.length > 0 && selectedIds.length === filteredDoctors.length;

  return (
    <section
      className="bg-white border border-slate-200/80 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.02)] p-5"
      data-purpose="all-doctors-card"
    >
      {/* Header row of the card */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-50 text-[#4f46e5] flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-slate-800 text-base leading-tight">All doctors</h2>
            <p className="text-xs text-slate-400">View and manage all registered doctors.</p>
          </div>
        </div>
        <span className="text-xs text-slate-500 font-medium tabular-nums">
          {filteredDoctors.length} {filteredDoctors.length === 1 ? 'doctor' : 'doctors'}
        </span>
      </div>

      {/* Filter & Search Controls Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-4">
        {/* Search input */}
        <div className="md:col-span-6 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-xs placeholder:text-slate-400 focus:outline-none focus:border-[#4f46e5] focus:ring-1 focus:ring-[#4f46e5]"
            placeholder="Search doctors by name, code or city..."
            type="text"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-xs text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          )}
        </div>

        {/* City dropdown filter */}
        <div className="md:col-span-3 relative">
          <span className="absolute -top-2 left-2 px-1 bg-white text-[10px] font-semibold text-slate-600 z-10">
            City
          </span>
          <select
            value={selectedCity}
            onChange={(e) => {
              setSelectedCity(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full py-2 px-3 border border-slate-200 rounded-lg text-xs text-slate-700 bg-white focus:outline-none focus:border-[#4f46e5] focus:ring-1 focus:ring-[#4f46e5] cursor-pointer"
          >
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Status dropdown filter */}
        <div className="md:col-span-3 relative">
          <span className="absolute -top-2 left-2 px-1 bg-white text-[10px] font-semibold text-slate-600 z-10">
            Status
          </span>
          <select
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full py-2 px-3 border border-slate-200 rounded-lg text-xs text-slate-700 bg-white focus:outline-none focus:border-[#4f46e5] focus:ring-1 focus:ring-[#4f46e5] cursor-pointer"
          >
            <option value="All status">All status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Bulk actions banner if items are selected */}
      {selectedIds.length > 0 && (
        <div className="mb-3 px-3 py-2 bg-indigo-50/70 border border-indigo-100 rounded-lg flex items-center justify-between text-xs text-indigo-900">
          <span className="font-medium">
            {selectedIds.length} doctor{selectedIds.length > 1 ? 's' : ''} selected
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                selectedIds.forEach((id) => onToggleStatus(id));
              }}
              className="px-2.5 py-1 bg-white border border-indigo-200 hover:bg-indigo-100 rounded font-medium text-[#4f46e5] transition-colors"
            >
              Toggle Status
            </button>
            <button
              type="button"
              onClick={() => setSelectedIds([])}
              className="px-2 py-1 text-slate-500 hover:text-slate-700 transition-colors"
            >
              Deselect all
            </button>
          </div>
        </div>
      )}

      {/* Doctors Table */}
      <div className="overflow-x-auto min-h-[300px]">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-xs font-semibold text-slate-600 border-y border-slate-100 bg-slate-50/50">
              <th className="py-2.5 px-3 w-10">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={handleToggleSelectAll}
                  className="w-4 h-4 rounded border-slate-300 text-[#4f46e5] focus:ring-[#4f46e5] cursor-pointer"
                />
              </th>
              <th className="py-2.5 px-3">
                <button
                  type="button"
                  onClick={() => handleSort('name')}
                  className="inline-flex items-center gap-1 cursor-pointer hover:text-slate-900"
                >
                  Doctor
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </button>
              </th>
              <th className="py-2.5 px-3">Mobile</th>
              <th className="py-2.5 px-3">
                <button
                  type="button"
                  onClick={() => handleSort('city')}
                  className="inline-flex items-center gap-1 cursor-pointer hover:text-slate-900"
                >
                  City
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </button>
              </th>
              <th className="py-2.5 px-3">
                <button
                  type="button"
                  onClick={() => handleSort('status')}
                  className="inline-flex items-center gap-1 cursor-pointer hover:text-slate-900"
                >
                  Status
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </button>
              </th>
              <th className="py-2.5 px-3">
                <button
                  type="button"
                  onClick={() => handleSort('lastUpdated')}
                  className="inline-flex items-center gap-1 cursor-pointer hover:text-slate-900"
                >
                  Last updated
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </button>
              </th>
              <th className="py-2.5 px-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs text-slate-600">
            {paginatedDoctors.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-slate-400">
                  <div className="max-w-xs mx-auto">
                    <p className="font-semibold text-slate-600 text-sm">No doctors found</p>
                    <p className="text-xs text-slate-400 mt-1">
                      Try adjusting your search query or reset the filters.
                    </p>
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedCity('All cities');
                        setSelectedStatus('All status');
                      }}
                      className="mt-3 px-3 py-1.5 text-xs text-[#4f46e5] font-semibold border border-indigo-200 rounded-lg hover:bg-indigo-50"
                    >
                      Reset filters
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedDoctors.map((doc) => {
                const isSelected = selectedDoctor?.id === doc.id;
                const isChecked = selectedIds.includes(doc.id);
                const isMenuOpen = openActionId === doc.id;

                return (
                  <tr
                    key={doc.id}
                    onClick={() => onSelectDoctor(doc)}
                    className={`transition-colors cursor-pointer relative ${
                      isSelected
                        ? 'bg-indigo-50/40 hover:bg-indigo-50/60'
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="py-3 px-3" onClick={(e) => handleToggleSelectOne(doc.id, e)}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="w-4 h-4 rounded border-slate-300 text-[#4f46e5] focus:ring-[#4f46e5] cursor-pointer"
                      />
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full ${doc.avatarBg} ${doc.avatarText} font-bold text-xs flex items-center justify-center`}
                        >
                          {doc.initials}
                        </div>
                        <div>
                          <div
                            className={`text-sm ${
                              isSelected ? 'font-bold text-slate-900' : 'font-semibold text-slate-900'
                            }`}
                          >
                            {doc.name}
                          </div>
                          <div className="text-[11px] text-slate-400 font-mono">{doc.code}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-slate-700 font-medium tabular-nums">
                      {doc.mobile}
                    </td>
                    <td className="py-3 px-3 text-slate-600">{doc.city}</td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                          doc.status === 'Active'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            doc.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'
                          }`}
                        />
                        {doc.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-600 whitespace-nowrap tabular-nums">
                      {doc.lastUpdated}
                    </td>
                    <td className="py-3 px-3 text-center relative" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={() => setOpenActionId(isMenuOpen ? null : doc.id)}
                        className="w-7 h-7 inline-flex items-center justify-center rounded hover:bg-slate-200/70 text-slate-500 transition-colors"
                        title="More options"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>

                      {/* Dropdown menu */}
                      {isMenuOpen && (
                        <div
                          className="absolute right-3 top-10 w-44 bg-white border border-slate-200 rounded-lg shadow-lg z-30 py-1 text-left text-xs animate-in fade-in zoom-in-95 duration-100"
                          onMouseLeave={() => setOpenActionId(null)}
                        >
                          <button
                            type="button"
                            onClick={() => {
                              onSelectDoctor(doc);
                              setOpenActionId(null);
                            }}
                            className="w-full px-3 py-2 flex items-center gap-2 text-slate-700 hover:bg-slate-50 hover:text-indigo-600"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View details</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              onToggleStatus(doc.id);
                              setOpenActionId(null);
                            }}
                            className="w-full px-3 py-2 flex items-center gap-2 text-slate-700 hover:bg-slate-50"
                          >
                            {doc.status === 'Active' ? (
                              <>
                                <XCircle className="w-3.5 h-3.5 text-amber-500" />
                                <span>Mark Inactive</span>
                              </>
                            ) : (
                              <>
                                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                                <span>Mark Active</span>
                              </>
                            )}
                          </button>
                          <div className="border-t border-slate-100 my-1" />
                          <button
                            type="button"
                            onClick={() => {
                              if (window.confirm(`Delete ${doc.name}?`)) {
                                onDeleteDoctor(doc.id);
                              }
                              setOpenActionId(null);
                            }}
                            className="w-full px-3 py-2 flex items-center gap-2 text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete doctor</span>
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Table Pagination Footer */}
      <div className="flex items-center justify-between pt-4 mt-2 border-t border-slate-100 text-xs text-slate-500 font-medium">
        <span>
          Showing {paginatedDoctors.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to{' '}
          {Math.min(currentPage * itemsPerPage, filteredDoctors.length)} of {filteredDoctors.length}{' '}
          {filteredDoctors.length === 1 ? 'doctor' : 'doctors'}
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 text-slate-400 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          {Array.from({ length: totalPages }).map((_, idx) => {
            const pageNum = idx + 1;
            const isCurrent = pageNum === currentPage;
            return (
              <button
                key={pageNum}
                type="button"
                onClick={() => setCurrentPage(pageNum)}
                className={`w-7 h-7 flex items-center justify-center rounded border tabular-nums ${
                  isCurrent
                    ? 'border-[#4f46e5] bg-indigo-50 text-[#4f46e5] font-bold'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {pageNum}
              </button>
            );
          })}
          <button
            type="button"
            disabled={currentPage === totalPages || filteredDoctors.length === 0}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 text-slate-400 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
