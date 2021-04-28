import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popupElement.querySelector(".form");
    }
    _getInputValues() {
        //collects data from all input fields
        this._inputList = this._popupElement.querySelectorAll(".form__input");
        //<input id="profile-name" type="text" class="form__input form__input_type_name" name="name"
        this._formValues = {};

        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });

        return this._formValues;
    }

    //submit button shows saving... while processing
    processingData() {
        const saveButton = document.querySelector(".form__button");
        saveButton.textContent = "Saving..."
    }

    stopProcessingData() {
        const saveButton = document.querySelector(".form__button");
        saveButton.textContent = "Save";
    }

    setEventListeners() {
        //add click to close icon & submit to submit button
        super.setEventListeners();
        this._form.addEventListener("submit", (evt) => {
            this.processingData();
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    }

        //submit form
    submitFormAction(action) {
        this._handleFormSubmit = action;
    }

    close() {
        super.close();
        this.stopProcessingData();
        this._form.reset();
    }

}