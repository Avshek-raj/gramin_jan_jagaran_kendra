
import { Program, Member } from './types';

export const INITIAL_PROGRAMS: Program[] = [
  {
    id: 'p1',
    title: 'Digital Nepal: Rural IT Center',
    description: 'A groundbreaking proposal to establish IT training labs in rural Nepal, providing youth with coding skills and digital literacy to compete in the global economy.',
    category: 'Education',
    imageUrl: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&q=80&w=800',
    goalAmount: 30000,
    currentAmount: 12000,
    status: 'active'
  },
  {
    id: 'p2',
    title: 'Karnali Health Mission',
    description: 'Bringing specialized doctors and life-saving medicine to the most remote villages of the Karnali region where healthcare access is a major challenge.',
    category: 'Health',
    imageUrl: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&q=80&w=800',
    goalAmount: 20000,
    currentAmount: 15400,
    status: 'active'
  },
  {
    id: 'p3',
    title: 'Terai Maternal Wellness Drive',
    description: 'A successful initiative providing nutritional support and prenatal checkups for expecting mothers across five districts in the Terai plains.',
    category: 'Health',
    imageUrl: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=800',
    impactStatement: 'Directly supported 1,500+ mothers, significantly reducing maternal and infant mortality rates in the project area.',
    status: 'completed',
    goalAmount: 15000,
    currentAmount: 15200,
    collaborators: ['Ministry of Health Nepal', 'Local Palika Health Posts']
  },
  {
    id: 'p4',
    title: 'Himalayan Skill Development',
    description: 'Empowering local communities in the Everest and Annapurna regions through sustainable tourism and hospitality training.',
    category: 'Community',
    imageUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=800',
    goalAmount: 12000,
    currentAmount: 4500,
    status: 'active'
  }
];

export const INITIAL_MEMBERS: Member[] = [
  {
    id: 'm1',
    name: 'Bharat Adhikari',
    role: 'Executive Director',
    bio: 'Dedicated to rural development in Nepal for over 15 years, with a focus on grassroots mobilization and social justice.',
    imageUrl: 'https://picsum.photos/seed/bharat/400/400',
    linkedIn: '#'
  },
  {
    id: 'm2',
    name: 'Sushila Thapa',
    role: 'Program Manager',
    bio: 'Expert in public health and education, leading our IT training and health camp initiatives across all seven provinces.',
    imageUrl: 'https://picsum.photos/seed/sushila/400/400',
    linkedIn: '#'
  }
];
