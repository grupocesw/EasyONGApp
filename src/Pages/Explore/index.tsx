import React, {useContext} from 'react';
import {SafeAreaView, StyleSheet, ScrollView} from 'react-native';
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
import {OngsContext} from '../../Contexts/index';

export const ExploreScreen = ({navigation}: any) => {
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

  const {Ongs}: any = useContext(OngsContext);
  const navigateDetails = (id: number, index: any) => {
    navigation.navigate('Details', {itemId: id, indice: index});
  };

  // const FilterIcon = (props: any) => (
  //   <Icon fill="#ffffff" name="options-2" {...props} />
  // );

  // const ChevronDown = (props: any) => (
  //   <Icon fill="#ffffff" name="chevron-down" {...props} />
  // );

  function getRandomInt() {
    let min = Math.ceil(1);
    let max = Math.floor(3);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  const renderHorizontalOngItem = (info: any) => (
    <OngCardItem onPress={() => navigateDetails(info.item.id, getRandomInt())}>
      <ImageUI source={{uri: pictures[getRandomInt()]}} />
      <ItemTitle>{info.item.name}</ItemTitle>
      <ItemDescription>{info.item.description.substr(0, 55)}</ItemDescription>
    </OngCardItem>
  );

  const displayOngs = Ongs;
  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <TopNavigation
          alignment="center"
          title={() => <Text style={styles.titleTopNavigation}>Explore</Text>}
        />
        <Divider />
        <Layout style={styles.layoutGlobal}>
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
                contentContainerStyle={styles.contentContainerHorizontalOngList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={displayOngs}
                renderItem={renderHorizontalOngItem}
              />
              <ViewFlex>
                <TextView>Veja mais</TextView>
              </ViewFlex>
              <ListCardItem>
                {[...Ongs, ...Ongs].sort().map((Ong: any, index: any) => {
                  return (
                    <CardItem
                      onPress={() => navigateDetails(Ong.id, index)}
                      key={(Ong.id, index)}>
                      <ImageUI
                        source={{
                          uri: pictures[index],
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
