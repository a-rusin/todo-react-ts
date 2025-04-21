import "./EditButton.css";

interface EditButtonProps {
  handleClick: (id: string | undefined) => void;
  id: string | undefined;
}

export const EditButton = ({ handleClick, id }: EditButtonProps) => {
  return <button className="btn-edit" onClick={() => handleClick(id)}></button>;
};
