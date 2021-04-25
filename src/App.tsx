import React from 'react';
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
  return (
    <>
      <AppProvider>
        <UsersProvider>
          <OngProvider>
            <FavoritesProvider>
              <IconRegistry icons={EvaIconsPack} />
              <ApplicationProvider
                {...eva}
                theme={eva.dark}>
                <AppNavigator />
              </ApplicationProvider>
            </FavoritesProvider>
          </OngProvider>
        </UsersProvider>
      </AppProvider>
    </>
  );
};
