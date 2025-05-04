
// Type definitions for our application

export type StreamType = "science" | "commerce" | "arts";

export interface Course {
  id: string;
  title: string;
  stream: StreamType;
  description: string;
  duration: string;
  eligibility: string;
  careerProspects: string[];
  image: string;
}

export interface College {
  id: string;
  name: string;
  courses: string[]; // Course IDs
  location: string;
  averageSalary: number;
  admissionFees: number;
  companies: string[];
  applicationProcess: string;
  importantDates: { [key: string]: string };
  image: string;
  rating: number;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  requirements: string[];
  type: string; // Full-time, Part-time, etc.
  experience: string;
  industry: string;
  postedDate: string;
  logo: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  savedJobs?: string[]; // Job IDs
  preferences?: {
    stream?: StreamType;
    interests?: string[];
    location?: string;
    salary?: string;
  };
}
