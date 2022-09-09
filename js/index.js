const buttonClick = document.querySelector(".btn-submit");
const imageDog = document.querySelector("#img-dog");
const guessGender = document.querySelector(".gender");
const guessAge = document.querySelector(".age");
const guessNation = document.querySelector(".nation");

function getUserName() {
    var userName = document.querySelector(".input-name").value;
    
    fetch("https://api.genderize.io?name=" + userName)
        .then((res) => res.json())
        .then((data) => guessGender.textContent = data.gender);
        
    fetch("https://api.agify.io?name=" + userName)
        .then((res) => res.json())
        .then((data) => guessAge.textContent = data.age);

    fetch("https://api.nationalize.io?name=" + userName)
        .then((res) => res.json())
        .then((data) => guessNation.textContent = data.country[0].country_id
        + " " + data.country[1].country_id);

    userName = "";
};

buttonClick.addEventListener("click", getUserName);

fetch("https://dog.ceo/api/breeds/image/random")
    .then((res) => res.json())
    .then((data) => imageDog.src = data.message);
