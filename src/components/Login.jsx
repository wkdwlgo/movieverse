import React, { useState, useEffect } from "react";
import "./Login.css";
import Main_Background from "./Main_Background";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login({ setIsLogin, setUserToken }) {
  const movie_poster_Arr = [
    "../../public/movie1.jpg",
    "../../public/movie2.jpg",
    "../../public/movie3.jpg",
  ];


  const navigate = useNavigate();


  // console.log(localStorage.getItem("userInfor"))
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);


  const LoginDB = (email, password) => {
    if (email === "" || password === "") {
      alert("아이디와 비밀번호를 입력해주세요");
      return;
    }

    axios
      .post("https://moviestates-alternative.codestates-seb.link/auth/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log("well done")
        console.log("User token", response.data)
        // 토큰 및 로그인 상태를 localStorage에 저장
        localStorage.setItem("token", response.data.accessToken);
        setUserToken(response.data.accessToken);
        setIsLogin(true);
        console.log(response.data.accessToken); // 새로운 토큰 출력
        console.log(isLogin); // 변경된 로그인 상태 출력
        alert("로그인 성공!"); // 여기서 메시지를 호출
      })
      .catch((error) => {
        console.log(error.response)
        alert(error.response.data.message)
        setEmail("");
        setPassword("");
        setError(null);
      });
    navigate("/");
  };


  return (
    <div className="login__box">
      <div className="main_div_box">
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
      <main className="login-page">
        <Link to="/">
          <img className="login_logo" src="../../public/3D_ft_logo.png" />
        </Link>
        <div className="login-form">
          <form>
            <div className="login__label">
              <span>이메일</span>
              <input
                className="login_input"
                type="text"
                id="username"
                placeholder="아이디를 입력해주세요."
                onChange={handleEmailChange}
                required
              />
            </div>
            <div className="login__label">
              <span>비밀번호</span>
              <input
                className="login_input"
                type="password"
                id="password"
                placeholder="비밀번호를 입력해주세요."
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div className="button_box">
              <div className="center-button">
                <button className="login__button" type="button" onClick={() => LoginDB(email, password)}>
                  로그인
                </button>
              </div>
              <Link to="/signup" className="signUp_Link">
                회원이 아니신가요?
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Login;