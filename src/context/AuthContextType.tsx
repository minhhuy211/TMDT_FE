// src/contexts/AuthContext.tsx
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface AuthContextType {
    username: string | null;
    setUsername: (name: string | null) => void;
}

const AuthContext = createContext<AuthContextType>({
    username: null,
    setUsername: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [username, setUsername] = useState<string | null>(() => {
        return localStorage.getItem("username");
    });

    useEffect(() => {
        localStorage.setItem("username", username || "");
    }, [username]);

    return (
        <AuthContext.Provider value={{ username, setUsername }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
