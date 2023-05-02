const apiKey = "ad573bd1b9ca2b657249afd5814b24dc";
const hash = "197a42e7d6346be04171ca1d7be555dd";
const ts = 1;

let latestComics = [];

async function getLatestComics() {
  const response = await fetch(
    `https://gateway.marvel.com/v1/public/comics?apikey=${apiKey}&hash=${hash}&ts=${ts}&limit=20&orderBy=-modified`
  );
  const data = await response.json();

  if (data.data.count === 0) {
    console.log("No results found.");
    return;
  }

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

function displayLatestComics() {
  const latestComicsContainer = document.getElementById(
    "latestComicsContainer"
  );
  latestComicsContainer.innerHTML = "";

  latestComicsContainer.style.display = "flex";
  latestComicsContainer.style.flexWrap = "wrap";

  latestComics.forEach((comic) => {
    const comicDiv = document.createElement("div");
    const thumbnailImg = document.createElement("img");
    thumbnailImg.src = comic.thumbnail;
    thumbnailImg.alt = `${comic.title} thumbnail`;
    thumbnailImg.classList.add("comic-thumbnail");
    comicDiv.appendChild(thumbnailImg);
    const comicLink = document.createElement("a");
    comicLink.href = comic.url;
    comicLink.textContent = comic.title;
    comicLink.classList.add("comic-link");
    comicDiv.appendChild(comicLink);
    latestComicsContainer.appendChild(comicDiv);

    comicDiv.style.width = "200px";
    comicDiv.style.margin = "20px";

    // Display the writers for the comic
    const writers = document.createElement("p");
    writers.textContent = `Writers: ${comic.writers.join(", ")}`;
    comicDiv.appendChild(writers);
  });
}

async function init() {
  await getLatestComics();
  displayLatestComics();
}

init();
