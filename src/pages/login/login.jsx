import logoModal from './img/logo_modal.png';
import { Wrapper, GlobalStyle } from './style/globalStyle';
import { NavLink } from "react-router-dom";
import FooterAll from '../modal/footer';
import { useLoginUserMutation } from '../../services/servises';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import {
    ContainerEnter,
    ModalBlock,
    ModalFormLogin,
    ModalLogo,
    ModalLogoImg,
    ModalInput,
    ModalInputPassword,
    ModalBtnEnter,
    ModalBtnSignup
} from './style/loginStyle';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginUser, { data }] = useLoginUserMutation();

    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();
        const userData = { email, password };
        loginUser(userData);
    }
    //-----------------------------------------------------------------
    useEffect(() => {
        if (data) {
            navigate("/profile", { replace: true });
        } else {
            console.log('ошибки!!!');
        }
    }, [data, navigate]);
    //-------------------------------------------------------------

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    return (
        <>
            <GlobalStyle />
            <Wrapper>
                <ContainerEnter>
                    <ModalBlock>
                        <ModalFormLogin id="formLogIn" action="#">
                            <ModalLogo>
                                <NavLink to={`/profile`} replace>
                                    <ModalLogoImg src={logoModal} alt="logo"></ModalLogoImg>
                                </NavLink>
                            </ModalLogo>
                            <ModalInput
                                onChange={handleEmailChange}
                                type="text"
                                name="login"
                                id="formlogin"
                                placeholder="email"
                            />
                            <ModalInputPassword
                                onChange={handlePasswordChange}
                                type="password"
                                name="password"
                                id="formpassword"
                                placeholder="Пароль"
                            />
                            <ModalBtnEnter id="btnEnter" onClick={handleLogin}>Войти</ModalBtnEnter>
                            <NavLink to={`/registaration`} replace>
                                <ModalBtnSignup id="btnSignUp" >Зарегистрироваться</ModalBtnSignup>
                            </NavLink>
                        </ModalFormLogin>
                        <FooterAll media="768px" />
                    </ModalBlock>
                </ContainerEnter>
            </Wrapper>
        </>
    );
};

export default Login;