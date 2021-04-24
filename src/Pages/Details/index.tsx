import React, {
  useState,
  useContext,
  useEffect,
} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
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
import {
  FavoritesContext,
  UsersContext,
} from '../../Contexts';

import Wrapper from '../../components/Wrapper';

const BackIcon = (props: any) => (
  <Icon {...props} name="arrow-back" />
);

function DetailsScreen({route, navigation}: any) {
  const {itemId} = route.params;
  const {Favorites, setFavorites}: any = useContext(
    FavoritesContext,
  );

  const {User}: any = useContext(UsersContext);
  const [Ongloading, setOngLoad] = useState<any>(true);
  const [Ong, setOng] = useState<any>({});

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
    Favorites[User.id][i]?.id === itemId
      ? (active = true)
      : (active = false);
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
    <TopNavigationAction
      icon={BackIcon}
      onPress={navigateBack}
    />
  );

  const FavoriteIcon = (props: any) => (
    <Icon
      {...props}
      size="30"
      name="heart"
      fill={
        props.active ? '#f00946' : 'rgba(0, 0, 0, 0.54)'
      }
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
                <ImgView
                  source={{
                    uri:
                      'https://via.placeholder.com/150/771796',
                  }}
                />
                <LinearGradient
                  colors={['transparent', 'black']}
                  style={styles.linearGradient}>
                  <TextView style={styles.text}>
                    {Ong?.name}
                  </TextView>
                </LinearGradient>
              </View>
              <OngCard>
                <FavoriteButton
                  onPress={() =>
                    !active && handleFavorite(Ong)
                  }
                  accessoryLeft={(props) =>
                    FavoriteIcon({...props, active})
                  }
                />
                {/* <ShareButton
                  accessoryLeft={(props) => ShareIcon({...props, active: true})}
                /> */}
                <ItemTitle>Descrição</ItemTitle>
                <ItemDescription>
                  {Ong?.description}
                </ItemDescription>
                <ListItemBox
                  title={() => <Text>Transparência</Text>}
                  accessoryRight={ArrowIcon}
                  // onPress={() => navigation.navigate('Profile', {name: 'Jane'})}
                />
                <ListItemBox
                  title={() => (
                    <Text>Informações de Contato</Text>
                  )}
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
