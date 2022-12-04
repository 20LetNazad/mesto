// Конфиг для валидации
const validationConfig = {
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
const imagePopup = document.querySelector('.image-popup');

// Формы
const formCard = document.forms['add-place'];
const formEditProfile = document.forms['edit-profile'];

// Селекторы класов
const profile = document.querySelector('.profile');

// Кнопки
const buttonOpenProfilePopup = profile.querySelector('.profile__edit-button');
const buttonOpenCardPopup = profile.querySelector('.add-button');

export {
  validationConfig,
  profilePopup,
  cardPopup,
  imagePopup,
  formCard,
  formEditProfile,
  buttonOpenCardPopup,
  buttonOpenProfilePopup,
};
