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
  ViewAvatar,
} from './styles';
import {useFavorite, useUsers} from '../../Contexts';
import {Avatar, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export const FavoriteScreen = ({navigation}: any) => {
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

  const navigateBack = () => {
    navigation.goBack();
  };

  const RemoveIcon = (props: Object) => (
    <IconKitten {...props} name="heart" fill={'#fff'} />
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
      backgroundColor: '#ffffff',
    },
    layout: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      color: 'red',
      backgroundColor: '#ffffff',
    },
    safeAreaView: {
      backgroundColor: '#ffffff',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    topNavigation: {
      backgroundColor: '#ffffff',
      width: '90%',
      margin: 10,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    submitButtonIcon: {
      color: '#000000',
    },
    erroMsg: {
      color: '#c71919',
    },
  });

  return (
    <ScrollView style={styles.scrollView}>
      <SafeAreaView>
        <TopNavigation
          alignment="center"
          style={styles.topNavigation}
          title={() => (
            <ViewAvatar>
              <Icon
                style={styles.submitButtonIcon}
                name="arrow-left"
                size={15}
                color="black"
                onPress={navigateBack}
              />
              <Avatar
                rounded
                source={{
                  uri:
                    'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                }}>
                <Avatar.Accessory />
              </Avatar>
            </ViewAvatar>
          )}
        />
      </SafeAreaView>
      <Layout style={styles.layout}>
        <Container>
          {favorites.length < 1 && (
            <ErrorMsg>
              <Text h4 style={styles.erroMsg}>
                Nenhum favorito encontrado...
              </Text>
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
                        uri: favorite?.picture?.url,
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
