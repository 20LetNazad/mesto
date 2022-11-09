export default class Card {
  constructor(object, templateSelector) {
    this._name = object.name;
    this._link = object.link;
    this._templateSelector = templateSelector;
  }

  _getTemplateElement() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.cards__item')
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._element
      .querySelector('.element__like')
      .addEventListener('click', () => {
        this._eventLikeClick();
      });

    this._element
      .querySelector('.element__delete')
      .addEventListener('click', () => {
        this._eventDeleteCard(this._element);
      });
  }

  _eventLikeClick() {
    this._element
      .querySelector('.element__like')
      .classList.toggle('element__like_active');
  }

  _eventDeleteCard(card) {
    card.remove();
  }

  generateCard() {
    this._element = this._getTemplateElement();
    this._setEventListeners();

    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__title').textContent = this._name;

    return this._element;
  }
}
