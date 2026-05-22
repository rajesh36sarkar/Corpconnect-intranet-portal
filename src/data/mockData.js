export const initialAppreciations = [
  { id: '1', from: 'Rajesh Sarkar', to: 'Ananya Iyer', message: 'Amazing work on scaling the Core Inventory Service! Absolute life-saver for the Akalpa storefront release. 🚀', timestamp: new Date('2026-05-20'), badge: '🌟 Star Performer' },
  { id: '2', from: 'Vikram Malhotra', to: 'Neha Gupta', message: 'Huge shoutout for debugging the payment production gateway at 2 AM. Samosas on me tomorrow! ☕', timestamp: new Date('2026-05-19'), badge: '🤝 Team Player' },
  { id: '3', from: 'Rohan Deshmukh', to: 'Amit Sharma', message: "Excellent clear communication during yesterday's All-Hands Town Hall regarding the FY27 regional growth roadmap.", timestamp: new Date('2026-05-18'), badge: '🎯 Leader' },
  { id: '4', from: 'Neha Gupta', to: 'Rajesh Sarkar', message: 'Your detailed breakdown of React Concurrent rendering and bundle optimization in our tech channel was incredibly helpful!', timestamp: new Date('2026-05-17'), badge: '💡 Value Creator' },
  { id: '5', from: 'Ananya Iyer', to: 'Rohan Deshmukh', message: 'The hyper-local conversion tracking setup for the West Bengal saree campaign is yielding incredible data insight metrics!', timestamp: new Date('2026-05-16'), badge: '🚀 Execution Master' },
  { id: '6', from: 'Amit Sharma', to: 'Vikram Malhotra', message: 'Kudos for single-handedly managing the continuous vendor evaluations during the high-value enterprise pipeline closure.', timestamp: new Date('2026-05-14'), badge: '🤝 Team Player' }
];

export const initialCelebrations = [
  { id: '1', author: 'Marketing & Growth', title: 'Great Indian Festive Campaign Goals Achieved! 🎉', content: 'We crushed our regional acquisition targets by 165% through data-driven localization! Outstanding dedication across all regional pods!', timestamp: new Date('2026-05-15'), likes: 112, comments: [] },
  { id: '2', author: 'Engineering Team', title: 'Akalpa Storefront is Live! 🚀', content: 'Our full-stack responsive e-commerce experience is successfully serving traffic in production with ultra-low latency. Kudos to the deployment pods!', timestamp: new Date('2026-05-18'), likes: 245, comments: [] },
  { id: '3', author: 'Enterprise Sales', title: 'Massive Domestic Public Sector Win 🏆', content: 'Secured a ₹25 Crore strategic digital modernization enterprise contract with a leading national infrastructure body!', timestamp: new Date('2026-05-21'), likes: 189, comments: [] },
  { id: '4', author: 'Netai Operations Pod', title: 'Netai Stationery Supply Chain Integration Successful! 📦', content: 'Successfully integrated our full-stack fulfillment matrix with the physical warehouse grids. Operational transit overheads slashed by 22%!', timestamp: new Date('2026-05-22'), likes: 98, comments: [] }
];

export const initialForumPosts = [
  { id: '1', author: 'Arjun Verma', title: 'Best hybrid work hubs around Bangalore/Kolkata offices?', content: 'Are there designated collaborative desk setups available if we wish to plan cross-functional team sprints?', answers: [{ id: 'a1', author: 'Kriti Joshi', content: 'Yes! The 4th floor layout at the Kolkata campus has newly deployed hot-desking pods perfect for async syncs.', upvotes: 14 }, { id: 'a2', author: 'Devendra N', content: 'Just reserve your space via our internal Slack workspace bot ahead of Thursday commutes.', upvotes: 9 }], upvotes: 34 },
  { id: '2', author: 'Siddharth Roy', title: 'Optimizing high-frequency MongoDB aggregation stages', content: 'Seeking query structure ideas to minimize latency spikes on our stationery catalog pipelines.', answers: [{ id: 'a3', author: 'Rajesh Sarkar', content: 'Try pushing index structures onto your nested fields or look into localized Redis caching layers for cold metadata.', upvotes: 22 }], upvotes: 19 },
  { id: '3', author: 'Pooja Reddy', title: 'Leveraging custom LLM scaffolding for automated code refactoring', content: 'Which prompt layouts or extensions are you integrating daily for legacy code cleanups across the MERN stack?', answers: [], upvotes: 42 }
];

