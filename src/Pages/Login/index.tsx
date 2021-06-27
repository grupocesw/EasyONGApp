import React, {useState} from 'react';
import {
  View,
  Dimensions,
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
import {Container, ButtonsView} from './styles';
import {useUsers} from '../../Contexts/index';
import api from '../../services/api';
import Wrapper from '../../components/Wrapper';
import {Image} from 'react-native-elements/dist/image/Image';

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
          <Text>
            Um problema inesperado ocorreu. Erro: -{error}
          </Text>
        </Overlay>
        <Divider />
        <Layout style={styles.layoutGlobal}>
          {Loading ? (
            <Wrapper>
              <Spinner size="large" />
            </Wrapper>
          ) : (
            <ScrollView style={styles.scrollView}>
              <Container style={styles.container}>
                <View style={styles.input}>
                  <Image
                    source={require('./logo5.png')}
                    style={styles.logo}
                  />
                  <Input
                    placeholder="Seu e-mail"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    leftIcon={
                      <Icon
                        name="user"
                        size={24}
                        color="#4ECCA3"
                      />
                    }
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardAppearance="light"
                    keyboardType="email-address"
                    returnKeyType="next"
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
                        color="#4ECCA3"
                      />
                    }
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardAppearance="light"
                    keyboardType="default"
                    returnKeyType="next"
                  />
                  <ButtonsView>
                    <Button
                      onPress={handleLogin}
                      title="Efetuar login"
                      iconRight
                      buttonStyle={styles.signInButton}
                    />
                    <Button
                      buttonStyle={styles.signUpButton}
                      onPress={showRegister}
                      type="outline"
                      title="Não tem conta? Inscrever-se"
                    />
                  </ButtonsView>
                </View>
              </Container>
            </ScrollView>
          )}
        </Layout>
      </SafeAreaView>
    </>
  );
};

const windowWidth = Dimensions.get('window').width - 64;

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listBox: {
    backgroundColor: 'transparent',
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: '700',
  },
  input: {
    width: windowWidth,
  },
  signInButton: {
    marginTop: 24,
    height: 48,
    width: windowWidth, //#393E46 //#4ecca3
    backgroundColor: '#4ECCA3', //5DB075
    color: '#fff',
    textAlign: 'center',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#fff',
  },
  signInButtonIcon: {
    marginLeft: 16,
  },
  signUpButton: {
    marginTop: 24,
    height: 48,
    width: windowWidth,
    textAlign: 'center',
    borderRadius: 24,
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
  logo: {
    resizeMode: 'contain',
    height: 300,
    marginBottom: 32,
  },
});
