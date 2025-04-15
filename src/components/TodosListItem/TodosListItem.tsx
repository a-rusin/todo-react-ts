import { useNavigate } from "react-router-dom";
import "./TodosListItem.css";
import { Link } from "react-router-dom";

export const TodosListItem = ({}) => {
  const navigate = useNavigate();

  return (
    <li className="todo-list-item">
      <div className="todo-item-container">
        <div className="todo-item-done-btn"></div>
        <div className="todo-item-main-info">
          <div className="todo-item-header">
            <Link to={"/todos/" + 123} className="todo-item-name">
              Купить продукты
            </Link>
            <div className="todo-item-priorety-label">Срочно</div>
          </div>
          <div className="todo-item-details">
            <p className="todo-item-description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
              impedit rerum amet, sit fugit officia facilis rem! Molestias
              eligendi, id voluptates, sed itaque iste ipsa excepturi est, quasi
              ea totam?
            </p>
            <ul className="todo-item-tags">
              <li className="todo-item-tag">#Дом</li>
              <li className="todo-item-tag">#Покупки</li>
            </ul>
            <div className="todo-item-deadline">14 февраля, 2025</div>
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
