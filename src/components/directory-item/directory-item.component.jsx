import "./directory-item.component.scss";

const DiretctoryItem = ({ category }) => {
  const { imageUrl, id, title } = category;

  return (
    <div className="directory-items-container" key={id}>
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="directory-items-body">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
};

export default DiretctoryItem;
