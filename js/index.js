const buttonClick = document.querySelector(".btn-submit");
const imageDog = document.querySelector("#img-dog");
const guessGender = document.querySelector(".gender");
const guessAge = document.querySelector(".age");
const guessNation = document.querySelector(".nation");

function checkUserName () {
    var userName = document.querySelector(".input-name");

    if (userName.value != "") {
        postApiData(userName);
    } else {
        guessAge.textContent = "Empty Input Field!";
        guessGender.textContent = "Empty Input Field!";
        guessNation.textContent = "Empty Input Field!";
    };
};

function postApiData(userName) {
    fetch("https://api.genderize.io?name=" + userName.value)
        .then((res) => res.json())
        .then((data) => {
            if (!data.gender) {
                guessGender.textContent = "What did you enter?";
            } else {
                guessGender.textContent = data.gender;
            };
        });
        
    fetch("https://api.agify.io?name=" + userName.value)
        .then((res) => res.json())
        .then((data) => {
            if (!data.age) {
                guessAge.textContent = "What did you enter?";
            } else {
                guessAge.textContent = data.age;
            };
        });

    fetch("https://api.nationalize.io?name=" + userName.value)
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

    userName.value = "";
};

buttonClick.addEventListener("click", checkUserName);

fetch("https://dog.ceo/api/breeds/image/random")
    .then((res) => res.json())
    .then((data) => imageDog.src = data.message);
