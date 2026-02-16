import { Student, Placement, Application, Department } from "@/types";

export const DEPARTMENTS: Department[] = [
  "Computer Science",
  "Electronics",
  "Mechanical",
  "Civil",
  "Electrical",
  "Information Technology",
];

export const ADMIN_CREDENTIALS = {
  email: "admin@cgpu.edu",
  password: "admin123",
};

export const initialStudents: Student[] = [
  {
    id: "s1",
    name: "Rahul Sharma",
    collegeId: "CS2021001",
    email: "rahul@college.edu",
    password: "password",
    department: "Computer Science",
    cgpa: 8.5,
    status: "approved",
    registeredAt: "2024-01-15",
  },
  {
    id: "s2",
    name: "Priya Patel",
    collegeId: "IT2021002",
    email: "priya@college.edu",
    password: "password",
    department: "Information Technology",
    cgpa: 9.1,
    status: "approved",
    registeredAt: "2024-01-16",
  },
  {
    id: "s3",
    name: "Amit Kumar",
    collegeId: "EC2021003",
    email: "amit@college.edu",
    password: "password",
    department: "Electronics",
    cgpa: 7.2,
    status: "pending",
    registeredAt: "2024-02-01",
  },
];

export const initialPlacements: Placement[] = [
  {
    id: "p1",
    companyName: "Google",
    role: "Software Engineer",
    package: "₹25 LPA",
    minCgpa: 8.0,
    allowedDepartments: ["Computer Science", "Information Technology"],
    description: "Join Google's engineering team to build products used by billions.",
    postedAt: "2024-03-01",
  },
  {
    id: "p2",
    companyName: "Microsoft",
    role: "Full Stack Developer",
    package: "₹22 LPA",
    minCgpa: 7.5,
    allowedDepartments: ["Computer Science", "Information Technology", "Electronics"],
    description: "Work on Azure cloud services and enterprise solutions.",
    postedAt: "2024-03-05",
  },
  {
    id: "p3",
    companyName: "Infosys",
    role: "Systems Engineer",
    package: "₹6.5 LPA",
    minCgpa: 6.0,
    allowedDepartments: ["Computer Science", "Information Technology", "Electronics", "Electrical", "Mechanical", "Civil"],
    description: "Digital transformation projects for global clients.",
    postedAt: "2024-03-10",
  },
  {
    id: "p4",
    companyName: "Amazon",
    role: "SDE I",
    package: "₹28 LPA",
    minCgpa: 8.5,
    allowedDepartments: ["Computer Science", "Information Technology"],
    description: "Build scalable distributed systems at Amazon.",
    postedAt: "2024-03-12",
  },
  {
    id: "p5",
    companyName: "Tata Motors",
    role: "Graduate Engineer",
    package: "₹8 LPA",
    minCgpa: 6.5,
    allowedDepartments: ["Mechanical", "Electrical", "Civil"],
    description: "Design and manufacture next-gen vehicles.",
    postedAt: "2024-03-15",
  },
  {
    id: "p6",
    companyName: "Wipro",
    role: "Project Engineer",
    package: "₹5.5 LPA",
    minCgpa: 5.5,
    allowedDepartments: ["Computer Science", "Information Technology", "Electronics", "Electrical", "Mechanical", "Civil"],
    description: "IT services and consulting for enterprise clients.",
    postedAt: "2024-03-18",
  },
];

export const initialApplications: Application[] = [
  {
    id: "a1",
    studentId: "s1",
    placementId: "p1",
    status: "applied",
    appliedAt: "2024-03-02",
  },
  {
    id: "a2",
    studentId: "s2",
    placementId: "p2",
    status: "applied",
    appliedAt: "2024-03-06",
  },
];
