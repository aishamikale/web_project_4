import Card from "./Card.js";

export default class Popup {
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }
    open() {
        //open the popup
        this._popupElement.classList.add("modal_open");
        document.addEventListener("keyup", this._handleEscClose);
    }
    close() {
        //close the popup
        this._popupElement.classList.remove("modal_open");
        document.removeEventListener("keyup", this._handleEscClose);
    }
    _handleEscClose(evt) {
        //close popup on esc keyxc 
        if(evt.key === "Escape") {
            this.close(); 
        }
    }
    setEventListeners() {
        this._popupElement.addEventListener("click", (evt) => {
            if(evt.target.classList.contains("modal__button") || (evt.target.closest("modal__container"))) {
                this.close();
            }
        });
    }
}

/*this._popupElement.addEventListener("click", (evt) => {
            if(evt.target.classList("modal__button")) {
                this.close();
            }
        });*/

        /*const closeButton = this._popupElement.querySelector(".modal__button");
        closeButton.addEventListener("click", () => {
            this.close();
        });*/