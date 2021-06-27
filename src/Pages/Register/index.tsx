import React, {useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {
  TopNavigation,
  Layout,
  Divider,
  Text,
} from '@ui-kitten/components';
import {
  Button,
  Input,
  Overlay,
} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Container, CardItem, ButtonsView} from './styles';
import api from '../../services/api';
import * as yup from 'yup';

export const RegisterScreen = ({navigation}: any) => {
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateUser = async () => {
    setLoading(true);
    await api
      .post('/registration', {
        name,
        birthday: '1990-09-22',
        gender: 0,
        username: email,
        password: password,
        causes: [{id: 1}],
      })
      .then(() => {
        setLoading(false);
        navigation.navigate('Login');
      })
      .catch((err: any) => {
        setLoading(false);
        setVisible(true);
        setError(JSON.stringify(err).substr(0, 100));
      });
  };

  const showLogin = () => {
    navigation.navigate('Login');
  };

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const navigateBack = () => {
    navigation.goBack();
  };

  const backAction = () => (
    <Icon
      style={styles.submitButtonIcon}
      name="arrow-left"
      size={16}
      color="white"
      onPress={navigateBack}
    />
  );

  const fieldsValidationSchema = yup.object().shape({
    email: yup
      .string()
      .required('O email não pode ser vazio')
      .email('Digite um email válido'),
    password: yup
      .string()
      .required('A senha não pode ser vazia')
      .min(6, 'A senha deve conter pelo menos 6 dígitos'),
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

        <TopNavigation
          alignment="center"
          title={() => (
            <Text style={styles.titleTopNavigation}>
              Cadastro
            </Text>
          )}
          accessoryLeft={backAction}
        />
        <Divider />
        <Layout style={styles.layoutGlobal}>
          <ScrollView style={styles.scrollView}>
            <Container>
              <CardItem>
                <Input
                  placeholder="Nome completo"
                  onChangeText={(text) => setName(text)}
                  value={name}
                  leftIcon={
                    <Icon
                      name="user"
                      size={24}
                      color="#4ECCA3"
                    />
                  }
                />
                <Input
                  placeholder="Data de nascimento"
                  onChangeText={(text) => setBirthday(text)}
                  value={birthday}
                  leftIcon={
                    <Icon
                      name="calendar"
                      size={24}
                      color="#4ECCA3"
                    />
                  }
                />
                <Input
                  placeholder="E-mail"
                  onChangeText={(text) => setEmail(text)}
                  value={email}
                  leftIcon={
                    <Icon
                      name="inbox"
                      size={24}
                      color="#4ECCA3"
                    />
                  }
                />
                <Input
                  placeholder="Senha"
                  onChangeText={(text) => setPassword(text)}
                  value={password}
                  secureTextEntry={true}
                  leftIcon={
                    <Icon
                      name="lock"
                      size={24}
                      color="#4ECCA3"
                    />
                  }
                />

                <ButtonsView>
                  <Button
                    onPress={handleCreateUser}
                    title="Criar uma conta"
                    iconRight
                    buttonStyle={styles.signUpButton}
                  />
                  <Button
                    onPress={showLogin}
                    title="Já tem uma conta? Entrar"
                    iconRight
                    buttonStyle={styles.signInButton}
                    type="clear"
                    loading={loading}
                  />
                </ButtonsView>
              </CardItem>
            </Container>
          </ScrollView>
        </Layout>
      </SafeAreaView>
    </>
  );
};

const windowWidth = Dimensions.get('window').width - 64;

const styles = StyleSheet.create({
  listBox: {
    backgroundColor: 'transparent',
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: '700',
  },
  topNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
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
    backgroundColor: '#ffffff',
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
  signInButton: {
    marginTop: 24,
    height: 48,
    width: windowWidth,
    textAlign: 'center',
    borderRadius: 24,
  },
  signUpButton: {
    marginTop: 24,
    height: 48,
    width: windowWidth,
    backgroundColor: '#4ECCA3',
    color: '#fff',
    textAlign: 'center',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#fff',
  },
  submitButtonIcon: {
    marginLeft: 16,
    color: '#000',
  },
});
