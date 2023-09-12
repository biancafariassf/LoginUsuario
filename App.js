import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { Routes } from './src/routes';

import { UserProvider } from './src/contexts/useUser';

function App() {
  GoogleSignin.configure({
    webClientId: '741722450327-fjftchg44bqohvempomeiisbd372ug7d.apps.googleusercontent.com',
  });

  return (
    <NavigationContainer>
      <UserProvider>
        <Routes />
      </UserProvider>
    </NavigationContainer>
  );
}

export default App;
