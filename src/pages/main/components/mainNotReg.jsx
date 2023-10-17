import CardsItem from "../../modal/cardsitem";
import Logo from '../img/logo.png';
import LogoMob from '../img/logo-mob.png';
import { NavLink } from "react-router-dom";
import FooterAll from '../../modal/footer';
import React, { useState, useEffect } from 'react';
import { useGetAlladvtQuery } from '../../../services/servises';

import {
    Container,
    Header,
    HeaderNav,
    HeaderBtnMainEnter,
    MainSearch,
    SearchLogoLink,
    SearchLogoImg,
    SearchLogoMobLink,
    SearchLogoMobImg,
    SearchForm,
    SearchText,
    SearchTextMob,
    SearchBtn,
    MainContainer,
    MainH2,
    MainContent,
    ContentCards
} from '../style/mainNotRegStyle';

const MainNotReg = () => {
    const { data } = useGetAlladvtQuery();
    const [searchInputValue, setSearchInputValue] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleSearchInputChange = (event) => {
        setSearchInputValue(event.target.value);
    };

    const HandleSearchClick = async (event) => {
        event.preventDefault();
        SearchProducts(data, searchInputValue)
    }

    const SearchProducts = async (data, keyword) => {
        const regex = new RegExp(keyword, 'i');
        const results = data.filter(product => regex.test(product?.title) || regex.test(product?.description));
        setSearchResults(results);
    }

    useEffect(() => {
        if (data) {
            setSearchResults(data);
        }
    }, [data]);

    return (
        <Container>
            <Header>
                <HeaderNav>
                    <NavLink to={localStorage.user_register_id ? `/profile` : `/registaration`} replace>
                        <HeaderBtnMainEnter>Вход в личный кабинет</HeaderBtnMainEnter>
                    </NavLink>
                </HeaderNav>
            </Header>
            <main>
                <MainSearch>
                    <SearchLogoLink>
                        <SearchLogoImg src={Logo}></SearchLogoImg>
                    </SearchLogoLink>
                    <SearchLogoMobLink>
                        <SearchLogoMobImg src={LogoMob}></SearchLogoMobImg>
                    </SearchLogoMobLink>
                    <SearchForm>
                        <SearchText onChange={handleSearchInputChange}
                            type="search"
                            placeholder="Поиск по объявлениям"
                            name="search" />
                        <SearchTextMob
                            type="search"
                            placeholder="Поиск"
                            name="search-mob" />
                        <SearchBtn
                            onClick={HandleSearchClick}>
                            Найти
                        </SearchBtn>
                    </SearchForm>
                </MainSearch>
                <MainContainer>
                    <MainH2>Объявления</MainH2>
                    <MainContent>
                        <ContentCards>
                            {searchResults === '' ? data.map((item) => (
                                <CardsItem
                                    key={item.id}
                                    id={item.id}
                                    title={item.title}
                                    price={item.price}
                                    place={item.user.city}
                                    date={item.created_on.split("T")[0]}
                                    picture={`http://localhost:8090/${item.images[0]?.url}`}
                                />
                            )) :
                                searchResults.map((item) => (
                                    <CardsItem
                                        key={item.id}
                                        id={item.id}
                                        title={item.title}
                                        price={item.price}
                                        place={item.user.city}
                                        date={item.created_on.split("T")[0]}
                                        picture={`http://localhost:8090/${item.images[0]?.url}`}
                                    />
                                ))}
                        </ContentCards>
                    </MainContent>
                </MainContainer>
            </main >
            <FooterAll media="590px" />
        </Container>
    );
};

export default MainNotReg;