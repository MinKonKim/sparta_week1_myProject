// ------------------display  and event ------------------------

import { cardClickEvent, jenreBtnClickEvent } from "./eventListener.js";

// 영화 카드를 생성하는 함수
export function createMovieCard(movie) {
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
  // 카드 클릭 이벤트 처리 함수(eventListener.js)
  cardClickEvent(movie, movieDiv);
  return movieDiv;
}

// 영화 목록을 랜더링해 주는 함수
export function displayMovies(movies) {
  const movieListDiv = document.getElementById("movieList");
  movieListDiv.innerHTML = ""; // 기존의 영화 카드를 모두 지우고

  movies.forEach((movie) => {
    const movieDiv = createMovieCard(movie);
    movieListDiv.appendChild(movieDiv);
  });
}

// 스피너 랜더링 하는 함수
export function displaySpinner(isvisible) {
  const spinnerContainer = document.getElementById("spinner-container");
  if (isvisible) {
    spinnerContainer.innerHTML = `<div class="fetch_ing-spinner"></div>`;
  } else {
    spinnerContainer.style.display = "none";
  }
}

// 장르 버튼 렌더링 하는 함수
export function displayJenreButtons(jenres, container) {
  container.innerHTML = "";
  jenres.forEach((key, value) => {
    let btnDiv = document.createElement("div");
    btnDiv.id = "jenre-button";
    btnDiv.classList.add("jenre-button");
    btnDiv.innerHTML = `
    <button class="jenre-button">${value}</button>`;

    // 장르 버튼 클릭 이벤트 처리 함수(eventListener.js)
    jenreBtnClickEvent(key, btnDiv);

    container.appendChild(btnDiv);
  });
}
