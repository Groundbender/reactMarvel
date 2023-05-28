import { useState } from "react";
import PropTypes from "prop-types";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundry from "../ErrorBoundry/ErrorBoundry";
import decoration from "../../resources/img/vision.png";

const App = () => {
  //   state = {
  //     selectedChar: null,
  //   };

  //   onCharSelected = (id) => {
  //     this.setState({ selectedChar: id });
  //   };

  const [selectedChar, setSelectedChar] = useState(null);

  const onCharSelected = (id) => {
    setSelectedChar(id);
  };

  return (
    <div className="app">
      <AppHeader />
      <main>
        <ErrorBoundry>
          <RandomChar />
        </ErrorBoundry>
        <div className="char__content">
          <ErrorBoundry>
            <CharList onCharSelected={onCharSelected} />
          </ErrorBoundry>

          <ErrorBoundry>
            <CharInfo charId={selectedChar} />
          </ErrorBoundry>
        </div>
        <img className="bg-decoration" src={decoration} alt="vision" />
      </main>
    </div>
  );
};

export default App;
