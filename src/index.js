import './pages/index.css';

import Section from './scripts/Section.js';
import Card from './scripts/Card.js';
import FormValidator from './scripts/FormValidator.js';
import { initialCards } from './scripts/cards.js';
import PopupWithImage from './scripts/PopupWithImage.js';
import UserInfo from './scripts/UserInfo.js';
import PopupWithForm from './scripts/PopupWithForm.js';

// Конфиг для валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input-error',
  errorClass: 'popup__input_error',
};

// // Попапы
const profilePopup = document.querySelector('.profile-popup');
const cardPopup = document.querySelector('.card-popup');
const imagePopup = document.querySelector('.image-popup');

// // Формы
const formCard = document.forms['add-place'];
const formEditProfile = document.forms['edit-profile'];

// // Селекторы класов
const profile = document.querySelector('.profile');

// // Кнопки
const buttonOpenProfilePopup = profile.querySelector('.profile__edit-button');
const buttonOpenCardPopup = profile.querySelector('.add-button');

// // Инпуты
const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.querySelector(
  '.popup__input_type_description'
);

// Открытие попапа с изображением
const openPopupImage = new PopupWithImage(imagePopup);

// Валидация форм
const profileFormValidator = new FormValidator(
  validationConfig,
  formEditProfile
);
const cardFormValidator = new FormValidator(validationConfig, formCard);

// Информация о юзере
const userInfo = new UserInfo('.profile__nickmane', '.profile__description');

// Попап карточек
const popupWithCard = new PopupWithForm(cardPopup, {
  formSubmit: (data) => {
    renderCard.addItem(createCard(data));
    popupWithCard.close();
  },
});

// Попап профиля
const popupWithProfile = new PopupWithForm(profilePopup, {
  formSubmit: (data) => {
    userInfo.setUserInfo(data);
    popupWithProfile.close();
  },
});

// Рендер масива карточек
const renderCard = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      renderCard.addItem(createCard(item));
    },
  },
  '.elements'
);

// Создание карточки с помощью класса
function createCard(cardData) {
  const card = new Card(cardData, '.template', {
    handleCardClick: () => {
      openPopupImage.open(cardData.link, cardData.cardName);
    },
  });
  const cardElement = card.generateCard();
  return cardElement;
}

function editProlileSubmit() {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.job;
  profileFormValidator.disableButton();
  popupWithProfile.open();
}

function handleClickAddButton() {
  popupWithCard.open();
  cardFormValidator.disableButton();
}

// Вызов валидации форм
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

// Открытие попапов
buttonOpenProfilePopup.addEventListener('click', editProlileSubmit);
buttonOpenCardPopup.addEventListener('click', handleClickAddButton);

// Установка слушателей
openPopupImage.setEventListeners();
popupWithCard.setEventListeners();
popupWithProfile.setEventListeners();
renderCard.renderItems();
