// Created varants for API key, hash, and timestamp that will be used in the fetch request
var apiKey = "ad573bd1b9ca2b657249afd5814b24dc";
var hash = "197a42e7d6346be04171ca1d7be555dd";
var ts = 1;
// Created an empty array to store the comics that will be fetched from the API
let comics = [];
// sets the value of the comics array to the value of the selectedComics array in local storage, or an empty array if the selectedComics array is empty
let selectedComics = JSON.parse(localStorage.getItem("selectedComics")) || [];

// Fetches the comics from the Marvel API
async function getComics(searchQuery) {
  var response = await fetch(`https://gateway.marvel.com/v1/public/comics?apikey=${apiKey}&hash=${hash}&ts=${ts}&limit=100&titleStartsWith=${searchQuery}`);
  var data = await response.json();

// object destructuring to get the data from the API response
  comics = data.data.results.map((comic) => ({
    title: comic.title,
    description: comic.description,
    thumbnail: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
    characters: comic.characters.items.map((character) => character.name),
    creators: comic.creators.items.map((creator) => creator.name),
    genre: comic.format,
    url: comic.urls[0].url,
  }));
}
// function which grabs the user's search query and search category, then filters the comics array based on the search category and search query
async function search() {
  var searchBar = document.getElementById("searchBar");
  var searchQuery = searchBar.value.trim().toLowerCase();
  var searchCategorySelect = document.getElementById("searchCategory");
  var searchCategory = searchCategorySelect.value.toLowerCase();

  await getComics(searchQuery);

  var filteredComics = comics.filter((comic) => {
    if (searchCategory === "characters") {
      return comic.characters.some((character) =>
        character.toLowerCase().includes(searchQuery)
      );
    } else if (searchCategory === "creators") {
      return comic.creators.some((creator) =>
        creator.toLowerCase().includes(searchQuery)
      );
    } else {
      return comic.title.toLowerCase().includes(searchQuery);
    }
  });
// calls the displayComics function with the filteredComics array as an argument
  displayComics(filteredComics);
}
// function which displays the comics in the comicsContainer div on the page 
function displayComics(comicsToDisplay) {
  var comicsContainer = document.getElementById("comicsContainer");
  comicsContainer.innerHTML = "";

  comicsContainer.style.display = "flex";
  comicsContainer.style.flexWrap = "wrap";
  comicsContainer.style.zIndex = "1";
  comicsContainer.style.justifyContent = "center";
  comicsContainer.style.alignItems = "center";
// for each comic in the comicsToDisplay array, creates a div element with the comic's thumbnail, title, and a button to add the comic to the user's collection
  comicsToDisplay.forEach((comic) => {
    var comicCard = document.createElement("div");
    comicCard.classList.add("comic-card");
    comicCard.style.height = "700px";
    comicCard.style.width = "300px";
    
    var thumbnailImg = document.createElement("img");
    thumbnailImg.src = comic.thumbnail;
    thumbnailImg.alt = `${comic.title} thumbnail`;
    thumbnailImg.classList.add("comic-thumbnail");
    comicCard.appendChild(thumbnailImg);
    
    var titleLink = document.createElement("a");
    titleLink.href = comic.url;
    titleLink.target = "_blank";
    
    var title = document.createElement("h2");
    title.textContent = comic.title;
    title.classList.add("comic-link");
    titleLink.appendChild(title);
    comicCard.appendChild(titleLink);
    
    var collectionButton = document.createElement("button");
    collectionButton.classList.add("button", "is-danger", "is-outlined", "remove-button");
    collectionButton.textContent = "Add to collection";
    comicCard.appendChild(collectionButton);
    
    comicsContainer.appendChild(comicCard);
  // adds an event listener to the collectionButton which checks if the comic is already in the user's collection, and if not, adds it to the collection and stores it in local storage
    collectionButton.addEventListener("click", () => {
      //modal displays if comic is already in collection or if it is added to collection successfully by checking if the comic is already in the selectedComics array in local storage
      let modalContent;
      let found = false;
      for (let i = 0; i < selectedComics.length; i++) {
        if (selectedComics[i].title === comic.title) {
          found = true;
          modalContent = "This comic is already in your collection.";
          break;
        }
      }//
      if (!found) {
        selectedComics.push({
          title: comic.title,
          thumbnail: comic.thumbnail,
          url: comic.url,
          timestamp: new Date().getTime(),
        });
        localStorage.setItem("selectedComics", JSON.stringify(selectedComics));
        modalContent = "Comic added to your collection!";
        console.log("Selected comic stored in local storage.");
        console.log(selectedComics);
      }
    
      var modal = document.createElement("div");
      modal.classList.add("modal", "is-active");
      
      var modalBackground = document.createElement("div");
      modalBackground.classList.add("modal-background");
      modal.appendChild(modalBackground);
      
      var modalContentWrapper = document.createElement("div");
      modalContentWrapper.classList.add("modal-content", "box");
      modalContentWrapper.innerHTML = modalContent;
      modal.appendChild(modalContentWrapper);
      
      document.body.appendChild(modal);
      //removes modal after 1.5 seconds
      setTimeout(() => {
        modal.remove();
      }, 1500);
    });
  });
}

var searchButton = document.getElementById("searchButton");
// adds an event listener to the searchButton which calls the search function
searchButton.addEventListener("click", search);

getComics();

