import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
  const { loading, request, error, clearError, process, setProcess } =
    useHttp();

  const _apiBase = `https://gateway.marvel.com:443/v1/public/`;
  const _apiKey = `apikey=59bcfea3899a81ccb469d830d34db77e`;

  const _baseOffset = 210;

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(
      `${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
    );
    // делаем то же, что и для отдельного персонажа, но для каждого персонажа с помощбю map и формируем новый массив
    return res.data.results.map(_transformCharacter);
  };

  const getCharacter = async (id) => {
    // получаем данные
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);

    // возвращаем только нужные данные в собранном объекте через ф-ию    _transformCharacter
    return _transformCharacter(res.data.results[0]);
  };

  const getCharacterByName = async (name) => {
    const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
    return res.data.results.map(_transformCharacter);
  };

  const getAllComics = async (offset = 0) => {
    const res = await request(
      `${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`
    );
    return res.data.results.map(_transformComics);
  };

  const getComics = async (id) => {
    // получаем данные
    const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);

    return _transformComics(res.data.results[0]);
  };

  const _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description,
      thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items,
    };
  };
  const _transformComics = (comics) => {
    return {
      id: comics.id,
      title: comics.title,
      description: comics.description || "There is no description",
      pageCount: comics.pageCount
        ? `${comics.pageCount} p.`
        : "No information about the number of pages",
      thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
      language: comics.textObjects[0]?.language || "en-us",
      price: comics.prices[0].price
        ? `${comics.prices[0].price}$`
        : "not available",
    };
  };

  // char = res.data.results[0]

  return {
    loading,
    error,
    process,
    clearError,
    getAllCharacters,
    getCharacter,
    getAllComics,
    getComics,
    getCharacterByName,
    setProcess,
  };
};

export default useMarvelService;
