// Создание карточки через форму
export default class Card {
  constructor(cardData, templateSelector, { handleCardClick }) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  // Получение темплейта для карточек
  _getTemplateElement() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.cards__item')
      .cloneNode(true);

    return cardElement;
  }

  // Установка слушателей
  _setEventListeners() {
    this._element
      .querySelector('.element__like')
      .addEventListener('click', () => {
        this._handleLikeClick();
      });

    this._element
      .querySelector('.element__delete')
      .addEventListener('click', () => {
        this._handleDelete(this._element);
      });

    this._element
      .querySelector('.element__image')
      .addEventListener('click', () => {
        this._handleCardClick(this._link, this._name);
      });
  }

  // Лайк карточек
  _handleLikeClick() {
    this._element
      .querySelector('.element__like')
      .classList.toggle('element__like_active');
  }

  // Удаление карточек
  _handleDelete() {
    this._element.remove();
    this._element = null;
  }

  // Создание карточки
  generateCard() {
    this._element = this._getTemplateElement();
    this._setEventListeners();
    const templateImage = this._element.querySelector('.element__image');
    this._element.querySelector('.element__title').textContent = this._name;
    templateImage.src = this._link;
    templateImage.alt = this._name;

    return this._element;
  }
}
