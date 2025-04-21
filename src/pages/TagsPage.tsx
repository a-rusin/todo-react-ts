import { Link } from "react-router-dom";
import { TagsList } from "../components/TagsList/TagsList";

export const TagsPage = () => {
  return (
    <div className="container">
      <h1 className="main-title">Менеджер тегов</h1>
      <Link to="/todos" className="main-url main-url-spacing">
        К списку задач
      </Link>
      <TagsList />
    </div>
  );
};
