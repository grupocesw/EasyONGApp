import React, {useEffect} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import * as eva from '@eva-design/eva';
import {
  ApplicationProvider,
  IconRegistry,
} from '@ui-kitten/components';
import {AppNavigator} from './components/Navigation';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {
  AppProvider,
  FavoritesProvider,
  UsersProvider,
  OngProvider,
} from './Contexts';
import SplashScreen from 'react-native-splash-screen';

export default () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
  });

  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <>
      <SafeAreaView style={styles.container}>
        <AppProvider>
          <UsersProvider>
            <OngProvider>
              <FavoritesProvider>
                <IconRegistry icons={EvaIconsPack} />
                <ApplicationProvider
                  {...eva}
                  theme={eva.light}>
                  <AppNavigator />
                </ApplicationProvider>
              </FavoritesProvider>
            </OngProvider>
          </UsersProvider>
        </AppProvider>
      </SafeAreaView>
    </>
  );
};
