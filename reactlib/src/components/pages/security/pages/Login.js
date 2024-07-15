import React from 'react';
import FormLogin from '../components/Login/FormLogin';
import Header from '../../../fragments/header/header';
import Footer from "../../../fragments/footer/footer";

const Login = () => {

    return (
        <>
            <Header />
            <div className='container'>
                <FormLogin />
            </div>
            <Footer />
        </>
    )
}

export default Login;