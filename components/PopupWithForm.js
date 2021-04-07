import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit }, form) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popupElement.querySelector(".form");
    }
    _getInputValues() {
        //collects data from all input fields
        this._inputList = this._popupElement.querySelectorAll(".form__input");

        this._formValues = {};

        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });

        return this._formValues;
    }
    setEventListeners() {
        //add click to close icon & submit to submit button
        super.setEventListeners();
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    }
    close() {
        super.close();
        this._form.reset();
    }

}

/*Create PopupWithForm as a child class of Popup. The PopupWithForm class must comply with the following requirements:
It takes a callback of the form submission into the constructor, as well as the popup selector.
It stores a private method named _getInputValues(), which collects data from all the input fields.
It modifies the setEventListeners() parent method. The setEventListeners() method of the PopupWithForm class has to add the click event listener to the close icon and the submit event handler to the submit button.
It modifies the close() parent method in order to reset the form once the popup is closed.
Create an instance of the PopupWithForm class for each popup.*/