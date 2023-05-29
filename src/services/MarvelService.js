import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
  const { loading, request, error, clearError } = useHttp();

  const _apiBase = `https://gateway.marvel.com:443/v1/public/`;
  const _apiKey = `apikey=59bcfea3899a81ccb469d830d34db77e`;

  const _baseOffset = 210;

  // getResource = async (url) => {
  //   let res = await fetch(url);

  //   if (!res.ok) {
  //     throw new Error(`Could not fetch ${url}, status ${res.status}`);
  //   }

  //   return await res.json();
  // };

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

  // char = res.data.results[0]

  return { loading, error, clearError, getAllCharacters, getCharacter };
};

export default useMarvelService;
