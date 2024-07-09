import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import { LoginContext } from '../../contexts/LoginContextProvider';

const Header = () => {

  // const { isLogin, logout, userInfo } = useContext(LoginContext);
  const { isLogin, login, logout } = useContext(LoginContext);

  return (
    <header>
      <div className="util">
      <Link to="/">메인</Link>
        {
          !isLogin
            ?
            <ul>
              <li><Link to="/login">로그인</Link></li>
              <li><Link to="/join">회원가입</Link></li>
              <li><Link to="/about">소개</Link></li>
            </ul>
            :
            <ul>
              <li><Link to="/user">마이페이지</Link></li>
              <li><button onClick={()=>logout()} >로그아웃</button></li>
            </ul>
        }


      </div>
    </header>
  )
}

export default Header;