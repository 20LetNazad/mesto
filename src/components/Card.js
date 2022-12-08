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
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick();
    });

    this._cardElement
      .querySelector('.element__delete')
      .addEventListener('click', () => {
        this._handleDelete(this._cardElement);
      });

    this._templateImage.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
    });
  }

  // Лайк карточек
  _handleLikeClick() {
    this._likeButton.classList.toggle('element__like_active');
  }

  // Удаление карточек
  _handleDelete() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  // Создание карточки
  generateCard() {
    this._cardElement = this._getTemplateElement();
    this._likeButton = this._cardElement.querySelector('.element__like');
    this._templateImage = this._cardElement.querySelector('.element__image');
    this._templateTitle = this._cardElement.querySelector('.element__title');
    this._templateTitle.textContent = this._name;
    this._templateImage.src = this._link;
    this._templateImage.alt = this._name;
    this._setEventListeners();

    return this._cardElement;
  }
}
