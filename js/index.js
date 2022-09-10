// Init Variables

const buttonClick = document.querySelector(".btn-submit");
const imageDog = document.querySelector("#img-dog");
const guessGender = document.querySelector(".gender");
const guessAge = document.querySelector(".age");
const guessNation = document.querySelector(".nation");

// Functions

function checkUserName () { //Check if input box is empty
    var userName = document.querySelector(".input-name");

    if (userName.value != "") {
        postApiData(userName);
    } else {
        guessAge.textContent = "Empty Input Field!";
        guessGender.textContent = "Empty Input Field!";
        guessNation.textContent = "Empty Input Field!";
    };
};

function postApiData(userName) { //Fetch data from APIs
    fetch("https://api.genderize.io?name=" + userName.value) //Fetch gender
        .then((res) => res.json())
        .then((data) => {
            if (!data.gender) { //Check if weird input ie: not a name
                guessGender.textContent = "What did you enter?";
            } else {
                guessGender.textContent = data.gender;
            };
        });
        
    fetch("https://api.agify.io?name=" + userName.value) //Fetch age
        .then((res) => res.json())
        .then((data) => {
            if (!data.age) { //Check if weird input ie: not a name
                guessAge.textContent = "What did you enter?";
            } else {
                guessAge.textContent = data.age;
            };
        });

    fetch("https://api.nationalize.io?name=" + userName.value) //Fetch natioanlity
        .then((res) => res.json())
        .then((data) => { 
            if (data.country.length == 0) { //Check if weird input ie: not a name
                guessNation.textContent = "What did you enter?";   
            } else if (data.country.length == 1) { //Check if only 1 country returned
                guessNation.textContent = data.country[0].country_id;
            } else {
                guessNation.textContent = data.country[0].country_id
                + " " + data.country[1].country_id;
            }
        });

    userName.value = ""; //Reset Input
};

buttonClick.addEventListener("click", checkUserName); //Check for Click

fetch("https://dog.ceo/api/breeds/image/random") //On refresh fetch new dog image
    .then((res) => res.json())
    .then((data) => imageDog.src = data.message);
