export class UserInfo {
  constructor({ name, about, avatar }) {
    this._name = document.querySelector(name);
    this._about = document.querySelector(about);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    return { name: this._name.textContent, about: this._about.textContent, avatar: this._avatar.src };
  }

  setUserInfo({ name, about, avatar, userId }) {
    if (name && about) {
      this._name.textContent = name;
      this._about.textContent = about;
    }
    if (avatar) {
      this._avatar.src = avatar;
    }
    this._userId = userId;
    return this._userId
  }

  getUserId() {
    return this._userId;
  }
}