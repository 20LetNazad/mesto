import './pages/index.css';

import Section from './components/Section.js';
import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import PopupWithImage from './components/PopupWithImage.js';
import UserInfo from './components/UserInfo.js';
import PopupWithForm from './components/PopupWithForm.js';
import Api from './components/Api.js';
import { initialCards } from './utils/cards.js';
import {
  validationConfig,
  profilePopup,
  cardPopup,
  imagePopup,
  avatarPopup,
  formCard,
  formEditProfile,
  formAvatar,
  buttonOpenCardPopup,
  buttonOpenProfilePopup,
  buttonOpenAvatar,
} from './utils/constants';

// Открытие попапа с изображением
const openPopupImage = new PopupWithImage(imagePopup);

// Валидация форм
const profileFormValidator = new FormValidator(
  validationConfig,
  formEditProfile
);
const cardFormValidator = new FormValidator(validationConfig, formCard);
const avatarFormValidator = new FormValidator(validationConfig, formAvatar);

// Информация о юзере
const userInfo = new UserInfo(
  '.profile__nickmane',
  '.profile__description',
  '.profile__avatar'
);

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

// Попап аватарки
const popupWithAvatar = new PopupWithForm(avatarPopup, {
  formSubmit: (data) => {
    userInfo.setUserAvatar(data);
    popupWithAvatar.close();
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
  popupWithProfile.setInputValues(userData);
  profileFormValidator.resetValidation();
  popupWithProfile.open();
}

// Функция открытия попапа карточек
function openCardPopup() {
  popupWithCard.open();
  cardFormValidator.resetValidation();
}

// Функция открытия попапа аватарки
function openAvatarEdit() {
  popupWithAvatar.open();
  avatarFormValidator.resetValidation();
}

// Вызов валидации форм
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
avatarFormValidator.enableValidation();

// Открытие попапов
buttonOpenProfilePopup.addEventListener('click', openProlilePopup);
buttonOpenCardPopup.addEventListener('click', openCardPopup);
buttonOpenAvatar.addEventListener('click', openAvatarEdit);

// Установка слушателей
openPopupImage.setEventListeners();
popupWithCard.setEventListeners();
popupWithProfile.setEventListeners();
popupWithAvatar.setEventListeners();
renderCard.renderItems();
