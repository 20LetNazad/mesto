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
  apiConfig,
} from './utils/constants';

// API
const api = new Api(apiConfig);

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

api.renderCards().then((res) => {
  const renderCard = new Section(
    {
      items: res,
      renderer: (cardData) => {
        const card = new Card(cardData, '.template', {
          handleCardClick: () => {
            openPopupImage.open(cardData.link, cardData.name);
          },
        });
        renderCard.addItem(card.generateCard());
      },
    },
    '.elements'
  );
  renderCard.renderItems();
});

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

// Токен: 96508db4-2bdb-409e-a863-4987f404d514
// Идентификатор группы: cohort-55
