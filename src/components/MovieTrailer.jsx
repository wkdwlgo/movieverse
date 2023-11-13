// import "./MovieTrailer.css";
// import React from "react";
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";

// export default function MovieTrailerSlider() {
//   const movie_poster_Arr = [
//     "../../public/movie1.jpg",
//     "../../public/movie2.jpg",
//     "../../public/movie3.jpg",
//   ];

//   return (
//     <div className="movie-trailer-slider">
//       <Carousel
//         showThumbs={false}
//         showStatus={false}
//         infiniteLoop={true}
//         autoPlay={true}
//         interval={5000}
//         renderArrowPrev={(onClickHandler, hasPrev, label) =>
//           hasPrev && (
//             <button
//               type="button"
//               onClick={onClickHandler}
//               title={label}
//               className="custom-arrow custom-prev-arrow"
//             >
//               &#9664;
//             </button>
//           )
//         }
//         renderArrowNext={(onClickHandler, hasNext, label) =>
//           hasNext && (
//             <button
//               type="button"
//               onClick={onClickHandler}
//               title={label}
//               className="custom-arrow custom-next-arrow"
//             >
//               &#9654;
//             </button>
//           )
//         }
//       >
//         {movie_poster_Arr.map((poster, index) => (
//           <div className="img__size" key={index}>
//             <div className="poster-container">
//               <div className="gradient2"></div> {/* Add gradient here */}
//               <img
//                 className="main__poster"
//                 src={poster}
//                 alt={`Slide ${index + 1}`}
//               />
//             </div>
//           </div>
//         ))}
//       </Carousel>
//     </div>
//   );
// }