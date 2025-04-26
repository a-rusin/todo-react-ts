import { useContext, useState } from "react";
import { DeleteButton } from "../DeleteButton/DeleteButton";
import { EditButton } from "../EditButton/EditButton";
import "./TagsListItem.css";
import { Tag } from "../../models/Tags";
import { ValidatorConfig } from "../../models/ValidatorConfig";
import { useForm } from "../../hooks/useForm";
import { CreateUpdateTagForm } from "../CreateUpdateTagForm/CreateUpdateTagForm";
import { TagsContext } from "../../context/TagsContext";
import { isLoadingValue } from "../../utils/isLoadingValue";

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

  const tagsContext = useContext(TagsContext);

  if (!tagsContext) {
    throw new Error("TagsProvider not found");
  }

  const { createUpdateTags, isLoading, deleteTag } = tagsContext;

  const { formValue, handleChange, handleReset, handleSubmit, errors } = useForm<Tag>({
    defaultValue,
    onSubmit,
    validatorConfig,
  });

  function onSubmit(data: Tag) {
    const updatedData: Required<Tag> = {
      title: data.title,
      createdAt: Date.now().toString(),
      id: tag.id!,
    };
    createUpdateTags(updatedData, "edit-item", () => {
      setIsEditMode(false);
    });
  }

  const handleClickEdit = () => {
    setIsEditMode((prev) => !prev);
    handleChange({ name: "title", value: tag.title });
  };

  const handleClickDelete = (id: string | undefined) => {
    if (id) {
      deleteTag(id);
    }
  };

  const isLoadingCreateUpdate = isLoadingValue(isLoading.createUpdate);
  const isLoadingDelete = isLoadingValue(isLoading.delete);

  return (
    <li className={"tags-item " + (isLoadingDelete && " proccess")}>
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
              isLoading={isLoadingCreateUpdate}
              inputSizes="l"
            />
          ) : (
            tag.title
          )}
        </div>
        <div className="tags-btns">
          <EditButton handleClick={handleClickEdit} />
          <DeleteButton handleClick={handleClickDelete} id={tag.id} isLoading={isLoadingDelete} />
        </div>
      </div>
    </li>
  );
};
