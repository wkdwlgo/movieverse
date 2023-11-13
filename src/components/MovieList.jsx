import React, { useState, useEffect } from "react";
import MovieItem from "./MovieItem";
import Loading from "./Loading";
import "./MovieList.css";
import dummyMovieList from "../static/dummyMovieList";


const NUM_VISIBLE_SLIDES = 5;

export default function MovieList() {
  const [movieList, setMovieList] = useState([]);
  const SERVER_API =
    "https://moviestates-alternative.codestates-seb.link/movies/top";
  // const GENRES_MOVIE_API = `https://moviestates.codestates-seb.link/movies/genre?page=1&limit=10&genreIds=${id}&orderBy=NAME%20%7C%20CREATED_AT%20%7C%20LIKE&sortBy=asc%28%EC%98%A4%EB%A6%84%EC%B0%A8%EC%88%9C%29%20%7C%20desc%28%EB%82%B4%EB%A6%BC%EC%B0%A8%EC%88%9C%29`;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false); // State to track sliding animation
  const [genreList, setGenreList] = useState([]);

  // const movie_comment = [
  //   "두근두근 콩닥콩닥 내마음을 시큰거리게 만드는 로맨스",
  //   "반전반전 대박대박 내 눈을 돌릴 수 없게 만드는 스릴러",
  //   "파워파워 여름철 무더위도 시원하게 타파하는 액션",
  // ];
  // const movie_genre_id = [
  //   "73fa7e1d-0e3e-4506-9432-21c29faa8dd7",
  //   "079e9098-ff7c-49c7-8d71-fe3fd066aafb",
  //   "fc84777a-d713-4539-a5b9-8c24f0c85b99",
  // ];

  useEffect(() => {
    fetch(SERVER_API)
      .then((response) => response.json())
      .then((result) => {
        setMovieList(result.data);
      })
      .catch((e) => console.log(e));
  }, []);

  const handleNextSlide = () => {
    setIsSliding(true); // Start sliding animation
    setCurrentIndex((prevIndex) => (prevIndex + 1) % movieList.length);
  };

  const handlePrevSlide = () => {
    setIsSliding(true); // Start sliding animation
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + movieList.length) % movieList.length
    );
  };

  // Function to handle the end of sliding animation
  const handleSlideEnd = () => {
    setIsSliding(false);
    // Stop sliding animation
  };

  return (
    <div className="movie-slider-container">
      {movieList.length === 0 ? (
        <Loading />
      ) : (
        <>
          <h2>인기 영화 TOP 10</h2>
          <div className="slider-wrapper">
            <button
              className={`arrow-btn prev-button ${currentIndex === 0 ? "disabled" : ""
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
              {movieList
                .slice(currentIndex, currentIndex + NUM_VISIBLE_SLIDES)
                .map((movie, index) => (
                  <MovieItem
                    key={movie.id}
                    movie={movie}
                    currentIndex={currentIndex}
                    movieIndex={index + currentIndex}
                    totalMovies={movieList.length}
                  />
                ))}
            </div>
            <button
              className={`arrow-btn next-button ${currentIndex + NUM_VISIBLE_SLIDES >= movieList.length
                  ? "disabled"
                  : ""
                }`}
              onClick={handleNextSlide}
              disabled={currentIndex + NUM_VISIBLE_SLIDES >= movieList.length}
            >
              ▶
            </button>
          </div>
          {/* <div className="movietrailer">
  <MovieTrailer />
</div> */}


          <div className="recom__box">

            <h2 className="recom__title">내가 찾는 영화!</h2>
            <p>다양한 영화와 보고싶은 영화 리뷰를 찾아보세요!</p>
            <div className="slider-container">
              <div
                className="slider-box1"
                onAnimationEnd={handleSlideEnd}
              >
                <ul className="slider-card">
                  {movieList
                    .map((movie, index) => (

                      <li>
                        <MovieItem
                          key={movie.id}
                          movie={movie}
                          currentIndex={currentIndex}
                          movieIndex={index + currentIndex}
                          totalMovies={movieList.length}
                        />
                      </li>

                    ))}
                </ul>
                <ul className="slider-card">
                  {movieList
                    .map((movie, index) => (

                      <li>
                        <MovieItem
                          key={movie.id}
                          movie={movie}
                          currentIndex={currentIndex}
                          movieIndex={index + currentIndex}
                          totalMovies={movieList.length}
                        />
                      </li>

                    ))}
                </ul>

              </div>
              <div
                className="slider-box2"
                onAnimationEnd={handleSlideEnd}
              >
                <ul className="slider-card">
                  {movieList
                    .map((movie, index) => (

                      <li>
                        <MovieItem
                          key={movie.id}
                          movie={movie}
                          currentIndex={currentIndex}
                          movieIndex={index + currentIndex}
                          totalMovies={movieList.length}
                        />
                      </li>

                    ))}
                </ul>
                <ul className="slider-card">
                  {movieList
                    .map((movie, index) => (

                      <li>
                        <MovieItem
                          key={movie.id}
                          movie={movie}
                          currentIndex={currentIndex}
                          movieIndex={index + currentIndex}
                          totalMovies={movieList.length}
                        />
                      </li>

                    ))}
                </ul>

              </div>
            </div>

          </div>
        </>
      )}
    </div>
  );
}
