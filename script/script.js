const initialCards = [
  {
    name: "Выборг",
    link: "images/card__viborg.jpg",
  },
  {
    name: "Эльбрус",
    link: "images/card__elbrus.jpg",
  },
  {
    name: "Кижи",
    link: "images/card__kizhi.jpg",
  },
  {
    name: "Владивосток",
    link: "images/card__vladivostok.jpg",
  },
  {
    name: "Пятигорск",
    link: "images/card__pyatigorsk.jpg",
  },
  {
    name: "Териберка",
    link: "images/card__terriberka.jpg",
  },
];

// Main constants

const profileInfo = document.querySelector(".profile");

const editButton = profileInfo.querySelector(".profile__edit-button");
const addButton = profileInfo.querySelector(".profile__add-button");
const profileName = profileInfo.querySelector(".profile__name");
const profileAbout = profileInfo.querySelector(".profile__about");

const cards = document.querySelector(".cards");
let cardsArray = [];
let deleteButton = [];
let likeButton = [];
let imageCard = [];
let cardName = [];


// Pop Up constants

const allPopUp = document.querySelectorAll(".pop-up");

const profileNameInput = allPopUp[0].querySelector(".pop-up__input_change_name");
const aboutInput = allPopUp[0].querySelector(".pop-up__input_change_about");
const closeButtonEditForm = allPopUp[0].querySelector(".pop-up__close-button");

const pictureNameInput = allPopUp[1].querySelector(".pop-up__input_add_name");
const linkInput = allPopUp[1].querySelector(".pop-up__input_add_link");
const closeButtonAddForm = allPopUp[1].querySelector(".pop-up__close-button");

const closeButtonOpenCard = allPopUp[2].querySelector(".pop-up__close-button");
let openImage = [];
let textUnderImage = [];

//Add 6 cards

const cardsSection = document.querySelector(".cards");
const cardTemplate = document.querySelector("#card-template").content;

function addCard(item) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  card.querySelector(".card__image").src = item.link;
  card.querySelector(".card__place-name").textContent = item.name;
  cardsSection.prepend(card);
}

initialCards.forEach(addCard);

// Like picture

likePicture();

function likePicture() {
  likeButton = cards.querySelectorAll(".card__like-button");
  likeButton.forEach(function(item) {
    item.addEventListener('click', function() {
      item.classList.add("card__like-button_active");
    });
  });
}

// Delete card

deleteCard();

function deleteCard() {
  cardsArray = cards.querySelectorAll(".card");
  deleteButton = cards.querySelectorAll(".card__delete-button");
  deleteButton.forEach(function(item, index) {
    item.addEventListener('click', function() {
      cardsArray[index].remove();
    });
  });
}

// Open full version of image

function openCard() {
  imageCard = cards.querySelectorAll(".card__image");
  cardName = cards.querySelectorAll(".card__place-name");

  openImage = document.querySelector(".pop-up__image");
  textUnderImage = document.querySelector(".pop-up__place-name");

  imageCard.forEach(function(item, i) {
    item.addEventListener('click', function() {
      showPopUp(2);
      openImage.src = imageCard[i].src;
      textUnderImage.textContent = cardName[i].textContent;
    })
  });
}

openCard();

//Open form

function showPopUp(i) {
  allPopUp[i].classList.add("pop-up_opened");
  if (i = 0) {
    profileNameInput.value = profileName.textContent;
    aboutInput.value = profileAbout.textContent;
  }
}

editButton.addEventListener("click", function () {showPopUp(0)});
addButton.addEventListener("click", function () {showPopUp(1)});

//Close form

function closePopUp(i) {
  allPopUp[i].classList.remove("pop-up_opened");
  if (i = 1) {
    pictureNameInput.value = "";
    linkInput.value = "";
  }
}

closeButtonEditForm.addEventListener("click", function () {closePopUp(0)});
closeButtonAddForm.addEventListener("click", function () {closePopUp(1)});
closeButtonOpenCard.addEventListener("click", function () {closePopUp(2)});

//Submit form

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileAbout.textContent = aboutInput.value;
  closePopUp(0);
}

function addPicture(evt) {
  evt.preventDefault();
  if (pictureNameInput.value != "" && linkInput.value != "") {
    initialCards.push({name: pictureNameInput.value, link: linkInput.value});
    addCard(initialCards[initialCards.length - 1]);
    openCard();
    likePicture();
    deleteCard();
  }
  closePopUp(1);
}

allPopUp[0].addEventListener("submit", formSubmitHandler);
allPopUp[1].addEventListener("submit", addPicture);
