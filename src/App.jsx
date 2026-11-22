import React, { useState, useMemo } from 'react';
import {
  LayoutDashboard,
  Code2,
  BrainCircuit,
  Cpu,
  CalendarCheck2,
  Building2,
  Flame,
  CheckCircle2,
  Circle,
  Clock,
  Plus,
  Search,
  Trophy,
  Target,
  BookOpen,
  Briefcase,
  ChevronRight,
  RotateCcw,
  Sparkles,
  Trash2,
  ExternalLink,
  Check,
  X,
  Menu,
  GraduationCap,
  TrendingUp,
  Layers,
  Award,
  FileText
} from 'lucide-react';

// --- INITIAL MOCK DATA ---

const INITIAL_DSA_TOPICS = [
  { id: 'arrays', name: 'Arrays & Hashing', total: 45, icon: '📊' },
  { id: 'twopointers', name: 'Two Pointers & Sliding Window', total: 30, icon: '🪟' },
  { id: 'trees', name: 'Trees & BST', total: 40, icon: '🌳' },
  { id: 'graphs', name: 'Graphs & Shortest Path', total: 35, icon: '🕸️' },
  { id: 'dp', name: 'Dynamic Programming', total: 50, icon: '🧩' },
  { id: 'll_stack', name: 'Linked Lists, Stacks & Queues', total: 35, icon: '🔗' },
  { id: 'recursion', name: 'Recursion & Backtracking', total: 30, icon: '🔄' },
  { id: 'heaps', name: 'Heaps & Greedy', total: 35, icon: '⛰️' },
];

const INITIAL_DSA_PROBLEMS = [
  { id: 1, title: 'Two Sum', topic: 'arrays', difficulty: 'Easy', platform: 'LeetCode', status: 'Solved', date: '2026-11-10', link: 'https://leetcode.com/problems/two-sum/' },
  { id: 2, title: 'Longest Substring Without Repeating Characters', topic: 'twopointers', difficulty: 'Medium', platform: 'LeetCode', status: 'Solved', date: '2026-11-12', link: 'https://leetcode.com' },
  { id: 3, title: 'Merge Intervals', topic: 'arrays', difficulty: 'Medium', platform: 'LeetCode', status: 'Revisit', date: '2026-11-14', link: 'https://leetcode.com' },
  { id: 4, title: 'Lowest Common Ancestor of a Binary Tree', topic: 'trees', difficulty: 'Medium', platform: 'LeetCode', status: 'Solved', date: '2026-11-15', link: 'https://leetcode.com' },
  { id: 5, title: 'Number of Islands', topic: 'graphs', difficulty: 'Medium', platform: 'LeetCode', status: 'Solved', date: '2026-11-17', link: 'https://leetcode.com' },
  { id: 6, title: 'Coin Change', topic: 'dp', difficulty: 'Medium', platform: 'LeetCode', status: 'Revisit', date: '2026-11-18', link: 'https://leetcode.com' },
  { id: 7, title: 'Trapping Rain Water', topic: 'twopointers', difficulty: 'Hard', platform: 'LeetCode', status: 'Todo', date: '2026-11-20', link: 'https://leetcode.com' },
  { id: 8, title: 'LRU Cache', topic: 'll_stack', difficulty: 'Medium', platform: 'LeetCode', status: 'Solved', date: '2026-11-21', link: 'https://leetcode.com' },
  { id: 9, title: 'Course Schedule II (Topological Sort)', topic: 'graphs', difficulty: 'Medium', platform: 'GFG', status: 'Todo', date: '2026-11-22', link: 'https://geeksforgeeks.org' },
  { id: 10, title: 'Edit Distance', topic: 'dp', difficulty: 'Hard', platform: 'LeetCode', status: 'Todo', date: '2026-11-22', link: 'https://leetcode.com' },
];

const INITIAL_APTITUDE = {
  quant: [
    { id: 'q1', topic: 'Percentages, Profit & Loss', completed: true, accuracy: 88 },
    { id: 'q2', topic: 'Time, Speed & Distance', completed: true, accuracy: 82 },
    { id: 'q3', topic: 'Time & Work / Pipes & Cisterns', completed: true, accuracy: 90 },
    { id: 'q4', topic: 'Permutations, Combinations & Probability', completed: false, accuracy: 68 },
    { id: 'q5', topic: 'Number System & Divisibility', completed: false, accuracy: 74 },
  ],
  logical: [
    { id: 'l1', topic: 'Seating Arrangements (Linear & Circular)', completed: true, accuracy: 85 },
    { id: 'l2', topic: 'Blood Relations & Direction Sense', completed: true, accuracy: 94 },
    { id: 'l3', topic: 'Syllogisms & Coding-Decoding', completed: true, accuracy: 89 },
    { id: 'l4', topic: 'Data Interpretation (Charts & Graphs)', completed: false, accuracy: 76 },
  ],
  verbal: [
    { id: 'v1', topic: 'Reading Comprehension Passages', completed: true, accuracy: 84 },
    { id: 'v2', topic: 'Para Jumbles & Sentence Correction', completed: false, accuracy: 72 },
    { id: 'v3', topic: 'Synonyms, Antonyms & Vocabulary', completed: true, accuracy: 80 },
  ],
  mockScores: [
    { id: 1, name: 'TCS NQT Mock #1', score: 78, total: 100, date: 'Nov 10' },
    { id: 2, name: 'Infosys SP Aptitude Test', score: 84, total: 100, date: 'Nov 15' },
    { id: 3, name: 'AMCAT Full Mock #2', score: 89, total: 100, date: 'Nov 20' },
  ]
};

