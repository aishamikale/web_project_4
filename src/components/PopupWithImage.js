import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
      super(popupSelector);
      this._popupImage = this._popupElement.querySelector(".modal__image");
      this._popupCaption = this._popupElement.querySelector(".modal__image-title")
    }

    //add image to popup w image src attribute along w the caption
    open(url, caption) {
        this._popupImage.src = url;
        this._popupCaption.textContent = caption;
        super.open();
    }
  }