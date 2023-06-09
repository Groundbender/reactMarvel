import { useState, useEffect } from "react";
import "./comicsList.scss";
import { Link } from "react-router-dom";

import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Spinner from "../spinner/spinner";

const setContent = (process, Component, newComicsListLoading) => {
  switch (process) {
    case "waiting":
      return <Spinner />;
    case "loading":
      return newComicsListLoading ? <Component /> : <Spinner />;
    case "confirmed":
      return <Component />;
    case "error":
      return <ErrorMessage />;
    default:
      throw new Error("Unexpected process state ");
  }
};

const ComicsList = () => {
  const [comicsList, setComicsList] = useState([]);
  const [newComicsListLoading, setNewComicsListLoading] = useState(false);
  const [offset, setOffset] = useState(210);
  const [comicsLimit, setComicsLimit] = useState(false);

  const { loading, error, getAllComics, process, setProcess } =
    useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onRequest = (offset, initial) => {
    initial ? setNewComicsListLoading(false) : setNewComicsListLoading(true);

    getAllComics(offset)
      .then(onComicsListLoaded)
      .then(() => setProcess("confirmed"));
  };

  const onComicsListLoaded = (newComicsList) => {
    let ended = false;
    if (newComicsList.length < 8) {
      ended = true;
    }
    setComicsList((comicsList) => [...comicsList, ...newComicsList]);
    setNewComicsListLoading(false);
    setOffset(offset + 8);
    setComicsLimit((comicsLimit) => ended);
  };

  const renderItems = (arr) => {
    const comicsListItems = arr.map((item, index) => {
      return (
        <li key={index} className="comics__item">
          <Link to={`/comics/${item.id}`}>
            <img
              src={item.thumbnail}
              alt={item.title}
              className="comics__item-img"
            />
            <div className="comics__item-name">{item.title}</div>
            <div className="comics__item-price">{item.price}</div>
          </Link>
        </li>
      );
    });

    return <ul className="comics__grid">{comicsListItems}</ul>;
  };

  // const comicsListItems = renderItems(comicsList);
  // const errorMessage = error ? <ErrorMessage /> : null;
  // const spinner = loading && !newComicsListLoading ? <Spinner /> : null;
  return (
    <div className="comics__list">
      {setContent(process, () => renderItems(comicsList), newComicsListLoading)}
      <button
        disabled={newComicsListLoading}
        onClick={() => onRequest(offset)}
        className="button button__main button__long"
        style={{ display: comicsLimit ? "none" : "block" }}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
