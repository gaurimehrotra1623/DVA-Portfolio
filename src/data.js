import dashboardImg from './assets/Dashboard.png';
import image2Img from './assets/image2.png';
import image3Img from './assets/image3.png';
import profileImg from './assets/Profile.png';

export const profileData = {
  avatar: profileImg,
  name: "Gauri Mehrotra",
  handle: "gauri_1669",
  bio: "B.Tech CSE (AI) ’28 | Aspiring Data Analyst & Machine Learning Enthusiast | Turning data into insights and ideas into impact.",
  stats: {
    posts: 3,
    followers: "10.5K",
    following: 120
  },
  github: "https://github.com/gaurimehrotra1623",
  linkedin: "https://www.linkedin.com/in/gauri-mehrotra-008580324/"
};

export const highlightsData = [
];

export const projectsData = [
  { id: 1, title: "International Student Career Outcome Analysis", description: "Analyzed 300K+ graduate career records using Python and built an interactive Tableau dashboard to uncover trends in employment, salaries, and career outcomes.", image: `var(--bg-elevated) url(${dashboardImg}) center/contain no-repeat`, likes: 342, comments: 12, github: "https://github.com/gaurimehrotra1623/International-Student-Career-Outcomes-Analysis-Python-Tableau-", live: "https://public.tableau.com/app/profile/gauri.mehrotra/viz/InternationalGraduateCareerOutcomesDashboard/Dashboard1?publish=yes"},
  { id: 2, title: "Apple Inc. Stock Performance Analysis (3-Year EDA with Risk Metrics & Visualization) ", description: "Analyzed 752 days of AAPL stock data using Python to engineer financial indicators, assess risk metrics, and uncover market trends through data-driven visualizations.", image: `var(--bg-elevated) url(${image2Img}) center/contain no-repeat`, likes: 512, comments: 28, github: "https://github.com/gaurimehrotra1623/Apple-Stock-Market-Analysis-2022-24"},
  { id: 3, title: "Oliver – Personal Voice Assistant", description: "Your very own voice assistant.", image: `var(--bg-elevated) url(${image3Img}) center/contain no-repeat`, likes: 210, comments: 5, github: "https://github.com/gaurimehrotra1623/Oliver", live: "https://oliver-murex-five.vercel.app/" }
];

export const skillsReelsData = [
  { id: 'react', title: "React & Next.js", description: "Building fast, dynamic UIs with modern React patterns.", color: "#61DAFB" },
  { id: 'ts', title: "TypeScript", description: "Type-safe codebases for scalable applications.", color: "#3178C6" },
  { id: 'node', title: "Node.js", description: "REST and GraphQL APIs, microservices, and scripts.", color: "#339933" },
  { id: 'ui', title: "UI/UX Design", description: "Figma, Tailwind, CSS Modules, Framer Motion.", color: "#F24E1E" },
];

export const timelineStories = [
  { id: 't1', year: "2025", role: "Frontend Developer Intern", company: "Tradio", bg: "#1e3c72", link: "https://www.tradiobiz.com//", description: "Led the 0→1 development of a Next.js platform, delivering a high-performance frontend with a 100 SEO score and 93 Accessibility rating. Built a centralized product catalog that reduced order processing time by ~40%, and developed a Supabase-powered admin dashboard to replace manual inventory workflows with real-time tracking." },
];

export const techStack = [
  { id: 'python', name: 'Python', category: 'Programming Languages' },
  { id: 'javascript', name: 'JavaScript', category: 'Programming Languages' },
  { id: 'typescript', name: 'TypeScript', category: 'Programming Languages' },
  { id: 'html', name: 'HTML', category: 'Programming Languages' },
  { id: 'css', name: 'CSS', category: 'Programming Languages' },
  { id: 'nodejs', name: 'Node.js', category: 'Backend' },
  { id: 'express', name: 'Express.js', category: 'Backend' },
  { id: 'fastapi', name: 'FastAPI', category: 'Backend' },
  { id: 'rest', name: 'REST APIs', category: 'Backend' },
  { id: 'react', name: 'React.js', category: 'Frontend' },
  { id: 'pandas', name: 'Pandas', category: 'Data & Analytics' },
  { id: 'numpy', name: 'NumPy', category: 'Data & Analytics' },
  { id: 'excel', name: 'Excel', category: 'Data & Analytics' },
  { id: 'matplotlib', name: 'Matplotlib', category: 'Data & Analytics' },
  { id: 'seaborn', name: 'Seaborn', category: 'Data & Analytics' },
  { id: 'plotly', name: 'Plotly', category: 'Data & Analytics' },
  { id: 'postman', name: 'Postman', category: 'Tools & Platforms' },
  { id: 'jupyter', name: 'Jupyter', category: 'Tools & Platforms' },
  { id: 'github', name: 'GitHub', category: 'Tools & Platforms' },
  { id: 'colab', name: 'Google Colab', category: 'Tools & Platforms' }
];
