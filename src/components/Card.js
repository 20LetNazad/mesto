// Создание карточки через форму
export default class Card {
  constructor(
    cardData,
    userId,
    templateSelector,
    { handleCardClick, handleCardDelete, handleAddlike, handleRemoveLike }
  ) {
    this._cardData = cardData;
    this.cardId = cardData._id;
    this._userId = userId;
    this._like = cardData.likes;
    this._name = cardData.name;
    this._link = cardData.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleAddlike = handleAddlike;
    this._handleRemoveLike = handleRemoveLike;
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
      this._changeLikeStatus();
    });

    this._deleteElement.addEventListener('click', () => {
      this._handleCardDelete(this._cardElement);
    });

    this._templateImage.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
    });
  }

  // показать лайки
  _changeLikeStatus() {
    if (this._likeButton.classList.contains('element__like_active')) {
      this._handleRemoveLike();
    } else {
      this._handleAddlike();
    }
  }

  // Отображение количества лайков
  likeCounter(likes) {
    this._likeCounter.textContent = likes.length;
  }

  // Лайк карточек
  handleLikeClick() {
    this._likeButton.classList.toggle('element__like_active');
  }

  // Удаление карточек
  handleDelete() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  // Создание карточки
  generateCard() {
    this._cardElement = this._getTemplateElement();
    this._deleteElement = this._cardElement.querySelector('.element__delete');
    this._likeButton = this._cardElement.querySelector('.element__like');
    this._templateImage = this._cardElement.querySelector('.element__image');
    this._templateTitle = this._cardElement.querySelector('.element__title');
    this._likeCounter = this._cardElement.querySelector('.element__count');

    this._templateTitle.textContent = this._name;
    this._templateImage.src = this._link;
    this._templateImage.alt = this._name;

    this._likeCounter.textContent = this._like.length;
    if (this._like.find((like) => like._id === this._userId)) {
      this._likeButton.classList.add('element__like_active');
    }

    if (this._cardData.owner._id === this._userId) {
      this._deleteElement.classList.add('element__delete_visible');
    } else {
      this._deleteElement.classList.remove('element__delete_visible');
    }

    this._setEventListeners();

    return this._cardElement;
  }
}
