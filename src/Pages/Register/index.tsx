import React, {useRef, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {
  TopNavigation,
  Layout,
  Divider,
  Text,
} from '@ui-kitten/components';
import {Button, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Container, CardItem, ButtonsView} from './styles';
import api from '../../services/api';
import * as yup from 'yup';
import {Formik} from 'formik';

export const RegisterScreen = ({navigation}: any) => {
  const [loading, setLoading] = useState(false);
  const fullName = useRef('');
  const email = useRef('');
  const password = useRef('');
  const confirmPassword = useRef('');

  const signUpValidationSchema = yup.object().shape({
    fullName: yup
      .string()
      .matches(/(\w.+\s).+/, 'Insira pelo menos 2 nomes')
      .required('Nome completo é obrigatório'),
    email: yup
      .string()
      .email('Por favor insira um email válido')
      .required('E-mail é obrigatório'),
    password: yup
      .string()
      .matches(
        /\w*[a-z]\w*/,
        'A senha deve conter uma letra minúscula',
      )
      .matches(
        /\w*[A-Z]\w*/,
        'A senha deve ter uma letra maiúscula',
      )
      .matches(/\d/, 'A senha deve ter um número')
      .matches(
        /[!@#$%^&*()\-_"=+{}; :,<.>]/,
        'A senha deve ter um caractere especial',
      )
      .min(
        8,
        ({min}) =>
          `A senha deve ser pelo menos ${min} caracteres`,
      )
      .required('Senha requerida'),
    confirmPassword: yup
      .string()
      .oneOf(
        [yup.ref('password')],
        'As senhas não coincidem',
      )
      .required('É necessário confirmar a senha'),
  });

  const handleCreateUser = async (values) => {
    setLoading(true);
    await api
      .post('/registration', {
        name: values.fullName,
        birthday: '1990-09-22',
        gender: 0,
        username: values.email,
        password: values.password,
        causes: [{id: 1}],
      })
      .then(() => {
        setLoading(false);
        navigation.navigate('Login');
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

  const showLogin = () => {
    navigation.navigate('Login');
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

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
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
        <Formik
          validationSchema={signUpValidationSchema}
          initialValues={{
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          onSubmit={(values) => {
            console.warn(values.email);
            handleCreateUser(values);
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            errors,
            isValid,
          }) => (
            <>
              <Layout style={styles.layoutGlobal}>
                <ScrollView style={styles.scrollView}>
                  <Container>
                    <CardItem>
                      <Input
                        ref={fullName}
                        value={fullName}
                        placeholder="Nome completo"
                        onChangeText={handleChange(
                          'fullName',
                        )}
                        errorMessage={errors.fullName}
                        onBlur={handleBlur('fullName')}
                        onSubmitEditing={() =>
                          email.current?.focus()
                        }
                        leftIcon={
                          <Icon
                            name="user"
                            size={24}
                            color="#4ECCA3"
                          />
                        }
                        autoCompleteType="name"
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardAppearance="light"
                        keyboardType="email-address"
                        returnKeyType="next"
                      />
                      <Input
                        ref={email}
                        value={email}
                        placeholder="E-mail"
                        onChangeText={handleChange('email')}
                        onSubmitEditing={() =>
                          password.current?.focus()
                        }
                        onBlur={handleBlur('email')}
                        errorMessage={errors.email}
                        leftIcon={
                          <Icon
                            name="envelope"
                            size={24}
                            color="#4ECCA3"
                          />
                        }
                        keyboardType="email-address"
                        autoCompleteType="email"
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardAppearance="light"
                        returnKeyType="next"
                      />
                      <Input
                        ref={password}
                        value={password}
                        placeholder="Sua senha"
                        onChangeText={handleChange(
                          'password',
                        )}
                        onBlur={handleBlur('password')}
                        onSubmitEditing={() =>
                          confirmPassword.current?.focus()
                        }
                        errorMessage={errors.password}
                        secureTextEntry={true}
                        leftIcon={
                          <Icon
                            name="lock"
                            size={24}
                            color="#4ECCA3"
                          />
                        }
                        autoCompleteType="password"
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardAppearance="light"
                        keyboardType="default"
                        returnKeyType="next"
                      />
                      <Input
                        ref={confirmPassword}
                        value={confirmPassword}
                        placeholder="Confirme sua senha"
                        onChangeText={handleChange(
                          'confirmPassword',
                        )}
                        onBlur={handleBlur(
                          'confirmPassword',
                        )}
                        onSubmitEditing={() =>
                          handleSubmit()
                        }
                        errorMessage={
                          errors.confirmPassword
                        }
                        secureTextEntry={true}
                        leftIcon={
                          <Icon
                            name="lock"
                            size={24}
                            color="#4ECCA3"
                          />
                        }
                        autoCompleteType="password"
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardAppearance="light"
                        keyboardType="default"
                        returnKeyType="next"
                      />

                      <ButtonsView>
                        <Button
                          onPress={handleSubmit}
                          title="Criar uma conta"
                          iconRight
                          buttonStyle={styles.signUpButton}
                          disabled={!isValid}
                          loading={loading}
                        />
                        <Button
                          onPress={showLogin}
                          title="Já tem uma conta? Entrar"
                          iconRight
                          buttonStyle={styles.signInButton}
                          type="clear"
                        />
                      </ButtonsView>
                    </CardItem>
                  </Container>
                </ScrollView>
              </Layout>
            </>
          )}
        </Formik>
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
