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
const avatarPopup = document.querySelector('.avatar-popup');
const deletePopup = document.querySelector('.confirm-popup');

// Формы
const formCard = document.forms['add-place'];
const formEditProfile = document.forms['edit-profile'];
const formAvatar = document.forms['avatar'];

// Селекторы класов
const profile = document.querySelector('.profile');

// Инпуты
const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.querySelector(
  '.popup__input_type_description'
);

// Кнопки
const buttonOpenProfilePopup = profile.querySelector('.profile__edit-button');
const buttonOpenCardPopup = profile.querySelector('.add-button');
const buttonOpenAvatar = profile.querySelector('.profile__button');

export {
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
};
