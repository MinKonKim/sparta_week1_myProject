import {
  displayJenreButtons,
  displayMovies,
  displaySpinner,
} from "./render.js";

const TBDB_URL = "https://api.themoviedb.org/3";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OWZmNmMxY2VhMDUxMTg3ZTYzMTUzYWQyYzYzY2E5ZCIsInN1YiI6IjY0ZTg1ZmU2NTI1OGFlMDE0ZGYyMjZlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LwbMg29luCKo58wfbjsZRD8NXPMkXj3CRD-WwwzGeTk",
  },
};

// 초기 영화 목록을 불러오는 함수
export async function fetch_Movies() {
  displaySpinner(true); // 스피너 실행
  try {
    await fetch(`${TBDB_URL}/movie/now_playing?language=ko-KR&page=1`, options)
      .then((response) => response.json())
      .then((data) => {
        displaySpinner(false); // 데이터를 가져왔으면 스피너 숨김
        const movies = data.results; // 영화 목록을 저장
        displayMovies(movies, document.getElementById("movieList"));
      });
  } catch (err) {
    console.error(err);
  }
}

// 장르 목록을 불러오는 함수
export async function fetch_Jenres() {
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

// 검색 결과 가져오기 (수정 및 테스트 완료)
async function fetch_SearchMovies(keyword) {
  await fetch(
    `${TBDB_URL}/search/movie?query=${keyword}&language=ko-KR&page=1&include_adult=false`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      let filteredMovies = data.results;
      displayMovies(filteredMovies);
    })
    .catch((err) => console.error(err));
}
// 검색 폼을 관리하는 함수
export function handleSearch() {
  const form = document.querySelector(".search_form");
  const input = document.getElementById("search_input");

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // 기본 동작 중단
    const searchTerm = input.value;
    console.log(input.value);
    fetch_SearchMovies(searchTerm);
  });
}

// 장르에 따른 영화 목록을 찾아서 불러오는 함수
export async function SearchByJenre(genreId) {
  displaySpinner(true);
  await fetch(
    `${TBDB_URL}/discover/movie?with_genres=${genreId}&language=ko-KR&page=1`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      const movies = data.results;
      displayMovies(movies, document.getElementById("movieList"));
      displaySpinner(false);
    })
    .catch((err) => console.error(err));
}
