import React from 'react';

import GlobalStyle from './styles/global';

import SingIn from './pages/SignIn';
import SingUp from './pages/SignUp';

import { AuthProvider } from './hooks/AuthContext';

const App: React.FC = () => (
  <>
    <AuthProvider>
      <SingIn />
    </AuthProvider>
    <GlobalStyle />
  </>
);

export default App;
