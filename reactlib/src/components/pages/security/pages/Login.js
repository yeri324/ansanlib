import React from 'react';
import FormLogin from '../components/Login/FormLogin';
import Header from '../../../fragments/header/header';
import Footer from "../../../fragments/footer/footer";

const Login = () => {

    return (
        <>
            <Header />
                <FormLogin />
            <Footer />
        </>
    )
}

export default Login;