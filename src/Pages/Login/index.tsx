import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {
  Button,
  Input,
  Overlay,
} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Layout,
  Divider,
  Text,
  Spinner,
} from '@ui-kitten/components';
import {
  Container,
  CardItem,
  ButtonsView,
  ButtonRegister,
} from './styles';
import {useUsers} from '../../Contexts/index';
import api from '../../services/api';
import Wrapper from '../../components/Wrapper';

export const LoginScreen = ({navigation}: any) => {
  const [Loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState('');
  const {Token, setToken}: any = useUsers();

  const handleLogin = async () => {
    setLoading(true);
    await api
      .post('/auth/login', {
        username: email,
        password: senha,
      })
      .then(({data}: any) => {
        setToken(data?.accessToken);
        setLoading(false);
      })
      .catch((err: any) => {
        setVisible(true);
        setError(JSON.stringify(err).substr(0, 200));
        setLoading(false);
      });
  };

  if (Token) {
    navigation.navigate('Explore');
  }

  const showRegister = () => {
    navigation.navigate('Register');
  };

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <Overlay
          isVisible={visible}
          onBackdropPress={toggleOverlay}>
          <Text>Problemas na api!!! -{error}</Text>
        </Overlay>
        <Divider />
        <Layout style={styles.layoutGlobal}>
          {Loading ? (
            <Wrapper>
              <Spinner size="large" />
            </Wrapper>
          ) : (
            <ScrollView style={styles.scrollView}>
              <Container>
                <Text style={styles.welcomeText}>
                  Bem Vindo ao Easy Ong
                </Text>
                <CardItem>
                  <Input
                    placeholder="E-mail de cadastro"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    leftIcon={
                      <Icon
                        name="user"
                        size={24}
                        color="#5DB075"
                      />
                    }
                  />
                  <Input
                    placeholder="Sua senha"
                    onChangeText={(text) => setSenha(text)}
                    value={senha}
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
                      onPress={handleLogin}
                      title="Efetuar login"
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
                    <ButtonRegister onPress={showRegister}>
                      <Text>ou Cadastre-se</Text>
                    </ButtonRegister>
                  </ButtonsView>
                </CardItem>
              </Container>
            </ScrollView>
          )}
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
    flex: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    alignSelf: 'stretch',
    backgroundColor: '#ffffff',
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
    alignSelf: 'stretch',
  },
  scrollView: {
    width: '100%',
    padding: 10,
    backgroundColor: 'transparent',
    height: '100%',
    display: 'flex',
    alignSelf: 'stretch',
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
