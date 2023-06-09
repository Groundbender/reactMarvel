import { useState } from "react";
import { Helmet } from "react-helmet";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundry from "../ErrorBoundry/ErrorBoundry";
import decoration from "../../resources/img/vision.png";
import CharSearchForm from "../charSearchForm/CharSearchForm";

const MainPage = () => {
  const [selectedChar, setSelectedChar] = useState(null);

  const onCharSelected = (id) => {
    setSelectedChar(id);
  };

  return (
    <>
      <Helmet>
        <meta name="description" content="Marvel information portal" />
        <title>Marvel information portal</title>
      </Helmet>
      <ErrorBoundry>
        <RandomChar />
      </ErrorBoundry>
      <div className="char__content">
        <ErrorBoundry>
          <CharList onCharSelected={onCharSelected} />
        </ErrorBoundry>
        <div>
          <ErrorBoundry>
            <CharInfo charId={selectedChar} />
          </ErrorBoundry>
          <ErrorBoundry>
            <CharSearchForm />
          </ErrorBoundry>
        </div>
      </div>
      <img className="bg-decoration" src={decoration} alt="vision" />
    </>
  );
};

export default MainPage;
