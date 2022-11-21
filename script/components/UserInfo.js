export class UserInfo {
  constructor({ name, about }) {
    this._name = document.querySelector(name);
    this._about = document.querySelector(about);
  }

  getUserInfo(inputs) {
    this._inputList = { name: inputs[0], about: inputs[1] }
    this._inputList.name.value = this._name.textContent;
    this._inputList.about.value = this._about.textContent;
  }

  setUserInfo({ name, about }) {
    this._name.textContent = name;
    this._about.textContent = about;
  }
}