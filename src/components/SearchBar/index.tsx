import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SearchBar as SearchBarInput} from 'react-native-elements';
import {useOng, useUsers} from '../../Contexts';
import api from '../../services/api';
import {Container, ButtonUI} from './styles';
import {OngsContext as OngsContextType} from '../../interfaces/Ong';

const SearchBar: React.FC<any> = ({
  setLoading,
  setError,
  setVisible,
  setHide,
  hide,
  value,
  setValue,
}: any) => {
  const {Token}: any = useUsers();
  const {setOngs}: OngsContextType = useOng();
  const handleValue = (search: any) => {
    setValue(search);
  };

  const clearSearch = () => {
    setValue('');
    async function getData() {
      setLoading(true);
      setHide(false);
      await api
        .get('ngos', {
          headers: {Authorization: `Bearer ${Token}`},
        })
        .then(({data}: any) => {
          setOngs(data?.content);
          setLoading(false);
        })
        .catch((err: any) => {
          setVisible(true);
          setError(JSON.stringify(err).substr(0, 100));
          setLoading(false);
        });
    }
    getData();
    setHide(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    await api
      .get(`ngos?filter=${value}`, {
        headers: {Authorization: `Bearer ${Token}`},
      })
      .then(({data}: any) => {
        setOngs(data?.content);
        setLoading(false);
        setHide(true);
      })
      .catch((err: any) => {
        setVisible(true);
        setError(JSON.stringify(err).substr(0, 100));
        setLoading(false);
      });
  };

  return (
    <>
      <Container hide={!hide}>
        <View>
          <ButtonUI onPress={clearSearch}>
            Limpar Buscar
          </ButtonUI>
        </View>
      </Container>
      <Container hide={hide}>
        <View style={styles.BoxInput}>
          <SearchBarInput
            platform="android"
            placeholder="Busque suas ONGS favoritas"
            onChangeText={handleValue}
            value={value}
            onSubmitEditing={handleSubmit}
          />
        </View>
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  BoxInput: {
    alignSelf: 'stretch',
    borderStyle: 'solid',
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
  },
});

export default SearchBar;
