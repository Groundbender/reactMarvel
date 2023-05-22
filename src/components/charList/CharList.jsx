import { Component } from "react";
import "./charList.scss";
import abyss from "../../resources/img/abyss.jpg";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
class CharList extends Component {
  state = {
    charList: null,
    loading: true,
    error: false,
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.marvelService
      .getAllCharacters()
      .then((charList) => this.onCharListLoaded(charList))
      .catch(this.onError);
  }

  onCharListLoaded = (charList) => {
    this.setState({ charList, loading: false });
  };

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  render() {
    const { charList, loading, error } = this.state;

    const contain = {
      objectFit: "contain",
    };

    const centeredLoader = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    };

    const cards = charList ? (
      charList.map(({ name, thumbnail, id }) => {
        return (
          <li key={id} className="char__item">
            <img
              src={thumbnail}
              alt="abyss"
              style={thumbnail.endsWith("not_available.jpg") ? contain : null}
            />
            <div className="char__name">{name}</div>
          </li>
        );
      })
    ) : (
      <Spinner />
    );

    return (
      <div className="char__list">
        <ul className="char__grid" style={loading ? centeredLoader : null}>
          {cards}
          {/* <li className="char__item">
            <img src={abyss} alt="abyss" />
            <div className="char__name">Abyss</div>
          </li>
          <li className="char__item char__item_selected">
            <img src={abyss} alt="abyss" />
            <div className="char__name">Abyss</div>
          </li>
          <li className="char__item">
            <img src={abyss} alt="abyss" />
            <div className="char__name">Abyss</div>
          </li>
          <li className="char__item">
            <img src={abyss} alt="abyss" />
            <div className="char__name">Abyss</div>
          </li>
          <li className="char__item">
            <img src={abyss} alt="abyss" />
            <div className="char__name">Abyss</div>
          </li>
          <li className="char__item">
            <img src={abyss} alt="abyss" />
            <div className="char__name">Abyss</div>
          </li>
          <li className="char__item">
            <img src={abyss} alt="abyss" />
            <div className="char__name">Abyss</div>
          </li>
          <li className="char__item">
            <img src={abyss} alt="abyss" />
            <div className="char__name">Abyss</div>
          </li>
          <li className="char__item">
            <img src={abyss} alt="abyss" />
            <div className="char__name">Abyss</div>
          </li> */}
        </ul>
        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;
