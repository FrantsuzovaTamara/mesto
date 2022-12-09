import "./index.css";

import { 
  editButton, 
  addButton,
  editForm,
  addForm, 
  editAvatarForm, 
  cardSelectors, 
  formSelectors, 
  editAvatarButton
} from '../script/utils/constants.js';

import { Card } from "../script/components/Сard.js";
import { Section } from "../script/components/Section.js";
import { PopupWithForm } from "../script/components/PopUpWithForm.js";
import { PopupWithImage } from "../script/components/PopupWithImage.js";
import { UserInfo } from "../script/components/UserInfo.js";
import { FormValidator } from "../script/components/FormValidator.js"
import { PopupWithConfirmation } from "../script/components/PopupWithConfirmation.js";
import { Api } from "../script/components/Api.js";

// New classes

const popupOpenCard = new PopupWithImage('#pop-up_open');
popupOpenCard.setEventListener();

const popupOpenEditInfo = new PopupWithForm('#pop-up_edit', editProfile);
popupOpenEditInfo.setEventListener();

const popupOpenEditAvatar = new PopupWithForm('#pop-up_edit-avatar', editAvatar);
popupOpenEditAvatar.setEventListener();

const popupAddCard = new PopupWithForm('#pop-up_add', addCard, userId);
popupAddCard.setEventListener();

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-55',
  headers: {
    authorization: '6d9d37cb-0306-4796-a10d-bd93dd2934a0',
    'Content-Type': 'application/json'
  }
});

const popupWithConfirmation = new PopupWithConfirmation('#pop-up_agreement');
popupWithConfirmation.setEventListener();

const userInfo = new UserInfo({ name: '.profile__name', about: '.profile__about', avatar: '.profile__avatar' });

// Get info from Api

let userId = '';
api.getUserInfo(setUserInfoFromApi);
api.getCard(renderApiArray);

// Functions

function openPopupWithConfirmation(deleteCardOnPage, card, cardId) {
  popupWithConfirmation.open(deleteCardOnPage, card, cardId, deleteCardInApi);
}

function handleOpenPopup(name, link) {
  popupOpenCard.open(name, link);
}

function setUserInfoFromApi(data) {
  userId = userInfo.setUserInfo(data);
}

// Api's function

function renderApiArray(initialCards) {
  const cardsList = new Section({ data: initialCards, renderer: item => {
    cardsList.setItem(createCard(item));
  } }, '.cards');
  
  cardsList.renderItems();
}

function deleteCardInApi(data) {
  api.deleteCardInApi(data)
}

function likeCard(cardId, numberOfLikes) {
  api.likeCard(cardId, numberOfLikes)
}

function removeLike(cardId, numberOfLikes) {
  api.removeLike(cardId, numberOfLikes);
}

// Create card

function createCard(item) {
  const card = new Card(item, cardSelectors, handleOpenPopup, openPopupWithConfirmation, userId, likeCard, removeLike);
  const cardElement = card.generateCard();
  return cardElement;
}

// Validation

const editFormValidation = new FormValidator(editForm, formSelectors);
const editAvatarFormValidation = new FormValidator(editAvatarForm, formSelectors);
const addFormValidation = new FormValidator(addForm, formSelectors);
editFormValidation.enableValidation();
editAvatarFormValidation.enableValidation();
addFormValidation.enableValidation();

// Open pop-up

editButton.addEventListener("click", () => {
  popupOpenEditInfo.setInputValues(userInfo.getUserInfo());
  popupOpenEditInfo.open();
  editFormValidation.hideErrorMesseges();
});

editAvatarButton.addEventListener("click", () => {
  popupOpenEditAvatar.setInputValues(userInfo.getUserInfo());
  popupOpenEditAvatar.open();
  editAvatarFormValidation.hideErrorMesseges();
})

addButton.addEventListener("click", () => {
  popupAddCard.open();
  addFormValidation.hideErrorMesseges();
});

// Function for submit form

function editProfile(inputList) {
  api.editProfileInfo(inputList, renderLoading, popupOpenEditInfo);
  userInfo.setUserInfo(inputList);
}

function editAvatar(inputList) {
  api.editAvatar(inputList, renderLoading, popupOpenEditAvatar);
  userInfo.setUserInfo(inputList);
}

function addCard(inputList) {
  api.addCardInApi(renderApiArray, inputList, renderLoading, popupAddCard);
}

// Function for loading

function renderLoading(isLoading, popup) {
  if (isLoading) {
    popup.startLoading();
  } else {
    popup.endLoading();
    popup.close();
  }
}