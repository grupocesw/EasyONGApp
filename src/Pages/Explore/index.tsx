import React, {useEffect, useState} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
} from 'react-native';

import {
  Layout,
  TopNavigation,
  Divider,
  List,
} from '@ui-kitten/components';

import {
  Container,
  // Box,
  // BoxButton,
  ViewFlex,
  OngCardItem,
  CardItem,
  ListCardItem,
  ItemTitle,
  ItemDescription,
  ImageUI,
  RattingContainer,
  ViewAvatar,
  ViewSwitch,
} from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useOng, useUsers} from '../../Contexts/index';

import {
  Ong as OngType,
  OngsContext as OngsContextType,
} from '../../interfaces/Ong';
import api from '../../services/api';
import Wrapper from '../../components/Wrapper';
import {Spinner} from '@ui-kitten/components';
import {
  Avatar,
  Text,
  Text as TextElement,
} from 'react-native-elements';
import SearchBar from '../../components/SearchBar';
import {
  Switch,
  ListItem,
  Overlay,
} from 'react-native-elements';

export const ExploreScreen = ({navigation}: any) => {
  const [Loading, setLoading] = useState(false);
  const [switchvalue, setSwitchvalue] = useState(false);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState('');
  const [openMenu, setOpenMenu] = useState(false);

  const {
    Ongs,
    ongsSuggest,
    setOngsSuggest,
    setOngs,
  }: OngsContextType = useOng();

  const {Token, setToken}: any = useUsers();

  if (!Token) {
    navigation.navigate('Login');
  }

  const navigateDetails = (id: number) => {
    navigation.navigate('Details', {
      itemId: id,
    });
  };

  const handleSwitchValue = () => {
    setSwitchvalue(!switchvalue);
  };

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const handleLogout = () => {
    setToken(null);
    setOpenMenu(false);
    navigation.navigate('Login');
  };

  useEffect(() => {
    async function getData() {
      setLoading(true);
      await api
        .get('ngos', {
          headers: {Authorization: `Bearer ${Token}`},
        })
        .then(({data}: any) => {
          setOngs(data?.content);
          setLoading(false);
        })
        .catch((err: any) => {
          setVisible(true);
          setError(JSON.stringify(err).substr(0, 100));
          setLoading(false);
        });
    }
    getData();
  }, [setOngs, Token]);

  useEffect(() => {
    async function getDataSuggest() {
      setLoading(true);
      await api
        .get('ngos/suggested', {
          headers: {Authorization: `Bearer ${Token}`},
        })
        .then(({data}: any) => {
          setOngsSuggest(data?.content);
          setLoading(false);
        })
        .catch((err: any) => {
          setVisible(true);
          setError(JSON.stringify(err).substr(0, 100));
          setLoading(false);
        });
    }
    getDataSuggest();
  }, [setOngsSuggest, Token]);

  const renderHorizontalOngItem = ({item: Ong}: any) => (
    <OngCardItem
      style={styles.cardItem}
      onPress={() => navigateDetails(Ong.id)}>
      <ImageUI
        source={{
          uri: Ong?.picture?.url,
        }}
      />
      <ItemTitle>{Ong.name}</ItemTitle>
      <ItemDescription>
        {Ong.description.substr(0, 55)}
      </ItemDescription>
      <RattingContainer />
    </OngCardItem>
  );

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#ffffff',
      zIndex: 0,
    },
    displayList: {
      display: openMenu ? 'flex' : 'none',
      marginHorizontal: 5,
    },
    listItem: {
      position: 'absolute',
      flexDirection: 'row',
      right: 40,
      top: -2,
      zIndex: 1,
      backgroundColor: 'rgba(0, 0, 0,0.3)',
      padding: openMenu ? 10 : 0,
      color: '#ffffff',
    },
    switch: {},
    submitButtonIcon: {
      color: '#000000',
    },
    topNavigation: {
      zIndex: 1,
      backgroundColor: '#ffffff',
      margin: 10,
    },
    textStyle: {
      color: '#5db075',
    },
    rating: {
      margin: 10,
    },
    cardItem: {
      backgroundColor: '#ffffff',
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.2,
      elevation: 2,
      paddingBottom: 15,
    },
    layoutGlobal: {
      zIndex: 0,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    scrollView: {
      zIndex: 0,
      width: '100%',
      padding: 8,
      backgroundColor: 'transparent',
    },
    titleTopNavigation: {
      fontSize: 18,
      fontWeight: '700',
    },
    horizontalOngList: {
      backgroundColor: 'transparent',
      marginTop: -20,
    },
  });

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
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
              <ViewSwitch>
                <Icon
                  name="sun-o"
                  size={14}
                  color="#ee2f0d"
                />
                <Switch
                  style={styles.switch}
                  value={switchvalue}
                  onValueChange={handleSwitchValue}
                />
                <Icon
                  name="moon-o"
                  size={14}
                  color="#12101b"
                />
              </ViewSwitch>
              <Avatar
                rounded
                onPress={handleOpenMenu}
                source={{
                  uri:
                    'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                }}>
                <Avatar.Accessory />
              </Avatar>
              <ListItem.Content
                style={
                  (styles.displayList, styles.listItem)
                }>
                {/*  <ListItem.Title style={styles.displayList}>
                  Meu perfil
                </ListItem.Title> */}
                <ListItem.Title
                  onPress={handleLogout}
                  style={styles.displayList}>
                  Sair
                </ListItem.Title>
              </ListItem.Content>
            </ViewAvatar>
          )}
        />
        <Divider />
        <Layout style={styles.layoutGlobal}>
          {Loading ? (
            <Wrapper>
              <Spinner size="large" />
            </Wrapper>
          ) : (
            <ScrollView style={styles.scrollView}>
              <SearchBar />
              <Container>
                {/* <Box>
                <BoxButton
                  onPress={navigateDetails}
                  accessoryRight={FilterIcon}>
                  Filtrar
                </BoxButton>
                <BoxButton
                  onPress={navigateDetails}
                  accessoryRight={ChevronDown}>
                  Ordenar
                </BoxButton>
              </Box> */}
                <ViewFlex>
                  <TextElement h4 style={styles.textStyle}>
                    Sugestões para você
                  </TextElement>
                </ViewFlex>
                <List
                  style={styles.horizontalOngList}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  data={ongsSuggest}
                  renderItem={renderHorizontalOngItem}
                />
                <ViewFlex>
                  <TextElement h4 style={styles.textStyle}>
                    Veja mais
                  </TextElement>
                </ViewFlex>
                <ListCardItem>
                  {Ongs.sort().map(
                    (Ong: OngType, index: number) => {
                      return (
                        <CardItem
                          style={styles.cardItem}
                          onPress={() =>
                            navigateDetails(Ong.id)
                          }
                          key={(Ong.id, index)}>
                          <ImageUI
                            source={{
                              uri: Ong?.picture?.url,
                            }}
                          />
                          <ItemTitle>{Ong.name}</ItemTitle>
                          <ItemDescription>
                            {Ong.description.substr(0, 55)}
                          </ItemDescription>
                        </CardItem>
                      );
                    },
                  )}
                </ListCardItem>
              </Container>
            </ScrollView>
          )}
        </Layout>
      </SafeAreaView>
    </>
  );
};
