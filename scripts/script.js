import Card from './Card.js';
import FormValidator from './FormValidator.js';

// Конфиг для валидации
const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input-error',
  errorClass: 'popup__input_error',
};

// Попапы
const profilePopup = document.querySelector('.profile-popup');
const cardPopup = document.querySelector('.card-popup');

// Формы
const formCard = document.forms['add-place'];
const formEditProfile = document.forms['edit-profile'];

// Селекторы класов
const profile = document.querySelector('.profile');
const container = document.querySelector('.elements');
const name = profile.querySelector('.profile__nickmane');

// Кнопки
const submitCardButton = cardPopup.querySelector('.popup__submit-button');
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.add-button');

// Инпуты
const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.querySelector(
  '.popup__input_type_description'
);
const description = profile.querySelector('.profile__description');
const inputCardNamePopup = cardPopup.querySelector(
  '.popup__input_type_image-name'
);
const inputCardImgPopup = cardPopup.querySelector('.popup__input_type_link');

// Валидация форм
const editProfileValidation = new FormValidator(settings, formEditProfile);
const addCardValidation = new FormValidator(settings, formCard);

// Массив с карточками
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

// Закрытие попапа через Escape
const closeWithEsc = (evt) => {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
};

// Закрытие попапа через крестик и оверлей
document.querySelectorAll('.popup').forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (
      evt.target === evt.currentTarget ||
      evt.target.classList.contains('popup__close-button')
    ) {
      closePopup(popup);
    }
  });
});

// Закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeWithEsc);
}

// Функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeWithEsc);
}

// Открытие попапа редвктирования профиля
editButton.addEventListener('click', function () {
  const userNameValue = name.textContent;
  const descriptionValue = description.textContent;
  nameInput.value = userNameValue;
  jobInput.value = descriptionValue;
  openPopup(profilePopup);
});

// Открытие попапа добавления карточки
addButton.addEventListener('click', () => openPopup(cardPopup));

// Сабмит изменения в попапе редвктирования профиля
formEditProfile.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  name.textContent = nameValue;
  description.textContent = jobValue;
  closePopup(profilePopup);
});

// Рендер массива карточек
initialCards.forEach((item) => {
  const card = new Card(item, '.template');
  const cardElement = card.generateCard();

  document.querySelector('.elements').append(cardElement);
});

// Добавление новой карточки через попап добавления карточки
const handleAddCard = (evt) => {
  evt.preventDefault();
  initialCards.name = inputCardNamePopup.value;
  initialCards.link = inputCardImgPopup.value;
  const card = new Card(initialCards, '.template');
  container.prepend(card.generateCard());
  closePopup(cardPopup);
  formCard.reset();
  submitCardButton.setAttribute('disabled', true);
  submitCardButton.classList.add('popup__submit-button_disabled');
};

// Вызов валидации форм
editProfileValidation.enableValidation();
addCardValidation.enableValidation();

// Сабмит добавления карточки через попап добавления карточки
formCard.addEventListener('submit', handleAddCard);
