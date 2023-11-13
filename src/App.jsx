import React, { useState, useEffect } from "react";
import "./App.css";
import MovieList from "./components/MovieList";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main_Background from "./components/Main_Background";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieDetail from "./components/MovieDetail";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import MovieSearch from "./components/MovieSearch";

export default function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [userToken, setUserToken] = useState('');
  const [userInfor, setUserInfor] = useState(null);
    
   useEffect(() => {
  if(localStorage.getItem("token"))
  {
    setIsLogin(true)
    setUserToken(localStorage.getItem("token"))
  }
     else{
       setIsLogin(false)
       setUserToken('')
     }
}, []);
  
  
useEffect(() => {
  if (isLogin && userToken) {
    console.log(userToken);
    const USER_API = "https://moviestates-alternative.codestates-seb.link/users/me";
    fetch(USER_API, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => response.json())
    .then((result) => {
      setUserInfor(result);
      localStorage.setItem("userInfor", JSON.stringify(result));
      console.log(result); // 여기서 출력된 값이 업데이트된 userInfor 값과 일치해야 합니다.
    })
    .catch((e) => console.log(e));
  }
}, [userToken]);
  
  return (
    <BrowserRouter>
     <Header isLogin={isLogin} userInfor={userInfor} />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Main_Background />
                <MovieList />
              </>
            }
          />
          <Route path="/movie/:movieId" element={<MovieDetail isLogin={isLogin} userInfor={userInfor} userToken={userToken} />} />
          <Route path="/login" element={<Login setIsLogin={setIsLogin} setUserToken={setUserToken}/>} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/search" element={<MovieSearch />} />
        </Routes>
        <Footer />
      </main>
    </BrowserRouter>
  );
}
