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
  errors?: string[];
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
  errors,
}: InputFieldProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ name: e.target.name, value: e.target.value });
  };

  return (
    <div className={errors ? "input-block invalid" : "input-block"}>
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
      {errors && (
        <ul className="error-message-input-list">
          {errors.map((error, index) => (
            <li key={index} className="error-message-input-item">
              *{error}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
