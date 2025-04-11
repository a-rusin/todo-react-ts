import React from "react";
import "./InputField.css";

interface InputFieldProps {
  label: string;
  id: string;
  type: string;
  value: string;
  onChange: ({ name, value }: { name: string; value: string }) => void;
  placeholder?: string;
  name: string;
  autoComplete: string;
}

export const InputField = ({
  label,
  id,
  type,
  value,
  onChange,
  placeholder,
  name,
  autoComplete,
}: InputFieldProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ name: e.target.name, value: e.target.value });
  };

  return (
    <div className="input-block">
      <label htmlFor={id} className="input-label">
        {label}:
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={handleChange}
        className="input-field"
        placeholder={placeholder}
        name={name}
        autoComplete={autoComplete}
      />
    </div>
  );
};
