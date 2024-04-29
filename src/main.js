import {
  fetch_Jenres,
  fetch_Movies,
  handleSearch,
  SearchByJenre,
} from "./fetch.js";

//리다이렉트 함수
function handleRedirect(container) {
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(container).addEventListener("click", function () {
      location.reload(); // 현재 페이지를 새로고침합니다.
    });
  });
}

handleSearch();
//장르 항목들 불러오기
fetch_Jenres();
//영화 정보 불러오기
fetch_Movies();
// h1 태그를 누르면 redirect 된다.
handleRedirect("h1");
