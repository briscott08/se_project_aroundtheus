import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },

  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },

  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },

  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },

  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },

  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const cardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

function createCard({ name, link }) {
  const cardInstance = new Card(
    {
      name,
      link,
    },
    "#card-template",
    onImagePreview
  ).getView();
  return cardInstance;
}
function renderCard(cardData, wrapper) {
  const cardElement = createCard(cardData);
  wrapper.prepend(cardElement);
}

// ========= //
// Elements  //
// ========= //
const imageModalCaption = document.querySelector(".modal__caption");
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profilePreviewModal = document.querySelector(".modal_type_preview");
const imageModal = profilePreviewModal.querySelector(".modal__image");
const profileAddModal = document.querySelector("#add-modal");
const profileEditButtonClose = profileEditModal.querySelector(
  "#profile-edit-close-btn"
);
const profilePreviewModalClose = document.querySelector(
  "#profile-preview-close-btn"
);
const profileFormElement = profileEditModal.querySelector(".modal__form");
const addCardFormElement = profileAddModal.querySelector(".modal__form");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardListEl = document.querySelector(".cards__list");
const addNewCardButton = document.querySelector(".profile__button-add");
const profileAddButtonClose = profileAddModal.querySelector(
  "#profile-add-close-btn"
);

const cardTitleInput = addCardFormElement.querySelector(
  ".modal__input_type_title"
);
const cardUrlInput = addCardFormElement.querySelector(".modal__input_type_url");

// =============== //
// =============== //
//    Functions    //
// =============== //

//Close modal function//
//Close modal function//
//Close modal function//

function openPopup(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalOnEscape);
  modal.addEventListener("mousedown", closeModalOnMouseDown);
}

function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalOnEscape);
  modal.removeEventListener("mousedown", closeModalOnMouseDown);
}

function closeModalOnEscape(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".modal_opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

function closeModalOnMouseDown(evt) {
  if (
    evt.target === evt.currentTarget ||
    evt.target.classList.contains("modal__close")
  ) {
    closePopup(evt.currentTarget);
  }
}

// =============== //
// Event Handlers  //
// =============== //

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
  editFormValidator.disableButton(handleProfileEditSubmit);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  closePopup(profileAddModal);
  addCardFormElement.reset();
  addFormValidator.disableButton(handleAddCardFormSubmit);
}

const onImagePreview = (cardData) => {
  imageModal.src = cardData.link;
  imageModal.alt = `Photo of ${cardData.name}`;
  imageModalCaption.textContent = cardData.name;
  openPopup(profilePreviewModal);
};

// ================ //
// Event Listeners  //
// ================ //

profileEditButton.addEventListener("click", () => {
  openPopup(profileEditModal);
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
});

profileFormElement.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

addNewCardButton.addEventListener("click", () => openPopup(profileAddModal));

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
};

const editFormValidator = new FormValidator(settings, profileFormElement);
const addFormValidator = new FormValidator(settings, addCardFormElement);
editFormValidator.enableValidation();
addFormValidator.enableValidation();
