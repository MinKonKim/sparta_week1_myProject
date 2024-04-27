const TBDB_URL = "https://api.themoviedb.org/3";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OWZmNmMxY2VhMDUxMTg3ZTYzMTUzYWQyYzYzY2E5ZCIsInN1YiI6IjY0ZTg1ZmU2NTI1OGFlMDE0ZGYyMjZlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LwbMg29luCKo58wfbjsZRD8NXPMkXj3CRD-WwwzGeTk",
  },
};

// ----------------Setting ---------------------
// 검색 폼과 검색 결과를 관리하는 함수
function setupSearch() {
  const form = document.querySelector(".search_form");
  const input = document.getElementById("search_input");
  const movieListDiv = document.getElementById("movieList");

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // 기본 동작 중단

    const searchTerm = input.value;
    const filteredMovies = movies.filter((movie) => {
      return movie.title.includes(searchTerm); // 영화 제목에 검색어가 포함되는 경우 필터링
    });

    renderMovies(filteredMovies, movieListDiv); // 필터링된 영화 목록을 보여주는 함수 호출
  });
}

// ------------------Render ------------------------
// 영화 카드를 생성하는 함수
function createMovieCard(movie) {
  const movieDiv = document.createElement("div");
  movieDiv.classList.add("card");
  movieDiv.innerHTML = `
    <div class="card-image">
      <image src="https://image.tmdb.org/t/p/w500/${movie.backdrop_path}"/>
    </div>
    <div class="card-content">
      <h2>${movie.title}</h2>
      <p>개봉일 : ${movie.release_date}</p>
      <p>평점 : ${Math.floor(movie.vote_average)}/10</p>
      <p>${movie.overview || "정보없음"}</p>
    </div>
  `;
  // 카드 클릭 이벤트 리스너 추가
  movieDiv.addEventListener("click", () => {
    alert(`
    영화 id : ${movie.id}
    영화 제목: ${movie.title}`);
  });
  return movieDiv;
}

// 영화 목록을 랜더링해 주는 함수
function renderMovies(movies, container) {
  container.innerHTML = ""; // 기존의 영화 카드를 모두 지우고

  movies.forEach((movie) => {
    const movieDiv = createMovieCard(movie);
    container.appendChild(movieDiv);
  });
}

// 장르 목록을 렌더링 하는 함수
function displayJenreButtons(jenres, container) {
  container.innerHTML = "";
  jenres.forEach((key, value) => {
    let btnDiv = document.createElement("div");
    btnDiv.classList.add("jenre-button");
    btnDiv.innerHTML = `
    <button class="jenre-button">${value}</button>`;

    btnDiv.addEventListener("click", () => {
      SearchByJenre(key);
    });

    container.appendChild(btnDiv);
  });
}

// 스피너 랜더링 하는 함수
function displaySpinner(isvisible) {
  const spinnerContainer = document.getElementById("spinner-container");
  if (isvisible) {
    spinnerContainer.innerHTML = `<div class="loading-spinner"></div>`;
  } else {
    spinnerContainer.style.display = "none";
  }
}

// ------------------Load ------------------------
// 초기 영화 목록을 불러오는 함수
async function loadMovies() {
  displaySpinner(true); // 스피너 실행
  try {
    await fetch(`${TBDB_URL}/movie/now_playing?language=ko-KR&page=1`, options)
      .then((response) => response.json())
      .then((data) => {
        displaySpinner(false); // 데이터를 가져왔으면 스피너 숨김
        const movies = data.results; // 영화 목록을 저장
        renderMovies(movies, document.getElementById("movieList"));
      });
  } catch (err) {
    console.error(err);
  }
}

// 장르 목록을 불러오는 함수
async function loadJenres() {
  try {
    const response = await fetch(
      `${TBDB_URL}/genre/movie/list?language=en`,
      options
    );
    const data = await response.json();
    const jenres = new Map(data.genres.map((item) => [item.name, item.id]));
    displayJenreButtons(jenres, document.getElementById("jenres_buttons")); // 장르 버튼 출력하는 함수 호출
  } catch (err) {
    console.error(err);
  }
}

// 장르에 따른 영화 목록을 불러오는 함수
async function SearchByJenre(genreId) {
  displaySpinner(true);
  await fetch(
    `${TBDB_URL}/discover/movie?with_genres=${genreId}&language=ko-KR&page=1`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      displaySpinner(false);
      const movies = data.results;
      renderMovies(movies, document.getElementById("movieList"));
    })
    .catch((err) => console.error(err));
}

//장르 항목들 불러오기
loadJenres();
//영화 정보 불러오기
loadMovies();
// 검색 기능 설정
setupSearch();
