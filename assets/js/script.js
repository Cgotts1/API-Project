const apiKey = "91b89138e6c4e9412f5ce87e1e9d3520";
const accessToken =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MWI4OTEzOGU2YzRlOTQxMmY1Y2U4N2UxZTlkMzUyMCIsInN1YiI6IjYzNjQ3MTY1N2YxZDgzMDA3Yzk0YjMyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.USyxrOb6-JOIYPMklCHVVKOe2tVbbRNs4wydBLwqWJs";
const selectMovieButton = document.querySelector(".select-movie");
const searchButton = document.querySelector(".search-button");
const searchInput = document.querySelector(".search-input");
const moviePoster = document.querySelector(".movie-poster");
const carouselEl = document.querySelector(".carousel")

//when movie button is clicked, the information is stored to local storage
function storeData(event) {
  console.log(event);
  localStorage.setItem("selectedMovie", event.target.alt);
  localStorage.setItem('selectedPoster', event.target.currentSrc);
  location.assign("./results.html");
}

//when search button is clicked, the carousel is unhidden and displays 5 movies based on the search input
function getMovieData(event) {
  event.preventDefault();
  carouselEl.classList.remove("hide")
  let search = searchInput.value;
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=91b89138e6c4e9412f5ce87e1e9d3520&language=en-US&query=${search}&page=1&include_adult=false`,
    requestOptions
    )
    .then((response) => response.json())
    .then(function (result) {

      for (i = 0; i < 5; i++) {
        let newDiv = document.createElement("div");
        newDiv.classList = i === 0 ? "carousel-item active" : "carousel-item";
        let newImg = document.createElement("img");
        newImg.classList = "d-block mx-auto images rounded-5";
        newImg.alt = `${result.results[i].title}`;
        newImg.src =
          "https://image.tmdb.org/t/p/w500" + result.results[i].poster_path;
        selectMovieButton.appendChild(newDiv);
        newDiv.appendChild(newImg);
      }
    })
    .catch((error) => console.log("error", error));
}

//when page is loaded the last search result that was saved to local storage is closed
window.addEventListener('load', () => {
    localStorage.clear()
  });

//event listeners for the search and movie button to trigger functions
searchButton.addEventListener("click", getMovieData);
selectMovieButton.addEventListener("click", storeData);

