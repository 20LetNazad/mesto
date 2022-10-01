let popup = document.querySelector('.popup');
const popupCard = document.querySelector('.popup-add-card');
let profile = document.querySelector('.profile');
let formElement = document.querySelector('.popup__profile-form');
let closeButton = popup.querySelector('.popup__close-button');
const closeButtonCard = popupCard.querySelector('.popup__close-button');
let editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.add-button');
let nameInput = formElement.querySelector('.popup__text_type_name');
let jobInput = formElement.querySelector('.popup__text_type_description');

function closePopup() {
    popup.classList.remove('popup_opened');
}

function closePopupCard() {
    popupCard.classList.remove('popup-add-card_open');
}

function openEditProfile() {
    let nameValue = profile.querySelector('.profile__nickmane');
    let jobValue = profile.querySelector('.profile__description');
    let name = nameValue.textContent;
    let job = jobValue.textContent;
    nameInput.value = name;
    jobInput.value = job;
    popup.classList.add('popup_opened');
}

function openAddCard() {
    popupCard.classList.add('popup-add-card_open');
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    let nameValue = nameInput.value;
    let jobValue = jobInput.value;
    let name = profile.querySelector('.profile__nickmane');
    let description = profile.querySelector('.profile__description');
    name.textContent = nameValue;
    description.textContent = jobValue;
    popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', openEditProfile);
closeButton.addEventListener('click', closePopup);
addButton.addEventListener('click', openAddCard);
closeButtonCard.addEventListener('click', closePopupCard);