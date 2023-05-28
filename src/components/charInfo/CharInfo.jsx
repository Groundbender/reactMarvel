import { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";

import MarvelService from "../../services/MarvelService";

import thor from "../../resources/img/thor.jpeg";
import "./charInfo.scss";
const CharInfo = ({ charId }) => {
  const [char, setChar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const marvelService = new MarvelService();

  useEffect(() => {
    updateChar();
  }, [charId]);

  const updateChar = () => {
    if (!charId) {
      return;
    }
    onCharLoading();

    marvelService.getCharacter(charId).then(onCharLoaded).catch(onError);
  };

  const onCharLoaded = (char) => {
    setChar(char);
    setLoading(false);
  };

  const onCharLoading = () => {
    setLoading(true);
  };

  const onError = () => {
    setError(true);
    setLoading(false);
  };

  const skeleton = char || loading || error ? null : <Skeleton />;

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !char) ? <View char={char} /> : null;

  return (
    <div className="char__info">
      {skeleton}
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
};

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = char;

  let imgStyle = thumbnail.endsWith("not_available.jpg")
    ? { objectFit: "unset" }
    : { objectFit: "cover" };

  return (
    <Fragment>
      <div className="char__basics">
        <img src={thumbnail} alt={name} style={imgStyle} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length !== 0 ? (
          comics.slice(0, 9).map((item, index) => (
            <li key={index} className="char__comics-item">
              '{item.name}
            </li>
          ))
        ) : (
          <p>Comics about this character are not found!</p>
        )}
      </ul>
    </Fragment>
  );
};

CharInfo.propTypes = {
  charId: PropTypes.number,
};

export default CharInfo;
