import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  View,
} from 'react-native';
import {
  Layout,
  Divider,
  TopNavigation,
  Text,
} from '@ui-kitten/components';
import {
  Container,
  CardItem,
  ListCardItem,
  ItemTitle,
  ItemDescription,
} from './styles';

export const NotificationScreen = () => {
  let ongs: {
    id: number;
    name: string;
    description: string;
  }[] = [
    {id: 0, name: 'Available', description: 'Description'},
    {id: 1, name: 'Ready', description: 'Description'},
    {id: 2, name: 'Started', description: 'Description'},
  ];

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <TopNavigation
          alignment="center"
          title={() => (
            <Text style={styles.titleTopNavigation}>
              Notificações
            </Text>
          )}
        />
        <Divider />
        <Layout style={styles.layoutGlobal}>
          <ScrollView style={styles.scrollView}>
            <Container>
              <ListCardItem>
                {ongs?.map((ong: any) => (
                  <CardItem
                    key={ong.id}
                    disabled={true}
                    style={styles.cardItem}>
                    <View style={styles.layoutImage}>
                      <Image
                        style={styles.image}
                        source={{
                          uri:
                            'https://i1.wp.com/montanha.es.gov.br/site/wp-content/uploads/2021/01/E-Sustentavel.png?fit=800%2C450&ssl=1',
                        }}
                      />
                    </View>
                    <View style={styles.layoutContent}>
                      <ItemTitle>{ong.name}</ItemTitle>
                      <ItemDescription>
                        {ong.description}
                      </ItemDescription>
                    </View>
                  </CardItem>
                ))}
              </ListCardItem>
            </Container>
          </ScrollView>
        </Layout>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  cardItem: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    elevation: 2,
  },
  listBox: {
    backgroundColor: 'transparent',
  },
  titleTopNavigation: {
    fontSize: 18,
    fontWeight: '700',
  },
  ongList: {
    marginVertical: 8,
    paddingHorizontal: 0,
    backgroundColor: 'transparent',
  },
  safeArea: {
    flex: 1,
  },
  layoutGlobal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  layoutImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  layoutContent: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  scrollView: {
    width: '100%',
    padding: 10,
    backgroundColor: 'transparent',
  },
  image: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
});
