import "./Button.css";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  cssType: "primary" | "secondary";
  type: "button" | "reset" | "submit";
}

export const Button = ({ label, onClick, cssType, type }: ButtonProps) => {
  return (
    <button onClick={onClick} className={"btn " + cssType} type={type} disabled>
      {label}
    </button>
  );
};
