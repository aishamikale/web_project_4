const imageModal = document.querySelector(".modal_type_image");

function escModal(evt) {
    if (evt.key === "Escape") {
      const openedPopup = document.querySelector(".modal_open");
      toggleModalWindow(openedPopup);
    }
  }
  
function toggleModalWindow(modal) {
    modal.classList.toggle("modal_open");
    if (modal.classList.contains("modal_open")) {
      document.addEventListener("keydown", escModal);
    } else {
      document.removeEventListener("keydown", escModal);
    }
  }

export { imageModal, escModal, toggleModalWindow };