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
const closeButtonEditPopUp = editPopUp.querySelector(".pop-up__close-button");

const addPopUp = document.querySelector("#pop-up_add");

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
  document.addEventListener("keydown", (evt) => closePopUpByKey(evt, popup));
  popup.addEventListener("click", (evt) => closePopUpByOverlay(evt, popup));
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
  if (popup.id != 'pop-up_open') {
    resetForm(popup);
  }
}

function closePopUpByKey(evt, popup) {
  if (evt.key === 'Escape') {
    document.removeEventListener("keydown", closePopUpByKey);
    closePopUp(popup);
  }
}

function closePopUpByOverlay(evt, popup) {
  if (evt.target === evt.currentTarget) {
    document.removeEventListener("click", closePopUpByOverlay);
    closePopUp(popup);
  }
}

closeButtonEditPopUp.addEventListener("click", () => closePopUp(editPopUp));
closeButtonAddPopUp.addEventListener("click", () => closePopUp(addPopUp));
closeButtonOpenCard.addEventListener("click", () => closePopUp(openCardPopUp));

//Submit form

function whatForm(evt) {
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
  createCard({name: pictureNameInput.value, link: linkInput.value});
  closePopUp(addPopUp);
}

//Reset form

function resetForm(popup) {
  const form = popup.querySelector('.pop-up__form');
  const inputList = Array.from(form.querySelectorAll('.pop-up__input'));
  const button = form.querySelector('.pop-up__submit-button');
  form.reset();
  toggleButtonState(inputList, button);
  inputList.forEach((inputElement) => {
    hideInputError(form, inputElement);
  })
}

//Validation

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('pop-up__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('pop-up__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('pop-up__input_type_error');
  errorElement.classList.remove('pop-up__input-error_active');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

const toggleButtonState = (inputList, buttonElement, formElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('pop-up__submit-button_inactive');
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove('pop-up__submit-button_inactive');
    buttonElement.removeAttribute('disabled');
  }
}

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.pop-up__input'));
  const buttonElement = formElement.querySelector('.pop-up__submit-button');
  toggleButtonState(inputList, buttonElement, formElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement, formElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.pop-up__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', whatForm);
    const fieldsetList = Array.from(formElement.querySelectorAll('.pop-up__set'));
    fieldsetList.forEach((fieldSet) => {
      setEventListeners(fieldSet);
    });
  });
};

enableValidation();