const INITIAL_CS_SUBJECTS = [
  {
    id: 'dbms',
    code: 'DBMS',
    name: 'Database Management Systems',
    color: 'indigo',
    notes: 'ACID: Atomicity, Consistency, Isolation, Durability. 3NF removes transitive dependencies; BCNF ensures every determinant is a candidate key.',
    topics: [
      { id: 'd1', title: 'ER Model & Relational Algebra', done: true },
      { id: 'd2', title: 'Normalization (1NF, 2NF, 3NF, BCNF)', done: true },
      { id: 'd3', title: 'SQL Queries (Joins, Window Functions, Subqueries)', done: true },
      { id: 'd4', title: 'Transactions, ACID & Concurrency Control', done: true },
      { id: 'd5', title: 'Indexing, B-Trees & B+ Trees', done: false },
    ]
  },
  {
    id: 'os',
    code: 'OS',
    name: 'Operating Systems',
    color: 'emerald',
    notes: 'Deadlock requires 4 conditions: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait. Thrashing occurs when page fault rate is excessively high.',
    topics: [
      { id: 'o1', title: 'Process vs Threads & IPC', done: true },
      { id: 'o2', title: 'CPU Scheduling Algorithms (RR, SJF, Priority)', done: true },
      { id: 'o3', title: 'Process Synchronization (Semaphores & Mutex)', done: true },
      { id: 'o4', title: 'Deadlocks (Detection, Prevention & Banker’s Algo)', done: false },
      { id: 'o5', title: 'Memory Management, Paging & Virtual Memory', done: false },
    ]
  },
  {
    id: 'oops',
    code: 'OOPs',
    name: 'Object-Oriented Programming',
    color: 'violet',
    notes: 'Compile-time polymorphism = Function/Operator overloading. Runtime polymorphism = Virtual functions / Method overriding via vtable.',
    topics: [
      { id: 'p1', title: '4 Pillars: Encapsulation, Abstraction, Inheritance, Polymorphism', done: true },
      { id: 'p2', title: 'Compile-time vs Runtime Polymorphism', done: true },
      { id: 'p3', title: 'Abstract Classes vs Interfaces', done: true },
      { id: 'p4', title: 'Constructors, Destructors & Deep vs Shallow Copy', done: true },
      { id: 'p5', title: 'SOLID Design Principles', done: false },
    ]
  },
  {
    id: 'cn',
    code: 'CN',
    name: 'Computer Networks',
    color: 'amber',
    notes: 'TCP is connection-oriented (3-way handshake: SYN, SYN-ACK, ACK). UDP is connectionless & faster for streaming/DNS.',
    topics: [
      { id: 'c1', title: 'OSI & TCP/IP Reference Models', done: true },
      { id: 'c2', title: 'IP Addressing, Subnetting & CIDR', done: true },
      { id: 'c3', title: 'TCP vs UDP & 3-Way Handshake', done: true },
      { id: 'c4', title: 'HTTP/HTTPS, DNS, DHCP & ARP Protocols', done: false },
      { id: 'c5', title: 'Congestion Control & Routing Algorithms', done: false },
    ]
  },
  {
    id: 'sys',
    code: 'LLD/HLD',
    name: 'System Design Basics',
    color: 'rose',
    notes: 'Horizontal scaling adds more machines; Vertical scaling adds more CPU/RAM. Load balancers distribute traffic using Round Robin or Least Connections.',
    topics: [
      { id: 's1', title: 'Horizontal vs Vertical Scaling & Load Balancers', done: true },
      { id: 's2', title: 'Caching Strategies (Redis, CDN, Cache-Aside)', done: false },
      { id: 's3', title: 'SQL vs NoSQL & Database Sharding', done: false },
      { id: 's4', title: 'Design Parking Lot / URL Shortener (LLD)', done: false },
    ]
  }
];

const INITIAL_TASKS = [
  { id: 1, title: 'Solve 2 Medium Graph problems on LeetCode', category: 'DSA', priority: 'High', due: 'Today', completed: true },
  { id: 2, title: 'Revise DBMS Normalization & SQL Joins notes', category: 'Core CS', priority: 'High', due: 'Today', completed: true },
  { id: 3, title: 'Attempt 30-min Quantitative Aptitude Speed Drill', category: 'Aptitude', priority: 'Medium', due: 'Today', completed: false },
  { id: 4, title: 'Update resume bullet points with React & Node metrics', category: 'Resume', priority: 'High', due: 'Tomorrow', completed: false },
  { id: 5, title: 'Review OS Deadlock & Paging flashcards', category: 'Core CS', priority: 'Low', due: 'Tomorrow', completed: false },
];

const INITIAL_COMPANIES = [
  { id: 1, company: 'Microsoft', role: 'Software Engineer (SWE)', ctc: '44 LPA', stage: 'Technical Round', date: '2026-11-26', location: 'Hyderabad / Bengaluru', notes: 'Focus on Trees, Graphs, and OS concurrency.' },
  { id: 2, company: 'Atlassian', role: 'SDE - 1', ctc: '38 LPA', stage: 'OA Scheduled', date: '2026-11-24', location: 'Bengaluru', notes: '90-min HackerRank assessment: 3 DSA questions.' },
  { id: 3, company: 'Flipkart', role: 'SDE - 1 (Grid)', ctc: '32 LPA', stage: 'HR Round', date: '2026-11-28', location: 'Bengaluru', notes: 'Cleared 2 technical rounds! Prep behavioral STAR stories.' },
  { id: 4, company: 'Razorpay', role: 'Full Stack Intern + PPO', ctc: '24 LPA', stage: 'Applied', date: '2026-11-18', location: 'Bengaluru', notes: 'Applied via referral on careers portal.' },
  { id: 5, company: 'Cisco', role: 'Software Consulting Engineer', ctc: '18 LPA', stage: 'Offer', date: '2026-11-12', location: 'Bengaluru', notes: 'Offer letter received! Deadline to accept: Dec 5.' },
  { id: 6, company: 'Google', role: 'Software Engineer, University Grad', ctc: '45 LPA', stage: 'Wishlist', date: '2026-12-01', location: 'Bengaluru / Hyderabad', notes: 'Need referral before submitting application.' },
];

const WEEKLY_STUDY_HOURS = [
  { day: 'Mon', hours: 4.5, target: 5 },
  { day: 'Tue', hours: 5.5, target: 5 },
  { day: 'Wed', hours: 3.5, target: 5 },
  { day: 'Thu', hours: 6.0, target: 5 },
  { day: 'Fri', hours: 5.0, target: 5 },
  { day: 'Sat', hours: 7.0, target: 6 },
  { day: 'Sun', hours: 4.0, target: 5 },
];