export const initialAnnouncements = [
  { id: '1', title: '🪔 Corporate Diwali & Ethnic Day Gala', content: 'Join us for our annual cultural evening, employee recognition awards, and grand dinner at The Grand Palace Hall on Nov 10th!', date: '2026-11-02', important: true, category: 'Cultural Pulse' },
  { id: '2', title: '📊 FY27 Q1 Strategic Planning Synchrony', content: 'All vertical leads, engineering managers, and directors please block your calendars for June 5th at 10 AM IST.', date: '2026-05-22', important: false, category: 'Leadership Ticker' },
  { id: '3', title: '🏆 Outstanding Performer of the Quarter', content: 'Heartiest congratulations to Neha Gupta from People Operations for driving the national campus hiring drive single-handedly!', date: '2026-05-15', important: true, category: 'Ecosystem Pride' },
  { id: '4', title: '🛡️ Annual Information Security Audit Milestone', content: 'Mandatory verification checks for all physical and cloud access keys must be concluded before May 30th to maintain ISO compliance.', date: '2026-05-21', important: true, category: 'Compliance' },
  { id: '5', title: '🩺 Comprehensive Annual Employee Wellness Drive', content: 'Free medical diagnostics, standard health check-ups, and dental screening desks are active at the cafeteria wing all week.', date: '2026-05-19', important: false, category: 'HR Update' }
];

export const leadershipMessages = [
  { id: '1', author: 'Nandan Nilekani Poddar - CEO', message: "Proud of our domestic performance! Let's scale our systems sustainably. Delivering intuitive, lightweight UX layers across our digital products is our core mandate.", date: '2026-05-01', image: '👨‍💼', title: 'CEO Vision Briefing' },
  { id: '2', author: 'Priya Singh - CTO', message: 'Transitioning to an AI-augmented workflow ecosystem. Upskilling masterclasses launch next Tuesday. Attendance is highly encouraged across all tech pods!', date: '2026-05-05', image: '👩‍💻', title: 'Technology Roadmap' },
  { id: '3', author: 'Amit Sharma - CPO', message: 'The updated Pravaaha digital platform framework layout has been locked. Check out the internal design system portal for user experience research insights!', date: '2026-05-08', image: '📱', title: 'Product Ecosystem' }
];

export const departmentUpdates = {
  'Engineering & DevOps': { update: 'Deploying optimized micro-frontend bundles weekly', project: 'Netai Platform Refactor', milestone: 'Production Cutover May 30', lead: 'Rajesh Sarkar' },
  'Growth & Marketing': { update: 'Organic conversion metrics increased by 42% MoM', project: 'Brand Localization', milestone: 'Campaign Launch June 15', lead: 'Rohan Deshmukh' },
  'Enterprise Sales': { update: 'Active business pipeline expanded by 30%', project: 'Pan-India Enterprise Deals', milestone: '₹50 Crore Target Focus', lead: 'Vikram Malhotra' },
  'People Operations (HR)': { update: 'Onboarding new campus cohorts across engineering tracks', project: 'Wellness & Culture Program', milestone: 'Feedback Survey out May 28', lead: 'Neha Gupta' },
  'Product & UX Research': { update: 'High-fidelity customer validation cycles completed', project: 'Mobile Hybrid App Scaffold', milestone: 'Leadership Review May 25', lead: 'Ananya Iyer' }
};

export const newJoinees = [
  { id: '1', name: 'Aakash Verma', role: 'Frontend Architect', startDate: '2026-05-10', avatar: '👨‍💻', department: 'Engineering & DevOps', bio: 'Obsessed with custom design tokens, Tailwind CSS layout systems, and fine-tuning build layers.' },
  { id: '2', name: 'Priya Sharma', role: 'Principal Product Manager', startDate: '2026-05-08', avatar: '👩‍💼', department: 'Product & UX Research', bio: 'Ex-Zomato PM, deeply passionate about building hyper-local user onboarding flows.' },
  { id: '3', name: 'Kabir Rodriguez Mehta', role: 'UI/UX Visual Designer', startDate: '2026-05-05', avatar: '🎨', department: 'Design Pod', bio: 'Figma enthusiast who believes great code cannot save a poor layout.' },
  { id: '4', name: 'Sneha Banerjee', role: 'ML Lead Data Scientist', startDate: '2026-05-12', avatar: '📊', department: 'Analytics & Insights', bio: 'Specializes in training specialized language models for local language interactions.' }
];

