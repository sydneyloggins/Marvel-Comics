const selectedComic = JSON.parse(localStorage.getItem("selectedComic"));

      if (selectedComic) {
        const collectionsContainer = document.getElementById("collectionsContainer");

        // Create a new div to display the selected comic
        const comicDiv = document.createElement("div");
        const thumbnailImg = document.createElement("img");
        thumbnailImg.src = selectedComic.thumbnail;
        thumbnailImg.alt = `${selectedComic.title} thumbnail`;
        thumbnailImg.classList.add("comic-thumbnail");
        comicDiv.appendChild(thumbnailImg);
        const comicLink = document.createElement("a");
        comicLink.href = selectedComic.url;
        comicLink.textContent = selectedComic.title;
        comicLink.classList.add("comic-link");
        comicDiv.appendChild(comicLink);
        collectionsContainer.appendChild(comicDiv);

        comicDiv.style.width = "200px";
        comicDiv.style.margin = "20px";

        // Display a message indicating when the comic was added to the collections
        const timestamp = selectedComic.timestamp;
        const date = new Date(timestamp);
        const message = document.createElement("p");
        message.textContent = `${date.toLocaleDateString()}`;
        comicDiv.appendChild(message);
      } else {
        // Display a message if no comic has been selected yet
        const message = document.createElement("p");
        message.textContent = "No comic selected.";
        collectionsContainer.appendChild(message);
      }