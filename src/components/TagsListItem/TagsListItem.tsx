import "./TagsListItem.css";

export const TagsListItem = () => {
  return (
    <li className="tags-item">
      <div className="tags-wrapper">
        <div className="tags-title">Название тега</div>
        <div className="tags-btns">Кнопки</div>
      </div>
    </li>
  );
};
