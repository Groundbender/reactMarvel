import { useState, useEffect, useRef } from "react";
import "./charList.scss";
import PropTypes from "prop-types";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
const CharList = (props) => {
  const [charList, setCharlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [newCharsLoading, setNewCharsLoading] = useState(false);
  const [offset, setOffset] = useState(210);
  const [charLimit, setCharLimit] = useState(false);

  useEffect(() => {
    onRequest();
  }, []);

  const marvelService = new MarvelService();

  const onRequest = (offset) => {
    onCharListLoading();
    marvelService
      .getAllCharacters(offset)
      .then(onCharListLoaded)
      .catch(onError);
  };

  const onCharListLoading = () => {
    setNewCharsLoading(true);
  };

  const onCharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }

    setCharlist((charList) => [...charList, ...newCharList]);
    setLoading(false);
    setNewCharsLoading((newCharsLoading) => false);
    setOffset((offset) => offset + 9);
    setCharLimit((charLimit) => ended);
  };

  const onError = () => {
    setLoading(false);
    setError(true);
  };

  const itemRefs = useRef([]);

  const focusOnItem = (id) => {
    itemRefs.current.forEach((item) =>
      item.classList.remove("char__item_selected")
    );
    itemRefs.current[id].classList.add("char__item_selected");
    itemRefs.current[id].focus();
  };

  function renderItems(arr) {
    const renderedCards = arr.map(({ name, thumbnail, id }, index) => {
      let imgStyle = { objectFit: "cover" };

      if (thumbnail.endsWith("not_available.jpg")) {
        imgStyle = { objectFit: "unset" };
      }

      return (
        <li
          key={id}
          // записывает в state (app.jsx) id нашей карточки, чтобы передать в appInfo этот id
          tabIndex={0}
          ref={(el) => (itemRefs.current[index] = el)}
          onClick={() => {
            props.onCharSelected(id);
            focusOnItem(index);
          }}
          className="char__item"
        >
          <img src={thumbnail} alt="charImage" style={imgStyle} />
          <div className="char__name">{name}</div>
        </li>
      );
    });

    return renderedCards;
  }

  const cards = renderItems(charList);

  const centeredLoader = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? cards : null;

  return (
    <div className="char__list">
      <ul className="char__grid" style={loading ? centeredLoader : null}>
        {errorMessage}
        {spinner}
        {content}
      </ul>
      <button
        disabled={newCharsLoading}
        onClick={() => onRequest(offset)}
        className="button button__main button__long"
        style={{ display: charLimit ? "none" : "block" }}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

// с библиотекой использует экспорт по дефолту
CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
