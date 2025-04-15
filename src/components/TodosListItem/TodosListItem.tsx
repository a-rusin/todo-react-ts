import { useNavigate } from "react-router-dom";
import "./TodosListItem.css";
import { Link } from "react-router-dom";
import { Todo } from "../../models/Todo";
import { formatDateString } from "../../utils/formatDateString";

export const TodosListItem = ({
  dateDeadline,
  description,
  priorety,
  tags,
  title,
  id,
}: Todo) => {
  const navigate = useNavigate();

  return (
    <li className="todo-list-item">
      <div className="todo-item-container">
        <div className="todo-item-done-btn"></div>
        <div className="todo-item-main-info">
          <div className="todo-item-header">
            <Link to={"/todos/" + id} className="todo-item-name">
              {title}
            </Link>
            <div className="todo-item-priorety-label">Срочно</div>
          </div>
          <div className="todo-item-details">
            <p className="todo-item-description">{description}</p>
            {tags && (
              <ul className="todo-item-tags">
                {tags.map((tag) => (
                  <li key={tag.value} className="todo-item-tag">
                    {tag.label}
                  </li>
                ))}
              </ul>
            )}

            <div className="todo-item-deadline">
              {formatDateString(dateDeadline)}
            </div>
          </div>
        </div>
        <div className="todo-item-actions-btns">
          <button
            className="todo-item-action-btn todo-item-action-btn-edit"
            onClick={() => navigate("/todos/edit/123")}
          ></button>
          <button className="todo-item-action-btn todo-item-action-btn-delete"></button>
        </div>
      </div>
    </li>
  );
};
