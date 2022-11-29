import './pages/index.css';
import Section from './scripts/Section.js';
import Card from './scripts/Card.js';
import FormValidator from './scripts/FormValidator.js';
import { initialCards } from './scripts/cards.js';
import PopupWithImage from './scripts/PopupWithImage.js';
import UserInfo from './scripts/UserInfo.js';
import Popup from './scripts/Popup.js';

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
const popupList = document.querySelectorAll('.popup');
const profilePopup = document.querySelector('.profile-popup');
const cardPopup = document.querySelector('.card-popup');
const imagePopup = document.querySelector('.image-popup');

// Формы
const formCard = document.forms['add-place'];
const formEditProfile = document.forms['edit-profile'];

// Селекторы класов
const profile = document.querySelector('.profile');
const cardsContainer = document.querySelector('.elements');
const name = profile.querySelector('.profile__nickmane');
const description = profile.querySelector('.profile__description');

// Кнопки
const buttonOpenProfilePopup = profile.querySelector('.profile__edit-button');
const buttonOpenCardPopup = profile.querySelector('.add-button');

// Инпуты
const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.querySelector(
  '.popup__input_type_description'
);
const inputCardNamePopup = cardPopup.querySelector(
  '.popup__input_type_image-name'
);
const inputCardImgPopup = cardPopup.querySelector('.popup__input_type_link');

// Открытие попапа с изображением
const openPopupImage = new PopupWithImage(imagePopup);

// Валидация форм
const profileFormValidator = new FormValidator(
  validationConfig,
  formEditProfile
);
const cardFormValidator = new FormValidator(validationConfig, formCard);

// Добавление новой карточки через попап добавления карточки
const handleAddCard = (evt) => {
  evt.preventDefault();
  const cardData = {
    name: inputCardNamePopup.value,
    link: inputCardImgPopup.value,
  };
  const card = createCard(cardData);
  cardsContainer.prepend(card);
  closePopup(cardPopup);
  formCard.reset();
  cardFormValidator.disableButton();
};

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

// // Закрытие попапа через Escape
// export const closeWithEsc = (evt) => {
//   if (evt.key === 'Escape') {
//     closePopup(document.querySelector('.popup_opened'));
//   }
// };

// Закрытие попапа
// function closePopup(popup) {
//   popup.classList.remove('popup_opened');
//   document.removeEventListener('keydown', closeWithEsc);
// }

// // Функция открытия попапа
// export function openPopup(popup) {
//   popup.classList.add('popup_opened');
//   document.addEventListener('keydown', closeWithEsc);
// }

// Создание карточки с помощью класса
function createCard(cardData) {
  const card = new Card(cardData, '.template', {
    handleCardClick: () => {
      openPopupImage.open(cardData.link, cardData.name);
    },
  });
  const cardElement = card.generateCard();
  return cardElement;
}

// // Закрытие попапа через крестик и оверлей
// popupList.forEach((popup) => {
//   popup.addEventListener('mousedown', (evt) => {
//     if (
//       evt.target === evt.currentTarget ||
//       evt.target.classList.contains('popup__close-button')
//     ) {
//       closePopup(popup);
//     }
//   });
// });

const openProfilePopu = new Popup(profilePopup);

const userInfo = new UserInfo('.profile__nickmane', '.profile__description');

openProfilePopu.setEventListeners();

function editProlileSubmit() {
  const userNameValue = name;
  const descriptionValue = description;
  userInfo.getUserInfo();
  // nameInput.value = userNameValue;
  // jobInput.value = descriptionValue;
  openProfilePopu.open();
}

// Сабмит изменения в попапе редактирования профиля
formEditProfile.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  userInfo.setUserInfo({ nameValue, jobValue });
  // name.textContent = nameValue;
  // description.textContent = jobValue;
  openProfilePopu.close();
});

// Вызов валидации форм
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

// Открытие попапа редвктирования профиля
buttonOpenProfilePopup.addEventListener('click', editProlileSubmit);

// Сабмит добавления карточки через попап добавления карточки
formCard.addEventListener('submit', handleAddCard);

// Открытие попапа добавления карточки
buttonOpenCardPopup.addEventListener('click', () => openPopup(cardPopup));

// Установка слушателя на закрытие попапа с изображением
openPopupImage.setEventListeners();

renderCard.renderItems();
