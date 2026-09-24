import React, { useState } from 'react';
import { Globe, Check, AlertCircle, Plus } from 'lucide-react';

interface LanguageItem {
  id: string;
  name: string;
  nativeName: string;
  code: string;
  completion: number;
  active: boolean;
  doctorsCount: number;
}

export const LanguagesView: React.FC = () => {
  const [languages, setLanguages] = useState<LanguageItem[]>([
    {
      id: 'en',
      name: 'English (US & India)',
      nativeName: 'English',
      code: 'en-IN',
      completion: 100,
      active: true,
      doctorsCount: 1420,
    },
    {
      id: 'hi',
      name: 'Hindi',
      nativeName: 'हिन्दी',
      code: 'hi-IN',
      completion: 98,
      active: true,
      doctorsCount: 890,
    },
    {
      id: 'bn',
      name: 'Bengali',
      nativeName: 'বাংলা',
      code: 'bn-IN',
      completion: 92,
      active: true,
      doctorsCount: 230,
    },
    {
      id: 'mr',
      name: 'Marathi',
      nativeName: 'मराठी',
      code: 'mr-IN',
      completion: 86,
      active: true,
      doctorsCount: 145,
    },
    {
      id: 'ta',
      name: 'Tamil',
      nativeName: 'தமிழ்',
      code: 'ta-IN',
      completion: 82,
      active: true,
      doctorsCount: 110,
    },
    {
      id: 'te',
      name: 'Telugu',
      nativeName: 'తెలుగు',
      code: 'te-IN',
      completion: 76,
      active: false,
      doctorsCount: 95,
    },
  ]);

  const toggleLanguage = (id: string) => {
    setLanguages((prev) =>
      prev.map((l) => (l.id === id ? { ...l, active: !l.active } : l))
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-2">
          <span>Settings</span>
          <span>&gt;</span>
          <span className="text-slate-800 font-semibold">Portal Languages</span>
        </div>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Languages</h1>
            <p className="text-sm text-slate-500 mt-1">
              Configure multilingual support for doctor onboarding, portal dashboard, and patient intake forms.
            </p>
          </div>
          <button
            onClick={() => alert('New translation pack workflow initiated.')}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#4f46e5] hover:bg-[#4338ca] text-white text-sm font-semibold rounded-lg shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Language</span>
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {languages.map((lang) => (
          <div
            key={lang.id}
            className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{lang.name}</h3>
                  <p className="text-sm text-slate-400 font-medium">{lang.nativeName} ({lang.code})</p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleLanguage(lang.id)}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    lang.active ? 'bg-[#4f46e5]' : 'bg-slate-200'
                  }`}
                  role="switch"
                  aria-checked={lang.active}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      lang.active ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="mt-4 space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 font-medium">Translation Progress</span>
                  <span className="font-bold text-slate-800 tabular-nums">{lang.completion}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all"
                    style={{ width: `${lang.completion}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>{lang.doctorsCount} active users</span>
              <span className={`font-semibold ${lang.active ? 'text-emerald-600' : 'text-slate-400'}`}>
                {lang.active ? 'Published' : 'Disabled'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
