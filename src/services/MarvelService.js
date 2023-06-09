class MarvelService {
  _apiBase = `https://gateway.marvel.com:443/v1/public/`;
  _apiKey = `apikey=59bcfea3899a81ccb469d830d34db77e`;

  _baseOffset = 210;

  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status ${res.status}`);
    }

    return await res.json();
  };

  getAllCharacters = async (offset = this._baseOffset) => {
    const res = await this.getResource(
      `${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`
    );
    // делаем то же, что и для отдельного персонажа, но для каждого персонажа с помощбю map и формируем новый массив
    return res.data.results.map(this._transformCharacter);
  };

  getCharacter = async (id) => {
    // получаем данные
    const res = await this.getResource(
      `${this._apiBase}characters/${id}?${this._apiKey}`
    );

    // возвращаем только нужные данные в собранном объекте через ф-ию    _transformCharacter
    return this._transformCharacter(res.data.results[0]);
  };

  // char = res.data.results[0]
  _transformCharacter = (char) => {
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
}

export default MarvelService;
