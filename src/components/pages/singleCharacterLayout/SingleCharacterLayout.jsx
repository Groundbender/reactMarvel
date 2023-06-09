import "./singleCharacterLayout.scss";
import { Link } from "react-router-dom";
const SingleCharacterLayout = ({ data }) => {
  const { name, description, thumbnail } = data;

  return (
    <div className="single-comic">
      <img src={thumbnail} alt={name} className="single-comic__char-img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{name}</h2>
        <p className="single-comic__descr">
          {description
            ? description
            : "Description about this character is not found!"}
        </p>
      </div>
      <Link to="/characters" className="single-comic__back">
        Back to all
      </Link>
    </div>
  );
};

export default SingleCharacterLayout;
