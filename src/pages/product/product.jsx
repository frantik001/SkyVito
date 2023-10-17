/* eslint-disable no-unused-vars */
/* eslint-disable no-debugger */
// import React, { useContext, useState, useEffect } from 'react';
import Logo from './img/logo.png';
import LogoMob from './img/logo-mob.png';
import FooterAll from '../modal/footer';
import { useParams } from "react-router-dom";
import { useGetAlladvtQuery } from '../../services/servises';
import { NavLink } from "react-router-dom";
import { Wrapper, GlobalStyle } from './style/globalStyle';
import React, { useState, useEffect } from 'react';
import { useDeleteAdvtMutation } from '../../services/servises';
import { useRefreshTokenMutation } from '../../services/servises';
import { useNavigate } from "react-router-dom";

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
    Maintitle,
    MainContent,
    MainText,
    MainArtic,
    ArticContent,
    ArticleLeft,
    ArticleImgContainer,
    ArticleFillImg,
    ArticleImg,
    ArticleImgBar,
    ArticleImgBarDiv,
    ArticleImgBarDivImg,
    ArticleImgBarMob,
    ImgBarMobCircle,
    ArticleRight,
    ArticleBlock,
    ArticleTitle,
    ArticleInfo,
    ArticleDate,
    ArticleCity,
    ArticleLink,
    ArticlePrice,
    ArticleAuthor,
    AuthorImgContainer,
    AuthorImg,
    AuthorCont,
    AuthorName,
    AuthorAbout,
    ArticleBtn,
    ArticleBtnSpan,
    ArticleBtnBlock,
    ArticleBtnRemove,
    ArticleBtnRedact,
    StyledNavLink
} from './style/productStyle';

const Product = () => {
    const [adv, setAdv] = useState();
    const [selectedImg, setSelectedImg] = useState();
    const [nextImg, setNextImg] = useState(0);
    const [showPhone, setShowPhone] = useState(false);
    const [bigPicture, setBigPicture] = useState(2);
    const { data } = useGetAlladvtQuery();
    const [deleteAdvt] = useDeleteAdvtMutation();
    const [refreshToken] = useRefreshTokenMutation();
    let { id, myadvt } = useParams();
    const navigate = useNavigate();

    const handleDeletedAdvt = async () => {
        await refreshToken()
        deleteAdvt(id)
        navigate("/profile", { replace: true });
    };

    const handleSelectImg = (event) => {
        setSelectedImg(event.target.src)
    };

    const showPhoneClick = () => {
        setShowPhone(true)
    };

    const handleNextPhotoClick = () => {
        const nextIndex = (nextImg + 1) % adv?.images.length;
        setNextImg(nextIndex);
        setSelectedImg(`http://localhost:8090/${adv?.images[nextIndex]?.url}`);
    };

    const HandleImgBarMobCircle = () => {
        const nextIndex = (nextImg + 1) % adv?.images.length;
        setNextImg(nextIndex);
        setSelectedImg(`http://localhost:8090/${adv?.images[nextIndex]?.url}`);
    };

    useEffect(() => {
        let i = 0
        let idNum = parseInt(id);
        for (i = 0; i < data?.length; i++) {
            if (data[i].id === idNum) {
                setAdv(data[i])
                break;
            }
        }
    }, [data, id]);

    useEffect(() => {
        setSelectedImg(`http://localhost:8090/${adv?.images[0]?.url}`)
    }, [adv]);

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
                                <HeaderBtnMainEnter >Разместить объявление</HeaderBtnMainEnter>
                            </NavLink>
                            <NavLink to={`/profile`} replace>
                                <HeaderBtnLk >Личный кабинет</HeaderBtnLk>
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
                            </MainCenterBlock>
                        </MainContainer>
                        <MainArtic>
                            <ArticContent>
                                <ArticleLeft>
                                    <ArticleFillImg >
                                        <ArticleImgContainer>
                                            <ArticleImg onClick={handleNextPhotoClick} src={selectedImg && selectedImg} />
                                        </ArticleImgContainer>
                                        <ArticleImgBar>
                                            {adv?.images?.slice(0, 5).map((image, index) => (
                                                <ArticleImgBarDiv key={index}>
                                                    <ArticleImgBarDivImg
                                                        onClick={handleSelectImg}
                                                        src={`http://localhost:8090/${image?.url}`}
                                                    />
                                                </ArticleImgBarDiv>
                                            ))}
                                        </ArticleImgBar>
                                        <ArticleImgBarMob containerWidth={`${adv?.images?.length * 11.333}px`}>
                                            {adv?.images?.map((img, index) => (
                                                <ImgBarMobCircle onClick={HandleImgBarMobCircle} id={index} key={index} active={nextImg === index ? '#FFFFFF' : ''} />
                                            ))}
                                        </ArticleImgBarMob>
                                    </ArticleFillImg>
                                </ArticleLeft>
                                <ArticleRight>
                                    <ArticleBlock>
                                        <ArticleTitle>{adv?.title}</ArticleTitle>
                                        <ArticleInfo>
                                            <ArticleDate>{adv?.created_on.split("T")[0]}</ArticleDate>
                                            <ArticleCity>{adv?.user.city}</ArticleCity>
                                            <NavLink to={`/reviews`} replace>
                                                <NavLink to={`/reviews/${id}`} replace>
                                                    <ArticleLink>отзывы</ArticleLink>
                                                </NavLink>
                                            </NavLink>
                                        </ArticleInfo>
                                        <ArticlePrice>{adv?.price} ₽</ArticlePrice>
                                        <ArticleBtn myadvt={myadvt ? 'none' : ''} onClick={showPhoneClick}>Показать&nbsp;телефон
                                            <ArticleBtnSpan>
                                                {!showPhone
                                                    ? `${adv?.user.phone.substring(0, 1)}${adv?.user.phone.substring(1, 4)} XXX XX XX`
                                                    : adv?.user.phone
                                                }
                                            </ArticleBtnSpan>
                                        </ArticleBtn>
                                        <ArticleBtnBlock myadvt={!myadvt ? 'none' : 'flex'}>
                                            <StyledNavLink to={`/settings/${id}`} replace>
                                                <ArticleBtnRedact>Редактировать</ArticleBtnRedact>
                                            </StyledNavLink>
                                            <ArticleBtnRemove onClick={handleDeletedAdvt}>Снять с публикации</ArticleBtnRemove>
                                        </ArticleBtnBlock>
                                        <ArticleAuthor>
                                            <AuthorImgContainer>
                                                <AuthorImg src={`http://localhost:8090/${adv?.user.avatar}`} />
                                            </AuthorImgContainer>
                                            <AuthorCont>
                                                <NavLink to={myadvt ? '/profile' : `/seller/${id}`} replace>
                                                    <AuthorName>{adv?.user.name}</AuthorName>
                                                </NavLink>
                                                <AuthorAbout>Продает товары с&nbsp;{adv?.user.sells_from}</AuthorAbout>
                                            </AuthorCont>
                                        </ArticleAuthor>
                                    </ArticleBlock>
                                </ArticleRight>
                            </ArticContent>
                        </MainArtic>
                        <MainContainer>
                            <Maintitle>
                                Описание товара
                            </Maintitle>
                            <MainContent>
                                <MainText>
                                    {adv?.description}
                                </MainText>
                            </MainContent>
                        </MainContainer>
                    </main >
                    <FooterAll media="768px" />
                </Container>
            </Wrapper>
        </>
    );
};

export default Product;