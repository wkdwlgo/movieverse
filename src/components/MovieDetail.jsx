import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"; // useHistory 추가
import Loading from "./Loading";
import "./MovieDetail.css";
import MovieItem from "./MovieItem";
import Comment from "./Comment";
import dummyComment from "../static/dummyComment";
import dummyMovieList from "../static/dummyMovieList";
import axios from "axios"

export default function MovieDetail({isLogin, userInfor,userToken}) {
  //특정 영화 클릭시 해당 영화의 아이디가 담긴 상세경로로 이동
  //movie/:movieId
  //그리고 movieId라는 파라미터는 usePamans를 통해 얻은
  //params객체의 프로퍼티로 접근할 수 있다.
  //movieId를 통해 특정 영화의 상세 정보를 api로 요청한다.

  const params = useParams();
  const [movieData, setMovieData] = useState(null);
  const [connectMovie, setConnectMovie] = useState(null);
  const MOVIE_DETAIL_API = `https://moviestates-alternative.codestates-seb.link/movies/${params.movieId}/detail`;
  const CONNECT_MOVIE_API = `https://moviestates-alternative.codestates-seb.link/movies/${params.movieId}/related`;
  const COMMENT_MOVIE_API = `https://moviestates-alternative.codestates-seb.link/reviews/movie/${params.movieId}`;
  const COMMENT_INPUT_API = `https://moviestates-alternative.codestates-seb.link/reviews/${params.movieId}`;

  const [isLoggedIn, setIsLoggedIn] = useState(false); //로그인 여부 확인
  const [comment, setComment] = useState("");
  const [averageScore, setAverageScore] = useState("");
  const [myComment, setMyComment] = useState(null);


  

const handleButtonClick = (event) => {
  if (!isLogin) {
    alert("로그인이 필요한 서비스입니다.");
    return;
  }
  
  if (averageScore !== "" && myComment !== "" && localStorage.getItem("token") !== "") {
    axios
      .post(
        COMMENT_INPUT_API,
        {
          content: myComment,
          score: averageScore,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        // 요청이 성공한 후 새로운 댓글 데이터를 가져와서 comment 상태를 업데이트합니다.
        fetch(COMMENT_MOVIE_API)
          .then((res) => res.json())
          .then((data) => {
            setComment(data);
          })
          .catch((error) => {
            console.error(error);
          });

        setAverageScore("");
        setMyComment("");
      })
      .catch((error) => {
        console.log(error.response);
        alert(error.response.data.message);
      });
  } else {
    alert("별점과 코멘트를 모두 입력해주세요.");
  }
};




  

  const handleChangeAverageScore = (event) => {
    // TODO : Tweet input 엘리먼트에 입력 시 작동하는 함수를 완성하세요.
    setAverageScore(event.target.value);
  };

  const handleChangeComment = (event) => {
    // TODO : Tweet textarea 엘리먼트에 입력 시 작동하는 함수를 완성하세요.
    setMyComment(event.target.value);
  };

  useEffect(() => {
    fetch(MOVIE_DETAIL_API)
      .then((res) => res.json())
      .then((data) => {
        setMovieData(data);
        console.log(data);
      });
  }, [movieData]);

  useEffect(() => {
    fetch(CONNECT_MOVIE_API)
      .then((res) => res.json())
      .then((data) => {
        setConnectMovie(data);
        console.log(data); // 이 위치에서 변수 data를 사용
      });
  }, []);

  useEffect(() => {
    fetch(COMMENT_MOVIE_API)
      .then((res) => res.json())
      .then((data) => {
        setComment(data);
      });
  }, [comment]);

  // console.log(releasedDate)
  //   // 제목           러닝타임/ 장르/ 개봉일
  //   // 영화 정보 : 평점 / 출연,제작/ 줄거리
  //   // 코멘트 입력 폼 + 코멘트
  //   // 연관 영화
  //   // console.log(comment);
  //   // console.log(params);
  //   // console.log(movieData)
  //   console.log(comment);

  return movieData !== null ? (
    <section>
      <div className="detail__page">
        <div className="detail__box">
          <div className="detail__header">
            <h1>{movieData.title} </h1>
            <span className="average">
              <span className="star">★ </span>
              {movieData.averageScore !== null
                ? movieData.averageScore.toFixed(1)
                : "0.0"}
            </span>
          </div>
          <div className="detail__info">
            <img className="movie__poster" src={movieData.postImage} />
            <div className="movie__info">
              <div className="flex__box movie_average_released">
                <h3>개봉</h3>
                <span>
                  {movieData.releasedAt.slice(0, 4) +
                    "." +
                    movieData.releasedAt.slice(4, 6) +
                    "." +
                    movieData.releasedAt.slice(6, 8)}
                </span>
                {/* <span>{movieData.releasedAt}</span> */}
              </div>
              <div className="flex__box movie__genre">
                <h3>장르</h3>
                <div className="genre__list">
                  {movieData.genres.map((genre) => (
                    <div key={genre.id}>{genre.name}</div>
                  ))}
                </div>
              </div>
              <div className="flex__box movie__staff">
                <h3>스태프</h3>
                <div>
                  {movieData.staffs.map((staff) => (
                    <div key={staff.id}>
                      {staff.role}: {staff.name}
                    </div>
                  ))}
                </div>
              </div>
              <div className="movie__plot">
                <h3>줄거리</h3>
                <p>{movieData.plot}</p>
              </div>
            </div>
          </div>

          {isLogin ? (
            <div className="comment__form">
             <select
                value={averageScore}
                className="comment__input--averageScore"
                onChange={handleChangeAverageScore}
              >
                <option value="">별점을 선택하세요</option>
                {
                  ["⭐️", "⭐️⭐️", "⭐️⭐️⭐️", "⭐️⭐️⭐️⭐️", "⭐️⭐️⭐️⭐️⭐️"].map((score,index) => (
                  <option key={index+1} value={index+1}>
                    {score}
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={myComment}
                placeholder="코멘트를 작성해주세요"
                className="comment__input--myComment"
                onChange={handleChangeComment}
              />
              <button
                className="commentForm__submitButton"
                onClick={handleButtonClick}
                type="button"
              >
                평점작성
              </button>
            </div>
          ) : (
            <div className="comment__form">
             <select
          value={averageScore}
          className="comment__input--averageScore"
          onChange={handleChangeAverageScore}
        >
          <option value="">별점을 선택하세요</option>
           {
            ["⭐️", "⭐️⭐️", "⭐️⭐️⭐️", "⭐️⭐️⭐️⭐️", "⭐️⭐️⭐️⭐️⭐️"].map((score,index) => (
            <option key={index+1} value={index+1}>
              {score}
            </option>
          ))}
        </select>
              <input
                type="text"
                value={myComment}
                placeholder="코멘트를 작성해주세요"
                className="comment__input--myComment"
                onChange={handleChangeComment}
              />
              <Link to="/login">
                <button
                  className="commentForm__submitButton"
                  onClick={handleButtonClick}
                  type="button"
                >
                  평점작성
                </button>{" "}
              </Link>
            </div>
          )}

          
          <ul className="comment__show">
            {comment.length > 0 ? (
              <li>
                {comment.map((ment) => (
                  <Comment key={ment.id} comment={ment} />
                ))}
              </li>
            ) : null}
          </ul>
        </div>

        <div className="connect__movie">
          <h4 className="connect__title">연관 영화</h4>
          <div className="connect__movie__list">
            {connectMovie !== null
              ? connectMovie
                  .slice(0, 5)
                  .map((movie, index) => (
                    <MovieItem key={movie.id} movie={movie} />
                  ))
              : []}
          </div>
        </div>
      </div>
    </section>
  ) : (
    <Loading />
  );
}
