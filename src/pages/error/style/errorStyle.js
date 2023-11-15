import styled from "styled-components";

export const ErrorBlock = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

export const ErrorTitle = styled.h1`
  font-size: 168px;
  line-height: 128px;
`;

export const ErrorSubTitle = styled.h2`
  font-size: 40px;
  display: flex;
`;

export const ErrorImg = styled.img``;

export const ErrorText = styled.p`
  line-height: 24px;
  width: 284px;
  font-size: 18px;
  text-align: center;
`;

export const ErrorBtn = styled.button`
  width: 275px;
  height: 52px;
  background: #009ee4;
  border-radius: 6px;
  border: none;
  color: #fff;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  transition: 0.3s;

  &:hover {
    background: #0080c1;
  }
`;
