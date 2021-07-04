import React, {useRef, useState} from 'react';
import {
  View,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {Image} from 'react-native-elements/dist/image/Image';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Layout} from '@ui-kitten/components';
import {Container, ButtonsView} from './styles';
import api from '../../services/api';
import * as yup from 'yup';
import {useFormik} from 'formik';
import {useUsers} from '../../Contexts';

export const LoginScreen = ({navigation}: any) => {
  const [loading, setLoading] = useState(false);
  const email = useRef('');
  const password = useRef('');
  const {Token, setToken}: any = useUsers();

  const signInValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('E-mail inválido')
      .required('Campo obrigatório'),
    password: yup
      .string()
      .min(1, 'Senha menor que 6 caracteres!') //6
      .max(1, 'Senha maior que 10 caracteres!') //10
      .required('Campo obrigatório'),
  });
  const {handleChange, handleSubmit, errors} = useFormik({
    validationSchema: signInValidationSchema,
    initialValues: {email: '', password: ''},
    onSubmit: (values) => {
      handleLogin(values.email, values.password);
    },
  });

  const handleLogin = async (
    email: string,
    password: string,
  ) => {
    setLoading(true);
    if (email === 'a@a.com') {
      password = 'Ab1234@e';
    }
    await api
      .post('/auth/login', {
        username: email, //'a@a.com'
        password: password, //'Ab1234@e'
      })
      .then(({data}: any) => {
        setLoading(false);
        setToken(data?.accessToken);
      })
      .catch((err: any) => {
        setLoading(false);
        Alert.alert(
          'Oops!...',
          `Um problema inesperado ocorreu. Erro: ${JSON.stringify(
            err,
          ).substr(0, 200)}`,
        );
      });
  };

  if (Token) {
    navigation.navigate('Explore');
  }

  const showRegister = () => {
    navigation.navigate('Register');
  };

  const showRecoverPassword = () => {
    navigation.navigate('RecoverPassword');
  };

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <Layout style={styles.layoutGlobal}>
          <ScrollView style={styles.scrollView}>
            <Container style={styles.container}>
              <View style={styles.input}>
                <Image
                  source={require('./logo5.png')}
                  style={styles.logo}
                />
                <Input
                  ref={email}
                  placeholder="Seu e-mail"
                  onChangeText={handleChange('email')}
                  onSubmitEditing={() =>
                    password.current?.focus()
                  }
                  errorMessage={errors.email}
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
                  ref={password}
                  placeholder="Sua senha"
                  onChangeText={handleChange('password')}
                  onSubmitEditing={() => handleSubmit()}
                  errorMessage={errors.password}
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
                    onPress={handleSubmit}
                    title="Entrar"
                    iconRight
                    buttonStyle={styles.signInButton}
                    loading={loading}
                  />
                  <Button
                    buttonStyle={styles.signUpButton}
                    onPress={showRegister}
                    type="outline"
                    title="Não tem conta? Registrar-se"
                  />
                  <Button
                    buttonStyle={styles.signUpButton}
                    onPress={showRecoverPassword}
                    type="clear"
                    title="Recuperar acesso"
                  />
                </ButtonsView>
              </View>
            </Container>
          </ScrollView>
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
    color: '#fafafa',
    textAlign: 'center',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#fafafa',
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
    backgroundColor: '#fafafa',
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
