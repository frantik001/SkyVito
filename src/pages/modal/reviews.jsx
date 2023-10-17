import { Wrapper, GlobalStyle } from './style/globalStyle';
import ReviewItems from './reviewItem';
import { useParams } from "react-router-dom";
import { useGetAdvtCommentsQuery } from "../../services/servises";
import { useRefreshTokenMutation } from '../../services/servises';
import { NavLink } from "react-router-dom";
import { useSetCommentMutation } from '../../services/servises';
import React, { useState, useEffect } from 'react';

import {
    ContainerBg,
    ModalBlock,
    ModalTitle,
    ModalBtnClose,
    ModalBtnCloseLine,
    ModalContent,
    ModalScroll,
    ModalFormNewArt,
    FormNewArtBlock,
    FormNewArtLabel,
    FormNewArtArea,
    FormNewArtBtnPub,
    ModalReviews,
} from './style/reviewStyle';

const MainNotReg = () => {
    const [text, setText] = useState('');
    const [authorized, setAuthorized] = useState(false);
    const [setComment] = useSetCommentMutation();
    const [inputAndAvaFilled, setInputAndAvaFilled] = useState();
    let { id } = useParams();
    const { data: getAdvtComments } = useGetAdvtCommentsQuery(id);
    const [refreshToken] = useRefreshTokenMutation();

    const handleSaveChanges = async (event) => {
        event.preventDefault();
        const textArea = document.querySelector('textarea');
        textArea.value = '';
        await refreshToken();
        await setComment({ id, text });
        getAdvtComments.refetch();
    };

    const handleChanges = (event) => {
        setText(event.target.value);
        setInputAndAvaFilled(event.target.value)
    };

    useEffect(() => {
        if (localStorage.getItem("access_token")) {
            setAuthorized(true)
        }
        return
    }, []);

    return (
        <>
            <GlobalStyle />
            <Wrapper>
                <ContainerBg>
                    <ModalBlock>
                        <ModalContent>
                            <ModalTitle>Отзывы о товаре</ModalTitle>
                            <ModalBtnClose>
                                <NavLink to={`/product/${id}`} replace>
                                    <ModalBtnCloseLine></ModalBtnCloseLine>
                                </NavLink>
                            </ModalBtnClose>
                            <ModalScroll>
                                <ModalFormNewArt display={authorized ? 'flex' : 'none'}>
                                    <FormNewArtBlock>
                                        <FormNewArtLabel for="text">Добавить отзыв</FormNewArtLabel>
                                        <FormNewArtArea onChange={handleChanges} name="text" id="formArea" cols="auto" rows="5"
                                            placeholder="Введите описание"></FormNewArtArea>
                                    </FormNewArtBlock>
                                    <FormNewArtBtnPub
                                        active={inputAndAvaFilled == '' ? '#D9D9D9' : '#009EE4'}
                                        activeHover={inputAndAvaFilled == '' ? '#D9D9D9' : '#0080C1'}
                                        onClick={handleSaveChanges}>
                                        Опубликовать
                                    </FormNewArtBtnPub>
                                </ModalFormNewArt>
                                <ModalReviews>
                                    {getAdvtComments && getAdvtComments.map((item) => (
                                        <ReviewItems key={item.id} reviews={item} />
                                    ))}
                                </ModalReviews>
                            </ModalScroll>

                        </ModalContent>
                    </ModalBlock>
                </ContainerBg>
            </Wrapper>
        </>
    );
};

export default MainNotReg;