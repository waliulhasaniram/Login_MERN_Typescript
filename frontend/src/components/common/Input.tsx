import React from "react";
import type { ChangeEvent } from "react";

interface InputProps {
  label: string;
  type?: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  required = false,
}) => {
  return (
    <div className="mb-6">
      <label className="flex justify-start text-gray-300 text-lg mb-2">
        {label}
      </label>
      <input
        className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default Input;
