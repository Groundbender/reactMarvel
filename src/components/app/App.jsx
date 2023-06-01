import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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
          <Routes>
            <Route path="/" element={<MainPage />} />

            <Route path="/comics" element={<ComicsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
