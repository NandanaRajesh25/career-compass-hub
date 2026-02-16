import React, { createContext, useContext, useState, useCallback } from "react";
import { Student, Placement, Application } from "@/types";
import { initialStudents, initialPlacements, initialApplications } from "@/data/mockData";

interface DataContextType {
  students: Student[];
  placements: Placement[];
  applications: Application[];
  addStudent: (student: Student) => void;
  updateStudentStatus: (id: string, status: Student["status"]) => void;
  addPlacement: (placement: Placement) => void;
  addApplication: (app: Application) => void;
  hasApplied: (studentId: string, placementId: string) => boolean;
}

const DataContext = createContext<DataContextType>({} as DataContextType);

export const useData = () => useContext(DataContext);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [placements, setPlacements] = useState<Placement[]>(initialPlacements);
  const [applications, setApplications] = useState<Application[]>(initialApplications);

  const addStudent = useCallback((s: Student) => setStudents((prev) => [...prev, s]), []);
  const updateStudentStatus = useCallback(
    (id: string, status: Student["status"]) =>
      setStudents((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s))),
    []
  );
  const addPlacement = useCallback((p: Placement) => setPlacements((prev) => [...prev, p]), []);
  const addApplication = useCallback((a: Application) => setApplications((prev) => [...prev, a]), []);
  const hasApplied = useCallback(
    (studentId: string, placementId: string) =>
      applications.some((a) => a.studentId === studentId && a.placementId === placementId),
    [applications]
  );

  return (
    <DataContext.Provider
      value={{ students, placements, applications, addStudent, updateStudentStatus, addPlacement, addApplication, hasApplied }}
    >
      {children}
    </DataContext.Provider>
  );
};
