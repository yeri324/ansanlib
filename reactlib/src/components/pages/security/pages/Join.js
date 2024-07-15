import FormJoin from '../components/Join/FormJoin'
import * as auth from '../apis/auth';
import { useNavigate } from 'react-router-dom';
import Header from '../../../fragments/header/header';

const Join = () => {

  const navigate = useNavigate()

  // 회원가입 요청
  const join = async (form) => {
    console.log(form);

    let response
    let data
    try {
      response = await auth.join(form)
    } catch (error) {
      console.error(`${error}`)
      console.error(`회원가입 요청 중 에러가 발생하였습니다.`);
      return
    }

    data = response.data
    const status = response.status
    console.log(`data : ${data}`);
    console.log(`status : ${status}`);

    if (status == 201) {
      console.log(`회원가입 성공!`);
      alert("회원가입 성공", "메인 화면으로 이동합니다.", "success", () => { navigate("/login") })
    }
    else {
      console.log(`회원가입 실패!`);
      alert("회원가입 실패", "회원가입에 실패하였습니다.", "error")
    }
  }

  //중복 아이디 체크
  const checkId = async (form) => {

    try {
      await auth.getData(form).then((response) => {
        if (response.status == 200) {
          console.log(`사용 가능한 아이디!`);
          alert("사용 가능한 아이디입니다.");
        }
      })

    } catch (error) {
      if (error.response.status == 409) {
        console.log(`사용중인 아이디!`);
        alert("사용 할 수 없는 아이디입니다.")
      }
      else {
        console.log(`오류!`);
        alert("조회 중 오류가 발생하였습니다.")
      }
    }
  }

  //중복 이메일 체크
  const checkEmail = async (form) => {

    try {
      await auth.getData(form).then((response) => {
        if (response.status == 200) {
          console.log(`사용 가능한 이메일!`);
          alert("사용 가능한 이메일입니다.");
        }
      })

    } catch (error) {
      if (error.response.status == 409) {
        console.log(`사용중인 이메일!`);
        alert("사용 할 수 없는 이메일입니다.")
      }
      else {
        console.log(`오류!`);
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
    </>
  )
}

export default Join;