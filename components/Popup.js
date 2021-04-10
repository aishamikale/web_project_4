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
        //close popup on esc key
        if(evt.key === "Escape") {
            this.close(); 
        }
    }
    setEventListeners() {
        //close popup when clicking close button or overlay
        this._popupElement.addEventListener("click", (evt) => {
            if(evt.target.classList.contains("modal__button") || (evt.target.classList.contains("modal"))) {
                this.close();
            }
        });
    }
}