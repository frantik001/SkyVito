import { useNavigate } from "react-router-dom";
import { Wrapper, GlobalStyle } from "../../globalStyle";
import {
  ErrorBlock,
  ErrorTitle,
  ErrorSubTitle,
  ErrorImg,
  ErrorText,
  ErrorBtn,
} from "./style/errorStyle";
import smileCrying from "/img/smileCrying.png";

const Error = () => {
  const navigate = useNavigate();

  const handleReturnHome = () => {
    navigate("/");
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <ErrorBlock>
          <ErrorTitle>404</ErrorTitle>
          <ErrorSubTitle>
            <ErrorImg src={smileCrying} />
          </ErrorSubTitle>
          <ErrorText>
            Возможно, она была удалена или перенесена на другой адрес
          </ErrorText>
          <ErrorBtn onClick={handleReturnHome}>Вернуться на главную</ErrorBtn>
        </ErrorBlock>
      </Wrapper>
    </>
  );
};

export default Error;
