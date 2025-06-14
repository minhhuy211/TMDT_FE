// src/context/UserContext.tsx

import React, { createContext, useContext, useEffect, useState } from "react";

interface UserContextType {
    username: string | null;
    setUsername: (username: string | null) => void;
}

const UserContext = createContext<UserContextType>({
    username: null,
    setUsername: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [username, setUsernameState] = useState<string | null>(null);

    // Load từ localStorage khi khởi động app
    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        if (storedUsername) {
            setUsernameState(storedUsername);
        }
    }, []);

    const setUsername = (username: string | null) => {
        setUsernameState(username);
        if (username) {
            localStorage.setItem("username", username);
        } else {
            localStorage.removeItem("username");
        }
    };

    return (
        <UserContext.Provider value={{ username, setUsername }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
