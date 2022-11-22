import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupId) {
    super(popupId);
    this._fullImage = this._popup.querySelector(".pop-up__image");
    this._textUnderPhoto = this._popup.querySelector(".pop-up__place-name");
  }
  
  open(name, link) {
    super.open();
    this._fullImage.src =link;
    this._fullImage.alt = name;
    this._textUnderPhoto.textContent = name;
  }
}