import React from 'react';

import GlobalStyle from './styles/global';

import SingIn from './pages/SignIn';
import SingUp from './pages/SignUp';

const App: React.FC = () => (
  <>
    <SingIn />
    <GlobalStyle />
  </>
);

export default App;
