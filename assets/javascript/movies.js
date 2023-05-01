var key = "d46c926d";
var movieNameRef = document.getElementById('movie-name');
var searchBtn = document.getElementById('search-btn');
var result = document.getElementById('result');

var getMovie = function() {
    console.log('getMovie')
    var movieName = movieNameRef.value;
    var url = `http://www.omdbapi.com/?t=${movieName}&apikey=d46c926d`;

    if (movieName.length <= 0) {
        result.innerHTML = 'Please enter a movie name';
    }

    else {
        fetch(url)
            .then((resp) => resp.json())
            .then((data) => {
                if (data.Response == "True") {
                    result.innerHTML = `
                    <div class="card">
                        <img src=${data.Poster} class="poster">
                        <div> 
                            <h2>${data.Title}</h2>
                        </div>
                        <div class= "card-body">
                            <span>Rated: ${data.Rated}</span>
                            <span>Year: ${data.Year}</span>
                            <span>Genre: ${data.Genre}</span>
                        </div>
                    </div>
                    <h3>Plot</h3>
                    <p>${data.Plot}</p>
                    <h3>Actors</h3>
                    <p>${data.Actors}</p>
                `;

                }

                else {
                    result.innerHTML = `<h3 class ='msg'>${data.Error}</h3>`;

                }
            })
            .catch(function(error) {
                result.innerHTML = `<h3 class='msg'>Error</h3>`;
            });

    }
};

searchBtn.addEventListener('click', getMovie);
window.addEventListener('load', getMovie);