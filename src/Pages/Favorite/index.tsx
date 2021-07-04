import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  Icon as IconKitten,
  Layout,
  TopNavigation,
} from '@ui-kitten/components';
import api from '../../services/api';
import {
  FavoriteItem,
  ItemTitle,
  ItemDescription,
  FavoriteButton,
  Container,
  ImageUI,
  ErrorMsg,
} from './styles';
import {useFavorite, useUsers} from '../../Contexts';
import {
  Divider,
  Overlay,
  Text,
} from 'react-native-elements';

export const FavoriteScreen = ({navigation}: any) => {
  const [favoritesData, setFavoritesData] = useState<any>(
    [],
  );
  const {favorites}: any = useFavorite();
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState('');
  const {Token}: any = useUsers();

  if (!Token) {
    navigation.navigate('Login');
  }

  useEffect(() => {
    const handleFavorites = async () => {
      await api
        .get('/auth/favorite-ngos', {
          headers: {Authorization: `Bearer ${Token}`},
        })
        .then(({data}: any) => {
          setFavoritesData(data?.content);
        })
        .catch((err: any) => {
          setVisible(true);
          setError(JSON.stringify(err).substr(0, 100));
        });
    };
    handleFavorites();
  }, [Token, favorites]);

  const navigateDetails = (id: number) => {
    navigation.navigate('Details', {itemId: id});
  };

  const RemoveIcon = (props: Object) => (
    <IconKitten {...props} name="heart" fill={'#fafafa'} />
  );

  const handleFavorite = async (OngItem: any) => {
    await api
      .put(
        `/auth/favorite-ngos/${OngItem?.id}`,
        {},
        {
          headers: {Authorization: `Bearer ${Token}`},
        },
      )
      .then(() => {
        setFavoritesData(
          favoritesData?.filter(
            (favorite: any) => favorite.id !== OngItem?.id,
          ),
        );
      })
      .catch((err: any) => {
        setVisible(true);
        setError(JSON.stringify(err).substr(0, 100));
      });
  };

  const styles = StyleSheet.create({
    scrollView: {
      width: '100%',
      height: '100%',
      backgroundColor: '#fafafa',
    },
    layout: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      color: 'red',
      backgroundColor: '#fafafa',
    },
    safeAreaView: {
      backgroundColor: '#fafafa',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    titleTopNavigation: {
      fontSize: 18,
      fontWeight: '700',
    },
    submitButtonIcon: {
      color: '#000000',
    },
    erroMsg: {
      color: '#c71919',
    },
  });

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <ScrollView style={styles.scrollView}>
      <SafeAreaView>
        <Overlay
          isVisible={visible}
          onBackdropPress={toggleOverlay}>
          <Text>
            Um problema inesperado ocorreu. Erro: -{error}
          </Text>
        </Overlay>
        <TopNavigation
          alignment="center"
          title={() => (
            <Text style={styles.titleTopNavigation}>
              Favoritos
            </Text>
          )}
        />
        <Divider />
      </SafeAreaView>
      <Layout style={styles.layout}>
        <Container>
          {favoritesData?.length < 1 && (
            <ErrorMsg>
              <Text h4 style={styles.erroMsg}>
                Nenhum favorito encontrado...
              </Text>
            </ErrorMsg>
          )}
          {favoritesData?.map(
            (favorite: any, index: number) => (
              <TouchableOpacity
                onPress={() =>
                  navigateDetails(favorite?.id)
                }
                key={index}>
                <FavoriteItem>
                  <ImageUI
                    source={{
                      uri: favorite?.picture?.url,
                    }}
                  />
                  <FavoriteButton
                    onPress={() => handleFavorite(favorite)}
                    accessoryLeft={(props) =>
                      RemoveIcon({...props})
                    }
                  />
                </FavoriteItem>
                <ItemTitle>{favorite?.name}</ItemTitle>
                <ItemDescription>
                  {favorite?.description}
                </ItemDescription>
              </TouchableOpacity>
            ),
          )}
        </Container>
      </Layout>
    </ScrollView>
  );
};
