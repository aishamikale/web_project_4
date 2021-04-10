import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
      super(popupSelector);
    }
    open(link, caption) {
        //add image to popup w image src attribute along w the caption
        this._popupElement.querySelector(".modal__image").src = link;
        this._popupElement.querySelector(".modal__image-title").textContent = caption;
        super.open();
    }
  }