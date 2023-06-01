import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom/cjs/react-router-dom.min";

import AppHeader from "../appHeader/AppHeader";
import { MainPage, ComicsPage } from "../pages";

const App = () => {
  //   state = {
  //     selectedChar: null,
  //   };

  //   onCharSelected = (id) => {
  //     this.setState({ selectedChar: id });
  //   };

  // const [selectedChar, setSelectedChar] = useState(null);

  // const onCharSelected = (id) => {
  //   setSelectedChar(id);
  // };

  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Switch>
            <Route exact path="/">
              <MainPage />
            </Route>
            <Route exact path="/comics">
              <ComicsPage />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default App;
