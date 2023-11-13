// MovieItem.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./MovieItem.css";

export default function MovieItem(props) {
  const averageScore = props.movie.averageScore || 0;

  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link to={`/movie/${props.movie.id}`}>
      <div
        className="movie__item"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={props.movie.postImage} alt={props.movie.title} />
        <div className={`movie__info__wrapper ${isHovered ? "visible" : ""}`}>
          <div className="movie__info__content">
            <h3>{props.movie.title}</h3>
            <span>
              <span className="star">★ </span>
              {averageScore.toFixed(1)}
            </span>
            <button>상세보기</button>
          </div>
        </div>
      </div>
    </Link>
  );
}

// import { Link } from "react-router-dom";
// import "./MovieItem.css";
// import "react-responsive-carousel/lib/styles/carousel.min.css";

// export default function MovieItem(props) {
//   // props.movie.averageScore가 만약 없는 값(falsy)인 경우
//   // 그냥 0으로 표시하고
//   // 값이 잘 들어있으면 그 값 그대로 averageScore에 할당
//   const averageScore = props.movie.averageScore || 0;

//   return (
//     <Link to={`/movie/${props.movie.id}`}>
//       <div className="movie__item">
//         <img src={props.movie.postImage} />
//         <div className="movie__info__wrapper">
//           <h3>{props.movie.title}</h3>
//           <span>
//             <span className="star">★ </span>
//             {averageScore.toFixed(1)}
//           </span>
//         </div>
//       </div>
//     </Link>
//   );
// }
