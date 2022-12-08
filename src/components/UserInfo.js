export default class UserInfo {
  constructor(nameElement, descriptionElement, avatarElement) {
    this._nameElement = document.querySelector(nameElement);
    this._descriptionElement = document.querySelector(descriptionElement);
    this._avatarElement = document.querySelector(avatarElement);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._descriptionElement.textContent,
    };
  }

  setUserInfo(data) {
    this._nameElement.textContent = data.name;
    this._descriptionElement.textContent = data.about;
  }

  setUserAvatar(data) {
    this._avatarElement.src = data.avatar;
  }
}
