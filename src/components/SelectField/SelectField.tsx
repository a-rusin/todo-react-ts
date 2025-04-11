import "./SelectField.css";

interface SelectFieldOptios {
  name: string;
  value: string;
}

interface SelectFieldProps {
  label: string;
  id: string;
  value: string;
  onChange: ({ name, value }: { name: string; value: string }) => void;
  name: string;
  options: SelectFieldOptios[];
}

export const SelectField = ({
  label,
  id,
  value,
  onChange,
  name,
  options,
}: SelectFieldProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ name: e.target.name, value: e.target.value });
  };

  return (
    <div className="select-block">
      <label htmlFor={id} className="select-label">
        {label}:
      </label>
      <select
        id={id}
        value={value}
        onChange={handleChange}
        className="select-field"
        name={name}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};
