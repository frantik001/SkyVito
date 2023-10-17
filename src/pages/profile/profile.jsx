/* eslint-disable no-debugger */
import Logo from './img/logo.png';
import LogoMob from './img/logo-mob.png';
import FooterAll from '../modal/footer';
import CardsItem from '../modal/cardsitem';

import { NavLink } from "react-router-dom";
import { Wrapper, GlobalStyle } from './style/globalStyle';
import { useGetCurrentUserMutation } from '../../services/servises';
import { useRefreshTokenMutation } from '../../services/servises';
import { useEditUserDataMutation } from '../../services/servises';
import { useUploadUserAvatarMutation } from '../../services/servises';
import { useGetCurrentUserAdvtQuery } from '../../services/servises';
import React, { useState, useEffect } from 'react';

import {
    Container,
    Header,
    HeaderNav,
    HeaderBtnMainEnter,
    MainContainer,
    MainTitle,
    MainContent,
    MainCenterBlock,
    HeaderLogo,
    LogoMobImg,
    MainMenu,
    MenuLogoLink,
    MenuLogoImg,
    MenuForm,
    MenuBtn,
    MainH2,
    MainProfile,
    ProfileContent,
    ProfileTitle,
    ProfileSettings,
    SettingsLeft,
    SettingsChangePhoto,
    SettingsRight,
    SettingsForm,
    SettingsDiv,
    SettingsFormLabel,
    SettingsFormInput,
    SettingsBtn,
    SettingsPhoneInput,
    SettingsImgContainer,
    SettingsImg,
    ContentCards,
    SettingsChangePhotoLable,
    SettingsChangePhotoButton,
    QuitAccount
} from './style/profileStyle';

