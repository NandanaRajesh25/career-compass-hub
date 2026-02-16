import React, { createContext, useContext, useState, useCallback } from "react";
import { AuthUser, Student, UserRole } from "@/types";
import { ADMIN_CREDENTIALS } from "@/data/mockData";
import { useData } from "./DataContext";

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string, role: UserRole) => string | null;
  register: (student: Omit<Student, "id" | "status" | "registeredAt">) => string | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const { students, addStudent } = useData();

  const login = useCallback(
    (email: string, password: string, role: UserRole): string | null => {
      if (role === "admin") {
        if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
          setUser({ role: "admin" });
          return null;
        }
        return "Invalid admin credentials";
      }

      const student = students.find((s) => s.email === email && s.password === password);
      if (!student) return "Invalid email or password";
      if (student.status === "pending") return "Your account is pending approval";
      if (student.status === "rejected") return "Your account has been rejected";

      setUser({ role: "student", student });
      return null;
    },
    [students]
  );

  const register = useCallback(
    (data: Omit<Student, "id" | "status" | "registeredAt">): string | null => {
      const exists = students.find((s) => s.email === data.email || s.collegeId === data.collegeId);
      if (exists) return "A student with this email or college ID already exists";

      addStudent({
        ...data,
        id: `s${Date.now()}`,
        status: "pending",
        registeredAt: new Date().toISOString().split("T")[0],
      });
      return null;
    },
    [students, addStudent]
  );

  const logout = useCallback(() => setUser(null), []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
