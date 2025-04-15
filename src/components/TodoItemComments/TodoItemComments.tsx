import { TodoItemCommentsForm } from "../TodoItemCommentsForm/TodoItemCommentsForm";
import "./TodoItemComments.css";

export const TodoItemComments = () => {
  return (
    <div className="todo-comments-container">
      <h5 className="todo-comments-title">Комментарии</h5>
      <TodoItemCommentsForm />
      <ul className="todo-comments-list">
        <li className="todo-comments-list-item">
          <p className="todo-comments-content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
            accusantium vel, doloremque obcaecati consequatur alias earum.
            Omnis, quas voluptatum sapiente ratione in rem suscipit ab, quidem,
            praesentium voluptatem neque sint!
          </p>
          <p className="todo-comments-date">1 час</p>
        </li>
      </ul>
    </div>
  );
};
