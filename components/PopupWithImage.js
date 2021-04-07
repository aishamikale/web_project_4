import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector) {
      super(popupSelector);
    }
    open(link, caption) {
        //add image to popup w image src att along w caption
        this._popupElement.querySelector(".modal__image").src = link;
        this._popupElement.querySelector(".modal__image-title").textContent = caption;
        //this.open();
        super.open();
    }
  }