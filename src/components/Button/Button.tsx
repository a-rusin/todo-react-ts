import "./Button.css";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  cssType: "primary" | "secondary";
  type: "button" | "reset" | "submit";
  className?: string;
}

export const Button = ({
  label,
  onClick,
  cssType,
  type,
  className,
}: ButtonProps) => {
  const classes = "btn " + cssType + (className ? " " + className : "");

  return (
    <button onClick={onClick} className={classes} type={type}>
      {label}
    </button>
  );
};
