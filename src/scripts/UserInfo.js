export default class UserInfo {
  constructor(nameElement, descriptionElement) {
    this._nameElement = document.querySelector(nameElement);
    this._descriptionElement = document.querySelector(descriptionElement);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._descriptionElement.textContent,
    };
  }

  setUserInfo(data) {
    this._nameElement.textContent = data.name;
    this._descriptionElement.textContent = data.job;
  }
}
