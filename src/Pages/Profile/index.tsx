import React, { useState } from 'react';
import {
  View,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import {
  Layout,
  Divider,
  TopNavigation,
  Text,
} from '@ui-kitten/components';
import { Container, ButtonsView } from './styles';
import { useUsers } from '../../Contexts';
import { Props } from '@ui-kitten/components/devsupport/services/props/props.service';
import { Button, Input, Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../../services/api';
import { launchImageLibrary } from 'react-native-image-picker';

export const ProfileScreen = ({ navigation }: Props) => {
  const [loading, setLoading] = useState(false);
  const [password,setPassword] = useState('');
  const [newPassword,setNewPassword] = useState('');
  const [confirmNewPassword,setConfirmNewPassword] = useState('');
  const { User, setToken }: any = useUsers();
  const { Token } = useUsers();
  const [photo, setPhoto] = useState<any>(null);

  const createFormData = (photo: any, body:any = {}) => {
  const data = new FormData();

  data.append('picture', Platform.OS === 'ios' ? photo?.assets && photo?.assets[0]?.uri.replace('file://', '') : photo?.assets && photo?.assets[0]?.uri);

  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });

  return data;
};

const handleChoosePhoto = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response:any) => {
      console.log(response);
      if (response) {
        setPhoto(response);
      }
    });
  };

  const handleUploadPhoto = () => {
    const picture = createFormData(photo)
    api.post('/pictures/upload',{
      picture,
      headers: {Authorization: `Bearer ${Token}`},
    }).then((response) => {
        console.log('response', response);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  const handleLogout = () => {
    setToken(null);
    navigation.navigate('Login');
  };

  const handleUpdatePassword = async () => {
    if(newPassword!==confirmNewPassword || newPassword.length < 6 || confirmNewPassword.length < 6){
      Alert.alert('Erro', 'Senha ou confirmação de senha Inválida')
      return;
    }
    setLoading(true);
    await api
      .put('/auth/change-password', {
        password,
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
  
  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <TopNavigation
          alignment="center"
          title={() => (
            <Text style={styles.titleTopNavigation}>
              Perfil
            </Text>
          )}
        />
        <Divider />
        <Layout style={styles.layoutGlobal}>
          <ScrollView style={styles.scrollView}>
            <Container>
              <View style={styles.input}>
                <Avatar 
                    rounded
                    onPress={handleChoosePhoto}
                    size="xlarge"
                    source={{ uri: photo?.assets && photo?.assets[0]?.uri || User?.picture?.url }} 
                  />
                {photo && (
                  <Button 
                    title="Atualizar avatar" 
                    onPress={handleUploadPhoto} 
                    type="clear"
                  />
                )}

                <View style={styles.separator}>
                  <Text style={styles.textSeparator}>Deseja alterar sua senha ?</Text>
                </View>
                
                <Input
                  placeholder="Nova senha"
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
                  onChangeText={setNewPassword}

                />
                <Input
                  placeholder="Confirmação da nova senha"
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
                  returnKeyType="go"
                  onChangeText={setConfirmNewPassword}
                />
                <ButtonsView>
                  <Button
                    onPress={handleUpdatePassword}
                    title="Alterar senha"
                    iconRight
                    buttonStyle={styles.signInButton}
                    loading={loading}
                  />
                  <Button
                    title="Sair"
                    buttonStyle={styles.signUpButton}
                    onPress={handleLogout}
                    type="outline"
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
const windowWidth = Dimensions.get('window').width - 96;

const styles = StyleSheet.create({
    separator: {
       marginTop: 60,
       marginBottom: 20,
       width: windowWidth,
       height: 50,
       display: 'flex',
       justifyContent: 'center',
       alignItems: 'flex-start',
       
    },
    textSeparator: {
      fontSize: 18,
      textAlign: 'left',
      padding: 10,
    },
    signInButton: {
    marginTop: 24,
    height: 48,
    width: windowWidth,
    backgroundColor: '#4ECCA3',
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
  listBox: {
    backgroundColor: 'transparent',
  },
  avatarStyle: {
    width: 128,
    height: 128,
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
  container: {
    marginTop: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: '700',
  },
  input: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth,
  },
  logo: {
    resizeMode: 'contain',
    height: 300,
    marginBottom: 32,
  },
});
