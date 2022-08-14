import "./directory-item.component.scss";
import Category from "../../routes/category/category.component";
import { useNavigate } from "react-router-dom";

const DiretctoryItem = ({ category }) => {
  const { imageUrl, id, title } = category;

  const navigate = useNavigate();
  const onNavigateHandler = () => navigate(`/shop/${title}`);
  
  return (
    <div className="directory-items-container" key={id}>
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="directory-items-body" onClick={onNavigateHandler}>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
};

export default DiretctoryItem;
