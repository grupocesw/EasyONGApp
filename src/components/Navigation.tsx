import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import {useTheme} from '@ui-kitten/components';
import {NavigatorHandle} from './Routes';

const HomeNavigator = () => {
  const theme = useTheme();
  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor={theme['color-basic-800']}
        barStyle="dark-content"
      />
      <NavigatorHandle />
    </>
  );
};

export const AppNavigator = () => (
  <>
    <NavigationContainer>
      <HomeNavigator />
    </NavigationContainer>
  </>
);
