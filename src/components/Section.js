export default class Section {
  constructor({ renderer }, containerElement) {
    this._renderer = renderer;
    this._container = document.querySelector(containerElement);
  }

  renderItems(res) {
    res.reverse().forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(cardItem) {
    this._container.prepend(cardItem);
  }
}
