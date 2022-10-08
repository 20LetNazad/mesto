const popup = document.querySelector('.popup');
const popupCard = document.querySelector('.popup-add-card');
const profile = document.querySelector('.profile');
const formElement = document.querySelector('.popup__profile-form');
const closeButton = popup.querySelector('.popup__close-button');
const closeButtonCard = popupCard.querySelector('.popup__close-button');
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.add-button');
const nameInput = formElement.querySelector('.popup__text_type_name');
const jobInput = formElement.querySelector('.popup__text_type_description');
const name = profile.querySelector('.profile__nickmane');
const description = profile.querySelector('.profile__description');
const container = document.querySelector('.elements');
const template = document.querySelector('.template');
const imagePopup = document.querySelector('.image-popup');
const imgClose = imagePopup.querySelector('.popup__close-button');
const imgCaption = imagePopup.querySelector('.image-popup__caption');
const imgLink = imagePopup.querySelector('.image-popup__img');
const inputCardNamePopup = popupCard.querySelector('.popup__text_type_image-name');
const inputCardImgPopup = popupCard.querySelector('.popup__text_type_link');
const submitBtm = popupCard.querySelector('.popup__submit-button');
const formCard = popupCard.querySelector('.popup-add-card__form');

const initialCards = [{
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
}, {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
}, {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
}, {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
}, {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
}, {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
}];

const closePopupAdd = () => {
    popupCard.classList.remove('popup-add-card_open');
};

const openImgPopup = () => {
    imagePopup.classList.add('image-popup_open');
};

editButton.addEventListener('click', function () {
    let userNameValue = name.textContent;
    let descriptionValue = description.textContent;
    nameInput.value = userNameValue;
    jobInput.value = descriptionValue;
    popup.classList.add('popup_opened');
});

formElement.addEventListener('submit',function (evt) {
    evt.preventDefault();
    let nameValue = nameInput.value;
    let jobValue = jobInput.value;
    name.textContent = nameValue;
    description.textContent = jobValue;
    popup.classList.remove('popup_opened');
});

const render = () => {
    initialCards.forEach((item) => {
        const currentItem = createCardNode(item.name, item.link);
        container.append(currentItem);
    });

    submitBtm.addEventListener("click", handleAddCard);
};

const createCardNode = (name, link) => {
    const currentItem = template.content.cloneNode(true);
    const currentText = currentItem.querySelector(".element__title");
    const currentImg = currentItem.querySelector('.element__image');
    currentText.textContent = name;
    currentImg.src = link;

    currentImg.addEventListener('click', function (){
        imgCaption.textContent = name;
        imgLink.src = link;
        openImgPopup();
    });

    return currentItem;
};

const handleAddCard = (evt) => {
    evt.preventDefault();
    const name = createCardNode(inputCardNamePopup.value, inputCardImgPopup.value);
    container.prepend(name);
    inputCardNamePopup.value = '';
    formCard.reset();
    closePopupAdd();
};

render()

closeButton.addEventListener('click', function () {
    popup.classList.remove('popup_opened');
});

imgClose.addEventListener('click', function () {
    imagePopup.classList.remove('image-popup_open');
});

addButton.addEventListener('click', function () {
    popupCard.classList.add('popup-add-card_open');
});

closeButtonCard.addEventListener('click', closePopupAdd);