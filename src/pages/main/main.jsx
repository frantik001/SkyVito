import Main from './components/mainNotReg';

import { Wrapper, GlobalStyle } from '../../pages/main/style/globalStyle';

function MainScreen() {
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Main />
      </Wrapper>
    </>
  );
}

export default MainScreen;
