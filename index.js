// 검색 폼과 검색 결과를 관리하는 함수
function setupSearch() {
  let form = document.querySelector(".search_form");
  let input = document.getElementById("search_input");
  let movieListDiv = document.getElementById("movieList");

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // 기본 동작 중단

    let searchTerm = input.value.toLowerCase(); // 입력값을 소문자로 변환하여 저장
    let filteredMovies = movies.filter((movie) => {
      return movie.title.toLowerCase().includes(searchTerm); // 영화 제목에 검색어가 포함되는 경우 필터링
    });

    renderMovies(filteredMovies, movieListDiv); // 필터링된 영화 목록을 보여주는 함수 호출
  });
}
// 영화 목록을 보여주는 함수
function renderMovies(movies, container) {
  container.innerHTML = ""; // 기존의 영화 카드를 모두 지우고

  movies.forEach((movie) => {
    let movieDiv = document.createElement("div");
    movieDiv.classList.add("card");
    movieDiv.innerHTML = `
      <div class="card-image">
        <image src="https://image.tmdb.org/t/p/original/${
          movie.backdrop_path
        }"/>
      </div>
      <div class="card-content">
        <h2>${movie.title}</h2>
        <p>${movie.overview || "정보없음"}</p>
      </div>
    `;

    // 클릭 이벤트 추가
    movieDiv.addEventListener("click", () => {
      alert(`영화 id : ${movie.id}`); // 클릭 시 영화 제목이 포함된 알람 띄우기
    });

    container.appendChild(movieDiv);
  });
}

// 초기 영화 목록을 불러오는 함수
function loadMovies() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OWZmNmMxY2VhMDUxMTg3ZTYzMTUzYWQyYzYzY2E5ZCIsInN1YiI6IjY0ZTg1ZmU2NTI1OGFlMDE0ZGYyMjZlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LwbMg29luCKo58wfbjsZRD8NXPMkXj3CRD-WwwzGeTk",
    },
  };

  fetch(
    "https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1",
    options
  )
    .then((response) => response.json())
    .then((response) => {
      movies = response["results"]; // 영화 목록을 저장
      renderMovies(movies, document.getElementById("movieList")); // 초기 영화 목록을 보여주는 함수 호출
    })
    .catch((err) => console.error(err));
}

// 초기화 함수 실행
loadMovies();
// 검색 기능 설정
setupSearch();
