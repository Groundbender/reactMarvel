import RandomChar from "../randomChar/RandomChar";
import { useState } from "react";
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
