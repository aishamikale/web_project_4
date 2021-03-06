import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupElement, handleFormSubmit, form) {
        super(popupElement);
        this._handleFormSubmit = handleFormSubmit;
        this._form = form;
    }
    _getInputValues() {
      this._inputList = this._popupElement.querySelectorAll(".form__input");
      this._formValues = {};

      this._inputList.forEach(input => {
        this._formValues[input.name] = input.value;
      });
      return this._formValues;
    }
    setEventListeners() {
      super.setEventListeners();
        this._popupElement.addEventListener("submit", (evt) => {
          evt.preventDefault();
          this._handleFormSubmit(this._getInputValues());
        });
    }

    close() {
      super.close();
      this._form.reset();
    }
}