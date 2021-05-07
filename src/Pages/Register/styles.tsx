import styled from 'styled-components/native';
import {ListItem} from '@ui-kitten/components';
import {TouchableOpacity, View} from 'react-native';
import {Input} from 'react-native-elements';

export const Container = styled.View`
  padding: 15px;
  justify-content: center;
  align-items: center;
  height: auto;
  margin-top: 15%;
  text-align: center;
  align-self: stretch;
`;

export const CardItem = styled(View)`
  width: 100%;
  height: 100%;
  background: transparent;
  border-radius: 9px;
  margin: 8px 0px;
  display: flex;
  padding: 20px 15px;
  align-items: center;
  justify-content: center;
  align-self: stretch;
`;

export const ButtonsView = styled.View`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ButtonRegister = styled(TouchableOpacity)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 15px;
`;

export const TextView = styled.View`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  align-self: stretch;
  text-align: left;
`;

export const InputField = styled(Input)`
  margin: 0;
  background-color: transparent;
  margin-top: 3px;
  display: flex;
  align-self: stretch;
  border: none;
`;

export const BoxButton = styled(TouchableOpacity)`
  background: transparent;
  border: 0;
  padding: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding: 10px 25px;
  border-radius: 4px;
  text-align: center;
  margin-top: 15px;
  background-color: #5db075;
`;

export const ListItemBox = styled(ListItem)`
  height: 46px;
  border-radius: 6px;
  margin: 15px 0px;
  padding: 0px 12px;
`;

export const ViewFlex = styled(View)`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 80px;
  margin-bottom: -20px;
`;

export const ListCardItem = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 30px;
  width: 100%;
  flex-wrap: wrap;
`;
