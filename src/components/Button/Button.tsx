import { InputSizeType } from "../../models/Form";
import { LoaderInline } from "../LoaderInline/LoaderInline";
import "./Button.css";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  cssType: "primary" | "secondary";
  type: "button" | "reset" | "submit";
  className?: string;
  isLoading?: boolean | string;
  inputSizes: InputSizeType;
}

export const Button = ({
  label,
  onClick,
  cssType,
  type,
  className,
  isLoading,
  inputSizes,
}: ButtonProps) => {
  const classes =
    "btn " +
    ("size-" + inputSizes + " ") +
    cssType +
    (className ? " " + className : "");

  return (
    <button onClick={onClick} className={classes} type={type}>
      {isLoading ? <LoaderInline /> : label}
    </button>
  );
};
