export default class UserInfo {
  constructor(nameElement, descriptionElement, avatarElement) {
    this._nameElement = document.querySelector(nameElement);
    this._descriptionElement = document.querySelector(descriptionElement);
    this._avatarElement = document.querySelector(avatarElement);
  }

  /** Получить информацию о юзере */
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._descriptionElement.textContent,
    };
  }
  /** Изменить инфу о юзере */
  setUserInfo(data) {
    this._nameElement.textContent = data.name;
    this._descriptionElement.textContent = data.about;
  }
  /** Изменить аватарку */
  setUserAvatar(data) {
    this._avatarElement.src = data.avatar;
  }
}
