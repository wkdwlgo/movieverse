import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Loading from "./Loading";
import MovieItem from "./MovieItem";
import "./MovieSearch.css";

export default function MovieSearch(props) {
  const [searchMovieData, setSearchMovieData] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false); // State to track sliding animation
  const location = useLocation();
  const searchKeyword = location.state.keyword;
  const SEARCH_API = `https://moviestates-alternative.codestates-seb.link/movies?page=1&limit=20&title=${searchKeyword}&orderBy=NAME&sortBy=asc`;

  useEffect(() => {
    fetch(SEARCH_API)
      .then((res) => res.json())
      .then((data) => {
        setSearchMovieData(data.data);
        setCurrentIndex(0);
      });
  }, [searchKeyword]); //서치 키워드를 여러 번 바꾸어도 결과가 출력되도록 함
  console.log(searchMovieData);
  const NUM_VISIBLE_SLIDES = 5;
  const handleNextSlide = () => {
    setIsSliding(true); // Start sliding animation
    setCurrentIndex((prevIndex) => (prevIndex + 1) % searchMovieData.length);
  };

  const handlePrevSlide = () => {
    setIsSliding(true); // Start sliding animation
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + searchMovieData.length) % searchMovieData.length
    );
  };

  // Function to handle the end of sliding animation
  const handleSlideEnd = () => {
    setIsSliding(false);
    // Stop sliding animation
  };

  return (
  <div className="movie-slider-container">
    {searchMovieData === "" ? ( // API 호출 전에는 null로 초기화, 아직 받아오지 않았을 경우
      <Loading />
    ) : (
      <>
        {searchMovieData.length === 0 ? ( // API 호출 후에는 검색 결과가 없는 경우
         <h2 className="searchKeyword_title">
        해당하는 검색이 없습니다. 😔
      </h2>
        ) : (
          <>
            <h2 className="searchKeyword_title">"{searchKeyword}" 의 검색결과</h2>
            <div className="slider-wrapper">
              <button
                className={`arrow-btn prev-button ${
                  currentIndex === 0 ? "disabled" : ""
                }`}
                onClick={handlePrevSlide}
                disabled={currentIndex === 0}
              >
                ◀
              </button>
              <div
                className={`movie-list ${isSliding ? "sliding" : ""}`}
                onAnimationEnd={handleSlideEnd}
              >
                {searchMovieData
                  .slice(currentIndex, currentIndex + NUM_VISIBLE_SLIDES)
                  .map((movie, index) => (
                    <MovieItem
                      key={movie.id}
                      movie={movie}
                      currentIndex={currentIndex}
                      movieIndex={index + currentIndex}
                      totalMovies={searchMovieData.length}
                    />
                  ))}
              </div>
              <button
                className={`arrow-btn next-button ${
                  currentIndex + NUM_VISIBLE_SLIDES >= searchMovieData.length
                    ? "disabled"
                    : ""
                }`}
                onClick={handleNextSlide}
                disabled={
                  currentIndex + NUM_VISIBLE_SLIDES >= searchMovieData.length
                }
              >
                ▶
              </button>
            </div>
          </>
        )}
      </>
    )}
  </div>
);
}
