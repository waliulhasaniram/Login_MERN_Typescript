import React from "react";
import type { MouseEventHandler, ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = "button",
  onClick,
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full py-3 bg-cyan-500 text-white font-bold rounded-md hover:bg-cyan-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-400 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
