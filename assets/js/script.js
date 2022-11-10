const apiKey = "91b89138e6c4e9412f5ce87e1e9d3520";
const accessToken =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MWI4OTEzOGU2YzRlOTQxMmY1Y2U4N2UxZTlkMzUyMCIsInN1YiI6IjYzNjQ3MTY1N2YxZDgzMDA3Yzk0YjMyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.USyxrOb6-JOIYPMklCHVVKOe2tVbbRNs4wydBLwqWJs";
const selectMovieButton = document.querySelector(".select-movie");
const searchButton = document.querySelector(".search-button");
const searchInput = document.querySelector(".search-input");
const moviePoster = document.querySelector(".movie-poster");

function storeData(event) {
  console.log(event);
  localStorage.setItem("selectedMovie", event.target.alt);
  localStorage.setItem('selectedPoster', event.target.currentSrc);
  location.assign("./results.html");
}

function getMovieData(event) {
  event.preventDefault();
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
      console.log(result);

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

searchButton.addEventListener("click", getMovieData);
selectMovieButton.addEventListener("click", storeData);
