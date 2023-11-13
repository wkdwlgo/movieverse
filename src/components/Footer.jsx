import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer__box">
      <div className="footer_align">
        <img className="logo" src="	../../public/3D_ft_logo.png" />
        <div className="footer__info">
          <div>
            <ul className="f_menu">
              <li>
                <a href="#">회사소개</a>
              </li>
              <li>
                <a href="#">개인정보처리방침</a>
              </li>
              <li>
                <a href="#">팀원소개</a>
              </li>
            </ul>
          </div>
          <p>배급사 : 코드스테이츠</p>
          <address>
            상호명: 주식회사 코드스테이츠 | 대표자명: 김인기 | 사업장주소:
            서울특별시 강남구 테헤란로 415, 8층 코드스테이츠
            <br />
            사업자번호: 703-88-00878 | 유료직업소개사업등록번호: (국내)
            제2023-3220250-14-5-00024호
          </address>
          <p>Copyright 2023. CodeState-Team6. All rights reversed.</p>
        </div>
      </div>
    </div>
  );
}
