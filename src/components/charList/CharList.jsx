import { useState, useEffect, useRef, useMemo } from "react";
import "./charList.scss";
import PropTypes from "prop-types";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

import { CSSTransition, TransitionGroup } from "react-transition-group";

const setContent = (process, Component, newCharsLoading) => {
  switch (process) {
    case "waiting":
      return <Spinner />;
    case "loading":
      return newCharsLoading ? <Component /> : <Spinner />;
    case "confirmed":
      return <Component />;
    case "error":
      return <ErrorMessage />;
    default:
      throw new Error("Unexpected process state ");
  }
};

const CharList = (props) => {
  const [charList, setCharlist] = useState([]);

  const [newCharsLoading, setNewCharsLoading] = useState(false);

  const [offset, setOffset] = useState(210);
  const [charLimit, setCharLimit] = useState(false);

  const { loading, error, getAllCharacters, process, setProcess } =
    useMarvelService();

  useEffect(() => {
    // первичная загрузка куда передаем initial = true

    onRequest(offset, true);
  }, []);

  const onRequest = (offset, initial) => {
    // параметр initial отвечает за первичную загрузку (в useEffect) и если он передан, тогда состояние загрузки новых персонажей ставим в false
    // (при клике параметр initial не передаем и состояние загрузки будет true )
    initial ? setNewCharsLoading(false) : setNewCharsLoading(true);

    getAllCharacters(offset)
      .then(onCharListLoaded)
      .then(() => setProcess("confirmed"));
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

  const renderItems = (arr) => {
    const items = arr.map(({ name, thumbnail, id }, index) => {
      let imgStyle = { objectFit: "cover" };

      if (String(thumbnail).endsWith("not_available.jpg")) {
        imgStyle = { objectFit: "unset" };
      }

      return (
        <CSSTransition classNames="char__item" timeout={500} key={id}>
          <li
            className="char__item"
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
        </CSSTransition>
      );
    });

    return (
      <ul className="char__grid">
        <TransitionGroup component={null}>{items}</TransitionGroup>
      </ul>
    );
  };

  // const cards = renderItems(charList);

  // const errorMessage = error ? <ErrorMessage /> : null;
  // переделал условие
  // если загрузка и !загрузка новых персонажей, тогда выводим spinner
  // const spinner = loading && !newCharsLoading ? <Spinner /> : null;
  // убрали это условие, чтобы при !загрузке и !ошибке (следовательно при загрузке новых персонажей их состояние false) не было пустых карточек
  // const content = !(loading || error) ? cards : null;
  const elements = useMemo(() => {
    return setContent(process, () => renderItems(charList), newCharsLoading);
  }, [process]);

  return (
    <div className="char__list">
      {/* {errorMessage}
      {spinner}
      {cards} */}
      {elements}

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
