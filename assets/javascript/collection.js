// JavaScript code
const selectedComics = JSON.parse(localStorage.getItem("selectedComics"));

if (selectedComics && selectedComics.length > 0) {
  const collectionsContainer = document.getElementById("collectionsContainer");

  selectedComics.forEach((selectedComic) => {
    // Create a new div to display the selected comic
    collectionsContainer.style.display = "flex";
    collectionsContainer.style.flexWrap = "wrap";
    collectionsContainer.style.justifyContent = "center";
    collectionsContainer.style.alignItems = "center";
    const comicDiv = document.createElement("div");
    comicDiv.classList.add("column", "is-one-fifth");
    const card = document.createElement("div");
    card.classList.add("card");
    card.style.height = "700px";
    card.style.width = "400px";
    comicDiv.appendChild(card);
    const cardContent = document.createElement("div");
    cardContent.classList.add("card-content");
    card.appendChild(cardContent);
    const thumbnailImg = document.createElement("img");
    thumbnailImg.src = selectedComic.thumbnail;
    thumbnailImg.alt = `${selectedComic.title} thumbnail`;
    thumbnailImg.classList.add("comic-thumbnail");
    cardContent.appendChild(thumbnailImg);
    const comicLink = document.createElement("a");
    comicLink.href = selectedComic.url;
    comicLink.target = "_blank";
    comicLink.textContent = selectedComic.title;
    comicLink.classList.add("comic-link");
    cardContent.appendChild(comicLink);

    // Display a message indicating when the comic was added to the collections
    const timestamp = selectedComic.timestamp;
    const date = new Date(timestamp);
    const message = document.createElement("p");
    message.textContent = `${date.toLocaleDateString()}`;
    cardContent.appendChild(message);

    // Add a remove button
    const removeButton = document.createElement("button");
    removeButton.classList.add("button", "is-danger", "is-outlined", "remove-button");
    removeButton.textContent = "Remove";
    cardContent.appendChild(removeButton);

    // Add an event listener to the remove button that removes the comic from the collection
    removeButton.addEventListener("click", () => {
      const updatedComics = selectedComics.filter((comic) => comic.url !== selectedComic.url);
      localStorage.setItem("selectedComics", JSON.stringify(updatedComics));
      comicDiv.remove();
      if (updatedComics.length === 0) {
        const message = document.createElement("p");
        message.textContent = "No comics selected.";
        collectionsContainer.appendChild(message);
      }
    });

    collectionsContainer.appendChild(comicDiv);
  });
} else {
  // Display a message if no comics have been selected yet
  const message = document.createElement("p");
  message.textContent = "No comics selected.";
  collectionsContainer.appendChild(message);
}
