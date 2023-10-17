// import React, { useContext, useState, useEffect } from 'react';
import Logo from './img/logo.png';
import LogoMob from './img/logo-mob.png';
import FooterAll from '../modal/footer';
import CardsItem from '../modal/cardsitem';
import { useParams } from "react-router-dom";

import { NavLink } from "react-router-dom";
import { Wrapper, GlobalStyle } from './style/globalStyle';
import React, { useState, useEffect } from 'react';
import { useGetAlladvtQuery } from '../../services/servises';

import {
    Container,
    Header,
    HeaderNav,
    HeaderBtnMainEnter,
    MainContainer,
    HeaderBtnLk,
    MainCenterBlock,
    HeaderLogo,
    LogoMobImg,
    MainMenu,
    MenuLogoLink,
    MenuLogoImg,
    MenuForm,
    MenuBtn,
    MainH2,
    MainProfileSell,
    ProfileSellContent,
    ProfileSellSeller,
    SellerLeft,
    SellerImgContainer,
    SellerImg,
    SellerRight,
    SellerTitle,
    SellerCity,
    SellerInf,
    SellerImgMobBlock,
    SellerImgMobContainer,
    SellerImgMob,
    SellerBtn,
    SellerBtnSpan,
    MainTitle,
    MainContent,
    Cards
} from './style/sellerStyle';

const MainNotReg = () => {
    let { id } = useParams();
    const { data } = useGetAlladvtQuery();
    const [adv, setAdv] = useState();
    const [showPhone, setShowPhone] = useState(false);
    const [sellerAdvs, setSellerAdvs] = useState([]);

    const showPhoneClick = () => {
        setShowPhone(true)
    };

    useEffect(() => {
        let i = 0
        let idToNumber = parseInt(id);
        for (i = 0; i < data?.length; i++) {
            if (data[i].id === idToNumber) {
                setAdv(data[i])
                break;
            }

        }
    }, [data, id]);

    useEffect(() => {
        if (adv?.user) {
            let userId = adv.user_id;
            let sellerAdvs = data.filter(item => item.user_id === userId);
            setSellerAdvs(sellerAdvs);
        }
    }, [adv, data]);

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
                            <NavLink to={`/profile`} replace>
                                <HeaderBtnLk>Личный кабинет</HeaderBtnLk>
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
                                <MainH2>Профиль продавца</MainH2>
                                <MainProfileSell>
                                    <ProfileSellContent>
                                        <ProfileSellSeller>
                                            <SellerLeft>
                                                <SellerImgContainer>
                                                    <SellerImg src={`http://localhost:8090/${adv?.user.avatar}`} />
                                                </SellerImgContainer>
                                            </SellerLeft>
                                            <SellerRight>
                                                <SellerTitle>{adv?.user.name}</SellerTitle>
                                                <SellerCity>{adv?.user.city}</SellerCity>
                                                <SellerInf>Продает товары с {adv?.user.sells_from}</SellerInf>
                                                <SellerImgMobBlock>
                                                    <SellerImgMobContainer>
                                                        <SellerImgMob src={`http://localhost:8090/${adv?.user.avatar}`} />
                                                    </SellerImgMobContainer>
                                                </SellerImgMobBlock>
                                                <SellerBtn onClick={showPhoneClick}>Показать&nbsp;телефон
                                                    <SellerBtnSpan>
                                                        {!showPhone
                                                            ? `${adv?.user.phone.substring(0, 1)}${adv?.user.phone.substring(1, 4)} XXX XX XX`
                                                            : adv?.user.phone
                                                        }
                                                    </SellerBtnSpan>
                                                </SellerBtn>
                                            </SellerRight>
                                        </ProfileSellSeller>
                                    </ProfileSellContent>
                                </MainProfileSell>
                                <MainTitle>Товары продавца</MainTitle>
                            </MainCenterBlock>
                            <MainContent>
                                <Cards>
                                    {sellerAdvs?.map((item) => (
                                        <CardsItem
                                            key={item?.id}
                                            id={item.id}
                                            title={item.title}
                                            price={item.price}
                                            place={item.user.city}
                                            date={item.created_on.split("T")[0]}
                                            picture={`http://localhost:8090/${item.images[0]?.url}`}
                                        />
                                    ))}
                                </Cards>
                            </MainContent>
                        </MainContainer>
                    </main >
                    <FooterAll media="580px" />
                </Container>
            </Wrapper>
        </>
    );
};

export default MainNotReg;