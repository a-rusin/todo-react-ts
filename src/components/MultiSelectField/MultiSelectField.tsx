import Select from "react-select";
import "./MultiSelectField.css";
import { SingleSelectOptions } from "../../models/MultiSingleSelectOptions";
import { useState } from "react";

interface MultiSelectFieldProps {
  label: string;
  onChange: ({ name, value }: { name: string; value: string[] }) => void;
  value: SingleSelectOptions<string>[] | undefined;
  name: string;
  options: SingleSelectOptions<string>[] | undefined;
  placeholder: string;
  errors?: string[];
}

export const MultiSelectField = ({
  label,
  onChange,
  name,
  value,
  options,
  placeholder,
  errors,
}: MultiSelectFieldProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleChange = (newValue: readonly SingleSelectOptions<string>[]) => {
    onChange({ name: name, value: newValue.map((item) => item.value) });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div
      className={errors ? "multiselect-block invalid" : "multiselect-block"}
      onClick={toggleMenu}
    >
      <label className="multiselect-label">{label}:</label>
      <Select<SingleSelectOptions<string>, true>
        defaultValue={[]}
        isMulti
        name={name}
        options={options}
        className="basic-multi-select"
        classNamePrefix="select"
        hideSelectedOptions={true}
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
