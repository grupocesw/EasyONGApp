import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {Layout, Divider, Text} from '@ui-kitten/components';
import {
  Button,
  Input,
  Overlay,
} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Container,
  CardItem,
  ButtonsView,
  ButtonRegister,
} from './styles';
import api from '../../services/api';

export const RegisterScreen = ({navigation}: any) => {
  const [name, setName] = useState('');
  const [nascimento, setNascimento] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState('');

  const handleCreateUser = async () => {
    await api
      .post('/registration', {
        name,
        birthday: '1990-09-22',
        gender: 0,
        username: email,
        password: senha,
        causes: [{id: 1}],
      })
      .then(() => navigation.navigate('Login'))
      .catch((err: any) => {
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
          <ScrollView style={styles.scrollView}>
            <Container>
              <Text style={styles.welcomeText}>
                Cadastre-se Agora
              </Text>
              <CardItem>
                <Input
                  placeholder="Nome completo"
                  onChangeText={(text) => setName(text)}
                  value={name}
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
                  onChangeText={(text) =>
                    setNascimento(text)
                  }
                  value={nascimento}
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
                  onChangeText={(text) => setEmail(text)}
                  value={email}
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
                    onPress={handleCreateUser}
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
