import React from 'react';
import FormLogin from '../components/Login/FormLogin';
import Header from '../../../fragments/header/header';

const Login = () => {

    return (
        <>
            <Header />
            <div className='container'>
                <FormLogin />
            </div>
        </>
    )
}

export default Login;