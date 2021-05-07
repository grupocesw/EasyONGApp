import React from 'react';
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

export default () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#222b45',
    },
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
