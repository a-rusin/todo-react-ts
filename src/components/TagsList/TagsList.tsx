import { Tag } from "../../models/Tags";
import { TagsListItem } from "../TagsListItem/TagsListItem";
import "./TagsList.css";

const testData: Tag[] = [
  { id: "1", title: "Тестовый тег1" },
  { id: "2", title: "Тестовый тег2" },
  { id: "3", title: "Тестовый тег3" },
  { id: "4", title: "Тестовый тег4" },
  { id: "5", title: "Тестовый тег5" },
];

export const TagsList = () => {
  return (
    <ul className="tags-list">
      {testData.map((item) => (
        <TagsListItem key={item.id} tag={item} />
      ))}
    </ul>
  );
};
