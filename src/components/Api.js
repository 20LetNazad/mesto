export default class Api {
  constructor(config) {
    this._headers = config.headers;
    this._url = config.url;
  }

  _resStatus(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  userInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then(this._resStatus);
  }

  renderCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    }).then(this._resStatus);
  }
}
