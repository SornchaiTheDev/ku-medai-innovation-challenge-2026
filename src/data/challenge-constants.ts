import { Award, Brain, FileText, Leaf, Rocket, Users } from 'lucide-react'

export const challengeConstants = {
  name: 'KU MedAI Innovation Challenge 2026',
  headline: 'Innovate for Health. Empower with AI.',
  subheadline:
    'Unlock the power of Artificial Intelligence to revolutionize Thai Healthcare and Agro-Medicine. Pitch your idea, build a prototype, and win total prizes over 65,000 THB.',

  dates: {
    registrationOpen: 'January 26, 2026 00:00:00',
    registrationClose: 'Febuary 7, 2026 23:59:59',
    finalPitch: 'March 7, 2026',
  },

  timeline: [
    {
      date: 'Jan 26, 2026',
      label: 'Registration Opens',
      icon: 'megaphone',
    },
    {
      date: 'Feb 07, 2026',
      label: 'Workshop & Mentoring',
      description: 'Learn the basics of MedAI',
      icon: 'graduation',
    },
    {
      date: 'Feb 09, 2026',
      label: 'Submission System Opens',
      icon: 'upload',
    },
    {
      date: 'Mar 05, 2026',
      label: 'Initial Screening',
      description: 'Selection of Top Teams',
      icon: 'search',
    },
    {
      date: 'Mar 06, 2026',
      label: 'Finalists Announced',
      icon: 'announcement',
    },
    {
      date: 'Mar 07, 2026',
      label: 'Demo Day & Pitching',
      description: 'On-site at Kasetsart University',
      icon: 'microphone',
    },
  ],

  prizes: [
    { placement: 'Winner', prize: '30,000 THB', icon: 'trophy', badge: '🥇' },
    {
      placement: '1st Runner Up',
      prize: '15,000 THB',
      icon: 'medal',
      badge: '🥈',
    },
    {
      placement: '2nd Runner Up',
      prize: '10,000 THB',
      icon: 'medal',
      badge: '🥉',
    },
    {
      placement: 'Consolation (x2)',
      prize: '5,000 THB',
      icon: 'award',
      badge: '🎖️',
    },
  ],

  tracks: [
    {
      id: 'agro-medicine',
      title: 'Agro-medicine',
      subtitle: 'Smart Health for Agriculture',
      icon: Leaf,
      focus: 'Protecting the backbone of our nation—the farmers.',
      challenges: [
        'Preventing health risks from chemicals or farming machinery',
        'Health monitoring systems for remote agricultural workers',
        'Food production safety standards using AI',
      ],
    },
    {
      id: 'bioinnovation',
      title: 'Bioinnovation',
      subtitle: 'Medical AI & Tech',
      icon: Brain,
      focus: 'Cutting-edge biology meets digital intelligence.',
      challenges: [
        'AI Diagnostics: Screening tools and image analysis (X-ray/MRI)',
        'Predictive Health: AI models to assess disease risks',
        'Telemedicine: Remote care platforms',
        'Assistive Tech: Smart devices for the elderly or disabled',
      ],
    },
  ],

  benefits: [
    {
      icon: Rocket,
      title: 'Experiential Learning',
      description: 'Go beyond textbooks. Solve real problems.',
    },
    {
      icon: Users,
      title: 'Mentorship',
      description: 'Get guidance from AI experts and medical professionals.',
    },
    {
      icon: Award,
      title: 'Social Impact',
      description: 'Create solutions that actually help patients and farmers.',
    },
    {
      icon: FileText,
      title: 'Certificate',
      description:
        'Enhance your portfolio with a certificate from Kasetsart University.',
    },
  ],

  eligibility: {
    who: 'High School Students (M. 4-6) & University Students (Undergrad, All Faculties)',
    teamSize: '3 - 5 members per team',
    composition:
      'We strongly recommend mixing skills! (e.g., 1 Developer + 1 Biology/Health Student + 1 Business/Creative)',
    output: 'Teams must produce a concept/prototype relevant to the categories',
  },

  judgingCriteria: [
    { name: 'Innovation & Creativity', percentage: 30 },
    { name: 'Technical Feasibility', percentage: 25 },
    { name: 'Social/Medical Impact', percentage: 25 },
    { name: 'Presentation & Business Model', percentage: 20 },
  ],

  organizers: [
    'Kasetsart University',
    'Research and Development Institute (KURDI)',
    'Faculty of Science, Department of Computer Science',
  ],

  contact: {
    email: 'aiih.sci@ku.th',
    phone: '02-562-5555 ext. 647209, 647210',
  },
}

export const timelineIconMap: Record<string, React.ElementType> = {
  megaphone: Rocket,
  graduation: Award,
  upload: FileText,
  search: Award,
  announcement: Award,
  microphone: Award,
}

export const prizeIconMap: Record<string, React.ElementType> = {
  trophy: Award,
  medal: Award,
  award: Award,
}
