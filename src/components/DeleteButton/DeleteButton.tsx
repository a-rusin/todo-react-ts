import { LoaderInline } from "../LoaderInline/LoaderInline";
import "./DeleteButton.css";

interface DeleteButtonProps {
  isLoading: string | boolean;
  handleClick: (id: string | undefined) => void;
  id: string | undefined;
}

export const DeleteButton = ({
  handleClick,
  id,
  isLoading,
}: DeleteButtonProps) => {
  return (
    <button className="btn-delete" onClick={() => handleClick(id)}>
      {id === isLoading ? (
        <LoaderInline />
      ) : (
        <span className="btn-delete-icon"></span>
      )}
    </button>
  );
};
