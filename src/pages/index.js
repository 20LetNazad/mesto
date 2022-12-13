import './index.css';

import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithDelete from '../components/PopupWithDelete.js';
import Api from '../components/Api.js';
import {
  validationConfig,
  profilePopup,
  cardPopup,
  imagePopup,
  avatarPopup,
  deletePopup,
  formCard,
  formEditProfile,
  formAvatar,
  buttonOpenCardPopup,
  buttonOpenProfilePopup,
  buttonOpenAvatar,
  nameInput,
  jobInput,
} from '../utils/constants';

// API
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-55',
  userId: '5c67497edf177b6be73287c3',
  headers: {
    authorization: '96508db4-2bdb-409e-a863-4987f404d514',
    'Content-Type': 'application/json',
  },
});

// Айди юзера
const userId = api._userId;

// Открытие попапа с удалением карточки
const deleteCard = new PopupWithDelete(deletePopup);

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
  const card = new Card(cardData, userId, '.template', {
    handleCardClick: () => {
      openPopupImage.open(cardData.link, cardData.name);
    },
    handleCardDelete: () => {
      deleteCard.open();
      deleteCard.submitCardDelete(() => {
        card.handleDelete();
        api.removeCard(card.cardId);
      });
    },
    handleRemoveLike: () => {
      api.removeLike(cardData._id).then((data) => {
        card.likeCounter(data.likes);
        card.handleLikeClick();
      });
    },
    handleAddlike: () => {
      api.addLike(cardData._id).then((data) => {
        card.likeCounter(data.likes);
        card.handleLikeClick();
      });
    },
  });
  renderCards.addItem(card.generateCard());
};

// Попап добавления карточки на сервере
const popupWithCard = new PopupWithForm(cardPopup, {
  formSubmit: () => {
    const inputValues = popupWithCard.getInputValues();
    api.addCard(inputValues).then((cardData) => {
      createCard(cardData), popupWithCard.close();
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
deleteCard.setEventListeners();
