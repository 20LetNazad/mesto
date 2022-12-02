import './pages/index.css';

import Section from './scripts/Section.js';
import Card from './scripts/Card.js';
import FormValidator from './scripts/FormValidator.js';
import PopupWithImage from './scripts/PopupWithImage.js';
import UserInfo from './scripts/UserInfo.js';
import PopupWithForm from './scripts/PopupWithForm.js';
import { initialCards } from './utils/cards.js';
import {
  validationConfig,
  profilePopup,
  cardPopup,
  imagePopup,
  formCard,
  formEditProfile,
  buttonOpenCardPopup,
  buttonOpenProfilePopup,
  nameInput,
  jobInput,
} from './utils/constants';

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

// Функция открытия попапа профиля
function openProlilePopup() {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.job;
  profileFormValidator.disableButton();
  popupWithProfile.open();
}

// Функция открытия попапа карточек
function openCardPopup() {
  popupWithCard.open();
  cardFormValidator.disableButton();
}

// Вызов валидации форм
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

// Открытие попапов
buttonOpenProfilePopup.addEventListener('click', openProlilePopup);
buttonOpenCardPopup.addEventListener('click', openCardPopup);

// Установка слушателей
openPopupImage.setEventListeners();
popupWithCard.setEventListeners();
popupWithProfile.setEventListeners();
renderCard.renderItems();
