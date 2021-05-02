import React, {useState, useEffect} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import api from './services/api';
import * as eva from '@eva-design/eva';
import {
  ApplicationProvider,
  IconRegistry,
  Spinner as Loading,
} from '@ui-kitten/components';
import {AppNavigator} from './components/Navigation';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {
  AppContext,
  FavoritesContext,
  OngsContext,
  UsersContext,
} from './Contexts';
import * as Data from './data';
import Wrapper from './components/Wrapper';
import {
  Favorites as FavoritesData,
  Users as UsersData,
} from './data/ongs';
import {Ongs as OngType} from './interfaces/Ong';
import {useTheme} from '@ui-kitten/components';

export default () => {
  const [Ongs, setOngs] = useState<OngType>([]);
  const [Favorites, setFavorites] = useState(FavoritesData);
  const [User, setUser] = useState(UsersData);
  const [Ongsloading, setOngsLoad] = useState<Boolean>(
    true,
  );
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#222b45',
    },
  });

  useEffect(() => {
    function getData() {
      api.get('ngos').then(({data}: any) => {
        setOngs(data?.content);
        setOngsLoad(false);
      });
    }
    getData();
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <AppContext.Provider value={{...Data}}>
          <UsersContext.Provider value={{User, setUser}}>
            <OngsContext.Provider
              value={{
                Ongs,
                setOngs,
              }}>
              <FavoritesContext.Provider
                value={{Favorites, setFavorites}}>
                <IconRegistry icons={EvaIconsPack} />
                <ApplicationProvider
                  {...eva}
                  theme={eva.dark}>
                  {Ongsloading ? (
                    <Wrapper>
                      <Loading size="large" />
                    </Wrapper>
                  ) : (
                    <AppNavigator />
                  )}
                </ApplicationProvider>
              </FavoritesContext.Provider>
            </OngsContext.Provider>
          </UsersContext.Provider>
        </AppContext.Provider>
      </SafeAreaView>
    </>
  );
};
