import React from 'react';
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
import {
  FavoriteItem,
  ItemTitle,
  ItemDescription,
  FavoriteButton,
  Container,
  ImageUI,
} from './styles';
import {useFavorite, useUsers} from '../../Contexts';

export const FavoriteScreen = ({navigation}: any) => {
  const theme = useTheme();

  const {Favorites, setFavorites}: any = useFavorite();

  const {User}: any = useUsers();

  const navigateDetails = (id: number) => {
    navigation.navigate('Details', {itemId: id});
  };

  const RemoveIcon = (props: Object) => (
    <Icon {...props} name="heart" fill={'#fff'} />
  );

  const handleRemoveFavorite = (idOng: any) => {
    const fav = Favorites[User.id].filter(
      (favorite: any) => favorite !== idOng,
    );
    setFavorites({
      [User.id]: [...fav],
    });
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
          {Favorites &&
            Favorites[User?.id] &&
            Favorites[User.id]?.map(
              (favorite: any, index: number) => (
                <TouchableOpacity
                  onPress={() =>
                    navigateDetails(favorite?.id)
                  }
                  key={index}>
                  <FavoriteItem>
                    <ImageUI
                      source={{
                        uri:
                          'https://via.placeholder.com/150/771796',
                      }}
                    />
                    <FavoriteButton
                      onPress={() =>
                        handleRemoveFavorite(favorite)
                      }
                      accessoryLeft={(props) =>
                        RemoveIcon({...props})
                      }
                    />
                  </FavoriteItem>
                  <ItemTitle>{favorite.name}</ItemTitle>
                  <ItemDescription>
                    {favorite.description}
                  </ItemDescription>
                </TouchableOpacity>
              ),
            )}
        </Container>
      </Layout>
    </ScrollView>
  );
};
