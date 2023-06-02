import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/spinner";

// динамические импорты должны быть ниже статических
const Page404 = lazy(() => import("../pages/404"));
const MainPage = lazy(() => import("../pages/MainPage"));
const ComicsPage = lazy(() => import("../pages/ComicsPage"));
const SingleComicPage = lazy(() => import("../pages/SingleComicPage"));

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

  // comicId - название мы придумываем сами (это название будет ключом нашего объекта, которое мы получаем с помощью useParams, {comicId: id})

  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/" element={<MainPage />} />

              <Route path="/comics" element={<ComicsPage />} />
              <Route path="/comics/:comicId" element={<SingleComicPage />} />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
};

export default App;