export const colleagues = [
  { id: '1', name: 'Rajesh Sarkar', role: 'Senior Developer', department: 'Engineering & DevOps', email: 'rajesh@corpconnect.in', avatar: '👨‍💻', badges: ['Star Performer', 'MERN Evangelist'], joinDate: '2024-08-15', about: 'Full-stack builder. Enjoys diving deep into state managers, component animations, and long weekend road trips.' },
  { id: '2', name: 'Ananya Iyer', role: 'Product Lead', department: 'Product & UX Research', email: 'ananya@corpconnect.in', avatar: '👩‍💼', badges: ['Rising Icon'], joinDate: '2025-01-15', about: 'Product craft practitioner, ex-fintech startup lead, design systems advocate.' },
  { id: '3', name: 'Vikram Malhotra', role: 'Sales Director', department: 'Enterprise Sales', email: 'vikram@corpconnect.in', avatar: '📈', badges: ['Top Closer'], joinDate: '2023-03-10', about: 'Strategic alliances expert. Loves closing complex B2B deals over a hot cup of Filter Coffee.' },
  { id: '4', name: 'Neha Gupta', role: 'Lead HRBP', department: 'People Operations (HR)', email: 'neha@corpconnect.in', avatar: '👩‍⚖️', badges: ['Culture Champion'], joinDate: '2024-09-20', about: 'Focused on scaling balanced team cultures. Enjoys competitive chess matches and solving mechanical puzzles.' },
  { id: '5', name: 'Rohan Deshmukh', role: 'Growth Lead', department: 'Growth & Marketing', email: 'rohan@corpconnect.in', avatar: '📢', badges: ['Creative Mastermind'], joinDate: '2024-11-01', about: 'Data-driven brand growth manager. Spends off-hours training for half-marathons.' },
  { id: '6', name: 'Amit Sharma', role: 'Engineering Director', department: 'Engineering & DevOps', email: 'amit@corpconnect.in', avatar: '👨‍🏫', badges: ['Inspirational Mentor'], joinDate: '2023-08-15', about: 'Systems builder and engineering mentor. Believes in breaking corporate silos through structural transparency.' }
];

export const galleryImages = [
  { id: '1', url: '/images/gallery-1.jpg', title: 'Internal Hackathon Sprint 2026', type: 'image', date: '2026-03-20' },
  { id: '2', url: '/images/gallery-2.jpg', title: 'Tech Innovation Summit Meeting', type: 'image', date: '2026-02-10' },
  { id: '3', url: '/images/gallery-3.jpg', title: 'Office Diwali Desk Celebration', type: 'image', date: '2025-11-12' },
  { id: '4', url: '/images/gallery-4.jpg', title: 'Annual Corporate Town Hall Meeting', type: 'image', date: '2026-01-15' },
  { id: '5', url: '/images/gallery-5.jpg', title: 'Akalpa Launch War-Room Deployment', type: 'image', date: '2026-05-18' },
  { id: '6', url: '/images/gallery-6.jpg', title: 'Weekend Competitive Chess Tournament', type: 'image', date: '2026-04-05' },
  { id: '7', url: '/images/gallery-7.jpg', title: 'Office Annual Party', type: 'image', date: '2026-01-10' },
  { id: '8', url: '/images/gallery-8.jpg', title: 'Office Vacation', type: 'image', date: '2026-04-28' },
  { id: '9', url: '/images/gallery-9.jpg', title: 'Best Employee Of The Year', type: 'image', date: '2026-05-22' }
];

export const documents = [
  { id: '1', title: 'India Employee Handbook FY26', category: 'Handbook', url: '#', type: 'pdf', updated: '2026-04-01' },
  { id: '2', title: 'Hybrid Work Allocation & Reimbursement Policy', category: 'Policy', url: '#', type: 'pdf', updated: '2026-05-10' },
  { id: '3', title: 'Information Security & Code of Conduct', category: 'Policy', url: '#', type: 'pdf', updated: '2026-04-01' },
  { id: '4', title: 'Corporate Health & Medical Insurance Guide', category: 'Handbook', url: '#', type: 'pdf', updated: '2026-04-15' },
  { id: '5', title: 'Responsible AI & Generative Tool Usage Guidelines', category: 'Policy', url: '#', type: 'pdf', updated: '2026-05-01' }
];

export const calendarEvents = [
  { id: '1', title: 'Pan-India Interactive All-Hands Town Hall', date: '2026-05-28', type: 'company', time: '4:00 PM', location: 'Auditorium / Virtual Stream' },
  { id: '2', title: 'New Cohort Orientation & High-Tea Mixer', date: '2026-05-25', type: 'social', time: '5:00 PM', location: 'Cafeteria Lounge' },
  { id: '3', title: 'Annual Performance Appraisal Overview Cycle', date: '2026-06-02', type: 'hr', time: '11:30 AM', location: 'Conference Bay A' },
  { id: '4', title: 'Interactive Workshop: Advanced React & State Optimization', date: '2026-05-27', type: 'learning', time: '3:00 PM', location: 'Tech Lab 2 / Zoom' },
  { id: '5', title: 'Figma Dev-Handover & Platform Alignment Sprint', date: '2026-05-29', type: 'learning', time: '1:00 PM', location: 'Design Pod Hub' },
  { id: '6', title: 'Pravaaha Enterprises Regional Strategy Sync', date: '2026-06-01', type: 'company', time: '10:00 AM', location: 'Boardroom 1' }
];

export const employeeExperiences = [
  { id: '1', author: 'Rajesh Sarkar', content: 'The horizontal engineering structure here is fantastic. Being given complete ownership to re-architect our state management layers has been highly rewarding.', date: '2026-05-14', likes: 54 },
  { id: '2', author: 'Neha Gupta', content: 'Watching our cross-functional teams break down typical silos and cheer each other on via the leaderboards shows how strong our workplace culture truly is.', date: '2026-05-18', likes: 41 }
];