
const apiKey = "ad573bd1b9ca2b657249afd5814b24dc";
const hash = "197a42e7d6346be04171ca1d7be555dd";
const ts = 1;

let comics = [];
let selectedComics = JSON.parse(localStorage.getItem("selectedComics")) || [];

async function getComics(searchQuery) {
  const response = await fetch(
    `https://gateway.marvel.com/v1/public/comics?apikey=${apiKey}&hash=${hash}&ts=${ts}&limit=100&titleStartsWith=${searchQuery}`
  );
  const data = await response.json();

  if (data.data.count === 0) {
    console.log("No results found.");
    return;
  }

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

async function search() {
  const searchBar = document.getElementById("searchBar");
  const searchQuery = searchBar.value.trim().toLowerCase();
  const searchCategorySelect = document.getElementById("searchCategory");
  const searchCategory = searchCategorySelect.value.toLowerCase();

  await getComics(searchQuery);

  const filteredComics = comics.filter((comic) => {
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

  displayComics(filteredComics);
}

function displayComics(comicsToDisplay) {
  const comicsContainer = document.getElementById("comicsContainer");
  comicsContainer.innerHTML = "";

  comicsContainer.style.display = "flex";
  comicsContainer.style.flexWrap = "wrap";
  comicsContainer.style.zIndex = "1";
  comicsContainer.style.justifyContent = "center";
  comicsContainer.style.alignItems = "center";

  comicsToDisplay.forEach((comic) => {
    const comicCard = document.createElement("div");
    comicCard.classList.add("comic-card");
    comicCard.style.height = "600px"; // set a fixed height for the card
    comicCard.style.width = "300px  "; // set a fixed width for the card
    const thumbnailImg = document.createElement("img");
    thumbnailImg.src = comic.thumbnail;
    thumbnailImg.alt = `${comic.title} thumbnail`;
    thumbnailImg.classList.add("comic-thumbnail");
    comicCard.appendChild(thumbnailImg);
    
    const titleLink = document.createElement("a"); // create an anchor tag
    titleLink.href = comic.url; // set the href attribute to the comic's URL
    titleLink.target = "_blank"; // open the link in a new tab
    const title = document.createElement("h2");
    title.textContent = comic.title;
    title.classList.add("comic-link");
    titleLink.appendChild(title); // wrap the title in the anchor tag
    comicCard.appendChild(titleLink);
    
    const addToSelectedButton = document.createElement("button");
    addToSelectedButton.classList.add("button", "is-danger", "is-outlined", "remove-button");
    addToSelectedButton.textContent = "Add to collection";
    comicCard.appendChild(addToSelectedButton);
    
    comicsContainer.appendChild(comicCard);
    
    addToSelectedButton.addEventListener("click", () => {
      selectedComics.push({
        title: comic.title,
        thumbnail: comic.thumbnail,
        url: comic.url,
        timestamp: new Date().getTime(),
      });
      localStorage.setItem(
        "selectedComics",
        JSON.stringify(selectedComics)
      );
      console.log("Selected comic stored in local storage.");
      console.log(selectedComics);
    });
  });
}


const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", search);



const searchCategorySelect = document

const searchBar = document.getElementById("searchBar");
searchBar.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    search();
  }
});


getComics();

