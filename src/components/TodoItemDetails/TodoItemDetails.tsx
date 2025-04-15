import "./TodoItemDetails.css";

export const TodoItemDetails = () => {
  return (
    <div className="todo-details-container">
      <div className="todo-details-btns">
        <button className="todo-details-btn todo-details-btn-done">
          Выполнено
        </button>
        <button className="todo-details-btn todo-details-btn-edit">
          Изменить задачу
        </button>
        <button className="todo-details-btn todo-details-btn-remove">
          Удалить задачу
        </button>
      </div>
      <h5 className="todo-details-title">Купить продукты</h5>
      <p className="todo-details-description">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
        impedit rerum amet, sit fugit officia facilis rem! Molestias eligendi,
        id voluptates, sed itaque iste ipsa excepturi est, quasi ea totam?
      </p>
      <ul className="todo-details-list">
        <li className="todo-details-list-item">
          <div className="todo-details-label">ID задачи:</div>
          <div className="todo-details-value ">345dfgsd2324jdwedgs</div>
        </li>
        <li className="todo-details-list-item">
          <div className="todo-details-label">Приоретет:</div>
          <div className="todo-details-value todo-details-value-priorety">
            Срочно
          </div>
        </li>
        <li className="todo-details-list-item">
          <div className="todo-details-label">Дедлайн:</div>
          <div className="todo-details-value">18 февраля, 2025</div>
        </li>
        <li className="todo-details-list-item">
          <div className="todo-details-label">Дата создания:</div>
          <div className="todo-details-value">14 февраля, 2025</div>
        </li>
        <li className="todo-details-list-item">
          <div className="todo-details-label">Теги:</div>
          <ul className="todo-details-tags-list">
            <li className="todo-details-tags-list-item">#Дом</li>
            <li className="todo-details-tags-list-item">#Покупки</li>
          </ul>
        </li>
      </ul>
    </div>
  );
};
