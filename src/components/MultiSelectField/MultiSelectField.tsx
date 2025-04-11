import Select from "react-select";
import "./MultiSelectField.css";
import { SingleSelectOptions } from "../../models/MultiSingleSelectOptions";
import { useState } from "react";

/*
TODO:
props: value, options (TS), placeholder
onClick label => focus input
*/

interface MultiSelectFieldProps {
  label: string;
  onChange: ({
    name,
    value,
  }: {
    name: string;
    value: readonly SingleSelectOptions[];
  }) => void;
  value: SingleSelectOptions | null;
  name: string;
  options: SingleSelectOptions[];
  placeholder: string;
}

export const MultiSelectField = ({
  label,
  onChange,
  name,
  value,
  options,
  placeholder,
}: MultiSelectFieldProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleChange = (newValue: readonly SingleSelectOptions[]) => {
    onChange({ name: name, value: newValue });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="multiselect-block" onClick={toggleMenu}>
      <label className="multiselect-label">{label}:</label>
      <Select<SingleSelectOptions, true>
        defaultValue={[]}
        isMulti
        name={name}
        options={options}
        className="basic-multi-select"
        classNamePrefix="select"
        closeMenuOnSelect={false}
        hideSelectedOptions={true}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        menuIsOpen={isMenuOpen}
      />
    </div>
  );
};
