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
  formCard,
  formEditProfile,
  formAvatar,
  buttonOpenCardPopup,
  buttonOpenProfilePopup,
  buttonOpenAvatar,
  nameInput,
  jobInput,
} from '../utils/constants';

/** API */
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-55',
  userId: '5c67497edf177b6be73287c3',
  headers: {
    authorization: '96508db4-2bdb-409e-a863-4987f404d514',
    'Content-Type': 'application/json',
  },
});

/** Айди юзера */
const userId = api._userId;

/** Открытие попапа с удалением карточки */
const popupConfirmDeleteCard = new PopupWithDelete('.confirm-popup');

/** Открытие попапа с изображением */
const popupOpenImage = new PopupWithImage('.image-popup');

/** Валидация форм */
const profileFormValidator = new FormValidator(
  validationConfig,
  formEditProfile
);
const cardFormValidator = new FormValidator(validationConfig, formCard);
const avatarFormValidator = new FormValidator(validationConfig, formAvatar);

/** Информация о юзере */
const userInfo = new UserInfo(
  '.profile__nickmane',
  '.profile__description',
  '.profile__avatar'
);

/** Создание элемента карточки */
const createCard = (cardData) => {
  const card = new Card(cardData, userId, '.template', {
    handleCardClick: () => {
      popupOpenImage.open(cardData.link, cardData.name);
    },
    handleCardDelete: () => {
      popupConfirmDeleteCard.open();
      popupConfirmDeleteCard.submitCardDelete(() => {
        api
          .removeCard(card.cardId)
          .then(() => {
            card.handleDelete();
          })
          .catch((err) => console.log(`Ошибка.....: ${err}`));
      });
    },
    handleRemoveLike: () => {
      api
        .removeLike(cardData._id)
        .then((data) => {
          card.updateLikeData(data);
        })
        .catch((err) => console.log(`Ошибка.....: ${err}`));
    },
    handleAddlike: () => {
      api
        .addLike(cardData._id)
        .then((data) => {
          card.updateLikeData(data);
        })
        .catch((err) => console.log(`Ошибка.....: ${err}`));
    },
  });
  return card;
};

/** Попап добавления карточки на сервер */
const popupWithCard = new PopupWithForm('.card-popup', {
  formSubmit: (inputValues) => {
    api
      .addCard(inputValues)
      .then((cardData) => {
        const card = createCard(cardData);
        const cardElement = card.generateCard();
        renderCards.addItems(cardElement);
        popupWithCard.close();
      })
      .catch((err) => console.log(`Ошибка.....: ${err}`))
      .finally(() => {
        popupWithCard._submitButton.textContent =
          popupWithCard._buttonTextContent;
      });
  },
});

/** Попап изменения имени и описания профиля на сервере */
const popupWithProfile = new PopupWithForm('.profile-popup', {
  formSubmit: (inputValues) => {
    api
      .editProfile(inputValues)
      .then((profileData) => {
        userInfo.setUserInfo(profileData);
        popupWithProfile.close();
      })
      .catch((err) => console.log(`Ошибка.....: ${err}`))
      .finally(() => {
        popupWithProfile._submitButton.textContent =
          popupWithProfile._buttonTextContent;
      });
  },
});

/** Попап изменения аватарки на сервере */
const popupWithAvatar = new PopupWithForm('.avatar-popup', {
  formSubmit: (inputValues) => {
    api
      .editAvatar(inputValues)
      .then((avatarData) => {
        userInfo.setUserAvatar(avatarData);
        popupWithAvatar.close();
      })
      .catch((err) => console.log(`Ошибка.....: ${err}`))
      .finally(() => {
        popupWithAvatar._submitButton.textContent =
          popupWithAvatar._buttonTextContent;
      });
  },
});

/** Рендер карточек */
const renderCards = new Section(
  {
    renderer: (item) => {
      const card = createCard(item);
      const cardElement = card.generateCard();
      renderCards.addItem(cardElement);
    },
  },
  '.elements'
);

/** Функция открытия попапа профиля */
function openProlilePopup() {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.about;
  profileFormValidator.resetValidation();
  popupWithProfile.open();
}

/** Функция открытия попапа карточек */
function openCardPopup() {
  popupWithCard.open();
  cardFormValidator.resetValidation();
}

/** Функция открытия попапа аватарки */
function openAvatarEdit() {
  popupWithAvatar.open();
  avatarFormValidator.resetValidation();
}

/** Проверка айди пользователя и отрисовка данных */
Promise.all([api.userInfo(), api.renderCards()])
  .then(([userData, cardData]) => {
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);

    renderCards.renderItems(cardData);
  })
  .catch((err) => {
    console.log(err);
  });

/** Вызов валидации форм */
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
avatarFormValidator.enableValidation();

/** Открытие попапов */
buttonOpenProfilePopup.addEventListener('click', openProlilePopup);
buttonOpenCardPopup.addEventListener('click', openCardPopup);
buttonOpenAvatar.addEventListener('click', openAvatarEdit);

/** Установка слушателей */
popupOpenImage.setEventListeners();
popupWithCard.setEventListeners();
popupWithProfile.setEventListeners();
popupWithAvatar.setEventListeners();
popupConfirmDeleteCard.setEventListeners();
