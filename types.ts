
export interface Program {
  id: string;
  title: string;
  description: string;
  category: 'Environment' | 'Education' | 'Health' | 'Community';
  imageUrl: string;
  galleryImages?: string[];
  collaborators?: string[];
  goalAmount: number;
  currentAmount: number;
  impactStatement?: string;
  status: 'active' | 'completed';
  comments?: Comment[];
}

export interface Comment {
  id: string;
  author: string;
  text: string;
  date: string;
}

export interface Member {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  linkedIn?: string;
}

export interface Donation {
  id: string;
  donorName: string;
  amount: number;
  programId: string;
  message?: string;
  date: string;
}

export interface Stat {
  label: string;
  val: string;
  icon: string;
}

export type ViewState = 'home' | 'programs' | 'members' | 'donate' | 'admin' | 'contact' | 'login';
