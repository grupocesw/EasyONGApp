import React, {useState} from 'react';
import {StyleSheet} from 'react-native';

import {Icon} from '@ui-kitten/components';
import {Container, BoxInput, BoxButton, InputField} from './styles';

const SearchBar: React.FC = () => {
  const [value, setValue] = useState();

  const handleValue = (e: any) => {
    setValue(e.target.value);
  };
  const HomeIcon = (props: any) => (
    <Icon fill="#979797" name="search" {...props} />
  );
  const VoiceIcon = (props: any) => (
    <Icon fill="#979797" name="mic" {...props} />
  );
  return (
    <>
      <Container>
        <BoxInput>
          <BoxButton accessoryLeft={HomeIcon} />
          <InputField
            style={styles.inputStyle}
            value={value}
            onChange={(e) => handleValue(e)}
            placeholder="Pesquisar"
            accessoryRight={VoiceIcon}
          />
        </BoxInput>
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    borderColor: '#ffffff',
    color: '#000000',
  },
});

export default SearchBar;
