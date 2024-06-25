// import React, { useState } from "react";
// import axios from "axios";


// const FindpwForm= () => {
//     const [formData, setFormData] = useState ( {
//         id:"",
//         name:"",
//         email:"",
        
//     })



// const [verificationStatus, setVerificationStatus] = useState ({
//     idVerified: false,
//     emailVerified: false,
//     nameVerified: false
// });

// const [verificationCode, setVerificationCode] = useState("");
// const [emailCode, setEmailCode] = useState("");
// const [isEmail, setIsEmail] = useState(true);


// const handleIsEmailChange = () => {
//     setIsEmail(!isEmail);
//     setVerificationStatus({
//         ...verificationStatus,
//         emailVerified: false,
//     }); // Reset verification status
// };

// const handleSendCode = () => {
//     if (isEmail) {
//         alert("임시번호가 발송되었습니다.");
//         axios.post('/auth/sendCode', { email: formData.email })
//             .catch(error => alert("임시번호 전송이 실패하였습니다."));
    
//     }
// };

// const verifyUserDetails = () => {
//     const { id, name } = formData;
//     axios.post("/user/verify", { id, name })
//         .then(response => {
//             if (response.status === 200) {
//                 setVerificationStatus({ ...verificationStatus, idVerified: true, nameVerified: true });
//                 alert("사용자 정보가 확인되었습니다.");
//             }
//         })
//         .catch(error => {
//             alert("사용자 정보가 일치하지 않습니다.");
//             console.error(error);
//         });
// };


// return ( 
//     <div className="input-box">
//     <label>
//         아이디<input type="text" value={formData.loginid} onChange={(e) => setFormData({ ...formData, loginid: e.target.value })} />
//     </label>
// </div>



// <div className="input-box">
//     <label>
//      이메일 <input type="text" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
//     </label>
// </div>



// );
// };

// export default FindpwForm;