const Profile = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [city, setCity] = useState('');
    const [phone, setPhone] = useState('');
    const [inputAndAvaFilled, setInputAndAvaFilled] = useState();
    const [saveButtonActive, setSaveButtonActive] = useState(false);
    const [imgSelected, setImgSelected] = useState([]);

    const [getCurrentUser, { data: currentUser }] = useGetCurrentUserMutation();
    const [editUserData] = useEditUserDataMutation();
    const [uploadUserAvatar] = useUploadUserAvatarMutation();
    const { data } = useGetCurrentUserAdvtQuery();
    const [refreshToken] = useRefreshTokenMutation();

    const handleSaveChanges = async (event) => {
        event.preventDefault();
        await refreshToken();
        const userData = { phone, name, surname, city };
        editUserData(userData);
        setSaveButtonActive(false)
        getCurrentUser()
    };

    const handleQuit = async () => {
        localStorage.clear()
    };

    const handleAvatarClick = (event) => {
        event.preventDefault();
        const fileUpload = document.getElementById('file-upload');
        fileUpload.click();
        fileUpload.addEventListener('change', () => {
            if (fileUpload.files && fileUpload.files[0]) {
                setSaveButtonActive(true);
            }
        });
    }

    const handleAvatarUpload = (event) => {
        event.preventDefault();
        const selectedFile = event.target.files[0];
        if (!selectedFile) {
            console.log('Файл не выбран');
        } else {
            const formData = new FormData();
            formData.append('file', selectedFile);
            setInputAndAvaFilled(true)
            uploadUserAvatar(formData)

            const selectedImg = URL.createObjectURL(selectedFile)
            setImgSelected([{ selectedImg }])

        };
    }

    useEffect(() => {
        const fetchUserData = async () => {
            await refreshToken();
            await getCurrentUser();
        };
        fetchUserData();
    }, []);

    const handleNameChange = (event) => {
        setName(event.target.value);
        setInputAndAvaFilled(event.target.value)
    };

    const handleSurnameChange = (event) => {
        setSurname(event.target.value);
        setInputAndAvaFilled(event.target.value)
    };

    const handleCityChange = (event) => {
        setCity(event.target.value);
        setInputAndAvaFilled(event.target.value)
    }

    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
        setInputAndAvaFilled(event.target.value)
    }

    useEffect(() => {
        const inputs = document.querySelectorAll('input');
        let allAreEmpty = true;
        inputs.forEach(input => {
            if (input.value.trim() !== '') {
                allAreEmpty = false;
            }
        });

        if (allAreEmpty) {
            setSaveButtonActive(false)
        } else {
            setSaveButtonActive(true)
        }
    }, [inputAndAvaFilled]);

    useEffect(() => {
        if (currentUser) {
            console.log(currentUser, 'currentUser')
        }
        return
    }, [currentUser]);

    useEffect(() => {
        setName(localStorage.user_register_name)
        setSurname(localStorage.user_register_surname)
        setCity(localStorage.user_register_city)
        setPhone(localStorage.user_register_phone)
    }, [currentUser]);

    return (
        <>
            <GlobalStyle />
            <Wrapper>
                <Container>
                    <Header>
                        <HeaderNav>
                            <HeaderLogo>
                                <NavLink to={`/`} replace>
                                    <LogoMobImg src={LogoMob} />
                                </NavLink>
                            </HeaderLogo>
                            <NavLink to={`/addnewat`} replace>
                                <HeaderBtnMainEnter>Разместить объявление</HeaderBtnMainEnter>
                            </NavLink>
                            <NavLink to={`/`} replace>
                                <QuitAccount onClick={handleQuit}>Выйти из личного кабинета</QuitAccount>
                            </NavLink>
                        </HeaderNav>
                    </Header>
                    <main>
                        <MainContainer>
                            <MainCenterBlock>
                                <MainMenu>
                                    <MenuLogoLink>
                                        <MenuLogoImg src={Logo} alt="logo" />
                                    </MenuLogoLink>
                                    <MenuForm>
                                        <NavLink to={`/`} replace>
                                            <MenuBtn id="btnGoBack">Вернуться на&nbsp;главную</MenuBtn>
                                        </NavLink>
                                    </MenuForm>
                                </MainMenu>
                                <MainH2>Здравствуйте, {name}!</MainH2>
                                <MainProfile>
                                    <ProfileContent>
                                        <ProfileTitle>Настройки профиля</ProfileTitle>
                                        <ProfileSettings>
                                            <SettingsLeft>
                                                <SettingsImgContainer>
                                                    <SettingsImg
                                                        src={imgSelected === undefined ? '' :
                                                            (imgSelected[0]?.selectedImg ? imgSelected[0]?.selectedImg : `http://localhost:8090/${currentUser?.avatar}`)}
                                                    />
                                                </SettingsImgContainer >
                                                <SettingsChangePhotoLable for="file-upload">
                                                    <SettingsChangePhotoButton
                                                        onClick={handleAvatarClick}>
                                                        Загрузить
                                                    </SettingsChangePhotoButton>
                                                </SettingsChangePhotoLable>
                                                <SettingsChangePhoto
                                                    id="file-upload"
                                                    type="file"
                                                    onChange={handleAvatarUpload}
                                                />
                                            </SettingsLeft>
                                            <SettingsRight>
                                                <SettingsForm>
                                                    <SettingsDiv>
                                                        <SettingsFormLabel for="settings-fname">Имя</SettingsFormLabel>
                                                        <SettingsFormInput
                                                            onChange={handleNameChange}
                                                            id="settings-fname"
                                                            name="fname"
                                                            type="text"
                                                            defaultValue={name} />
                                                    </SettingsDiv>
                                                    <SettingsDiv>
                                                        <SettingsFormLabel for="lname">Фамилия</SettingsFormLabel>
                                                        <SettingsFormInput onChange={handleSurnameChange}
                                                            id="settings-fname"
                                                            name="fname"
                                                            type="text"
                                                            defaultValue={surname} />
                                                    </SettingsDiv>
                                                    <SettingsDiv>
                                                        <SettingsFormLabel for="city">Город</SettingsFormLabel>
                                                        <SettingsFormInput onChange={handleCityChange}
                                                            id="settings-fname"
                                                            name="fname"
                                                            type="text"
                                                            defaultValue={city} />
                                                    </SettingsDiv>
                                                    <SettingsDiv>
                                                        <SettingsFormLabel for="phone">Телефон</SettingsFormLabel>
                                                        <SettingsPhoneInput onChange={handlePhoneChange}
                                                            id="settings-fname"
                                                            name="fname"
                                                            type="text"
                                                            defaultValue={phone} />
                                                    </SettingsDiv>
                                                    <SettingsBtn
                                                        active={!saveButtonActive ? '#D9D9D9' : '#009EE4'}
                                                        activeHover={!saveButtonActive ? '#D9D9D9' : '#0080C1'}
                                                        onClick={handleSaveChanges}
                                                        id="settings-btn">
                                                        Сохранить
                                                    </SettingsBtn>
                                                </SettingsForm>
                                            </SettingsRight>
                                        </ProfileSettings>
                                    </ProfileContent>
                                </MainProfile>
                                <MainTitle>Мои товары</MainTitle>
                            </MainCenterBlock>

                            <MainContent>
                                {data ? <ContentCards>
                                    {data.map((item) => (
                                        <CardsItem
                                            key={item?.id}
                                            myAdvt='myAdvt'
                                            id={item?.id}
                                            title={item?.title}
                                            price={item?.price}
                                            place={currentUser?.city}
                                            date={item.created_on?.split("T")[0]}
                                            picture={`http://localhost:8090/${item.images[0]?.url}`}
                                        />
                                    ))}
                                </ContentCards> : null}
                            </MainContent>
                        </MainContainer>
                    </main >
                    <FooterAll media="620px" />
                </Container>
            </Wrapper>
        </>
    );
};

export default Profile;