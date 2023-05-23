import { Component } from "react";
import "./charList.scss";
import abyss from "../../resources/img/abyss.jpg";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
class CharList extends Component {
  state = {
    charList: [],
    loading: true,
    error: false,
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.marvelService
      .getAllCharacters()
      .then(this.onCharListLoaded)
      .catch(this.onError);
  }

  onCharListLoaded = (charList) => {
    this.setState({ charList, loading: false });
    console.log(this.state);
  };

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  renderItems(arr) {
    const renderedCards = arr.map(({ name, thumbnail, id }) => {
      let imgStyle = { objectFit: "cover" };

      if (thumbnail.endsWith("not_available.jpg")) {
        imgStyle = { objectFit: "unset" };
      }

      return (
        <li
          key={id}
          // записывает в state (app.jsx) id нашей карточки, чтобы передать в appInfo этот id
          onClick={() => this.props.onCharSelected(id)}
          className="char__item"
        >
          <img src={thumbnail} alt="abyss" style={imgStyle} />
          <div className="char__name">{name}</div>
        </li>
      );
    });

    return renderedCards;
  }

  render() {
    const { charList, loading, error } = this.state;

    const cards = this.renderItems(charList);

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
        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;
