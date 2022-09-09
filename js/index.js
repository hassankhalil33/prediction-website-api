fetch("https://dog.ceo/api/breeds/image/random")
    .then((res) => res.json())
    .then((data) => {
        document.querySelector("#img-dog").src = data.message;
    });

