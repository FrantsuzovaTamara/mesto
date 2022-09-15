let editButton = document.querySelector('.profile__edit-button');
let saveButton = document.querySelector('.pop-up__save-button');
let closeButton = document.querySelector('.pop-up__close-button');

let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');

let nameInput = document.querySelector('.pop-up__input_change_name');
let aboutInput = document.querySelector('.pop-up__input_change_about');

let popUp = document.querySelector('.pop-up');

function showPopUp() {
    popUp.classList.add('pop-up_opened');
}

function changeProfileInfo() {
    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;
    popUp.classList.remove('pop-up_opened');
}

function closePopUp() {
    popUp.classList.remove('pop-up_opened');
    nameInput.value = profileName.textContent;
    aboutInput.value = profileAbout.textContent;
}

editButton.addEventListener('click', showPopUp);
saveButton.addEventListener('click', changeProfileInfo);
closeButton.addEventListener('click', closePopUp);