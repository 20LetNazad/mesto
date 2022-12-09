import './pages/index.css';

import Section from './components/Section.js';
import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import PopupWithImage from './components/PopupWithImage.js';
import UserInfo from './components/UserInfo.js';
import PopupWithForm from './components/PopupWithForm.js';
import Api from './components/Api.js';
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
  nameInput,
  jobInput,
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

// Создание элемента карточки
const createCard = (cardData) => {
  const card = new Card(cardData, '.template', {
    handleCardClick: () => {
      openPopupImage.open(cardData.link, cardData.name);
    },
  });
  renderCards.addItem(card.generateCard());
};

// Попап добавления карточки на сервере
const popupWithCard = new PopupWithForm(cardPopup, {
  formSubmit: () => {
    const inputValues = popupWithCard.getInputValues();
    api.addCard(inputValues).then((cardData) => {
      createCard(cardData);
      popupWithCard.close();
    });
  },
});

// Попап изменения имени и описания профиля на сервере
const popupWithProfile = new PopupWithForm(profilePopup, {
  formSubmit: () => {
    const inputValues = popupWithProfile.getInputValues();
    api.editProfile(inputValues).then((profileData) => {
      userInfo.setUserInfo(profileData);
      popupWithProfile.close();
    });
  },
});

// Попап изменения аватарки на сервере
const popupWithAvatar = new PopupWithForm(avatarPopup, {
  formSubmit: () => {
    const inputValues = popupWithAvatar.getInputValues();
    api.editAvatar(inputValues).then((avatarData) => {
      userInfo.setUserAvatar(avatarData);
      popupWithAvatar.close();
    });
  },
});

// Рендер карточек
const renderCards = new Section(
  {
    renderer: (card) => {
      createCard(card);
    },
  },
  '.elements'
);

// Функция открытия попапа профиля
function openProlilePopup() {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.about;
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

// Загрузка информации о юзере с сервера
api.userInfo().then((res) => {
  userInfo.setUserInfo(res);
  userInfo.setUserAvatar(res);
});

// Загрузка карточек с сервера
api.renderCards().then((res) => {
  renderCards.renderItems(res);
});

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
