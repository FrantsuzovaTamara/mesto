// Main constants

const profileInfo = document.querySelector(".profile");

const editButton = profileInfo.querySelector(".profile__edit-button");
const addButton = profileInfo.querySelector(".profile__add-button");
const profileName = profileInfo.querySelector(".profile__name");
const profileAbout = profileInfo.querySelector(".profile__about");

const cards = document.querySelector(".cards");


// Pop Up constants

const editForm = document.querySelector(".edit-form");

const profileNameInput = editForm.querySelector(".pop-up__input_change_name");
const aboutInput = editForm.querySelector(".pop-up__input_change_about");
const closeButtonEditForm = editForm.querySelector(".pop-up__close-button");

const addForm = document.querySelector(".add-form");

const pictureNameInput = addForm.querySelector(".pop-up__input_add_name");
const linkInput = addForm.querySelector(".pop-up__input_add_link");
const closeButtonAddForm = addForm.querySelector(".pop-up__close-button");

const openCardForm = document.querySelector(".open-card");

const closeButtonOpenCard = openCardForm.querySelector(".pop-up__close-button");
const fullImage = openCardForm.querySelector(".pop-up__image");
const textUnderImage = openCardForm.querySelector(".pop-up__place-name");

//Add cards

const cardsSection = document.querySelector(".cards");
const cardTemplate = document.querySelector("#card-template").content;

function addCard(item) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  createCard(card, item);
  cardsSection.prepend(card);
}

function createCard(card, item) {
  card.querySelector(".card__image").src = item.link;
  card.querySelector(".card__image").alt = item.name;
  card.querySelector(".card__place-name").textContent = item.name;

  card.querySelector(".card__like-button").addEventListener('click', () => likePicture(card.querySelector(".card__like-button")));
  card.querySelector(".card__delete-button").addEventListener('click', () => deleteCard(card));
  card.querySelector(".card__image").addEventListener('click', () => openCard(card));
}

initialCards.forEach(addCard);

// Like picture

function likePicture(button) {
  button.classList.add("card__like-button_active");
}

// Delete card

function deleteCard(card) {
  card.remove();
}

// Open full version of image

function openCard(card) {
  fullImage.src = card.querySelector(".card__image").src;
  fullImage.alt = card.querySelector(".card__place-name").textContent;
  textUnderImage.textContent = card.querySelector(".card__place-name").textContent;
  showPopUp(openCardForm);
}

//Open form

function showPopUp(form) {
  form.classList.add("pop-up_opened");
}

function openEditForm() {
  showPopUp(editForm);
  profileNameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
}

editButton.addEventListener("click", openEditForm);
addButton.addEventListener("click", () => showPopUp(addForm));

//Close form

function closePopUp(form) {
  form.classList.remove("pop-up_opened");
}

closeButtonEditForm.addEventListener("click", () => closePopUp(editForm));
closeButtonAddForm.addEventListener("click", () => closePopUp(addForm));
closeButtonOpenCard.addEventListener("click", () => closePopUp(openCardForm));

//Submit form

function editProfile(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileAbout.textContent = aboutInput.value;
  closePopUp(editForm);
}

function addPicture(evt) {
  evt.preventDefault();
  addCard({name: pictureNameInput.value, link: linkInput.value});
  closePopUp(addForm);
  evt.target.reset();
}

editForm.addEventListener("submit", editProfile);
addForm.addEventListener("submit", addPicture);
