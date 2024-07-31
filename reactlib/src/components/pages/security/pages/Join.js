import FormJoin from '../components/Join/FormJoin'
import * as auth from '../apis/auth';
import { useNavigate } from 'react-router-dom';
import Header from '../../../fragments/header/header';
import Footer from "../../../fragments/footer/footer";

const Join = () => {

  const navigate = useNavigate()

  // 회원가입 요청
  const join = async (form) => {

    let response
    let data
    try {
      response = await auth.join(form)
    } catch (error) {
      console.error(`회원가입 요청 중 에러가 발생하였습니다.`);
      return
    }

    data = response.data
    const status = response.status


    if (status == 201) {
      alert("가입이 완료되었습니다.");
      window.location.reload(navigate("/login", { replace: true }));
    }
    else {
      alert("회원가입에 실패하였습니다.")
    }
  }

  //중복 아이디 체크
  const checkId = async (form) => {

    try {
      await auth.getData(form).then((response) => {
        if (response.status == 200) {
          alert("사용 가능한 아이디입니다.");
        }
      })

    } catch (error) {
      if (error.response.status == 409) {
        alert("사용 할 수 없는 아이디입니다.")
      }
      else {
        alert("조회 중 오류가 발생하였습니다.")
      }
    }
  }

  //중복 이메일 체크
  const checkEmail = async (form) => {

    try {
      await auth.getData(form).then((response) => {
        if (response.status == 200) {
          alert("사용 가능한 이메일입니다.");
        }
      })

    } catch (error) {
      if (error.response.status == 409) {
        alert("사용 할 수 없는 이메일입니다.")
      }
      else {
        alert("조회 중 오류가 발생하였습니다.")
      }
    }
  }
  return (
    <>
      <Header />
      <div className='container'>
        <FormJoin join={join} checkId={checkId} checkEmail={checkEmail} />
      </div>
      <Footer />
    </>
  )
}

export default Join;