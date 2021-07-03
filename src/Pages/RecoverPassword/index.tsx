import React, {useRef, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  //   Alert,
} from 'react-native';
import {
  TopNavigation,
  Layout,
  Divider,
  Text,
} from '@ui-kitten/components';
import {Button, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Container,
  CardItem,
  ButtonsView,
  TextView,
} from './styles';
// import api from '../../services/api';
import * as yup from 'yup';
import {Formik} from 'formik';

export const RecoverPasswordScreen = ({
  navigation,
}: any) => {
  const [loading, setLoading] = useState(false);
  const email = useRef('');

  const emailValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Por favor insira um email válido')
      .required('E-mail é obrigatório'),
  });

  //FALTA FAZER INTEGRAÇÃO, API SENDO DESENVOLVIDA
  const handleRecoverPassword = async (email: string) => {
    console.log(email);
    setLoading(true);
    setLoading(false);
    // await api
    //   .post('/auth//api/auth/...', {
    //     email: email,
    //   })
    //   .then(({data}: any) => {
    //     setLoading(false);
    //     Alert.alert(
    //       'Sucesso!',
    //       'Enviamos um e-mail para redefinir sua senha ',
    //       [
    //         {
    //           text: 'Entendi',
    //           onPress: () => backAction,
    //         },
    //       ],
    //     );
    //   })
    //   .catch((err: any) => {
    //     setLoading(false);
    //     Alert.alert(
    //       'Oops!...',
    //       `Um problema inesperado ocorreu. Erro: ${JSON.stringify(
    //         err,
    //       ).substr(0, 200)}`,
    //     );
    //   });
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
              Recuperar acesso
            </Text>
          )}
          accessoryLeft={backAction}
        />
        <Divider />
        <Formik
          validationSchema={emailValidationSchema}
          initialValues={{
            email: '',
          }}
          onSubmit={(values) => {
            handleRecoverPassword(values);
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
                    <TextView>
                      <Text>
                        Enviaremos um e-mail com mais
                        informações sobre como redefinir sua
                        senha.
                      </Text>
                    </TextView>
                    <CardItem>
                      <Input
                        ref={email}
                        value={email}
                        placeholder="E-mail"
                        onChangeText={handleChange('email')}
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
                      <ButtonsView>
                        <Button
                          onPress={handleSubmit}
                          title="Enviar"
                          iconRight
                          buttonStyle={styles.button}
                          disabled={!isValid}
                          loading={loading}
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
  topNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleTopNavigation: {
    fontSize: 18,
    fontWeight: '700',
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
  scrollView: {
    width: '100%',
    padding: 10,
    backgroundColor: 'transparent',
    height: '100%',
    display: 'flex',
  },
  button: {
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
