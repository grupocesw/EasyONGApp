import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {SearchBar as SearchBarInput} from 'react-native-elements';
import {Container} from './styles';

const SearchBar: React.FC = () => {
  const [value, setValue] = useState();

  const handleValue = (search: any) => {
    setValue(search);
  };

  return (
    <>
      <Container>
        <View style={styles.BoxInput}>
          <SearchBarInput
            platform="android"
            placeholder="Busque suas ong favoritas"
            onChangeText={handleValue}
            value={value}
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
