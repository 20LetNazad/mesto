import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards } from './utils.js';

// Конфиг для валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input-error',
  errorClass: 'popup__input_error',
};

/* Массив с карточками для изменения */
const cardData = { initialCards };

// Попапы
const popup = document.querySelectorAll('.popup');
const profilePopup = document.querySelector('.profile-popup');
const cardPopup = document.querySelector('.card-popup');

// Формы
const formCard = document.forms['add-place'];
const formEditProfile = document.forms['edit-profile'];

// Селекторы класов
const profile = document.querySelector('.profile');
const cardsContainer = document.querySelector('.elements');
const name = profile.querySelector('.profile__nickmane');

// Кнопки
const cardButtonSubmit = cardPopup.querySelector('.popup__submit-button');
const profileButtonSubmit = profilePopup.querySelector(
  '.popup__submit-button_profile'
);
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
const profileFormValidator = new FormValidator(
  validationConfig,
  formEditProfile,
  profileButtonSubmit
);
const cardFormValidator = new FormValidator(
  validationConfig,
  formCard,
  cardButtonSubmit
);

// Закрытие попапа через Escape
export const closeWithEsc = (evt) => {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
};

// Закрытие попапа через крестик и оверлей
popup.forEach((popup) => {
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
export function openPopup(popup) {
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
const render = () => {
  initialCards.forEach((item) => {
    const card = new Card(item, '.template');
    const cardElement = card.generateCard();
    cardsContainer.append(cardElement);
  });
};

// Добавление новой карточки через попап добавления карточки
const handleAddCard = (evt) => {
  evt.preventDefault();
  cardData.name = inputCardNamePopup.value;
  cardData.link = inputCardImgPopup.value;
  const card = new Card(cardData, '.template');
  cardsContainer.prepend(card.generateCard());
  closePopup(cardPopup);
  formCard.reset();
  cardFormValidator._disableButton();
};

// Вызов валидации форм
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

// Сабмит добавления карточки через попап добавления карточки
formCard.addEventListener('submit', handleAddCard);

// Открытие попапа добавления карточки
addButton.addEventListener('click', () => openPopup(cardPopup));

render();
