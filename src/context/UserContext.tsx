

// import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

// type UserContextType = {
//     username: string | null;
//     setUsername: (username: string | null) => void;
// };

// const UserContext = createContext<UserContextType | undefined>(undefined);

// export const UserProvider = ({ children }: { children: ReactNode }) => {
//     const [username, setUsername] = useState<string | null>(null);

//     useEffect(() => {
//         // Lấy username từ localStorage lúc app load
//         const storedUsername = localStorage.getItem("username");
//         if (storedUsername) setUsername(storedUsername);
//     }, []);

//     return (
//         <UserContext.Provider value={{ username, setUsername }}>
//             {children}
//         </UserContext.Provider>
//     );
// };

// export const useUser = () => {
//     const context = useContext(UserContext);
//     if (!context) {
//         throw new Error("useUser must be used within UserProvider");
//     }
//     return context;
// };

