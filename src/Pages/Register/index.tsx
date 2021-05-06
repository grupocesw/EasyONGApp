import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
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
  TextView,
  InputField,
  BoxButton,
  ButtonRegister,
  ButtonsView,
} from './styles';
import {useUsers} from '../../Contexts/index';

export const RegisterScreen = ({navigation}: any) => {
  /* const {Token}: any = useUsers(); */
  const showLogin = () => {
    navigation.navigate('Login');
  };
  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <TopNavigation
          alignment="center"
          title={() => (
            <Text style={styles.titleTopNavigation}>
              Cadastre-se
            </Text>
          )}
        />
        <Divider />
        <Layout style={styles.layoutGlobal}>
          <ScrollView style={styles.scrollView}>
            <Container>
              <CardItem>
                <View style={styles.layoutImage} />
                <View style={styles.layoutContent}>
                  <TextView>
                    <Text>Nome:</Text>
                    <InputField />
                  </TextView>
                  <TextView>
                    <Text>Nascimento:</Text>
                    <InputField />
                  </TextView>
                  <TextView>
                    <Text>Email:</Text>
                    <InputField />
                  </TextView>
                  <TextView>
                    <Text>Senha:</Text>
                    <InputField />
                  </TextView>
                  <ButtonsView>
                    <BoxButton onPress={showLogin}>
                      <Text>Cadastre-se</Text>
                    </BoxButton>
                    <ButtonRegister onPress={showLogin}>
                      <Text>ou Faça login</Text>
                    </ButtonRegister>
                  </ButtonsView>
                </View>
              </CardItem>
            </Container>
          </ScrollView>
        </Layout>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
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
    height: '100%',
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
    height: '100%',
    display: 'flex',
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
