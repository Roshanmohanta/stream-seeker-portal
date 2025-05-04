
import { College, Course, Job, StreamType, User } from "./types";

// Mock Courses Data
export const courses: Course[] = [
  // Science Stream Courses
  {
    id: "course-001",
    title: "Computer Science Engineering",
    stream: "science",
    description: "A comprehensive program focused on computer science fundamentals, software development, algorithms, and data structures. Students learn programming languages, system design, and software engineering practices.",
    duration: "4 years",
    eligibility: "10+2 with Physics, Chemistry, and Mathematics with minimum 60% marks",
    careerProspects: ["Software Developer", "Data Scientist", "System Architect", "AI Engineer", "DevOps Engineer"],
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
  {
    id: "course-002",
    title: "Medical Sciences (MBBS)",
    stream: "science",
    description: "A professional degree program that prepares students for careers in medicine and healthcare. The curriculum covers anatomy, physiology, biochemistry, pathology, and clinical medicine.",
    duration: "5.5 years (including 1 year internship)",
    eligibility: "10+2 with Physics, Chemistry, and Biology with minimum 60% marks",
    careerProspects: ["Doctor", "Surgeon", "Medical Researcher", "Healthcare Administrator", "Medical Consultant"],
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
  {
    id: "course-003",
    title: "Mechanical Engineering",
    stream: "science",
    description: "A discipline that applies engineering principles to design, analyze, and manufacture mechanical systems. The curriculum covers thermodynamics, materials science, fluid mechanics, and machine design.",
    duration: "4 years",
    eligibility: "10+2 with Physics, Chemistry, and Mathematics with minimum 60% marks",
    careerProspects: ["Mechanical Engineer", "Product Designer", "Manufacturing Engineer", "Robotics Engineer", "Energy Consultant"],
    image: "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
  
  // Commerce Stream Courses
  {
    id: "course-004",
    title: "Bachelor of Commerce",
    stream: "commerce",
    description: "A program that provides students with knowledge of business, finance, accounting, and economics. The curriculum covers financial accounting, business law, taxation, and corporate finance.",
    duration: "3 years",
    eligibility: "10+2 with Commerce/Mathematics with minimum 55% marks",
    careerProspects: ["Accountant", "Financial Analyst", "Investment Banker", "Tax Consultant", "Business Analyst"],
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
  {
    id: "course-005",
    title: "Chartered Accountancy (CA)",
    stream: "commerce",
    description: "A professional qualification that prepares students for careers in accounting, auditing, and taxation. The program covers financial reporting, auditing, taxation, and business laws.",
    duration: "3-4 years",
    eligibility: "10+2 with minimum 55% marks and CA Foundation exam clearance",
    careerProspects: ["Chartered Accountant", "Audit Manager", "Tax Consultant", "Financial Controller", "Corporate Advisor"],
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
  {
    id: "course-006",
    title: "Business Administration (BBA)",
    stream: "commerce",
    description: "A program that provides students with knowledge of business management, marketing, finance, and human resources. The curriculum covers business strategy, organizational behavior, and marketing management.",
    duration: "3 years",
    eligibility: "10+2 with minimum 50% marks",
    careerProspects: ["Business Manager", "Marketing Executive", "HR Specialist", "Operations Manager", "Entrepreneur"],
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
  
  // Arts Stream Courses
  {
    id: "course-007",
    title: "Bachelor of Arts in Psychology",
    stream: "arts",
    description: "A program that provides students with knowledge of human behavior, mental processes, and psychological theories. The curriculum covers cognitive psychology, developmental psychology, and clinical psychology.",
    duration: "3 years",
    eligibility: "10+2 with minimum 50% marks",
    careerProspects: ["Psychologist", "Counselor", "Human Resource Specialist", "Research Analyst", "Mental Health Worker"],
    image: "https://images.unsplash.com/photo-1576669801820-a9ab287ac2d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
  {
    id: "course-008",
    title: "Mass Communication and Journalism",
    stream: "arts",
    description: "A program that prepares students for careers in media, journalism, and communication. The curriculum covers media writing, reporting, editing, and media production techniques.",
    duration: "3 years",
    eligibility: "10+2 with minimum 50% marks",
    careerProspects: ["Journalist", "Content Writer", "Public Relations Specialist", "Media Planner", "Documentary Filmmaker"],
    image: "https://images.unsplash.com/photo-1503694978374-8a2fa686963a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
  {
    id: "course-009",
    title: "Fine Arts",
    stream: "arts",
    description: "A program that develops students' artistic abilities and creative expression. The curriculum covers painting, sculpture, drawing, and art history.",
    duration: "4 years",
    eligibility: "10+2 with minimum 50% marks and portfolio submission",
    careerProspects: ["Artist", "Art Director", "Gallery Curator", "Art Educator", "Illustrator"],
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
];

// Mock Colleges Data
export const colleges: College[] = [
  {
    id: "college-001",
    name: "National Institute of Technology",
    courses: ["course-001", "course-003"],
    location: "Bangalore, Karnataka",
    averageSalary: 1200000,
    admissionFees: 85000,
    companies: ["Google", "Microsoft", "Amazon", "IBM", "Infosys"],
    applicationProcess: "Online application followed by JEE Main score and counseling",
    importantDates: {
      "Application Start": "October 15, 2023",
      "Application Deadline": "December 31, 2023",
      "Entrance Exam": "January 25, 2024",
      "Result Declaration": "February 28, 2024",
      "Counseling Begins": "March 15, 2024",
    },
    image: "https://images.unsplash.com/photo-1562774053-701939374585?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    rating: 4.8,
  },
  {
    id: "college-002",
    name: "All India Institute of Medical Sciences",
    courses: ["course-002"],
    location: "New Delhi, Delhi",
    averageSalary: 950000,
    admissionFees: 125000,
    companies: ["Apollo Hospitals", "Fortis Healthcare", "Max Healthcare", "Medanta"],
    applicationProcess: "Online application followed by NEET score and counseling",
    importantDates: {
      "Application Start": "September 15, 2023",
      "Application Deadline": "November 30, 2023",
      "Entrance Exam": "January 10, 2024",
      "Result Declaration": "February 15, 2024",
      "Counseling Begins": "March 1, 2024",
    },
    image: "https://images.unsplash.com/photo-1551884831-bbf3cdc6469e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    rating: 4.9,
  },
  {
    id: "college-003",
    name: "Indian Institute of Management",
    courses: ["course-006"],
    location: "Ahmedabad, Gujarat",
    averageSalary: 2400000,
    admissionFees: 230000,
    companies: ["McKinsey", "BCG", "Bain & Company", "Goldman Sachs", "JP Morgan"],
    applicationProcess: "Online application followed by CAT score, GD, and PI",
    importantDates: {
      "Application Start": "August 15, 2023",
      "Application Deadline": "October 31, 2023",
      "Entrance Exam": "November 26, 2023",
      "Result Declaration": "January 15, 2024",
      "GD/PI Rounds": "February-March 2024",
    },
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    rating: 4.9,
  },
  {
    id: "college-004",
    name: "St. Xavier's College",
    courses: ["course-004", "course-007"],
    location: "Mumbai, Maharashtra",
    averageSalary: 850000,
    admissionFees: 75000,
    companies: ["KPMG", "Deloitte", "EY", "PwC", "Axis Bank"],
    applicationProcess: "Online application followed by entrance exam and interview",
    importantDates: {
      "Application Start": "April 1, 2024",
      "Application Deadline": "May 15, 2024",
      "Entrance Exam": "May 30, 2024",
      "Result Declaration": "June 15, 2024",
      "Admissions Begin": "July 1, 2024",
    },
    image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    rating: 4.5,
  },
  {
    id: "college-005",
    name: "National Institute of Design",
    courses: ["course-009"],
    location: "Ahmedabad, Gujarat",
    averageSalary: 900000,
    admissionFees: 95000,
    companies: ["Apple", "Samsung", "Adobe", "Philips", "Titan"],
    applicationProcess: "Online application followed by entrance exam and studio test",
    importantDates: {
      "Application Start": "November 1, 2023",
      "Application Deadline": "January 15, 2024",
      "Preliminary Exam": "February 10, 2024",
      "Main Exam": "April 5, 2024",
      "Result Declaration": "May 20, 2024",
    },
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    rating: 4.7,
  },
  {
    id: "college-006",
    name: "Indian Institute of Journalism & Mass Communication",
    courses: ["course-008"],
    location: "New Delhi, Delhi",
    averageSalary: 820000,
    admissionFees: 88000,
    companies: ["Times Group", "NDTV", "CNN-IBN", "Hindustan Times", "The Hindu"],
    applicationProcess: "Online application followed by entrance exam and interview",
    importantDates: {
      "Application Start": "March 1, 2024",
      "Application Deadline": "April 15, 2024",
      "Entrance Exam": "May 10, 2024",
      "Interview Rounds": "June 5-15, 2024",
      "Result Declaration": "June 30, 2024",
    },
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    rating: 4.6,
  },
];

// Mock Jobs Data
export const jobs: Job[] = [
  {
    id: "job-001",
    title: "Software Engineer",
    company: "Google",
    location: "Bangalore, India",
    salary: "₹18-25 LPA",
    description: "We're looking for a Software Engineer to join our team. You'll be working on cutting-edge technology and helping to build products that impact millions of users worldwide.",
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      "3+ years of experience in software development",
      "Proficiency in one or more programming languages such as Java, C++, or Python",
      "Experience with algorithms, data structures, and software design",
    ],
    type: "Full-time",
    experience: "3-5 years",
    industry: "Technology",
    postedDate: "2023-09-15",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/120px-Google_%22G%22_Logo.svg.png",
  },
  {
    id: "job-002",
    title: "Financial Analyst",
    company: "JP Morgan Chase",
    location: "Mumbai, India",
    salary: "₹12-18 LPA",
    description: "We're seeking a Financial Analyst to join our team. You'll be responsible for financial modeling, data analysis, and creating financial reports for senior management.",
    requirements: [
      "Bachelor's degree in Finance, Accounting, or related field",
      "2+ years of experience in financial analysis",
      "Proficiency in Excel and financial modeling",
      "Knowledge of financial statements and accounting principles",
    ],
    type: "Full-time",
    experience: "2-4 years",
    industry: "Banking & Finance",
    postedDate: "2023-09-20",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/J_P_Morgan_Logo_2008_1.svg/120px-J_P_Morgan_Logo_2008_1.svg.png",
  },
  {
    id: "job-003",
    title: "Medical Officer",
    company: "Apollo Hospitals",
    location: "Delhi, India",
    salary: "₹10-15 LPA",
    description: "We're looking for a Medical Officer to join our team. You'll be responsible for providing medical care to patients, maintaining medical records, and assisting in hospital administration.",
    requirements: [
      "MBBS degree from a recognized university",
      "1+ years of experience in a hospital setting",
      "Valid medical license",
      "Good communication and interpersonal skills",
    ],
    type: "Full-time",
    experience: "1-3 years",
    industry: "Healthcare",
    postedDate: "2023-09-25",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Apollo_Hospitals_Logo.svg/120px-Apollo_Hospitals_Logo.svg.png",
  },
  {
    id: "job-004",
    title: "Content Writer",
    company: "Times Group",
    location: "Remote, India",
    salary: "₹6-10 LPA",
    description: "We're seeking a Content Writer to join our team. You'll be responsible for creating engaging content for our digital platforms, including articles, blog posts, and social media content.",
    requirements: [
      "Bachelor's degree in Journalism, English, or related field",
      "2+ years of experience in content writing",
      "Excellent writing and editing skills",
      "Understanding of SEO principles",
    ],
    type: "Full-time",
    experience: "2-4 years",
    industry: "Media & Communication",
    postedDate: "2023-10-01",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Times_of_India_logo.svg/120px-Times_of_India_logo.svg.png",
  },
  {
    id: "job-005",
    title: "Mechanical Engineer",
    company: "Tata Motors",
    location: "Pune, India",
    salary: "₹8-12 LPA",
    description: "We're looking for a Mechanical Engineer to join our team. You'll be responsible for designing, developing, and testing mechanical components for our automotive products.",
    requirements: [
      "Bachelor's degree in Mechanical Engineering",
      "2+ years of experience in mechanical design",
      "Proficiency in CAD software",
      "Knowledge of material properties and manufacturing processes",
    ],
    type: "Full-time",
    experience: "2-5 years",
    industry: "Automotive",
    postedDate: "2023-10-05",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Tata_logo.svg/120px-Tata_logo.svg.png",
  },
  {
    id: "job-006",
    title: "Graphic Designer",
    company: "Adobe",
    location: "Noida, India",
    salary: "₹8-14 LPA",
    description: "We're seeking a Graphic Designer to join our team. You'll be responsible for creating visual concepts, using computer software, to communicate ideas that inspire, inform, or captivate consumers.",
    requirements: [
      "Bachelor's degree in Graphic Design or related field",
      "3+ years of experience in graphic design",
      "Proficiency in Adobe Creative Suite",
      "Strong portfolio showcasing design skills",
    ],
    type: "Full-time",
    experience: "3-5 years",
    industry: "Design & Creative",
    postedDate: "2023-10-10",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Adobe_Photoshop_CC_icon.svg/120px-Adobe_Photoshop_CC_icon.svg.png",
  },
];

// Mock Users Data
export const users: User[] = [
  {
    id: "user-001",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
  },
  {
    id: "user-002",
    name: "John Doe",
    email: "john@example.com",
    role: "user",
    savedJobs: ["job-001", "job-003"],
    preferences: {
      stream: "science",
      interests: ["Technology", "Healthcare"],
      location: "Bangalore",
      salary: "₹15+ LPA",
    },
  },
];

// Helper functions to work with mock data
export const getStreamCourses = (stream: StreamType): Course[] => {
  return courses.filter(course => course.stream === stream);
};

export const getCourseById = (id: string): Course | undefined => {
  return courses.find(course => course.id === id);
};

export const getCollegeById = (id: string): College | undefined => {
  return colleges.find(college => college.id === id);
};

export const getCollegesByIds = (ids: string[]): College[] => {
  return colleges.filter(college => ids.includes(college.id));
};

export const getCollegesForCourse = (courseId: string): College[] => {
  return colleges.filter(college => college.courses.includes(courseId));
};

export const getJobById = (id: string): Job | undefined => {
  return jobs.find(job => job.id === id);
};

export const getJobsByIds = (ids: string[]): Job[] => {
  return jobs.filter(job => ids.includes(job.id));
};

export const getFilteredJobs = (
  keyword?: string,
  location?: string,
  salary?: string,
  industry?: string,
  experience?: string,
): Job[] => {
  return jobs.filter(job => {
    const matchKeyword = !keyword || 
      job.title.toLowerCase().includes(keyword.toLowerCase()) || 
      job.company.toLowerCase().includes(keyword.toLowerCase()) ||
      job.description.toLowerCase().includes(keyword.toLowerCase());
    
    const matchLocation = !location || job.location.toLowerCase().includes(location.toLowerCase());
    
    const matchIndustry = !industry || job.industry.toLowerCase().includes(industry.toLowerCase());
    
    const matchExperience = !experience || job.experience.toLowerCase().includes(experience.toLowerCase());
    
    // Simple salary filtering logic (just checks if salary contains the filter text)
    const matchSalary = !salary || job.salary.toLowerCase().includes(salary.toLowerCase());
    
    return matchKeyword && matchLocation && matchSalary && matchIndustry && matchExperience;
  });
};

export const validateUser = (email: string, password: string): User | undefined => {
  // In a real app, you would hash passwords and do proper validation
  if (email === "admin@example.com" && password === "admin123") {
    return users[0]; // Return admin user
  }
  if (email === "john@example.com" && password === "john123") {
    return users[1]; // Return regular user
  }
  return undefined;
};
