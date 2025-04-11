import "./DatePickerField.css";

interface DatePickerFieldProps {
  label: string;
  id: string;
  name: string;
  value: string;
  onChange: ({ name, value }: { name: string; value: string }) => void;
}

export const DatePickerField = ({
  label,
  id,
  name,
  onChange,
  value,
}: DatePickerFieldProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ name: e.target.name, value: e.target.value });
  };

  return (
    <div className="datepicker-block">
      <label htmlFor={id} className="datepicker-label">
        {label}:
      </label>
      <input
        type="date"
        id={id}
        name={name}
        className="datepicker-field"
        onChange={handleChange}
        value={value}
      />
    </div>
  );
};
