import { useState, useEffect } from "react";
import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import setContent from "../../utils/setContent";

const RandomChar = () => {
  const [char, setChar] = useState({});
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(false);

  const { loading, error, getCharacter, clearError, process, setProcess } =
    useMarvelService();

  useEffect(() => {
    updateChar();
    const timerId = setInterval(updateChar, 30000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  const onCharLoaded = (char) => {
    setChar(char);
  };

  // const onCharLoading = () => {
  //   setLoading(true);
  // };

  // const onError = () => {
  //   setLoading(false);
  //   setError(true);
  // };

  const updateChar = () => {
    clearError();
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

    getCharacter(id)
      .then(onCharLoaded)
      .then(() => setProcess("confirmed"));
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? <View char={char} /> : null;

  return (
    <div className="randomchar">
      {/* {errorMessage}
      {spinner}
      {content} */}
      {setContent(process, View, char)}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button onClick={updateChar} className="button button__main">
          <div className="inner">try it</div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
};

const View = ({ data }) => {
  const { name, description, thumbnail, homepage, wiki } = data;

  const DESCRIPTION_NORMAL_LENGTH = 203;

  const validDescription = description
    ? description
    : "Description about this character is not found!";
  const validAndSlicedDescription =
    validDescription && validDescription.length > DESCRIPTION_NORMAL_LENGTH
      ? validDescription.slice(0, DESCRIPTION_NORMAL_LENGTH) + "..."
      : validDescription;

  const unset = {
    objectFit: "unset",
  };

  return (
    <div className="randomchar__block">
      <img
        src={thumbnail}
        alt="Random character"
        className="randomchar__img"
        style={String(thumbnail).endsWith("not_available.jpg") ? unset : null}
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{validAndSlicedDescription}</p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;
