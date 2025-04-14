import "./CheckBoxField.css";

interface CheckBoxFiledProps {
  label: string;
  id: string;
  onChange: ({ name, value }: { name: string; value: boolean }) => void;
  name: string;
  checked: boolean;
  errors?: string[];
}

export const CheckBoxFiled = ({
  id,
  name,
  onChange,
  label,
  checked,
  errors,
}: CheckBoxFiledProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ name: e.target.name, value: e.target.checked });
  };

  return (
    <div className="checkbox-block">
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={handleChange}
        className="checkbox-field"
      />
      <label htmlFor={id} className="checkbox-label">
        {label}
      </label>
    </div>
  );
};
