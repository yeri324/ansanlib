import React, { useContext, useEffect, useState } from 'react';
import Header from '../../../fragments/header/header';
import Footer from "../../../fragments/footer/footer";
import FormUser from '../components/User/FormUser'
import * as auth from '../apis/auth';
import { LoginContext } from '../contexts/LoginContextProvider';

const User = () => {

    const [userInfo, setUserInfo] = useState()
    const { logout } = useContext(LoginContext)

    // 사용자 정보 조회 
    const getUserInfo = async () => {
        const response = await auth.info()
        const data = response.data
        setUserInfo(data)
    }

    // 회원 정보 수정
    const updateUser = async (form) => {

        let response
        let data
        try {
            response = await auth.update(form)
        } catch (error) {
            console.error(`${error}`)
            console.error(`회원수정 중 에러가 발생하였습니다.`);
            return
        }

        data = response.data
        const status = response.status

        if (status == 200) {
            alert("회원수정 성공 로그아웃 후, 다시 로그인해주세요.")
        }
        else {
            alert("회원수정에 실패하였습니다.")
        }
    }

    // 회원 탈퇴
    const deleteUser = async (userId) => {

        let response
        let data
        try {
            response = await auth.remove(userId)
        } catch (error) {
            console.error(`${error}`)
            console.error(`회원삭제 중 에러가 발생하였습니다.`);
            return
        }

        data = response.data
        const status = response.status

        if (status == 200) {
            alert("회원탈퇴 성공")
        }
        else {
            alert("회원탈퇴에 실패하였습니다.")
        }
    }

    useEffect(() => {
        getUserInfo()
    }, [])

    return (
        <>
            <Header />
            <div className='container'>
                <FormUser userInfo={userInfo} updateUser={updateUser} deleteUser={deleteUser} />
            </div>
            <Footer />
        </>
    )
}

export default User