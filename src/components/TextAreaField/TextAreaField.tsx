import React from "react";
import "./TextAreaField.css";

interface TextAreaFieldProps {
  label: string;
  id: string;
  value: string;
  onChange: ({ name, value }: { name: string; value: string }) => void;
  placeholder?: string;
  name: string;
  errors?: string[];
}

export const TextAreaField = ({
  label,
  id,
  value,
  onChange,
  placeholder,
  name,
  errors,
}: TextAreaFieldProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange({ name: e.target.name, value: e.target.value });
  };

  return (
    <div className={errors ? "textarea-block invalid" : "textarea-block"}>
      <label htmlFor={id} className="textarea-label">
        {label}:
      </label>
      <textarea
        id={id}
        value={value}
        onChange={handleChange}
        className="textarea-field"
        placeholder={placeholder}
        name={name}
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
