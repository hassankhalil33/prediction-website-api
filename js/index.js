const buttonClick = document.querySelector(".btn-submit");
const imageDog = document.querySelector("#img-dog");
const guessGender = document.querySelector(".gender");
const guessAge = document.querySelector(".age");
const guessNation = document.querySelector(".nation");

function getUserName() {
    var userName = document.querySelector(".input-name").value;
    
    fetch("https://api.genderize.io?name=" + userName)
        .then((res) => res.json())
        .then((data) => {
            if (!data.gender) {
                guessGender.textContent = "What did you enter?";
            } else {
                guessGender.textContent = data.gender;
            };
        });
        
    fetch("https://api.agify.io?name=" + userName)
        .then((res) => res.json())
        .then((data) => {
            if (!data.age) {
                guessAge.textContent = "What did you enter?";
            } else {
                guessAge.textContent = data.age;
            };
        });

    fetch("https://api.nationalize.io?name=" + userName)
        .then((res) => res.json())
        .then((data) => {
            if (data.country.length == 0) {
                guessNation.textContent = "What did you enter?";
            } else if (data.country.length == 1) {
                guessNation.textContent = data.country[0].country_id;
            } else {
                guessNation.textContent = data.country[0].country_id
                + " " + data.country[1].country_id;
            }
        });

    userName = "";
};

buttonClick.addEventListener("click", getUserName);

fetch("https://dog.ceo/api/breeds/image/random")
    .then((res) => res.json())
    .then((data) => imageDog.src = data.message);
