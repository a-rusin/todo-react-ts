import React from "react";
import "./TextAreaField.css";

interface TextAreaFieldProps {
  label: string;
  id: string;
  value: string;
  onChange: ({ name, value }: { name: string; value: string }) => void;
  placeholder?: string;
  name: string;
}

export const TextAreaField = ({
  label,
  id,
  value,
  onChange,
  placeholder,
  name,
}: TextAreaFieldProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange({ name: e.target.name, value: e.target.value });
  };

  return (
    <div className="textarea-block">
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
    </div>
  );
};
