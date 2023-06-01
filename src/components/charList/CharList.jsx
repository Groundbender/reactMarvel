import { useState, useEffect, useRef } from "react";
import "./charList.scss";
import PropTypes from "prop-types";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
const CharList = (props) => {
  const [charList, setCharlist] = useState([]);

  const [newCharsLoading, setNewCharsLoading] = useState(false);

  const [offset, setOffset] = useState(210);
  const [charLimit, setCharLimit] = useState(false);

  const { loading, error, getAllCharacters } = useMarvelService();

  useEffect(() => {
    // первичная загрузка куда передаем initial = true

    onRequest(offset, true);
  }, []);

  const onRequest = (offset, initial) => {
    // параметр initial отвечает за первичную загрузку (в useEffect) и если он передан, тогда состояние загрузки новых персонажей ставим в false
    // (при клике параметр initial не передаем и состояние загрузки будет true )
    initial ? setNewCharsLoading(false) : setNewCharsLoading(true);

    getAllCharacters(offset).then(onCharListLoaded);
  };

  // const onCharListLoading = () => {
  //   setNewCharsLoading(true);

  // };

  const onCharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }

    setCharlist((charList) => [...charList, ...newCharList]);
    setNewCharsLoading(false);
    setOffset((offset) => offset + 9);
    setCharLimit((charLimit) => ended);
  };

  // const onError = () => {
  //   setLoading(false);
  //   setError(true);
  // };

  const itemRefs = useRef([]);

  const focusOnItem = (id) => {
    itemRefs.current.forEach((item) =>
      item.classList.remove("char__item_selected")
    );
    itemRefs.current[id].classList.add("char__item_selected");
    itemRefs.current[id].focus();
  };

  function renderItems(arr) {
    const items = arr.map(({ name, thumbnail, id }, index) => {
      let imgStyle = { objectFit: "cover" };

      if (String(thumbnail).endsWith("not_available.jpg")) {
        imgStyle = { objectFit: "unset" };
      }

      return (
        <li
          className="char__item"
          key={id}
          // записывает в state (app.jsx) id нашей карточки, чтобы передать в appInfo этот id
          tabIndex={0}
          ref={(el) => (itemRefs.current[index] = el)}
          onClick={() => {
            props.onCharSelected(id);
            focusOnItem(index);
          }}
          onKeyPress={(e) => {
            if (e.key === " " || e.key === "Enter") {
              props.onCharSelected(id);
              focusOnItem(index);
            }
          }}
        >
          <img src={thumbnail} alt="charImage" style={imgStyle} />
          <div className="char__name">{name}</div>
        </li>
      );
    });

    return <ul className="char__grid">{items}</ul>;
  }

  const cards = renderItems(charList);

  const errorMessage = error ? <ErrorMessage /> : null;
  // переделал условие
  // если загрузка и !загрузка новых персонажей, тогда выводим spinner
  const spinner = loading && !newCharsLoading ? <Spinner /> : null;
  // убрали это условие, чтобы при !загрузке и !ошибке (следовательно при загрузке новых персонажей их состояние false) не было пустых карточек
  // const content = !(loading || error) ? cards : null;

  return (
    <div className="char__list">
      {errorMessage}
      {spinner}
      {cards}

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
