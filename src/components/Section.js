export default class Section {
  constructor({ renderer }, containerElement) {
    this._renderer = renderer;
    this._container = document.querySelector(containerElement);
  }

  /** Рендек карточек */
  renderItems(res) {
    res.forEach((item) => {
      this._renderer(item);
    });
  }

  /** Добавление карточек с помощью рендера */
  addItems(items) {
    this._container.prepend(items);
  }

  /** Добавление карточек через попап */
  addItem(cardItem) {
    this._container.append(cardItem);
  }
}
