import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }
    open(link, name) {
        this._popupElement.querySelector(".modal__image").src = link;
        this._popupElement.querySelector(".modal__image-title").textContent = name;
        this.open();
    }
    setEventListeners() {
        super.setEventListeners();
    }
}