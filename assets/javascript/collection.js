// selectedComics is an array of objects that stores the user's selected comics in local storage.
var selectedComics = JSON.parse(localStorage.getItem("selectedComics"));
// Check if the user has any comics in their collection
if (!selectedComics || selectedComics.length === 0) {
  // modal displays if the user has no comics in their collection
  var modal = document.createElement("div");
  modal.classList.add("modal", "is-active");
  modal.innerHTML = `
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="box">
        <p>Your collection is empty! Start adding some comics to your collection.</p>
      </div>
    </div>
    <button class="modal-close is-large" aria-label="close"></button>
  `;
  document.body.appendChild(modal);

  // Add an event listener to the close button to remove the modal when clicked
  var closeBtn = modal.querySelector(".modal-close");
  closeBtn.addEventListener("click", () => {
    modal.remove();
  });
} else {
  // Get the collections container
  var collectionsContainer = document.getElementById("collectionsContainer");

  // Create a set to store the comic URLs that have already been added
  var addedComics = new Set();

  selectedComics.forEach((selectedComic) => {
    // Check if the comic URL has already been added
    if (addedComics.has(selectedComic.url)) {
      return; // Skip this comic
    }

    // Add the comic URL to the set
    addedComics.add(selectedComic.url);

    // Create a new div to display the selected comic
    collectionsContainer.style.display = "flex";
    collectionsContainer.style.flexWrap = "wrap";
    collectionsContainer.style.justifyContent = "center";
    collectionsContainer.style.alignItems = "center";
    var comicDiv = document.createElement("div");
    comicDiv.classList.add("column", "is-one-fifth");
    var card = document.createElement("div");
    card.classList.add("card");
    card.classList.add("comic-card");
    card.style.height = "700px";
    card.style.width = "400px";
    comicDiv.appendChild(card);
    var cardContent = document.createElement("div");
    cardContent.classList.add("card-content");
    card.appendChild(cardContent);
    var thumbnailImg = document.createElement("img");
    thumbnailImg.src = selectedComic.thumbnail;
    thumbnailImg.alt = `${selectedComic.title} thumbnail`;
    thumbnailImg.classList.add("comic-thumbnail");
    cardContent.appendChild(thumbnailImg);
    var comicLink = document.createElement("a");
    comicLink.href = selectedComic.url;
    comicLink.target = "_blank";
    comicLink.textContent = selectedComic.title;
    comicLink.classList.add("comic-link");
    cardContent.appendChild(comicLink);

    // Display a message indicating when the comic was added to the collections
    var timestamp = selectedComic.timestamp;
    var date = new Date(timestamp);
    var message = document.createElement("p");
    message.textContent = `${date.toLocaleDateString()}`;
    cardContent.appendChild(message);

    // Adding a remove button
    var removeButton = document.createElement("button");
    removeButton.classList.add("button", "is-danger", "is-outlined", "remove-button");
    removeButton.textContent = "Remove";
    cardContent.appendChild(removeButton);

    // Adding an event listener to the remove button that removes the comic from the collection by removing the comic div from the collections container 
    //Updates the selectedComics array in local storage 
    removeButton.addEventListener("click", () => {
      var updatedComics = selectedComics.filter((comic) => comic.url !== selectedComic.url);
      localStorage.setItem("selectedComics", JSON.stringify(updatedComics));
      comicDiv.remove();
    
      selectedComics.splice(selectedComics.findIndex(comic => comic.url === selectedComic.url), 1);
      localStorage.setItem("selectedComics", JSON.stringify(selectedComics));
    });   
    collectionsContainer.appendChild(comicDiv);
  });
}
