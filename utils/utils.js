const imageModal = document.querySelector(".modal_type_image");

/*function escModal(evt) {
    if (evt.key === "Escape") {
      const openedPopup = document.querySelector(".modal_open");
      toggleModalWindow(openedPopup);
    }
  }
  */
  
/*function toggleModalWindow(modal) {
    modal.classList.toggle("modal_open");
    if (modal.classList.contains("modal_open")) {
      document.addEventListener("keydown", escModal);
    } else {
      document.removeEventListener("keydown", escModal);
    }
  }*/

  const settings = {
    formSelector: ".form",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__button",
    inactiveButtonClass: "form__button_disabled",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__error_visible"
  }
  

export { imageModal, settings};