let profileInfo = document.querySelector('.profile');

let editButton = profileInfo.querySelector('.profile__edit-button');
let profileName = profileInfo.querySelector('.profile__name');
let profileAbout = profileInfo.querySelector('.profile__about');

let popUp = document.querySelector('.pop-up');

let nameInput = popUp.querySelector('.pop-up__input_change_name');
let aboutInput = popUp.querySelector('.pop-up__input_change_about');
let closeButton = popUp.querySelector('.pop-up__close-button');

function showPopUp() {
    popUp.classList.add('pop-up_opened');
    nameInput.value = profileName.textContent;
    aboutInput.value = profileAbout.textContent;
}


function closePopUp() {
    popUp.classList.remove('pop-up_opened');
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;
    closePopUp();
}

editButton.addEventListener('click', showPopUp);
closeButton.addEventListener('click', closePopUp);
popUp.addEventListener('submit', formSubmitHandler);