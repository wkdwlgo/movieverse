import React, {useState} from "react";
import "./SignUp.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Main_Background from "./Main_Background";

function SignUp() {
const movie_poster_Arr = [
    "../../public/movie1.jpg",
    "../../public/movie2.jpg",
    "../../public/movie3.jpg",
  ];
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [errorMessages, setErrorMessages] = useState({
    email: "",
    password: "",
    passwordCheck: "",
    birthdate: ""
  })

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handlePasswordCheckChange = (e) => setPasswordCheck(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handleNicknameChange = (e) => setNickname(e.target.value);
  const handleBirthdateChange = (e) => setBirthdate(e.target.value);

  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    validateForm();
  }

  const validateForm = () => {
    const errors = {
      email: "",
      password: "",
      passwordCheck: "",
      birthdate: ""
    }
    // 이메일 형식 검사
    if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "유효한 이메일 형식을 입력하세요.";
    }

  // 비밀번호 길이 및 조합 검사
if (password.length < 8 || password.length > 16) {
  errors.password = "비밀번호는 8자 이상 16자 이하로 입력해주세요.";
} else if (!/^(?=.*[a-zA-Z])(?=.*\d).+$/.test(password)) {
  errors.password = "비밀번호는 영문과 숫자의 조합이어야 합니다.";
}
    // 비밀번호 확인 일치 검사
    if (password !== passwordCheck) {
      errors.passwordCheck = "비밀번호가 일치하지 않습니다.";
      // 영문, 숫자, 특수문자
    }
    setErrorMessages(errors);

    // 모든 조건을 만족하면 회원가입 로직 추가
    if (!Object.values(errors).some(error => error !== "")) {
      console.log("Submitted Form:", email, password, name, nickname, birthdate);
      signUpDB(email, password, name, nickname, birthdate)
       // 입력 필드 값 초기화
    
    setEmail("");
    setPassword("");
    setPasswordCheck("");
    setName("");
    setNickname("");
    setBirthdate("");
    }
  }
  

  const signUpDB= (email, password, name, nickname, birthdate) => {
    console.log(birthdate)
    axios
      .post("https://moviestates-alternative.codestates-seb.link/auth/register", {
         "email": email,
        "password":password,
        "name": name,
        "birth": birthdate.replace(/-/g, ''),
        "nickname": nickname
      })
      
      .then((response) => {
        console.log("200", response.data);
         if (response.status === 200) {
          console.log("회원가입 성공");
           alert("회원가입이 완료되었습니다.");
        }
         })
    .catch((error) => {
      console.log(error.response)
      alert(error.response.data.message)
                      });
  };


  return (
    <div className="signup__box">
      <div className="main_div_box">
      {/* <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={5000}
      >
        {movie_poster_Arr.map((poster, index) => (
          <div className="img__size2" key={index}>
            <div className="poster-container2">
              <img
                className="main__poster2"
                src={poster}
                alt={`Slide ${index + 1}`}
              />
              <div className="gradient"></div> 
            </div>
          </div>
        ))}
      </Carousel> */}
        {/* 👏🏻👏🏻👏🏻👏🏻👏🏻 역시 지해님  *030*  저도 그거 확인해서 지금 그거 className으로 변경해줄려고요!!
 *030*  */}
    </div>
      <main className="signup-page">
        <Link to="/">
        <img className="signup_logo" 
          src="../../public/3D_ft_logo.png" 
          alt="Logo"
          />
          </Link>
        
        <div className="signup-form">
          {/* <h2>회원가입</h2> */}
          <form id="signupForm" onSubmit={handleSubmit}>
          <div className="login__label">
  <span>이메일</span>
  <input
    className="login_input"
    type="email"
    value={email}
    placeholder="아이디를 입력해주세요"
    required
    onChange={handleEmailChange}
    style={{ border: "none" }}
  />
</div>
{errorMessages.email && (
  <p className="error-message">{errorMessages.email}</p>
)}
            
            <div className="login__label">
              <span>비밀번호</span>
              <input className="login_input" type="password" value={password}  placeholder="비밀번호를 입력하세요" required onChange={handlePasswordChange}  />
            </div>
            {errorMessages.password && (
      <p className="error-message">{errorMessages.password}</p>
            )}

            <div className="login__label">
              <span>비밀번호 확인</span>
              <input className="login_input" type="password" value={passwordCheck}  placeholder="비밀번호를 입력하세요" required onChange={handlePasswordCheckChange} />
            </div>
            {errorMessages.passwordCheck && (
      <p className = "error-message">{errorMessages.passwordCheck}</p>
            )}

            <div className="login__label">
              <span>이름</span>
              <input className="login_input" type="text"  value={name} placeholder="이름을 입력하세요" required onChange={handleNameChange} />
            </div>

            <div className="login__label">
              <span>닉네임</span>
              <input className="login_input" type="text"  value={nickname} placeholder="닉네임을 입력하세요" required onChange={handleNicknameChange} />
              </div>

            <div className="login__label">
              <span>생년월일</span>
              <input className="login_input" type="date"
         placeholder="생년월일"
         value={birthdate} onChange={handleBirthdateChange} required/>
            </div>
            {errorMessages.birthdate && (
              <p className="error-message">{errorMessages.birthdate}</p>
            )}


            
            <button className="sign__button" type="submit" onClick={() =>validateForm()}>회원가입</button>
          </form>
          <Link to="/login" className="login_Link">
            회원이신가요?
          </Link>
        </div>
      </main>
    </div>
     )
}
      
export default SignUp;