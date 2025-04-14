import Select from "react-select";

import { SingleSelectOptions } from "../../models/MultiSingleSelectOptions";
import "./SingleSelectField.css";
import { useState } from "react";

interface SingleSelectFieldProps {
  label: string;
  name: string;
  value: SingleSelectOptions | null;
  onChange: ({
    name,
    value,
  }: {
    name: string;
    value: SingleSelectOptions | null;
  }) => void;
  placeholder: string;
  options: SingleSelectOptions[];
  errors?: string[];
}

export const SingleSelectField = ({
  label,
  name,
  onChange,
  value,
  placeholder,
  options,
  errors,
}: SingleSelectFieldProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleChange = (newValue: SingleSelectOptions | null) => {
    onChange({ name: name, value: newValue });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div
      className={errors ? "singleselect-block invalid" : "singleselect-block"}
      onClick={toggleMenu}
    >
      <label className="singleselect-label">{label}:</label>
      <Select<SingleSelectOptions>
        name={name}
        options={options}
        className="basic-multi-select"
        classNamePrefix="select"
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        menuIsOpen={isMenuOpen}
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
