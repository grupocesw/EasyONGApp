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
  ViewFlex,
  OngCardItem,
  CardItem,
  ListCardItem,
  ItemTitle,
  ItemDescription,
  ImageUI,
  RattingContainer,
  ViewAvatar,
  HideSuggest,
} from './styles';
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
import {ListItem, Overlay} from 'react-native-elements';

export const ExploreScreen = ({navigation}: any) => {
  const [Loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState('');
  const [openMenu, setOpenMenu] = useState(false);
  const [hide, setHide] = useState(false);
  const [value, setValue] = useState<any>();

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
      setHide(false);
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
        .then(({ data }: any) => {
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
      <ItemTitle numberOfLines={2}>{Ong.name}</ItemTitle>
      <ItemDescription numberOfLines={4}>
        {Ong.description}
      </ItemDescription>
      <RattingContainer />
    </OngCardItem>
  );

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#fafafa',
      zIndex: 0,
    },
    avatar: {
      width: 40,
      height: 40,
    },
    displayList: {
      display: openMenu ? 'flex' : 'none',
      marginHorizontal: 5,
      color: '#4ECCA3',
      fontWeight: '600',
    },
    listItem: {
      position: 'absolute',
      flexDirection: 'row',
      right: 10,
      zIndex: 1,
      padding: openMenu ? 10 : 0,
      color: '#fafafa',
      borderRadius: 24,
      borderWidth: openMenu ? 1 : 0,
      borderColor: '#4ECCA3',
      width: 64,
      height: 40,
    },
    switch: {},
    submitButtonIcon: {
      color: '#000000',
    },
    topNavigation: {
      zIndex: 1,
      backgroundColor: '#fafafa',
      margin: 10,
    },
    textStyle: {
      fontWeight: '700',
      color: '#4ECCA3',
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
      paddingBottom: 16,
    },
    layoutGlobal: {
      zIndex: 0,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fafafa',
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
    },
    verticalOngList: {
      paddingTop: 16,
      backgroundColor: 'transparent',
    },
  });

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <Overlay
          isVisible={visible}
          onBackdropPress={toggleOverlay}>
          <Text>
            Um problema inesperado ocorreu. Erro: -{error}
          </Text>
        </Overlay>
       {/*  <TopNavigation
          alignment="center"
          style={styles.topNavigation}
        /> */}
        <Divider />
        <Layout style={styles.layoutGlobal}>
          {Loading ? (
            <Wrapper>
              <Spinner size="large" />
            </Wrapper>
          ) : (
            <ScrollView style={styles.scrollView}>
              <SearchBar
                hide={hide}
                setHide={setHide}
                value={value}
                setValue={setValue}
                setVisible={setVisible}
                setLoading={setLoading}
                setError={setError}
              />
              <Container>
                <HideSuggest hide={hide}>
                  <ViewFlex>
                    <TextElement
                      h4
                      style={styles.textStyle}>
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
                </HideSuggest>
                <ViewFlex hide={hide}>
                  <TextElement h4 style={styles.textStyle}>
                    Veja mais
                  </TextElement>
                </ViewFlex>
                <ListCardItem
                  style={styles.verticalOngList}>
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
                          <ItemTitle numberOfLines={2}>
                            {Ong.name}
                          </ItemTitle>
                          <ItemDescription
                            numberOfLines={3}>
                            {Ong.description}
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
