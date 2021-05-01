import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popupElement.querySelector(".form");
        this._saveButton = this._popupElement.querySelector(".form__button");
        this._inputList = this._popupElement.querySelectorAll(".form__input");
    }

    //collects data from all input fields
    _getInputValues() {
        this._formValues = {};

        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });

        return this._formValues;
    }

    //submit button shows saving... while processing
    processingData() {
        this._saveButton.textContent = "Saving..."
    }

    stopProcessingData() {
        this._saveButton.textContent = "Save";
    }

    //add click to close icon & submit to submit button
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", (evt) => {
            this.processingData();
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    }

    //submit form
    setSubmitFormAction(action) {
        this._handleFormSubmit = action;
    }

    close() {
        super.close();
        this.stopProcessingData();
        this._form.reset();
    }

}