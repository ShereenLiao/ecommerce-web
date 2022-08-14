import DiretctoryItem from "../directory-item/directory-item.component";
import "./directory.component.scss"

const Directory = ({ categories }) => {
  return (
    <div className="directory-container">
      {categories.map((category) => {
        return <DiretctoryItem category={category} key={category.id} />;
      })}
    </div>
  );
};

export default Directory;
