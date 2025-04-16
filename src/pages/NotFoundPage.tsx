import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <div className="container">
      <h1 className="main-title">Такой страницы не существует :(</h1>
      <Link to="/todos" className="main-url main-url-spacing">
        К списку задач
      </Link>
    </div>
  );
};
