// Попап картинки
const imagePopup = document.querySelector('.image-popup');
// Изображение в попапе картинки
const image = imagePopup.querySelector('.image-popup__img');
// Описание в попапе картинки
const description = imagePopup.querySelector('.image-popup__caption');

// Создание карточки через форму
export default class Card {
  constructor(object, templateSelector) {
    this._name = object.name;
    this._link = object.link;
    this._templateSelector = templateSelector;
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
        this._eventLikeClick();
      });

    this._element
      .querySelector('.element__delete')
      .addEventListener('click', () => {
        this._eventDeleteCard(this._element);
      });

    this._element
      .querySelector('.element__image')
      .addEventListener('click', () => {
        this._openImagePopup();
      });
  }

  // Лайк карточек
  _eventLikeClick() {
    this._element
      .querySelector('.element__like')
      .classList.toggle('element__like_active');
  }

  // Удаление карточек
  _eventDeleteCard(card) {
    card.remove();
  }

  // Открытие попапа картинки
  _openImagePopup() {
    image.src = this._link;
    image.alt = this._name;
    description.textContent = this._name;
    imagePopup.classList.add('popup_opened');
    document.addEventListener('keydown', this._closeWithEsc);
  }

  // Закрытие попапа через Esc
  _closeWithEsc(evt) {
    if (evt.key === 'Escape') {
      document.querySelector('.popup_opened').classList.remove('popup_opened');
      document.removeEventListener('keydown', this._closeWithEsc);
    }
  }

  // Создание карточки
  generateCard() {
    this._element = this._getTemplateElement();
    this._setEventListeners();

    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;

    return this._element;
  }
}
