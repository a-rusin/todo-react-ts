import { useState } from "react";
import { DeleteButton } from "../DeleteButton/DeleteButton";
import { EditButton } from "../EditButton/EditButton";
import "./TagsListItem.css";
import { Tag } from "../../models/Tags";
import { ValidatorConfig } from "../../models/ValidatorConfig";
import { useForm } from "../../hooks/useForm";
import { CreateUpdateTagForm } from "../CreateUpdateTagForm/CreateUpdateTagForm";

interface TagsListItemProps {
  tag: Tag;
}

const defaultValue: Tag = {
  title: "",
};

const validatorConfig: ValidatorConfig = {
  title: {
    isRequired: true,
  },
};

export const TagsListItem = ({ tag }: TagsListItemProps) => {
  const [editMode, setIsEditMode] = useState(false);

  const { formValue, handleChange, handleReset, handleSubmit, errors } =
    useForm<Tag>({
      defaultValue,
      onSubmit,
      validatorConfig,
    });

  function onSubmit(data: Tag) {
    console.log(data);
  }

  const handleClickEdit = () => {
    setIsEditMode(true);
  };

  const handleClickDelete = (id: string | undefined) => {
    console.log(id);
  };

  return (
    <li className="tags-item">
      <div className="tags-wrapper">
        <div className="tags-title">
          {editMode ? (
            <CreateUpdateTagForm
              formValue={formValue}
              handleChange={handleChange}
              handleReset={handleReset}
              handleSubmit={handleSubmit}
              mode="edit-item"
              errors={errors}
              isLoading={false}
              inputSizes="l"
            />
          ) : (
            tag.title
          )}
        </div>
        <div className="tags-btns">
          <EditButton handleClick={handleClickEdit} />
          <DeleteButton
            handleClick={handleClickDelete}
            id={"345"}
            isLoading={false}
          />
        </div>
      </div>
    </li>
  );
};
