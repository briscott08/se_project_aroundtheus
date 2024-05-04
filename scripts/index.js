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

// ========= //
// Elements  //
// ========= //

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profilePreviewModal = document.querySelector(".modal_type_preview");
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
const profileEditForm = profileEditModal.querySelector(".modal__form");
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

function openPopup(modal) {
  modal.classList.add("modal_opened");
  const eventHandler = function (event) {
    closeOnEscapeAndClick(event, modal);
  };
  document.addEventListener("keydown", eventHandler);
  document.addEventListener("click", eventHandler);
}

function closePopup(modal) {
  modal.classList.remove("modal_opened");
  const eventHandler = function (event) {
    closeOnEscapeAndClick(event, modal);
  };
  document.removeEventListener("keydown", eventHandler);
  document.removeEventListener("click", eventHandler);
}

function closeOnEscapeAndClick(event, modal) {
  if (event.key === "Escape" || event.target === modal) {
    closePopup(modal);
  }
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__name");
  const cardImageEl = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const profileTrashButton = cardElement.querySelector(".card__delete");

  cardImageEl.addEventListener("click", () => onImagePreview(cardData));

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  profileTrashButton.addEventListener("click", () => {
    cardElement.remove(cardData);
  });

  cardTitleEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;

  return cardElement;
}

// =============== //
// Event Handlers  //
// =============== //

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);

  closePopup(profileAddModal);
  addCardFormElement.reset();
}

const onImagePreview = (cardData) => {
  const imageModal = profilePreviewModal.querySelector(".modal__image");
  imageModal.src = cardData.link;
  imageModal.alt = `Photo of ${cardData.name}`;
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

profileEditButtonClose.addEventListener("click", () =>
  closePopup(profileEditModal)
);

profileFormElement.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

addNewCardButton.addEventListener("click", () => openPopup(profileAddModal));

profileAddButtonClose.addEventListener("click", () =>
  closePopup(profileAddModal)
);

profilePreviewModalClose.addEventListener("click", () => {
  closePopup(profilePreviewModal);
});

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
