import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {Layout, Divider, Text} from '@ui-kitten/components';
import {Button, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Container,
  CardItem,
  ButtonsView,
  ButtonRegister,
} from './styles';
/* import {useUsers} from '../../Contexts/index'; */

export const RegisterScreen = ({navigation}: any) => {
  /* const {Token}: any = useUsers(); */
  const showLogin = () => {
    navigation.navigate('Login');
  };
  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <Divider />
        <Layout style={styles.layoutGlobal}>
          <ScrollView style={styles.scrollView}>
            <Container>
              <Text style={styles.welcomeText}>
                Cadastre-se Agora
              </Text>
              <CardItem>
                <Input
                  placeholder="Nome completo"
                  leftIcon={
                    <Icon
                      name="user"
                      size={24}
                      color="#5DB075"
                    />
                  }
                />
                <Input
                  placeholder="Data de nascimento"
                  leftIcon={
                    <Icon
                      name="calendar"
                      size={24}
                      color="#5DB075"
                    />
                  }
                />
                <Input
                  placeholder="E-mail de cadastro"
                  leftIcon={
                    <Icon
                      name="inbox"
                      size={24}
                      color="#5DB075"
                    />
                  }
                />
                <Input
                  placeholder="Sua senha"
                  secureTextEntry={true}
                  leftIcon={
                    <Icon
                      name="lock"
                      size={24}
                      color="#5DB075"
                    />
                  }
                />

                <ButtonsView>
                  <Button
                    onPress={showLogin}
                    title="Criar cadastro"
                    iconRight
                    buttonStyle={styles.submitButton}
                    icon={
                      <Icon
                        style={styles.submitButtonIcon}
                        name="arrow-right"
                        size={15}
                        color="white"
                      />
                    }
                  />
                  <ButtonRegister onPress={showLogin}>
                    <Text>ou Efetuar login</Text>
                  </ButtonRegister>
                </ButtonsView>
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
  welcomeText: {
    fontSize: 22,
    fontWeight: '700',
  },
  submitButton: {
    backgroundColor: '#5DB075',
    padding: 10,
  },
  submitButtonIcon: {
    marginLeft: 15,
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
