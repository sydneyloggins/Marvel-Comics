// var that will be used to fetch the latest comics from the Marvel API
var apiKey = "ad573bd1b9ca2b657249afd5814b24dc";
var hash = "197a42e7d6346be04171ca1d7be555dd";
var ts = 1;
// Created an empty array to store the comics that will be fetched from the API
let latestComics = [];
// Fetches the latest comics from the Marvel API and stores them in the latestComics array 
async function getLatestComics() {
  var response = await fetch(
    `https://gateway.marvel.com/v1/public/comics?apikey=${apiKey}&hash=${hash}&ts=${ts}&limit=20&orderBy=-modified`
  );
  var data = await response.json();

  latestComics = data.data.results.map((comic) => ({
    title: comic.title,
    description: comic.description,
    thumbnail: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
    characters: comic.characters.items.map((character) => character.name),
    writers: comic.creators.items
      .filter((creator) => creator.role === "writer")
      .map((creator) => creator.name),
    url: comic.urls[0].url,
  }));
}
// function which displays the latest comics in the latestComicsContainer div on the page
function displayLatestComics() {
  var latestComicsContainer = document.getElementById("latestComicsContainer");
// clears the latestComicsContainer div
  latestComicsContainer.innerHTML = "";
  latestComicsContainer.style.display = "flex";
  latestComicsContainer.style.flexWrap = "wrap";
  latestComicsContainer.style.justifyContent = "center";
  latestComicsContainer.style.alignItems = "center";

// loops through the latestComics array and creates a div for each comic, then appends the div to the latestComicsContainer div 
  latestComics.forEach((comic) => {
    var comicCard = document.createElement("div");
    comicCard.classList.add("comic-card");
    comicCard.style.height = "700px";
    comicCard.style.width = "400px  ";
    comicCard.style.margin = "20px";

    var thumbnailImg = document.createElement("img");
    thumbnailImg.src = comic.thumbnail;
    thumbnailImg.alt = `${comic.title} thumbnail`;
    thumbnailImg.classList.add("comic-thumbnail");
    comicCard.appendChild(thumbnailImg);

    var cardContent = document.createElement("div");
    cardContent.classList.add("card-content");

    var comicLink = document.createElement("a");
    comicLink.href = comic.url;
    comicLink.target = "_blank";
    comicLink.textContent = comic.title;
    comicLink.classList.add("comic-link");
    cardContent.appendChild(comicLink);

    // Display the writers for the comic
    var writers = document.createElement("p");
    writers.textContent = `Writers: ${comic.writers.join(", ")}`;
    cardContent.appendChild(writers);

    comicCard.appendChild(cardContent);
    latestComicsContainer.appendChild(comicCard);
  });
}
// function which is called when the page loads
async function newComics() {
  await getLatestComics();
  displayLatestComics();
}

newComics();
