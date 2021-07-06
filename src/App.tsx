import React, {useEffect} from 'react';
import { StyleSheet, SafeAreaView, LogBox } from 'react-native';
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
  LogBox.ignoreLogs(['Warning: Cannot update a component from inside the function body of a different component','Warning: Failed prop type: Invalid prop `value` of type `object` supplied to `ForwardRef(TextInput)`, expected `string`.']); // Ignore log by message
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fafafa',
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
