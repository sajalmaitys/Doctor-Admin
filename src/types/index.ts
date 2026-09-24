export interface Doctor {
  id: string;
  name: string;
  code: string;
  initials: string;
  avatarBg: string;
  avatarText: string;
  mobile: string;
  city: string;
  status: 'Active' | 'Inactive';
  lastUpdated: string;
  createdDate: string;
  updatedBy: string;
  doctorsReferred: number;
  email?: string;
  specialization?: string;
  hospital?: string;
}

export interface ActivityItem {
  id: string;
  doctorId: string;
  title: string;
  timestamp: string;
  description: string;
  type: 'referral' | 'status' | 'profile' | 'payout';
}

export interface TopReferrer {
  rank: number;
  name: string;
  code: string;
  city: string;
  doctorsReferred: number;
}

export type NavigationTab =
  | 'dashboard'
  | 'languages'
  | 'testimonials'
  | 'case-studies'
  | 'feedback'
  | 'education'
  | 'doctors'
  | 'leaderboard'
  | 'referrals'
  | 'notifications';
