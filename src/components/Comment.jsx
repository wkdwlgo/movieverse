import React from "react";
import "./Comment.css";
import dummyComment from "../static/dummyComment";

export default function Comment(props) {
  // const parsedDate = new Date(props.createdAt).toLocaleDateString("ko-kr");
  //삭제 기능
  //삭제 버튼에 대한 이벤트 핸들러 함수 만들기
  //함수 내부에 들어가는 코드 -> 전체 트윗 배열을 업데이트하는 코드
  //특정 트윗만 없어지도록 배열을 필터링
  //트윗을 특정할 수 있는 정보 ->트윗 객체의 id
  //이벤트 핸들러 함수 호출시에 해당 트윗의 id를 전달인자로 넣어 호출
  //그리고 해당 id를 가지고 배열을 필터링

  // const handleDelete = () => {
  //   //tweets 배열에서 id와 일치하는 요소만 필터링한 새로운 배열 만들기
  //   onDelete(tweet.id);
  // };

  // console.log(props.comment.user);
  return (
    <ul>
      <li className="comment" id={props.comment.id}>
        <div className="comment__profile">
          <img src="../../public/beaver.png" alt="Profile" />
        </div>

        <div className="comment__content">
          <div className="comment__userInfo">
            <div className="comment__userInfo--wrapper">
              <span className="comment__username">
                {props.comment.user.nickname}
              </span>
              {/* TODO : 유져 이름이 있어야 합니다. */}
              {/* <span className='comment__createdAt'>{parsedDate}</span> */}
              <span className="comment__averageScore">
                ⭐️{props.comment.score}
              </span>
            </div>
          </div>
          <div className="comment__message">{props.comment.content}</div>
        </div>
        {/* <div className="comment__content">
          {props.content}
         
              {/* <span className='comment__createdAt'>{parsedDate}</span> */}

        {/* {onDelete && (
              <button className="deleteButton" onClick={handleDelete}>
                <i className="fa-solid fa-trash-can"></i>
              </button>
            )} */}
      </li>
    </ul>
  );
}
