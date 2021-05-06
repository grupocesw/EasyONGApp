import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  Icon,
  Layout,
  TopNavigation,
} from '@ui-kitten/components';
import {useTheme} from '@ui-kitten/components';
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

export const FavoriteScreen = ({navigation}: any) => {
  const theme = useTheme();
  const [favoritesData, setFavoritesData] = useState<any>(
    [],
  );
  const {favorites, setFavorites}: any = useFavorite();
  const {Token}: any = useUsers();
  useEffect(() => {
    const getFavorites = async () => {
      favorites?.map(async (favorite: number) => {
        const {data} = await api.get(`/ngos/${favorite}`, {
          headers: {Authorization: `Bearer ${Token}`},
        });
        setFavoritesData([...favoritesData, data]);
      });
    };
    getFavorites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favorites, Token, setFavorites]);
  const navigateDetails = (id: number) => {
    navigation.navigate('Details', {itemId: id});
  };

  const RemoveIcon = (props: Object) => (
    <Icon {...props} name="heart" fill={'#fff'} />
  );

  const handleRemoveFavorite = (idOng: number) => {
    const fav = favorites.filter((favorite: number) => {
      return favorite !== idOng && favorite;
    });
    const favData = favoritesData.filter(
      (favoriteData: any) => {
        return favoriteData?.id !== idOng && favoriteData;
      },
    );
    setFavorites(fav);
    setFavoritesData(favData);
  };

  const styles = StyleSheet.create({
    scrollView: {
      width: '100%',
      height: '100%',
      backgroundColor: theme['color-basic-800'],
    },
    layout: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      backgroundColor: theme['color-basic-800'],
    },
  });

  return (
    <ScrollView style={styles.scrollView}>
      <SafeAreaView>
        <TopNavigation
          title="Favoritos"
          alignment="center"
        />
      </SafeAreaView>
      <Layout style={styles.layout}>
        <Container>
          {favorites.length < 1 && (
            <ErrorMsg>
              Nenhum favorito encontrado...
            </ErrorMsg>
          )}
          {favorites &&
            favoritesData?.map(
              (favorite: any, index: number) => (
                <TouchableOpacity
                  onPress={() =>
                    navigateDetails(favorite?.id)
                  }
                  key={index}>
                  <FavoriteItem>
                    <ImageUI
                      source={{
                        uri: favorite?.pictures[0]?.url,
                      }}
                    />
                    <FavoriteButton
                      onPress={() =>
                        handleRemoveFavorite(favorite?.id)
                      }
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
