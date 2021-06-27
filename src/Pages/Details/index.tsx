import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Share from 'react-native-share';
import LinearGradient from 'react-native-linear-gradient';
import api from '../../services/api';
import {
  Icon as IconNative,
  Layout,
  TopNavigation,
  Text,
  Spinner,
} from '@ui-kitten/components';
import {
  ImgView,
  TextView,
  OngCard,
  ItemTitle,
  ItemDescription,
  ListItemBox,
  FavoriteButton,
  ShareButton,
} from './styles';
import {useUsers, useFavorite} from '../../Contexts';
import ViewShot from 'react-native-view-shot';
import Wrapper from '../../components/Wrapper';
import {Ong} from '../../interfaces/Ong';
import {Overlay} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNFS from 'react-native-fs';

function DetailsScreen({route, navigation}: any) {
  const viewShot = useRef<any>();
  const {itemId} = route.params;
  const {favorites, setFavorites}: any = useFavorite();

  const {Token /* setToken */}: any = useUsers();
  const [Loading, setLoading] = useState<any>(true);
  const [activeOng, setActiveOng] = useState<Ong>(
    {} as Ong,
  );

  const [visible, setVisible] = useState(false);
  const [error, setError] = useState('');

  if (!Token) {
    /* setToken(''); */
    navigation.navigate('Login');
  }

  const captureAndShareScreenshot = () => {
    viewShot?.current?.capture().then((uri: any) => {
      RNFS.readFile(uri, 'base64').then((res: any) => {
        let urlString = 'data:image/jpeg;base64,' + res;
        let options = {
          title: 'Share Title',
          message: 'Share Message',
          url: urlString,
          type: 'image/jpeg',
        };
        Share.open(options)
          .then((resu: any) => {
            console.log(resu);
          })
          .catch((erro: any) => {
            erro && console.log(erro);
          });
      });
    });
  };

  useEffect(() => {
    async function getOng() {
      setLoading(true);
      await api
        .get(`ngos/${itemId}`, {
          headers: {Authorization: `Bearer ${Token}`},
        })
        .then(({data}: any) => {
          setActiveOng(data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          setVisible(true);
        });
    }
    getOng();
  }, [Token, itemId, favorites]);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const navigateBack = () => {
    navigation.goBack();
  };

  const handleFavorite = async (OngItem: any) => {
    await api
      .put(
        `/auth/favorite-ngos/${OngItem?.id}`,
        {},
        {
          headers: {Authorization: `Bearer ${Token}`},
        },
      )
      .then((data: any) => setFavorites(data))
      .catch((err: any) => {
        setVisible(true);
        setError(JSON.stringify(err).substr(0, 100));
      });
  };

  const ArrowIcon = (props: any) => (
    <IconNative
      fill="#ffffff"
      name="chevron-right"
      {...props}
    />
  );

  const FavoriteIcon = (props: any, favorited: any) => (
    <IconNative
      {...props}
      size="30"
      name="heart"
      fill={favorited ? '#f00946' : 'rgba(0, 0, 0, 0.54)'}
    />
  );

  const ShareIcon = (props: Object) => (
    <IconNative
      {...props}
      size="30"
      name="share"
      fill={'rgba(0, 0, 0, 0.54)'}
    />
  );

  return (
    <>
      {Loading ? (
        <Wrapper>
          <Spinner />
        </Wrapper>
      ) : (
        <SafeAreaView style={styles.safeAreaView}>
          <Overlay
            isVisible={visible}
            onBackdropPress={toggleOverlay}>
            <Text>
              Um problema inesperado ocorreu. Erro: -{error}
            </Text>
          </Overlay>
          <TopNavigation
            style={styles.topNavigation}
            title={() => (
              <Icon
                style={styles.submitButtonIcon}
                name="arrow-left"
                size={16}
                color="white"
                onPress={navigateBack}
              />
            )}
          />
          <ViewShot
            style={styles.viewShot}
            ref={viewShot}
            options={{format: 'jpg', quality: 0.9}}>
            <ScrollView style={styles.scrollView}>
              <Layout style={styles.layout}>
                <View style={styles.container}>
                  <ImgView
                    source={{
                      uri: activeOng?.pictures[0]?.url,
                    }}
                  />
                  <LinearGradient
                    colors={['transparent', 'black']}
                    style={styles.linearGradient}>
                    <TextView style={styles.text}>
                      {activeOng?.name}
                    </TextView>
                  </LinearGradient>
                </View>
                <OngCard>
                  <FavoriteButton
                    onPress={() =>
                      handleFavorite(activeOng)
                    }
                    accessoryLeft={(props) =>
                      FavoriteIcon(
                        {...props},
                        activeOng?.favorited,
                      )
                    }
                  />
                  <ShareButton
                    accessoryLeft={(props) =>
                      ShareIcon({...props, active: true})
                    }
                    onPress={() =>
                      captureAndShareScreenshot()
                    }
                  />
                  <ItemTitle>Descrição</ItemTitle>
                  <ItemDescription>
                    {activeOng?.description}
                  </ItemDescription>
                  <ListItemBox
                    title={() => (
                      <Text>Mais informações</Text>
                    )}
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
          </ViewShot>
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
  viewShot: {
    width: '100%',
    backgroundColor: 'transparent',
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
    color: '#000',
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
    top: '15%',
  },
});

export {DetailsScreen};
