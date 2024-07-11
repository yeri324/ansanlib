import React, { createContext, useEffect, useState } from 'react';
import api from '../apis/api';
import Cookies from 'js-cookie';
import * as auth from '../apis/auth';
import { useNavigate, useResolvedPath } from 'react-router-dom';
// import * as Swal from '../apis/alert';


export const LoginContext = createContext();
LoginContext.displayName = 'LoginContextName'


const LoginContextProvider = ({ children }) => {

    const navigate = useNavigate() // 페이지 이동
    const [isLogin, setLogin] = useState(false); // 로그인 여부
    const [isLoginInProgress, setLoginInProgress] = useState(true) //로그인 진행중 여부. 처음 페이지가 로드됬을때는 로그인 진행중이라고 가정함.
    const [isUserId,setIsUserId] = useState(null) // 유저 아이디 정보
    const [roles, setRoles] = useState({isUser : false, isAdmin : false}) // 권한 정보
    const [remberUserId, setRemberUserId] = useState() // 아이디 저장

  

    //  로그인 체크
    const loginCheck = async () => {

        // 쿠키에서 jwt 토큰 가져오기
        const accessToken = Cookies.get("accessToken")
        console.log(`accessToekn : ${accessToken}`);


        // Token이 없음
        if( !accessToken ) {
            console.log(`쿠키에 accessToken(jwt) 이 없음`);
            // 로그아웃 세팅
            logoutSetting()
            return
        }
        
        // Token이 있음
        // header에 jwt 담기
        api.defaults.headers.common.Authorization = `Bearer ${accessToken}`

        // 사용자 정보 요청
        let response
        let data

        try {
            response = await auth.info()
        } catch (error) {
            console.log(`error : ${error}`);
            console.log(`status : ${response.status}`);
            return;
        }

        data = response.data
        console.log(`data : ${data}`);

        // 인증 실패
        if( data == 'UNAUTHRIZED' || response.status == 401 ) {
            console.error(`accessToken (jwt) 이 만료되었거나 인증에 실패하였습니다.`);
            return
        }

        // 인증 성공
        console.log(`accessToek (jwt) 로큰으로 사용자 인증정보 요청 성공!`);

        // 로그인 세팅
        loginSetting(data, accessToken)
    }


    // 로그인 
    const login = async (loginid, password) => {

        console.log(`loginid : ${loginid}`);
        console.log(`password : ${password}`);

        try {
            const response = await auth.login(loginid, password)
            const data = response.data
            const status = response.status
            const headers = response.headers
            const authroization = headers.authorization
            const accessToken = authroization.replace("Bearer ", "")  // 💍 JWT

            console.log(`data : ${data}`);
            console.log(`status : ${status}`);
            console.log(`headers : ${headers}`);
            console.log(`jwt : ${accessToken}`);

            // 로그인 성공
            if( status === 200 ) {
                // 쿠키에 accessToken저장
                Cookies.set("accessToken", accessToken)

                // 로그인 체크
                loginCheck()
                
                alert("로그인 성공 메인 화면으로 갑니다.", () => { navigate("/")})

                // 메인 페이지로 이동
                navigate("/")
            }
        } catch (error) {
            // 로그인 실패
            alert("로그인 실패 아이디 또는 비밀번호가 일치하지 않습니다." )
        }

    }

    // 로그아웃
    const logout = (force=false) => {

        if( force ) {
            // 로그아웃 세팅
            logoutSetting()
        
            // 페이지 이동 ➡ "/" (메인)
            navigate("/")
            return
        }        

        const check = window.confirm(`로그아웃하시겠습니까?`)

        if( check ) {
            // 로그아웃 세팅
            logoutSetting()

            // 메인 페이지로 이동
            navigate("/")
        }

    }


    // 로그인 세팅
    const loginSetting = (userData, accessToken) => {

        const { userId, loginid, role } = userData
        console.log(`no : ${userId}`);
        console.log(`userId : ${loginid}`);
        console.log(`authList : ${role}`);

        // axios 객체의 header(Authorization : `Bearer ${accessToken}`)
        api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

        // 로그인 여부 : true
        setLogin(true)
        
        // 유저아이디 세팅
        setIsUserId(userId)

        // 권한정보 세팅
        const updatedRoles = { isUser : false, isAdmin : false }

        if( role == 'ROLE_USER' ) updatedRoles.isUser = true
        if( role == 'ROLE_ADMIN' ) updatedRoles.isAdmin = true
        setRoles(updatedRoles)
    }

    // 로그아웃 세팅
    const logoutSetting = () => {
        // axios 헤더 초기화
        api.defaults.headers.common.Authorization = undefined;

        // 쿠키 초기화
        Cookies.remove("accessToken")

        // 로그인 여부 : false
        setLogin(false)

        // 유저 정보 초기화
        setIsUserId(null)

        // 권한 정보 초기화
        setRoles({isUser : false, isAdmin : false})
    }

    
    useEffect( () => {
        // 로그인 체크
        setLoginInProgress(true); //로그인 진행중 설정
        loginCheck().then(() => setLoginInProgress(false), () => setLoginInProgress(false)); //로그인 체크가 성공하거나 실패시 로그인 진행중 false로 변경
    }, [])



    return ( 
        <LoginContext.Provider value={ {isLogin, isLoginInProgress, isUserId, roles, loginCheck, login,logout} }>
            {children}
        </LoginContext.Provider>
    )
}

export default LoginContextProvider