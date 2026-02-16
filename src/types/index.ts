export type Department = 
  | "Computer Science"
  | "Electronics"
  | "Mechanical"
  | "Civil"
  | "Electrical"
  | "Information Technology";

export type StudentStatus = "pending" | "approved" | "rejected";
export type ApplicationStatus = "applied" | "shortlisted" | "selected" | "rejected";
export type UserRole = "student" | "admin";

export interface Student {
  id: string;
  name: string;
  collegeId: string;
  email: string;
  password: string;
  department: Department;
  cgpa: number;
  status: StudentStatus;
  registeredAt: string;
}

export interface Placement {
  id: string;
  companyName: string;
  role: string;
  package: string;
  minCgpa: number;
  allowedDepartments: Department[];
  description: string;
  postedAt: string;
}

export interface Application {
  id: string;
  studentId: string;
  placementId: string;
  status: ApplicationStatus;
  appliedAt: string;
}

export interface AuthUser {
  role: UserRole;
  student?: Student;
}
