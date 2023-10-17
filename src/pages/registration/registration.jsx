// import React, { useContext, useState, useEffect } from 'react';

// import Logo from '../img/logo.png';
import logoModal from './img/logo_modal.png';
import { Wrapper, GlobalStyle } from './style/globalStyle';
import FooterAll from '../modal/footer';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from '../../services/servises';

import {
    ModalBtnSignupEnt,
    ContainerSignup,
    ModalBlock,
    ModalFormLogin,
    ModalLogo,
    LogoImg,
    ModalInput
} from './style/registrationStyle';

const Registration = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [city, setCity] = useState('');
    const [phone, setPhone] = useState('');


    const navigate = useNavigate();
    const [registerUser, { data }] = useRegisterUserMutation();

    const handleRegister = (event) => {
        event.preventDefault();
        if (password === repeatPassword) {

            const userData = { email, password, name, surname, city, phone };
            registerUser(userData);

        } else {
            alert("Пароли не совпадают")
        };
    };

    useEffect(() => {
        if (data) {
            navigate("/login", { replace: true });
        } else {
            console.log('ошибки!!!');
        }
    }, [data]);


    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleRepeatPasswordChange = (event) => {
        setRepeatPassword(event.target.value);
    }

    const handleFirstNameChange = (event) => {
        setName(event.target.value);
    }

    const handleLastNameChange = (event) => {
        setSurname(event.target.value);
    }

    const handleCityChange = (event) => {
        setCity(event.target.value);
    }

    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    }

    return (
        <>
            <GlobalStyle />
            <Wrapper>
                <ContainerSignup>
                    <ModalBlock>
                        <ModalFormLogin id="formLogIn" action="#">
                            <ModalLogo>
                                <LogoImg src={logoModal} alt="logo" />
                            </ModalLogo>
                            <ModalInput type="text" name="login" id="loginReg" placeholder="email" onChange={handleEmailChange} />
                            <ModalInput type="password" name="password" id="passwordFirst" placeholder="Пароль" onChange={handlePasswordChange} />
                            <ModalInput type="password" name="password" id="passwordSecond" placeholder="Повторите пароль" onChange={handleRepeatPasswordChange} />
                            <ModalInput type="text" name="first-name" id="first-name" placeholder="Имя (необязательно)" onChange={handleFirstNameChange} />
                            <ModalInput type="text" name="first-last" id="first-last" placeholder="Фамилия (необязательно)" onChange={handleLastNameChange} />
                            <ModalInput type="text" name="city" id="city" placeholder="Город (необязательно)" onChange={handleCityChange} />
                            <ModalInput type="phone" name="phone" id="phone" placeholder="Телефон (необязательно)" onChange={handlePhoneChange} />
                            <ModalBtnSignupEnt onClick={handleRegister} id="btnSignUp">Зарегистрироваться</ModalBtnSignupEnt>
                        </ModalFormLogin>
                    </ModalBlock>
                </ContainerSignup>
                <FooterAll media="768px" />
            </Wrapper>
        </>
    );
};

export default Registration;