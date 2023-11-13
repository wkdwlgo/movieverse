import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import Login from "./Login";
import SignUp from "./SignUp";

export default function Header({isLogin, userInfor}) {
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState("");
/* 팀쟝님 화이팅이에오💪💪  히히 우리팀 짱짱!*/
  
  const handleSearchKeywordChange = (e) => setSearchKeyword(e.target.value);
  const handleClickSearch = () => {
  if (searchKeyword === "") {
    alert("검색어를 입력해주세요.");
  } else {
    setSearchKeyword(""); // 검색어 초기화
    navigate("/search", { state: { keyword: searchKeyword } });
  }
};
  console.log(isLogin)
  console.log(userInfor)
   const handleLogout = () => {
    localStorage.removeItem("token"); // 토큰 삭제
    localStorage.removeItem("userInfor");
    navigate("/"); // 메인페이지로 이동
  };
  return (
    <div className="header__box">
      <div className="header__align">
        <Link to="/">
          <img
            className="header_logo_img"
            src="../../public/3D_logo.png"
            alt="logo"
          />
        </Link>
        <div className="nav-links">
          <div className="search__box">
            <div className="search__input">
              <input
                type="text"
                placeholder="검색어를 입력해주세요"
                value={searchKeyword}
                onChange={handleSearchKeywordChange}
                required
              />
                <button className="search__button" onClick={handleClickSearch}>
                  <img className="search__icon" src="../../public/search.svg" />
                </button>
            </div>
          </div>
         {localStorage.getItem("token")?
          (<div className="Logined__btn hd_sign">
            <span>{localStorage.getItem("userInfor") ? JSON.parse(localStorage.getItem("userInfor")).nickname : ''}님</span>
            <Link className="sign_el" to="/">마이페이지</Link>
            <button className="sign_el" onClick= {handleLogout}>로그아웃</button>
          </div>)
          :(<div className="unLogined__btn hd_sign">
            <Link className="sign_el" to="/login">로그인</Link>
            <Link className="sign_el" to="/signup">회원가입</Link>
          </div>)}
        </div>
      </div>
    </div>
  );
}
