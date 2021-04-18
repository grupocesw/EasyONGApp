import React, {useContext} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Icon, Layout, TopNavigation} from '@ui-kitten/components';
import {useTheme} from '@ui-kitten/components';
import {
  FavoriteItem,
  ItemTitle,
  ItemDescription,
  FavoriteButton,
  Container,
  ImageUI,
} from './styles';
import {FavoritesContext, UsersContext} from '../../Contexts';

export const FavoriteScreen = ({navigation}: any) => {
  const theme = useTheme();

  const {Favorites, setFavorites}: any = useContext(FavoritesContext);

  const pictures = [
    'https://cdn-istoe-ssl.akamaized.net/wp-content/uploads/sites/14/2020/04/ajuda-ongs.jpg',
    'https://impactosocial.esolidar.com/wp-content/uploads/2020/05/ONG-confiavel-como-transmitir-a-sua-mensagem.png',
    'https://impactosocial.esolidar.com/wp-content/uploads/2020/06/O-papel-das-ONGs-nas-metas-globais-das-Nac%CC%A7o%CC%83es-Unidas.jpg',
    'https://nossacausa.com/wp-content/uploads/2014/09/ongs.jpg',
    'https://observatorio3setor.org.br/wp-content/uploads/2017/03/2013_September_SocialGood_SocialMediaForSocialGood_Image-portal.jpg',
    'https://static.poder360.com.br/2019/01/ONG-Brasil.png',
    'https://exame.com/wp-content/uploads/2020/12/ongs-empresas-filantropia.jpg',
    'https://www.tamarthi.com.br/wp-content/uploads/2019/12/como-abrir-uma-ong.jpg',
    'https://static.wixstatic.com/media/bec156_a6e0560b562b402c850245c15d8bc600~mv2.png/v1/fill/w_689,h_435,al_c,lg_1,q_90/bec156_a6e0560b562b402c850245c15d8bc600~mv2.webp',
  ];

  const {User}: any = useContext(UsersContext);

  const navigateDetails = (id: number) => {
    navigation.navigate('Details', {itemId: id});
  };

  const RemoveIcon = (props: any) => (
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
        <TopNavigation title="Favoritos" alignment="center" />
      </SafeAreaView>
      <Layout style={styles.layout}>
        <Container>
          {Favorites[User.id] &&
            Favorites[User.id]?.map((favorite: any, index: any) => (
              <TouchableOpacity
                onPress={() => navigateDetails(favorite?.id, index)}
                key={index}>
                <FavoriteItem>
                  <ImageUI source={{uri: pictures[index]}} />
                  <FavoriteButton
                    onPress={() => handleRemoveFavorite(favorite)}
                    accessoryLeft={(props) => RemoveIcon({...props})}
                  />
                </FavoriteItem>
                <ItemTitle>{favorite.name}</ItemTitle>
                <ItemDescription>{favorite.description}</ItemDescription>
              </TouchableOpacity>
            ))}
        </Container>
      </Layout>
    </ScrollView>
  );
};
