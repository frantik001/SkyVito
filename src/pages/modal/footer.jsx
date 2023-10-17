import { NavLink } from "react-router-dom";
import Icon01 from './img/icon_01.png';
import Icon02 from './img/icon_02.png';
import Icon03 from './img/icon_03.png';
import PropTypes from 'prop-types';

import {
    Footer,
    FooterContainer,
    FooterImg,
    FooterImgContainer
} from './style/footerStyle';

const FooterAll = ({ media }) => {
    return (
        <Footer media={media}>
            <FooterContainer>
                <FooterImgContainer>
                    <NavLink to={`/`} replace>
                        <FooterImg src={Icon01} />
                    </NavLink>
                </FooterImgContainer>
                <FooterImgContainer>
                    <NavLink to={`/addnewat`} replace>
                        <FooterImg src={Icon02} />
                    </NavLink>
                </FooterImgContainer>
                <FooterImgContainer>
                    <NavLink to={`/profile`} replace>
                        <FooterImg src={Icon03} />
                    </NavLink>
                </FooterImgContainer>
            </FooterContainer>
        </Footer>
    );
};

FooterAll.propTypes = {
  media: PropTypes.string,
};

FooterAll.defaultProps = {
  media: '768px',
};

export default FooterAll;