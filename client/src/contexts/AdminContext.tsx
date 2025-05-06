import { createContext, useState, useContext, ReactNode, useEffect } from "react";

interface AdminContextType {
  isAdmin: boolean;
  setAdmin: (status: boolean) => void;
  login: (password: string) => boolean;
  logout: () => void;
}

const ADMIN_PASSWORD = "admin123"; // 실제 환경에서는 환경 변수나 안전한 인증 시스템 사용 필요

export const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);

  const setAdmin = (status: boolean) => {
    setIsAdmin(status);
    if (status) {
      localStorage.setItem("adminStatus", "true");
    } else {
      localStorage.removeItem("adminStatus");
    }
  };

  const login = (password: string) => {
    const isCorrect = password === ADMIN_PASSWORD;
    if (isCorrect) {
      setAdmin(true);
    }
    return isCorrect;
  };

  const logout = () => {
    setAdmin(false);
  };

  // 페이지 로드 시 localStorage에서 관리자 상태 확인
  useEffect(() => {
    const adminStatus = localStorage.getItem("adminStatus");
    if (adminStatus === "true") {
      setIsAdmin(true);
    }
  }, []);

  return (
    <AdminContext.Provider value={{ isAdmin, setAdmin, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}