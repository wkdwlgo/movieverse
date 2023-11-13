import "./Main_Background.css";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function Main_Background() {
  const movie_poster_Arr = [
    "../../public/movie1.jpg",
    "../../public/movie2.jpg",
    "../../public/movie3.jpg",
  ];

  return (
    <div className="main_div_box main_page">
      <div className="background"></div>
      <div className="gradient"></div>
      {/* <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={5000}
      >
        {movie_poster_Arr.map((poster, index) => (
          <div className="img__size" key={index}>
            <div className="poster-container">
              <img
                className="main__poster"
                src={poster}
                alt={`Slide ${index + 1}`}
              />
              <div className="gradient"></div>
            </div>
          </div>
        ))}
      </Carousel> */}
    </div>
  );
}
