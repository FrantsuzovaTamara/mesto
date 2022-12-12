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

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-55',
  headers: {
    authorization: '6d9d37cb-0306-4796-a10d-bd93dd2934a0',
    'Content-Type': 'application/json'
  }
});

const cardsList = new Section(item => {
  cardsList.setItem(createCard(item));
}, '.cards');

const userInfo = new UserInfo({ name: '.profile__name', about: '.profile__about', avatar: '.profile__avatar' });

// Get info from Api

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo({ name: userData.name, about: userData.about, avatar: userData.avatar, userId: userData._id });

    const initialCards = [];
    cards.forEach(item => initialCards.push({ name: item.name, link: item.link, id: item._id, numberOfLikes: item.likes, ownerId: item.owner._id }));
    cardsList.renderItems(initialCards);
  })
  .catch(err => {
    console.log(err);
  });

// New popup classes

const popupOpenCard = new PopupWithImage('#pop-up_open');
popupOpenCard.setEventListener();
  
const popupOpenEditInfo = new PopupWithForm('#pop-up_edit', editProfile);
popupOpenEditInfo.setEventListener();
  
const popupOpenEditAvatar = new PopupWithForm('#pop-up_edit-avatar', editAvatar);
popupOpenEditAvatar.setEventListener();
  
const popupAddCard = new PopupWithForm('#pop-up_add', addCard, userInfo.getUserId);
popupAddCard.setEventListener();
  
const popupWithConfirmation = new PopupWithConfirmation('#pop-up_agreement',  deleteCardInApi);
popupWithConfirmation.setEventListener();

// Open popups

function openPopupWithConfirmation(deleteCardOnPage, card, cardId) {
  popupWithConfirmation.open(deleteCardOnPage, card, cardId, deleteCardInApi);
}

function handleOpenPopup(name, link) {
  popupOpenCard.open(name, link);
}

// Api's functions

function renderApiArray(initialCards) {
  cardsList.renderItems(initialCards);
}

function deleteCardInApi(cardId, card, deleteCardOnPage) {
  api.deleteCardInApi(cardId)
    .then(() => {
      deleteCardOnPage(card)
      popupWithConfirmation.close();
    })
    .catch((err) => {
      console.log(err);
    })
}

function likeCard(cardId, numberOfLikes, likeButton, like) {
  api.likeCard(cardId)
    .then((data) => {
      numberOfLikes.textContent = data.likes.length;
      like(likeButton);
    })
    .catch((err) => {
      console.log(err);
    });
    
}

function removeLike(cardId, numberOfLikes, likeButton, like) {
  api.removeLike(cardId)
    .then((data) => {
      numberOfLikes.textContent = data.likes.length;
      like(likeButton);
    })
    .catch((err) => {
      console.log(err);
    });
}

// Create card

function createCard(item) {
  const card = new Card(item, cardSelectors, handleOpenPopup, openPopupWithConfirmation, userInfo.getUserId(), likeCard, removeLike);
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

function editProfile(inputList, submitButton, initialText) {
  api.editProfileInfo(inputList)
    .then(() => {
      userInfo.setUserInfo(inputList);
      popupOpenEditInfo.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      submitButton.textContent = initialText;
    });
}

function editAvatar(inputList, submitButton, initialText) {
  api.editAvatar(inputList)
    .then(() => {
      userInfo.setUserInfo(inputList);
      popupOpenEditAvatar.close()
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      submitButton.textContent = initialText;
    });
}

function addCard(inputList, submitButton, initialText) {
  api.addCardInApi(inputList)
    .then((data) => {
      const initialCards = [{ name: data.name, link: data.link, id: data._id, numberOfLikes: data.likes, ownerId: data.owner._id }];
      renderApiArray(initialCards);
      popupAddCard.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      submitButton.textContent = initialText;
    });
}