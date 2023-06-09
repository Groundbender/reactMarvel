import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import useMarvelService from "../../services/MarvelService";
import AppBanner from "../appBanner/AppBanner";
import setContent from "../../utils/setContent";
const SinglePage = ({ Component, dataType }) => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const {
    loading,
    error,
    getComics,
    getCharacter,
    clearError,
    process,
    setProcess,
  } = useMarvelService();

  useEffect(() => {
    updateData();
  }, [id]);

  const updateData = () => {
    clearError();

    switch (dataType) {
      case "comics":
        getComics(id)
          .then(onDataLoaded)
          .then(() => setProcess("confirmed"));
        break;
      case "character":
        getCharacter(id)
          .then(onDataLoaded)
          .then(() => setProcess("confirmed"));
        break;

      default:
        throw new Error("Unexpected process state ");
    }
  };

  const onDataLoaded = (data) => {
    setData(data);
  };

  // const errorMessage = error ? <ErrorMessage /> : null;
  // const spinner = loading ? <Spinner /> : null;
  // const content = !(loading || error || !data) ? (
  //   <Component data={data} />
  // ) : null;

  return (
    <>
      <AppBanner />
      {/* {errorMessage}
      {spinner}
      {content} */}
      {setContent(process, Component, data)}
    </>
  );
};

export default SinglePage;
