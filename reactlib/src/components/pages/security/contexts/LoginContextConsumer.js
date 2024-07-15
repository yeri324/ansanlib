import React, { useContext } from 'react'
import { LoginContext } from './LoginContextProvider'

const LoginContextConsumer = () => {
    const { isLogin,isUserId,roles} = useContext(LoginContext)

  return (
    <div>
        <h3>로그인 여부 : {isLogin ? '로그인' : '로그아웃'} </h3>
        <h2>권한 :{isUserId}</h2>
        {console.log(roles)}
    </div>
  )
}

export default LoginContextConsumer