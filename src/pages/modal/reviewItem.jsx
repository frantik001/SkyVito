// import { NavLink } from "react-router-dom";

import {

    ReviewsReview,
    ReviewItem,
    ReviewLeft,
    ReviewImgContainer,
    ReviewImg,
    ReviewRight,
    ReviewNameSpan,
    ReviewTitle,
    ReviewText,
    ReviewName
} from './style/reviewStyle';

const ReviewItems = (reviews) => {
    const dateString = reviews.reviews.created_on;
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });

    return (
        <ReviewsReview>
            <ReviewItem>
                <ReviewLeft>
                    <ReviewImgContainer>
                        <ReviewImg src={`http://localhost:8090/${reviews.reviews.author.avatar}`} />
                    </ReviewImgContainer>
                </ReviewLeft>
                <ReviewRight>
                    <ReviewName>{reviews.reviews.author.name}<ReviewNameSpan>{formattedDate}</ReviewNameSpan></ReviewName>
                    <ReviewTitle>Комментарий</ReviewTitle>
                    <ReviewText>{reviews.reviews.text}</ReviewText>
                </ReviewRight>
            </ReviewItem>
        </ReviewsReview>
    );
};

export default ReviewItems;