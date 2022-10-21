// Main constants

const profileInfo = document.querySelector(".profile");

const editButton = profileInfo.querySelector(".profile__edit-button");
const addButton = profileInfo.querySelector(".profile__add-button");
const profileName = profileInfo.querySelector(".profile__name");
const profileAbout = profileInfo.querySelector(".profile__about");

const cards = document.querySelector(".cards");


// Pop Up constants

const editPopUp = document.querySelector("#pop-up_edit");

const profileNameInput = editPopUp.querySelector(".pop-up__input_change_name");
const aboutInput = editPopUp.querySelector(".pop-up__input_change_about");

const addPopUp = document.querySelector("#pop-up_add");

const pictureNameInput = addPopUp.querySelector(".pop-up__input_add_name");
const linkInput = addPopUp.querySelector(".pop-up__input_add_link");

const openCardPopUp = document.querySelector("#pop-up_open");

const fullImage = openCardPopUp.querySelector(".pop-up__image");
const textUnderImage = openCardPopUp.querySelector(".pop-up__place-name");

//Add cards

const cardsSection = document.querySelector(".cards");
const cardTemplate = document.querySelector("#card-template").content.querySelector(".card");

function addCard(item) {
  const card = createCard(item);
  fillCard(item, card);
  cardsSection.prepend(card);
}

function createCard(item) {
  const newCard = cardTemplate.cloneNode(true)
  newCard.querySelector(".card__like-button").addEventListener('click', likePicture);
  newCard.querySelector(".card__delete-button").addEventListener('click', () => deleteCard(newCard));
  newCard.querySelector(".card__image").addEventListener('click', () => openCard(item.name, item.link));
  return newCard;
}

function fillCard(item, card) {
  const image = card.querySelector(".card__image");
  image.src = item.link;
  image.alt = item.name;
  card.querySelector(".card__place-name").textContent = item.name;
}

initialCards.forEach(addCard);

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
  openPopUp(editPopUp);
  profileNameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
}

function openPopUp(popup) {
  showPopUp(popup);
  document.addEventListener('keydown', closeByEscape);
  resetForm(popup);
}

editButton.addEventListener("click", openEditPopUp);
addButton.addEventListener("click", () => openPopUp(addPopUp));

//Close pop-up

function closePopUp(popup) {
  popup.classList.remove("pop-up_opened");
  popup.removeEventListener("keydown", closeByEscape);
}

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopUp = document.querySelector('.pop-up_opened');
    closePopUp(openedPopUp);
  }
}

const popups = document.querySelectorAll('.pop-up')

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('pop-up_opened') || evt.target.classList.contains('pop-up__close-button')) {
      closePopUp(popup);
    }
  })
})

//Submit form

function determineForm(evt) {
  evt.preventDefault();
  if (evt.target.name === 'changeProfileInfo') {
    editProfile();
  } else {
    addPicture();
  }
}

function editProfile() {
  profileName.textContent = profileNameInput.value;
  profileAbout.textContent = aboutInput.value;
  closePopUp(editPopUp);
}

function addPicture() {
  addCard({name: pictureNameInput.value, link: linkInput.value});
  closePopUp(addPopUp);
}

const formList = document.querySelectorAll('.pop-up__form');

formList.forEach((form) => {
  form.addEventListener('submit', determineForm);
})

//Reset form

function resetForm(popup) {
  const form = popup.querySelector('.pop-up__form');
  const inputList = Array.from(form.querySelectorAll('.pop-up__input'));
  form.reset();
  inputList.forEach((inputElement) => {
    hideInputError(form, inputElement, {inputErrorClass: 'pop-up__input_type_error', errorClass: 'pop-up__input-error_active'});
  })
}
