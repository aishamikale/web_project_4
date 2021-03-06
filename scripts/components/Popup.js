export default class Popup {
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }
    open() {
        this._popupElement.classList.add("modal_open");
        document.addEventListener("keyup", this._handleEscClose);
    }
    close() {
        this._popupElement.classList.remove("modal_open");
        document.removeEventListener("keyup", this._handleEscClose);
    }
    _handleEscClose(evt) {
        if(evt.key === "Escape") {
            this.close();
        }
    }
    setEventListeners() {
        //click listener to close icon of popup
        this._popupElement.addEventListener("click", (evt) => {
            if(evt.target.classList.contains("modal__button") || !evt.target.closest("modal")) {
                this.close();
            }
        });
    }
}