import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types';

import {
  CardsCard,
  CardImageContainer,
  CardTitle,
  CardPrice,
  CardPlace,
  CardDate,
  CardsItem,
  CardImage,
  CardContainer,
} from "./style/cardsItemStyle";

const Cardsitem = ({ id, title, price, place, date, myAdvt, picture }) => {
  return (
    <CardsItem>
      <CardsCard>
        <NavLink
          to={myAdvt ? `/product/${myAdvt}/${id}` : `/product/${id}`}
          replace
        >
          <CardImageContainer>
            <CardImage src={picture} alt="picture" />
          </CardImageContainer>
        </NavLink>
        <CardContainer>
          <NavLink
            to={myAdvt ? `/product/${myAdvt}/${id}` : `/product/${id}`}
            replace
          >
            <CardTitle>{title}</CardTitle>
          </NavLink>
          <CardPrice>{price} ₽</CardPrice>
          <CardPlace>{place}</CardPlace>
          <CardDate>{date}</CardDate>
        </CardContainer>
      </CardsCard>
    </CardsItem>
  );
};

Cardsitem.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    place: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    myAdvt: PropTypes.string,
    picture: PropTypes.string.isRequired,
  };

export default Cardsitem;
