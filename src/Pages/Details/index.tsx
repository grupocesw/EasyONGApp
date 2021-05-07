import React, {useState, useEffect} from 'react';
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
  ViewAvatar,
} from './styles';
import {useUsers, useFavorite} from '../../Contexts';

import Wrapper from '../../components/Wrapper';
import {Ong} from '../../interfaces/Ong';
import {
  Avatar,
  Button,
  Overlay,
} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

function DetailsScreen({route, navigation}: any) {
  const {itemId} = route.params;
  const {favorites, setFavorites}: any = useFavorite();

  const {Token}: any = useUsers();
  const [Loading, setLoading] = useState<any>(true);
  const [activeOng, setActiveOng] = useState<Ong>(
    {} as Ong,
  );

  const [visible, setVisible] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function getOng() {
      setLoading(true);
      await api
        .get(`ngos/${itemId}`)
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
  }, [itemId]);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const navigateBack = () => {
    navigation.goBack();
  };

  let active = false;
  favorites.map((favorite: number) => {
    favorite === itemId
      ? (active = true)
      : (active = false);
  });

  const handleFavorite = async (OngItem: any) => {
    await api
      .put(
        `auth/${OngItem?.id}/favorite`,
        {},
        {
          headers: {Authorization: `Bearer ${Token}`},
        },
      )
      .then(() => {
        setFavorites([...favorites, OngItem?.id]);
      })
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

  const FavoriteIcon = (props: any) => (
    <IconNative
      {...props}
      size="30"
      name="heart"
      fill={
        props.active ? '#f00946' : 'rgba(0, 0, 0, 0.54)'
      }
    />
  );

  const shareOptions = {
    title: 'Share via',
    message: 'some message',
    url: 'some share url',
  };

  const ShareAction = async () => {
    Share.open(shareOptions)
      .then((res: Object) => {
        console.log(res);
      })
      .catch((err: Object) => {
        err && console.log(err);
      });
  };

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
            <Text>Problemas na api!!! -{error}</Text>
          </Overlay>
          <TopNavigation
            alignment="center"
            style={styles.topNavigation}
            title={() => (
              <ViewAvatar>
                <Icon
                  style={styles.submitButtonIcon}
                  name="arrow-left"
                  size={15}
                  color="white"
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
                    !active && handleFavorite(activeOng)
                  }
                  accessoryLeft={(props) =>
                    FavoriteIcon({...props, active})
                  }
                />
                <ShareButton
                  accessoryLeft={(props) =>
                    ShareIcon({...props, active: true})
                  }
                  onPress={() => ShareAction()}
                />
                <ItemTitle>Descrição</ItemTitle>
                <ItemDescription>
                  {activeOng?.description}
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
    top: '20%',
  },
});

export {DetailsScreen};
