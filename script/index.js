// Main constants

const profileInfo = document.querySelector(".profile");

const editButton = profileInfo.querySelector(".profile__edit-button");
const addButton = profileInfo.querySelector(".profile__add-button");
const profileName = profileInfo.querySelector(".profile__name");
const profileAbout = profileInfo.querySelector(".profile__about");

const cards = document.querySelector(".cards");


// Pop Up constants

const editPopUp = document.querySelector("#pop-up_edit");

const editForm = editPopUp.querySelector(".pop-up__form");
const profileNameInput = editPopUp.querySelector(".pop-up__input_change_name");
const aboutInput = editPopUp.querySelector(".pop-up__input_change_about");
const closeButtonEditPopUp = editPopUp.querySelector(".pop-up__close-button");

const addPopUp = document.querySelector("#pop-up_add");

const addForm = addPopUp.querySelector(".pop-up__form");
const pictureNameInput = addPopUp.querySelector(".pop-up__input_add_name");
const linkInput = addPopUp.querySelector(".pop-up__input_add_link");
const closeButtonAddPopUp = addPopUp.querySelector(".pop-up__close-button");

const openCardPopUp = document.querySelector("#pop-up_open");

const closeButtonOpenCard = openCardPopUp.querySelector(".pop-up__close-button");
const fullImage = openCardPopUp.querySelector(".pop-up__image");
const textUnderImage = openCardPopUp.querySelector(".pop-up__place-name");

//Add cards

const cardsSection = document.querySelector(".cards");
const cardTemplate = document.querySelector("#card-template").content.querySelector(".card");

function addCard(card) {
  cardsSection.prepend(card);
}

function createCard(item) {
  const newCard = cardTemplate.cloneNode(true);
  let image = newCard.querySelector(".card__image");

  image.src = item.link;
  image.alt = item.name;
  newCard.querySelector(".card__place-name").textContent = item.name;

  newCard.querySelector(".card__like-button").addEventListener('click', likePicture);
  newCard.querySelector(".card__delete-button").addEventListener('click', () => deleteCard(newCard));
  newCard.querySelector(".card__image").addEventListener('click', () => openCard(item.name, item.link));

  addCard(newCard);
}

initialCards.forEach(createCard);

// Like picture

function likePicture(evt) {
  evt.target.classList.toggle("card__like-button_active");
}

// Delete card

function deleteCard(card) {
  card.remove();
}

// Open full version of image

function openCard(name, link) {
  fullImage.src = link;
  fullImage.alt = name;
  textUnderImage.textContent = name;
  showPopUp(openCardPopUp);
}

//Open pop-up

function showPopUp(popup) {
  popup.classList.add("pop-up_opened");
}

function openEditPopUp() {
  showPopUp(editPopUp);
  profileNameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
}

editButton.addEventListener("click", openEditPopUp);
addButton.addEventListener("click", () => showPopUp(addPopUp));

//Close pop-up

function closePopUp(popup) {
  popup.classList.remove("pop-up_opened");
}

closeButtonEditPopUp.addEventListener("click", () => closePopUp(editPopUp));
closeButtonAddPopUp.addEventListener("click", () => closePopUp(addPopUp));
closeButtonOpenCard.addEventListener("click", () => closePopUp(openCardPopUp));

//Submit form

function editProfile(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileAbout.textContent = aboutInput.value;
  closePopUp(editPopUp);
}

function addPicture(evt) {
  evt.preventDefault();
  createCard({name: pictureNameInput.value, link: linkInput.value});
  closePopUp(addPopUp);
  evt.target.reset();
}

editForm.addEventListener("submit", editProfile);
addForm.addEventListener("submit", addPicture);