const STAGE_STYLES = {
  'Wishlist': 'bg-slate-100 text-slate-700 border-slate-200',
  'Applied': 'bg-blue-50 text-blue-700 border-blue-200',
  'OA Scheduled': 'bg-amber-50 text-amber-700 border-amber-200',
  'Technical Round': 'bg-purple-50 text-purple-700 border-purple-200',
  'HR Round': 'bg-cyan-50 text-cyan-700 border-cyan-200',
  'Offer': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Rejected': 'bg-rose-50 text-rose-700 border-rose-200',
};

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // App State
  const [streak, setStreak] = useState(14);
  const [checkedInToday, setCheckedInToday] = useState(true);
  const [dsaProblems, setDsaProblems] = useState(INITIAL_DSA_PROBLEMS);
  const [aptitude, setAptitude] = useState(INITIAL_APTITUDE);
  const [csSubjects, setCsSubjects] = useState(INITIAL_CS_SUBJECTS);
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [companies, setCompanies] = useState(INITIAL_COMPANIES);

  // DSA Filter & Modal State
  const [dsaSearch, setDsaSearch] = useState('');
  const [dsaTopicFilter, setDsaTopicFilter] = useState('all');
  const [dsaDiffFilter, setDsaDiffFilter] = useState('all');
  const [dsaStatusFilter, setDsaStatusFilter] = useState('all');
  const [showAddProblemModal, setShowAddProblemModal] = useState(false);
  const [newProblem, setNewProblem] = useState({ title: '', topic: 'arrays', difficulty: 'Medium', platform: 'LeetCode', status: 'Solved' });

  // Aptitude State
  const [aptSubTab, setAptSubTab] = useState('quant');
  const [newMock, setNewMock] = useState({ name: '', score: '', total: 100 });

  // Core CS State
  const [selectedSubjectId, setSelectedSubjectId] = useState('dbms');
  const [editingNote, setEditingNote] = useState(false);

  // Study Planner State
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('DSA');
  const [newTaskPriority, setNewTaskPriority] = useState('Medium');

  // Company Tracker State
  const [companyStageFilter, setCompanyStageFilter] = useState('All');
  const [showAddCompanyModal, setShowAddCompanyModal] = useState(false);
  const [newCompany, setNewCompany] = useState({ company: '', role: '', ctc: '', stage: 'Applied', date: '2026-11-25', location: '', notes: '' });

  // --- COMPUTED METRICS ---
  const stats = useMemo(() => {
    // Baseline solved count + dynamic solved problems
    const baseSolved = 137;
    const listSolved = dsaProblems.filter(p => p.status === 'Solved').length;
    const totalDsaSolved = baseSolved + listSolved;
    const totalDsaGoal = 300;
    const dsaPct = Math.min(100, Math.round((totalDsaSolved / totalDsaGoal) * 100));

    // Aptitude %
    const allApt = [...aptitude.quant, ...aptitude.logical, ...aptitude.verbal];
    const aptDone = allApt.filter(a => a.completed).length;
    const aptPct = Math.round((aptDone / allApt.length) * 100);

    // Core CS %
    const allCsTopics = csSubjects.flatMap(s => s.topics);
    const csDone = allCsTopics.filter(t => t.done).length;
    const csPct = Math.round((csDone / allCsTopics.length) * 100);

    // Tasks %
    const tasksDone = tasks.filter(t => t.completed).length;
    const tasksPct = tasks.length ? Math.round((tasksDone / tasks.length) * 100) : 100;

    // Active Companies
    const activeDrives = companies.filter(c => !['Rejected', 'Wishlist'].includes(c.stage)).length;
    const offersCount = companies.filter(c => c.stage === 'Offer').length;

    // Overall Weighted Readiness
    const readiness = Math.round(dsaPct * 0.4 + csPct * 0.3 + aptPct * 0.2 + tasksPct * 0.1);

    return {
      totalDsaSolved,
      totalDsaGoal,
      dsaPct,
      aptDone,
      aptTotal: allApt.length,
      aptPct,
      csDone,
      csTotal: allCsTopics.length,
      csPct,
      tasksDone,
      tasksTotal: tasks.length,
      tasksPct,
      activeDrives,
      offersCount,
      readiness,
    };
  }, [dsaProblems, aptitude, csSubjects, tasks, companies]);

  // --- HANDLERS ---
  const cycleProblemStatus = (id) => {
    const order = ['Todo', 'Revisit', 'Solved'];
    setDsaProblems(prev =>
      prev.map(p => {
        if (p.id !== id) return p;
        const nextStatus = order[(order.indexOf(p.status) + 1) % order.length];
        return { ...p, status: nextStatus };
      })
    );
  };

  const handleAddProblem = (e) => {
    e.preventDefault();
    if (!newProblem.title.trim()) return;
    setDsaProblems(prev => [
      {
        id: Date.now(),
        ...newProblem,
        date: new Date().toISOString().split('T')[0],
        link: 'https://leetcode.com',
      },
      ...prev,
    ]);
    setNewProblem({ title: '', topic: 'arrays', difficulty: 'Medium', platform: 'LeetCode', status: 'Solved' });
    setShowAddProblemModal(false);
  };

  const toggleAptitudeTopic = (category, id) => {
    setAptitude(prev => ({
      ...prev,
      [category]: prev[category].map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      ),
    }));
  };

  const handleAddMockScore = (e) => {
    e.preventDefault();
    if (!newMock.name.trim() || !newMock.score) return;
    setAptitude(prev => ({
      ...prev,
      mockScores: [
        ...prev.mockScores,
        { id: Date.now(), name: newMock.name, score: Number(newMock.score), total: Number(newMock.total) || 100, date: 'Today' }
      ]
    }));
    setNewMock({ name: '', score: '', total: 100 });
  };

  const toggleCsTopic = (subjectId, topicId) => {
    setCsSubjects(prev =>
      prev.map(sub => {
        if (sub.id !== subjectId) return sub;
        return {
          ...sub,
          topics: sub.topics.map(t => (t.id === topicId ? { ...t, done: !t.done } : t)),
        };
      })
    );
  };

  const updateCsNote = (subjectId, newText) => {
    setCsSubjects(prev =>
      prev.map(sub => (sub.id === subjectId ? { ...sub, notes: newText } : sub))
    );
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    setTasks(prev => [
      {
        id: Date.now(),
        title: newTaskTitle,
        category: newTaskCategory,
        priority: newTaskPriority,
        due: 'Today',
        completed: false,
      },
      ...prev,
    ]);
    setNewTaskTitle('');
  };

  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const updateCompanyStage = (id, newStage) => {
    setCompanies(prev => prev.map(c => (c.id === id ? { ...c, stage: newStage } : c)));
  };

  const handleAddCompany = (e) => {
    e.preventDefault();
    if (!newCompany.company.trim() || !newCompany.role.trim()) return;
    setCompanies(prev => [{ id: Date.now(), ...newCompany }, ...prev]);
    setNewCompany({ company: '', role: '', ctc: '', stage: 'Applied', date: '2026-11-25', location: '', notes: '' });
    setShowAddCompanyModal(false);
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'dsa', label: 'DSA Tracker', icon: Code2, badge: `${stats.totalDsaSolved}/${stats.totalDsaGoal}` },
    { id: 'aptitude', label: 'Aptitude Prep', icon: BrainCircuit, badge: `${stats.aptPct}%` },
    { id: 'subjects', label: 'Core CS Subjects', icon: Cpu, badge: `${stats.csDone}/${stats.csTotal}` },
    { id: 'planner', label: 'Study Planner', icon: CalendarCheck2, badge: `${stats.tasksDone}/${stats.tasksTotal}` },
    { id: 'companies', label: 'Company Tracker', icon: Building2, badge: `${companies.length}` },
  ];

  // Filtered DSA list
  const filteredProblems = dsaProblems.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(dsaSearch.toLowerCase());
    const matchesTopic = dsaTopicFilter === 'all' || p.topic === dsaTopicFilter;
    const matchesDiff = dsaDiffFilter === 'all' || p.difficulty === dsaDiffFilter;
    const matchesStatus = dsaStatusFilter === 'all' || p.status === dsaStatusFilter;
    return matchesSearch && matchesTopic && matchesDiff && matchesStatus;
  });

  const selectedSubject = csSubjects.find(s => s.id === selectedSubjectId) || csSubjects[0];

  const filteredCompanies = companyStageFilter === 'All'
    ? companies
    : companies.filter(c => c.stage === companyStageFilter);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col md:flex-row font-sans">
      {/* MOBILE HEADER */}
      <div className="md:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold shadow-sm">
            <GraduationCap className="w-5 h-5" />
          </div>
          <span className="font-bold text-slate-800 tracking-tight">PrepTrack</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* SIDEBAR NAVIGATION */}
      <aside
        className={`${
          mobileMenuOpen ? 'fixed inset-0 z-40 block' : 'hidden'
        } md:block md:w-64 md:shrink-0 bg-white border-r border-slate-200 flex flex-col justify-between`}
      >
        <div className="p-5">
          {/* Brand */}
          <div className="flex items-center justify-between mb-7">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-200">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h1 className="font-bold text-base text-slate-900 leading-tight">PrepTrack</h1>
                <p className="text-[11px] font-medium text-slate-400">Placement OS • 2026</p>
              </div>
            </div>
            {mobileMenuOpen && (
              <button onClick={() => setMobileMenuOpen(false)} className="md:hidden p-1.5 text-slate-500">
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Nav Links */}
          <nav className="space-y-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${
                        isActive ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Streak & Readiness Card */}
        <div className="p-4 m-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-300">Placement Readiness</span>
            <span className="text-sm font-bold text-emerald-400">{stats.readiness}%</span>
          </div>
          <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden mb-3">
            <div
              className="h-full bg-gradient-to-r from-indigo-400 to-emerald-400 rounded-full transition-all duration-500"
              style={{ width: `${stats.readiness}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs text-slate-300 pt-2 border-t border-slate-700/80">
            <span className="flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-orange-400 fill-orange-400" />
              {streak} Day Streak
            </span>
            <button
              onClick={() => {
                if (!checkedInToday) {
                  setStreak(s => s + 1);
                  setCheckedInToday(true);
                }
              }}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold transition ${
                checkedInToday
                  ? 'bg-emerald-500/20 text-emerald-300 cursor-default'
                  : 'bg-indigo-500 hover:bg-indigo-400 text-white'
              }`}
            >
              {checkedInToday ? 'Checked In ✓' : 'Check In'}
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto p-5 md:p-8 space-y-6">
          {/* Top Contextual Header */}
          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                {navItems.find(n => n.id === activeTab)?.label}
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">
                {activeTab === 'dashboard' && 'Your unified command center for campus & off-campus placement readiness.'}
                {activeTab === 'dsa' && 'Track topic mastery, log coding problems, and schedule spaced-repetition revisits.'}
                {activeTab === 'aptitude' && 'Sharpen Quantitative, Logical Reasoning, and Verbal speed for Online Assessments.'}
                {activeTab === 'subjects' && 'Master DBMS, OS, OOPs, CN & System Design with revision cheat sheets.'}
                {activeTab === 'planner' && 'Organize daily study targets and monitor weekly consistency.'}
                {activeTab === 'companies' && 'Track job applications, upcoming OAs, interview rounds, and offers.'}
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setShowAddProblemModal(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 shadow-2xs transition"
              >
                <Plus className="w-3.5 h-3.5 text-indigo-600" />
                Log DSA
              </button>
              <button
                onClick={() => setShowAddCompanyModal(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 shadow-sm shadow-indigo-200 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Company
              </button>
            </div>
          </header>

          {/* ========================================================= */}
          {/* 1. DASHBOARD VIEW                                         */}
          {/* ========================================================= */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Top KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Overall Readiness</span>
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                      <Target className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-slate-900">{stats.readiness}%</span>
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">+6% this week</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">Weighted across DSA, Core CS & Aptitude</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">DSA Problems</span>
                    <div className="w-8 h-8 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center">
                      <Code2 className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-slate-900">{stats.totalDsaSolved}</span>
                    <span className="text-sm font-medium text-slate-400">/ {stats.totalDsaGoal}</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full mt-3 overflow-hidden">
                    <div className="h-full bg-violet-600 rounded-full" style={{ width: `${stats.dsaPct}%` }} />
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Core CS Syllabus</span>
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <Cpu className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-slate-900">{stats.csPct}%</span>
                    <span className="text-xs font-medium text-slate-500">({stats.csDone}/{stats.csTotal} topics)</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full mt-3 overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${stats.csPct}%` }} />
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Active Drives</span>
                    <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                      <Briefcase className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-slate-900">{stats.activeDrives}</span>
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      {stats.offersCount} Offer{stats.offersCount === 1 ? '' : 's'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">Next: Atlassian OA on Nov 24</p>
                </div>
              </div>

              {/* Middle Section: Pillar Breakdown + Today's Priority Tasks */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Pillar Breakdown */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-indigo-600" />
                      Preparation Pillars Breakdown
                    </h3>
                    <button
                      onClick={() => setActiveTab('subjects')}
                      className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                    >
                      View Syllabus <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    {[
                      { label: 'Data Structures & Algorithms', pct: stats.dsaPct, detail: `${stats.totalDsaSolved}/${stats.totalDsaGoal} problems solved`, color: 'bg-indigo-600', tab: 'dsa' },
                      { label: 'Core CS Subjects (DBMS, OS, OOPs, CN)', pct: stats.csPct, detail: `${stats.csDone}/${stats.csTotal} modules completed`, color: 'bg-emerald-500', tab: 'subjects' },
                      { label: 'Aptitude & Logical Reasoning', pct: stats.aptPct, detail: `${stats.aptDone}/${stats.aptTotal} topics • Avg Mock: 84%`, color: 'bg-amber-500', tab: 'aptitude' },
                      { label: 'Daily Study Goals', pct: stats.tasksPct, detail: `${stats.tasksDone}/${stats.tasksTotal} tasks completed`, color: 'bg-violet-500', tab: 'planner' },
                    ].map((pillar, idx) => (
                      <div
                        key={idx}
                        onClick={() => setActiveTab(pillar.tab)}
                        className="p-3.5 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-slate-50/70 transition cursor-pointer"
                      >
                        <div className="flex items-center justify-between text-sm mb-1.5">
                          <span className="font-semibold text-slate-800">{pillar.label}</span>
                          <span className="font-bold text-slate-900">{pillar.pct}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-1.5">
                          <div className={`h-full ${pillar.color} rounded-full transition-all duration-500`} style={{ width: `${pillar.pct}%` }} />
                        </div>
                        <p className="text-xs text-slate-500">{pillar.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Today's Study Checklist */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-slate-900 flex items-center gap-2">
                        <CalendarCheck2 className="w-4 h-4 text-indigo-600" />
                        Today’s Focus Tasks
                      </h3>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
                        {stats.tasksDone}/{stats.tasksTotal}
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {tasks.slice(0, 5).map(task => (
                        <div
                          key={task.id}
                          onClick={() => toggleTask(task.id)}
                          className={`p-3 rounded-xl border text-sm flex items-start gap-3 cursor-pointer transition ${
                            task.completed
                              ? 'bg-slate-50/80 border-slate-100 text-slate-400'
                              : 'bg-white border-slate-200/80 hover:border-indigo-300 text-slate-800'
                          }`}
                        >
                          {task.completed ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          ) : (
                            <Circle className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className={`font-medium leading-snug ${task.completed ? 'line-through' : ''}`}>
                              {task.title}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                                {task.category}
                              </span>
                              <span
                                className={`text-[10px] font-semibold ${
                                  task.priority === 'High'
                                    ? 'text-rose-600'
                                    : task.priority === 'Medium'
                                    ? 'text-amber-600'
                                    : 'text-slate-400'
                                }`}
                              >
                                {task.priority}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab('planner')}
                    className="mt-4 w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/70 text-slate-700 text-xs font-semibold transition"
                  >
                    Open Full Study Planner
                  </button>
                </div>
              </div>

              {/* Bottom Section: Upcoming Drives & Revisit Queue */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Upcoming Company Drives */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-slate-900 flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-indigo-600" />
                      Active Company Pipeline
                    </h3>
                    <button
                      onClick={() => setActiveTab('companies')}
                      className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                    >
                      Manage All
                    </button>
                  </div>
                  <div className="space-y-3">
                    {companies.slice(0, 4).map(comp => (
                      <div key={comp.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-slate-900">{comp.company}</span>
                            <span className="text-xs text-slate-500">• {comp.ctc}</span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">{comp.role} • {comp.date}</p>
                        </div>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${STAGE_STYLES[comp.stage]}`}>
                          {comp.stage}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* DSA Revisit Queue */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-slate-900 flex items-center gap-2">
                      <RotateCcw className="w-4 h-4 text-amber-500" />
                      DSA Revision Queue
                    </h3>
                    <button
                      onClick={() => setActiveTab('dsa')}
                      className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                    >
                      Open DSA Tracker
                    </button>
                  </div>
                  <div className="space-y-3">
                    {dsaProblems
                      .filter(p => p.status !== 'Solved')
                      .slice(0, 4)
                      .map(prob => (
                        <div key={prob.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                          <div className="min-w-0 pr-3">
                            <p className="font-semibold text-sm text-slate-800 truncate">{prob.title}</p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-xs text-slate-500">{prob.platform}</span>
                              <span
                                className={`text-[11px] font-semibold ${
                                  prob.difficulty === 'Hard'
                                    ? 'text-rose-600'
                                    : prob.difficulty === 'Medium'
                                    ? 'text-amber-600'
                                    : 'text-emerald-600'
                                }`}
                              >
                                {prob.difficulty}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => cycleProblemStatus(prob.id)}
                            className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-lg border transition ${
                              prob.status === 'Revisit'
                                ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                                : 'bg-slate-200/70 text-slate-700 border-slate-300 hover:bg-slate-200'
                            }`}
                          >
                            {prob.status} ↻
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 2. DSA TRACKER VIEW                                       */}
          {/* ========================================================= */}
          {activeTab === 'dsa' && (
            <div className="space-y-6">
              {/* Topic Mastery Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                {INITIAL_DSA_TOPICS.map(topic => {
                  const baseMap = { arrays: 28, twopointers: 18, trees: 22, graphs: 15, dp: 16, ll_stack: 21, recursion: 12, heaps: 10 };
                  const extraSolved = dsaProblems.filter(p => p.topic === topic.id && p.status === 'Solved').length;
                  const solvedCount = Math.min(topic.total, (baseMap[topic.id] || 10) + extraSolved);
                  const pct = Math.round((solvedCount / topic.total) * 100);
                  const isSelected = dsaTopicFilter === topic.id;

                  return (
                    <div
                      key={topic.id}
                      onClick={() => setDsaTopicFilter(isSelected ? 'all' : topic.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition ${
                        isSelected
                          ? 'bg-indigo-50/70 border-indigo-400 ring-2 ring-indigo-500/20'
                          : 'bg-white border-slate-200/80 hover:border-indigo-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-lg">{topic.icon}</span>
                        <span className="text-xs font-bold text-slate-700">
                          {solvedCount}/{topic.total}
                        </span>
                      </div>
                      <h4 className="font-semibold text-sm text-slate-900 truncate">{topic.name}</h4>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full mt-2.5 overflow-hidden">
                        <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Search & Filter Bar */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200/80 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search coding problems (e.g. LRU Cache, Merge Intervals)..."
                    value={dsaSearch}
                    onChange={e => setDsaSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <select
                    value={dsaTopicFilter}
                    onChange={e => setDsaTopicFilter(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white"
                  >
                    <option value="all">All Topics</option>
                    {INITIAL_DSA_TOPICS.map(t => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                  <select
                    value={dsaDiffFilter}
                    onChange={e => setDsaDiffFilter(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white"
                  >
                    <option value="all">All Difficulties</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                  <select
                    value={dsaStatusFilter}
                    onChange={e => setDsaStatusFilter(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white"
                  >
                    <option value="all">All Statuses</option>
                    <option value="Solved">Solved</option>
                    <option value="Revisit">Revisit</option>
                    <option value="Todo">Todo</option>
                  </select>
                </div>
              </div>

              {/* Problems Table */}
              <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        <th className="py-3.5 px-5">Problem Title</th>
                        <th className="py-3.5 px-4">Topic</th>
                        <th className="py-3.5 px-4">Difficulty</th>
                        <th className="py-3.5 px-4">Platform</th>
                        <th className="py-3.5 px-4">Status (Click to Toggle)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                      {filteredProblems.map(prob => {
                        const topicObj = INITIAL_DSA_TOPICS.find(t => t.id === prob.topic);
                        return (
                          <tr key={prob.id} className="hover:bg-slate-50/80 transition">
                            <td className="py-3.5 px-5 font-semibold text-slate-800">
                              <div className="flex items-center gap-2">
                                <span>{prob.title}</span>
                                <a href={prob.link} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-indigo-600">
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              </div>
                            </td>
                            <td className="py-3.5 px-4 text-xs font-medium text-slate-600">
                              {topicObj?.name || prob.topic}
                            </td>
                            <td className="py-3.5 px-4">
                              <span
                                className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                                  prob.difficulty === 'Hard'
                                    ? 'bg-rose-50 text-rose-700'
                                    : prob.difficulty === 'Medium'
                                    ? 'bg-amber-50 text-amber-700'
                                    : 'bg-emerald-50 text-emerald-700'
                                }`}
                              >
                                {prob.difficulty}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-xs text-slate-500 font-medium">{prob.platform}</td>
                            <td className="py-3.5 px-4">
                              <button
                                onClick={() => cycleProblemStatus(prob.id)}
                                className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border transition ${
                                  prob.status === 'Solved'
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                    : prob.status === 'Revisit'
                                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                                    : 'bg-slate-100 text-slate-600 border-slate-200'
                                }`}
                              >
                                {prob.status === 'Solved' && <CheckCircle2 className="w-3.5 h-3.5" />}
                                {prob.status === 'Revisit' && <RotateCcw className="w-3.5 h-3.5" />}
                                {prob.status === 'Todo' && <Circle className="w-3.5 h-3.5" />}
                                {prob.status}
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                      {filteredProblems.length === 0 && (
                        <tr>
                          <td colSpan={5} className="py-8 text-center text-sm text-slate-400">
                            No problems match your filters. Click "Log DSA" to add a new problem!
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 3. APTITUDE PREPARATION VIEW                              */}
          {/* ========================================================= */}
          {activeTab === 'aptitude' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left 2 Columns: Topic Checklists */}
              <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-5">
                <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-4">
                  {[
                    { id: 'quant', label: 'Quantitative Aptitude' },
                    { id: 'logical', label: 'Logical Reasoning' },
                    { id: 'verbal', label: 'Verbal Ability' },
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setAptSubTab(tab.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                        aptSubTab === tab.id
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="space-y-3">
                  {aptitude[aptSubTab].map(item => (
                    <div
                      key={item.id}
                      onClick={() => toggleAptitudeTopic(aptSubTab, item.id)}
                      className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                        item.completed
                          ? 'bg-emerald-50/30 border-emerald-200/80'
                          : 'bg-white border-slate-200/80 hover:border-indigo-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {item.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        ) : (
                          <Circle className="w-5 h-5 text-slate-300 shrink-0" />
                        )}
                        <span className={`font-semibold text-sm ${item.completed ? 'text-slate-700' : 'text-slate-900'}`}>
                          {item.topic}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                          Accuracy: {item.accuracy}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Mock Test Tracker */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-5">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-500" />
                  OA & Mock Test Scores
                </h3>

                <div className="space-y-2.5">
                  {aptitude.mockScores.map(mock => (
                    <div key={mock.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-sm text-slate-800">{mock.name}</p>
                        <p className="text-xs text-slate-400">{mock.date}</p>
                      </div>
                      <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">
                        {mock.score}/{mock.total}
                      </span>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleAddMockScore} className="pt-4 border-t border-slate-100 space-y-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Log New Mock Score</p>
                  <input
                    type="text"
                    placeholder="Test Name (e.g. Accenture Mock)"
                    value={newMock.name}
                    onChange={e => setNewMock({ ...newMock, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Score"
                      value={newMock.score}
                      onChange={e => setNewMock({ ...newMock, score: e.target.value })}
                      className="w-1/2 px-3 py-2 rounded-xl border border-slate-200 text-xs"
                    />
                    <input
                      type="number"
                      placeholder="Out of (100)"
                      value={newMock.total}
                      onChange={e => setNewMock({ ...newMock, total: e.target.value })}
                      className="w-1/2 px-3 py-2 rounded-xl border border-slate-200 text-xs"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition"
                  >
                    Save Score
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 4. TECHNICAL SUBJECTS VIEW                                */}
          {/* ========================================================= */}
          {activeTab === 'subjects' && (
            <div className="space-y-6">
              {/* Subject Selector Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {csSubjects.map(sub => {
                  const doneCount = sub.topics.filter(t => t.done).length;
                  const pct = Math.round((doneCount / sub.topics.length) * 100);
                  const active = sub.id === selectedSubject.id;
                  return (
                    <button
                      key={sub.id}
                      onClick={() => {
                        setSelectedSubjectId(sub.id);
                        setEditingNote(false);
                      }}
                      className={`p-4 rounded-2xl border text-left transition ${
                        active
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200'
                          : 'bg-white text-slate-800 border-slate-200/80 hover:border-indigo-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-extrabold text-sm">{sub.code}</span>
                        <span className={`text-xs font-bold ${active ? 'text-indigo-100' : 'text-indigo-600'}`}>
                          {pct}%
                        </span>
                      </div>
                      <p className={`text-xs truncate ${active ? 'text-indigo-100' : 'text-slate-500'}`}>
                        {sub.name}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Selected Subject Detail */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-lg text-slate-900">{selectedSubject.name}</h3>
                      <p className="text-xs text-slate-500">Check off topics as you complete theory & interview questions</p>
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700">
                      {selectedSubject.topics.filter(t => t.done).length} / {selectedSubject.topics.length} Completed
                    </span>
                  </div>

                  <div className="space-y-2.5 pt-2">
                    {selectedSubject.topics.map(topic => (
                      <div
                        key={topic.id}
                        onClick={() => toggleCsTopic(selectedSubject.id, topic.id)}
                        className={`p-3.5 rounded-xl border flex items-center gap-3 cursor-pointer transition ${
                          topic.done
                            ? 'bg-slate-50 border-slate-200/60 text-slate-500'
                            : 'bg-white border-slate-200 hover:border-indigo-300 text-slate-900'
                        }`}
                      >
                        {topic.done ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                        ) : (
                          <Circle className="w-5 h-5 text-slate-300 shrink-0" />
                        )}
                        <span className={`text-sm font-medium ${topic.done ? 'line-through' : ''}`}>
                          {topic.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Revision Cheat-Sheet Box */}
                <div className="bg-amber-50/60 p-6 rounded-2xl border border-amber-200/80 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-sm text-amber-950 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-amber-600" />
                        Last-Minute Revision Notes
                      </h4>
                      <button
                        onClick={() => setEditingNote(!editingNote)}
                        className="text-xs font-semibold text-amber-800 hover:underline"
                      >
                        {editingNote ? 'Done' : 'Edit'}
                      </button>
                    </div>

                    {editingNote ? (
                      <textarea
                        rows={7}
                        value={selectedSubject.notes}
                        onChange={e => updateCsNote(selectedSubject.id, e.target.value)}
                        className="w-full p-3 rounded-xl border border-amber-300 bg-white text-xs text-slate-800 leading-relaxed focus:outline-none"
                      />
                    ) : (
                      <p className="text-xs text-amber-950/90 leading-relaxed bg-white/80 p-4 rounded-xl border border-amber-200/60">
                        {selectedSubject.notes}
                      </p>
                    )}
                  </div>

                  <div className="text-[11px] text-amber-800/80 bg-amber-100/70 p-3 rounded-xl">
                    💡 <strong>Interview Tip:</strong> Keep concise definitions & real-world trade-offs ready for {selectedSubject.code} rapid-fire rounds.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 5. STUDY PLANNER & PROGRESS TRACKER VIEW                  */}
          {/* ========================================================= */}
          {activeTab === 'planner' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Daily Task Manager */}
              <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900">Daily Study Goals & Tasks</h3>
                  <span className="text-xs font-semibold text-slate-500">
                    {stats.tasksDone} of {stats.tasksTotal} done ({stats.tasksPct}%)
                  </span>
                </div>

                {/* Add Task Form */}
                <form onSubmit={handleAddTask} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    placeholder="Add a new study target (e.g. Revise B+ Trees)..."
                    value={newTaskTitle}
                    onChange={e => setNewTaskTitle(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500"
                  />
                  <select
                    value={newTaskCategory}
                    onChange={e => setNewTaskCategory(e.target.value)}
                    className="px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold bg-white"
                  >
                    <option value="DSA">DSA</option>
                    <option value="Core CS">Core CS</option>
                    <option value="Aptitude">Aptitude</option>
                    <option value="Resume">Resume / HR</option>
                  </select>
                  <select
                    value={newTaskPriority}
                    onChange={e => setNewTaskPriority(e.target.value)}
                    className="px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold bg-white"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition"
                  >
                    Add Task
                  </button>
                </form>

                {/* Task List */}
                <div className="space-y-2.5">
                  {tasks.map(task => (
                    <div
                      key={task.id}
                      className={`p-3.5 rounded-xl border flex items-center justify-between transition ${
                        task.completed ? 'bg-slate-50 border-slate-100' : 'bg-white border-slate-200/90'
                      }`}
                    >
                      <div
                        onClick={() => toggleTask(task.id)}
                        className="flex items-center gap-3 cursor-pointer flex-1"
                      >
                        {task.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                        ) : (
                          <Circle className="w-5 h-5 text-slate-300 shrink-0" />
                        )}
                        <div>
                          <p className={`text-sm font-medium ${task.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                            {task.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                              {task.category}
                            </span>
                            <span className="text-[11px] text-slate-400">• {task.priority} Priority</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition"
                        title="Delete task"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weekly Consistency & Progress Tracker */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-6">
                <div>
                  <h3 className="font-bold text-slate-900">Weekly Study Consistency</h3>
                  <p className="text-xs text-slate-500 mt-0.5">35.5 hrs logged this week (Target: 36 hrs)</p>
                </div>

                {/* Simple Bar Chart */}
                <div className="flex items-end justify-between gap-2 h-44 pt-4 px-2 border-b border-slate-100">
                  {WEEKLY_STUDY_HOURS.map(d => {
                    const heightPct = Math.min(100, Math.round((d.hours / 8) * 100));
                    return (
                      <div key={d.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                        <span className="text-[11px] font-bold text-slate-600">{d.hours}h</span>
                        <div className="w-full max-w-[28px] bg-slate-100 rounded-t-lg h-32 flex items-end overflow-hidden">
                          <div
                            className={`w-full rounded-t-lg transition-all ${
                              d.hours >= d.target ? 'bg-indigo-600' : 'bg-indigo-300'
                            }`}
                            style={{ height: `${heightPct}%` }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-slate-500 pb-2">{d.day}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-100 space-y-1.5">
                  <div className="flex items-center gap-2 text-indigo-900 font-bold text-xs">
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    Smart Pacing Insight
                  </div>
                  <p className="text-xs text-indigo-900/80 leading-relaxed">
                    You’re strongest in <strong>Arrays & DBMS</strong>. Dedicate 45 mins tomorrow to <strong>Dynamic Programming</strong> & <strong>CN Protocols</strong> to balance your readiness score.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 6. COMPANY TRACKER VIEW                                   */}
          {/* ========================================================= */}
          {activeTab === 'companies' && (
            <div className="space-y-5">
              {/* Stage Filter Chips */}
              <div className="flex flex-wrap items-center gap-2">
                {['All', 'Wishlist', 'Applied', 'OA Scheduled', 'Technical Round', 'HR Round', 'Offer', 'Rejected'].map(stage => {
                  const count = stage === 'All' ? companies.length : companies.filter(c => c.stage === stage).length;
                  const active = companyStageFilter === stage;
                  return (
                    <button
                      key={stage}
                      onClick={() => setCompanyStageFilter(stage)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition ${
                        active
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {stage} ({count})
                    </button>
                  );
                })}
              </div>

              {/* Company Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCompanies.map(comp => (
                  <div key={comp.id} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-bold text-base text-slate-900">{comp.company}</h4>
                          <p className="text-xs font-medium text-slate-500">{comp.role}</p>
                        </div>
                        <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700">
                          {comp.ctc}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-slate-500 mt-3">
                        <span>📅 {comp.date}</span>
                        {comp.location && <span>📍 {comp.location}</span>}
                      </div>

                      {comp.notes && (
                        <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 mt-3 leading-relaxed">
                          {comp.notes}
                        </p>
                      )}
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-slate-400">Stage:</span>
                      <select
                        value={comp.stage}
                        onChange={e => updateCompanyStage(comp.id, e.target.value)}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-lg border cursor-pointer focus:outline-none ${STAGE_STYLES[comp.stage]}`}
                      >
                        {Object.keys(STAGE_STYLES).map(st => (
                          <option key={st} value={st} className="bg-white text-slate-800">
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ========================================================= */}
      {/* MODAL: ADD DSA PROBLEM                                    */}
      {/* ========================================================= */}
      {showAddProblemModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-slate-900">Log DSA Problem</h3>
              <button onClick={() => setShowAddProblemModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddProblem} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Problem Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rotten Oranges"
                  value={newProblem.title}
                  onChange={e => setNewProblem({ ...newProblem, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Topic</label>
                  <select
                    value={newProblem.topic}
                    onChange={e => setNewProblem({ ...newProblem, topic: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm bg-white"
                  >
                    {INITIAL_DSA_TOPICS.map(t => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Difficulty</label>
                  <select
                    value={newProblem.difficulty}
                    onChange={e => setNewProblem({ ...newProblem, difficulty: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm bg-white"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Platform</label>
                  <select
                    value={newProblem.platform}
                    onChange={e => setNewProblem({ ...newProblem, platform: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm bg-white"
                  >
                    <option value="LeetCode">LeetCode</option>
                    <option value="GFG">GeeksforGeeks</option>
                    <option value="Codeforces">Codeforces</option>
                    <option value="InterviewBit">InterviewBit</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Status</label>
                  <select
                    value={newProblem.status}
                    onChange={e => setNewProblem({ ...newProblem, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm bg-white"
                  >
                    <option value="Solved">Solved</option>
                    <option value="Revisit">Revisit</option>
                    <option value="Todo">Todo</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddProblemModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold"
                >
                  Save Problem
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: ADD COMPANY APPLICATION                            */}
      {/* ========================================================= */}
      {showAddCompanyModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-slate-900">Add Company Drive</h3>
              <button onClick={() => setShowAddCompanyModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddCompany} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Company Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Adobe"
                    value={newCompany.company}
                    onChange={e => setNewCompany({ ...newCompany, company: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">CTC / Stipend</label>
                  <input
                    type="text"
                    placeholder="e.g. 28 LPA"
                    value={newCompany.ctc}
                    onChange={e => setNewCompany({ ...newCompany, ctc: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Role</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Member of Technical Staff"
                  value={newCompany.role}
                  onChange={e => setNewCompany({ ...newCompany, role: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Current Stage</label>
                  <select
                    value={newCompany.stage}
                    onChange={e => setNewCompany({ ...newCompany, stage: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm bg-white"
                  >
                    {Object.keys(STAGE_STYLES).map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Next Event Date</label>
                  <input
                    type="date"
                    value={newCompany.date}
                    onChange={e => setNewCompany({ ...newCompany, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Notes / Prep Focus</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Referral submitted, focus on C++ & OS..."
                  value={newCompany.notes}
                  onChange={e => setNewCompany({ ...newCompany, notes: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddCompanyModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold"
                >
                  Add Company
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}