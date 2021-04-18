import React, {useState, useContext, useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import api from '../../services/api';
import {
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction,
  Text,
  Spinner as Loading,
} from '@ui-kitten/components';
import {
  ImgView,
  TextView,
  OngCard,
  ItemTitle,
  ItemDescription,
  ListItemBox,
  FavoriteButton,
  // ShareButton,
} from './styles';
import {FavoritesContext, UsersContext} from '../../Contexts';
import Wrapper from '../../components/Wrapper';
const BackIcon = (props: any) => <Icon {...props} name="arrow-back" />;

function DetailsScreen({route, navigation}: any) {
  const {itemId, indice} = route.params;
  const {Favorites, setFavorites}: any = useContext(FavoritesContext);
  const {User}: any = useContext(UsersContext);
  const [Ongloading, setOngLoad] = useState<any>(true);
  const [Ong, setOng] = useState<any>({});

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

  useEffect(() => {
    //setFavorites(undefined);
    function getOng() {
      setOngLoad(true);
      api
        .get(`ngos/${itemId}`)
        .then((data: any) => {
          setOng(data?.data);
          setOngLoad(false);
        })
        .catch(() => {
          setOngLoad(false);
        });
    }
    getOng();
  }, [itemId]);

  const navigateBack = () => {
    navigation.goBack();
  };

  let active = false;
  for (let i = 0; i < Favorites[User.id]?.length; i++) {
    Favorites[User.id][i]?.id === itemId ? (active = true) : (active = false);
  }

  const handleFavorite = (OngItem: any) => {
    setFavorites({
      [User.id]: Favorites[User.id]
        ? [...Favorites[User.id], OngItem]
        : [OngItem],
    });
  };

  const ArrowIcon = (props: any) => (
    <Icon fill="#ffffff" name="chevron-right" {...props} />
  );

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const FavoriteIcon = (props: any) => (
    <Icon
      {...props}
      size="30"
      name="heart"
      fill={props.active ? '#f00946' : 'rgba(0, 0, 0, 0.54)'}
    />
  );

  // const ShareIcon = (props: any) => (
  //   <Icon {...props} size="30" name="share" fill={'rgba(0, 0, 0, 0.54)'} />
  // );

  return (
    <>
      {Ongloading ? (
        <Wrapper>
          <Loading />
        </Wrapper>
      ) : (
        <SafeAreaView>
          <TopNavigation
            title="Detalhes"
            alignment="center"
            accessoryLeft={BackAction}
          />
          <ScrollView style={styles.scrollView}>
            <Layout style={styles.layout}>
              <View style={styles.container}>
                <ImgView source={{uri: pictures[indice]}} />
                <LinearGradient
                  colors={['transparent', 'black']}
                  style={styles.linearGradient}>
                  <TextView style={styles.text}>{Ong?.name}</TextView>
                </LinearGradient>
              </View>
              <OngCard>
                <FavoriteButton
                  onPress={() => !active && handleFavorite(Ong)}
                  accessoryLeft={(props) => FavoriteIcon({...props, active})}
                />
                {/* <ShareButton
                  accessoryLeft={(props) => ShareIcon({...props, active: true})}
                /> */}
                <ItemTitle>Descrição</ItemTitle>
                <ItemDescription>{Ong?.description}</ItemDescription>
                <ListItemBox
                  title={() => <Text>Transparência</Text>}
                  accessoryRight={ArrowIcon}
                  // onPress={() => navigation.navigate('Profile', {name: 'Jane'})}
                />
                <ListItemBox
                  title={() => <Text>Informações de Contato</Text>}
                  accessoryRight={ArrowIcon}
                />
              </OngCard>
            </Layout>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    width: '100%',
    backgroundColor: 'transparent',
  },
  layout: {
    marginBottom: 100,
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linearGradient: {
    justifyContent: 'center',
    width: '100%',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  text: {
    top: '20%',
  },
});

export {DetailsScreen};
