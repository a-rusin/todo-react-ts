import { useContext } from "react";

import { Button } from "../Button/Button";
import { LoaderInline } from "../LoaderInline/LoaderInline";
import { TagsListItem } from "../TagsListItem/TagsListItem";
import "./TagsList.css";
import { TagsContext } from "../../context/TagsContext";
import { isLoadingValue } from "../../utils/isLoadingValue";
export const TagsList = () => {
  const tagsContext = useContext(TagsContext);

  if (!tagsContext) {
    throw new Error("TagsProvider not found");
  }

  const { isLoading, tags, handleClickAddFirstTag } = tagsContext;

  const isLoadingCreateUpdate = isLoadingValue(isLoading.createUpdate);

  if (isLoading.get) {
    return (
      <div className="main-page-container auth-container-loading">
        <div>
          <LoaderInline />
        </div>
        <p>Загрузка тегов...</p>
      </div>
    );
  } else if (Array.isArray(tags) && tags.length !== 0) {
    return (
      <ul className="tags-list">
        {tags.map((tag) => (
          <TagsListItem key={tag.id} tag={tag} />
        ))}
      </ul>
    );
  } else {
    return (
      <div className="tags-list tags-item">
        <Button
          cssType="primary"
          inputSizes="l"
          label="Добавить тег"
          type="button"
          onClick={handleClickAddFirstTag}
          isLoading={isLoadingCreateUpdate}
        />
      </div>
    );
  }
};
