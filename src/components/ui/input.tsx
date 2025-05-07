import React from "react";

export const Input = ({
                          type = "text",
                          placeholder,
                          className = "",
                          ...props
                      }: React.InputHTMLAttributes<HTMLInputElement>) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            className={`w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
            {...props}
        />
    );
};
