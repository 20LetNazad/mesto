
let popup = document.querySelector('.popup');
let popupOpen = document.querySelector('.popup_opened');
let profile = document.querySelector('.profile');
let formElement = document.querySelector('.popup__form');
let closeButton = popup.querySelector('.popup__close-button');
let editButton = profile.querySelector('.profife__edit-button');
let nameInput = formElement.querySelector('.input__text_type_name');
let jobInput = formElement.querySelector('.input__text_type_description');

function closePopup() {
    popup.classList.remove('popup_opened');
};

function openEditProfile() {
    let nameValue = profile.querySelector('.profile__nickmane');
    let jobValue = profile.querySelector('.profile__description');
    let name = nameValue.textContent;
    let job = jobValue.textContent;
    nameInput.value = name;
    jobInput.value = job;
    popup.classList.add('popup_opened');
};

function formSubmitHandler (evt) {
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
popup.classList.remove('popup_opened');