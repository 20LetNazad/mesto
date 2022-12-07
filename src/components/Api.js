export default class Api {
  constructor(config) {
    this._headers = config.headers;
    this._url = config.url;
  }
}
