export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._cardElement.querySelector(".card__name").textContent = this._name;
    this._cardElement.querySelector(".card__image").src = this._link;
    this._cardElement.querySelector(
      ".card__image"
    ).alt = `Photo of ${this._cardElement.name}`;
    this._setEventListeners();
    return this._cardElement;
  }

  _setEventListeners() {
    //.card__name
    this._cardElement.querySelector(".card__name").textContent = this._name;
    //.card__image
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });
    //.card__like-button"
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });

    //card__delete
    this._cardElement
      .querySelector(".card__delete")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });
  }

  _handleDeleteCard() {
    this._cardElement.remove();
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }
}
