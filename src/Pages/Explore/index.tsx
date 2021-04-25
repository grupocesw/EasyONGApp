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
  // Icon,
  List,
  Text,
} from '@ui-kitten/components';

import {
  Container,
  // Box,
  // BoxButton,
  TextView,
  ViewFlex,
  OngCardItem,
  CardItem,
  ListCardItem,
  ItemTitle,
  ItemDescription,
  ImageUI,
} from './styles';

// import SearchBar from '../../components/SearchBar';
import {useOng} from '../../Contexts/index';

import {
  Ong as OngType,
  OngsContext as OngsContextType,
} from '../../interfaces/Ong';
import api from '../../services/api';
import Wrapper from '../../components/Wrapper';
import {Spinner} from '@ui-kitten/components';

export const ExploreScreen = ({navigation}: any) => {
  const [Loading, setLoading] = useState(false);
  const {Ongs, setOngs}: OngsContextType = useOng();
  const navigateDetails = (id: number) => {
    navigation.navigate('Details', {
      itemId: id,
    });
  };

  useEffect(() => {
    async function getData() {
      setLoading(true);
      await api
        .get('ngos')
        .then(({data}: any) => {
          setOngs(data?.content);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
    getData();
  }, [setOngs]);

  // const FilterIcon = (props: any) => (
  //   <Icon fill="#ffffff" name="options-2" {...props} />
  // );

  // const ChevronDown = (props: any) => (
  //   <Icon fill="#ffffff" name="chevron-down" {...props} />
  // );

  const renderHorizontalOngItem = ({item: Ong}: any) => (
    <OngCardItem onPress={() => navigateDetails(Ong.id)}>
      <ImageUI
        source={{
          uri: 'https://via.placeholder.com/150/771796',
        }}
      />
      <ItemTitle>{Ong.name}</ItemTitle>
      <ItemDescription>
        {Ong.description.substr(0, 55)}
      </ItemDescription>
    </OngCardItem>
  );

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <TopNavigation
          alignment="center"
          title={() => (
            <Text style={styles.titleTopNavigation}>
              Explore
            </Text>
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
              {/* <SearchBar /> */}
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
                  <TextView>Sugestões para você</TextView>
                </ViewFlex>
                <List
                  style={styles.horizontalOngList}
                  contentContainerStyle={
                    styles.contentContainerHorizontalOngList
                  }
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  data={Ongs}
                  renderItem={renderHorizontalOngItem}
                />
                <ViewFlex>
                  <TextView>Veja mais</TextView>
                </ViewFlex>
                <ListCardItem>
                  {[...Ongs, ...Ongs]
                    .sort()
                    .map((Ong: OngType, index: number) => {
                      return (
                        <CardItem
                          onPress={() =>
                            navigateDetails(Ong.id)
                          }
                          key={(Ong.id, index)}>
                          <ImageUI
                            source={{
                              uri:
                                'https://via.placeholder.com/150/771796',
                            }}
                          />
                          <ItemTitle>{Ong.name}</ItemTitle>
                          <ItemDescription>
                            {Ong.description.substr(0, 55)}
                          </ItemDescription>
                        </CardItem>
                      );
                    })}
                </ListCardItem>
              </Container>
            </ScrollView>
          )}
        </Layout>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  layoutGlobal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
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
  contentContainerHorizontalOngList: {
    marginTop: -16,
    marginBottom: -16,
  },
});
