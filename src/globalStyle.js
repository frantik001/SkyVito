import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: "Roboto";
  src: url("/fonts/Roboto-Regular.ttf");
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

h1,
h2,
h3,
button,
body {
  font-family: "Roboto", "sans-serif";
}

  *:before,
  *:after {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  }

  a,
  a:visited {
  text-decoration: none;
  font-family: 'Roboto', sans-serif;
  cursor: pointer;
  }

  button,
  ._btn {
  cursor: pointer;
  }

  ul li {
  list-style: none;
  }

  div,
  button,
  a,
  body {
  font-family: 'Roboto', sans-serif;
  }
`;

export const Wrapper = styled.div`
  background-color: #f1f1f1;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
`;
