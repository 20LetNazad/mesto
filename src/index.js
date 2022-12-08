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

// Попап карточек
const popupWithCard = new PopupWithForm(cardPopup, {
  formSubmit: (data) => {
    renderCard.addItem(createCard(data));
    popupWithCard.close();
  },
});

// Попап изменения имени и описания профиля на сервере
const popupWithProfile = new PopupWithForm(profilePopup, {
  formSubmit: () => {
    const inputValues = popupWithProfile.getInputValues();
    api.editProfile(inputValues).then((data) => {
      userInfo.setUserInfo(data);
      popupWithProfile.close();
    });
  },
});

// Попап изменения аватарки на сервере
const popupWithAvatar = new PopupWithForm(avatarPopup, {
  formSubmit: () => {
    const inputValues = popupWithAvatar.getInputValues();
    api.editAvatar(inputValues).then((data) => {
      userInfo.setUserAvatar(data);
      popupWithAvatar.close();
    });
  },
});

// Рендер карточек с сервера
const renderCards = new Section(
  {
    renderer: (item) => {
      const card = new Card(item, '.template', {
        handleCardClick: () => {
          openPopupImage.open(item.name, item.link);
        },
      });
      renderCards.addItem(card.generateCard());
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

// Загрузка информации о карточках с сервера
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

// Токен: 96508db4-2bdb-409e-a863-4987f404d514
// Идентификатор группы: cohort-55
