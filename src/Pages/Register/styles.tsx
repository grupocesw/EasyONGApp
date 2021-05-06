import styled from 'styled-components/native';
import {
  Input,
  Text,
  Card,
  ListItem,
} from '@ui-kitten/components';
import {TouchableOpacity, View} from 'react-native';

export const Container = styled.View`
  padding: 15px;
  justify-content: center;
  align-items: center;
  height: auto;
  margin-top: 40%;
  text-align: center;
`;

export const TextView = styled.View`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: left;
`;

export const ListItemBox = styled(ListItem)`
  height: 46px;
  border-radius: 6px;
  margin: 15px 0px;
  padding: 0px 12px;
`;

export const InputField = styled(Input)`
  width: auto;
  margin: 0;
  width: 85%;
  background-color: transparent;
  margin-top: 3px;
  border: none;
`;

export const Box = styled.View`
  background-color: transparent;
  height: 42px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;

export const BoxButton = styled(TouchableOpacity)`
  background: transparent;
  border: 0;
  padding: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 120px;
  color: #f04;
  padding: 10px;
  border: 1px solid #bababa;
  border-radius: 8px;
  text-align: center;
  margin-top: 15px;
  margin-right: 15px;
`;

export const ButtonsView = styled.View`
  width: 60%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

export const ButtonRegister = styled(TouchableOpacity)`
  width: 60%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

export const ViewFlex = styled(View)`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 80px;
  margin-bottom: -20px;
`;

export const OngCard = styled(View)`
  width: 100%;
  height: 100%;
  display: flex;
  margin-top: -50px;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: #ffffff;
  border-radius: 20px;
  color: #000000;
  padding: 24px;
  font-size: 13px;
  font-weight: 700;
`;

export const ItemTitle = styled(Text)`
  font-size: 20px;
  line-height: 23px;
  font-weight: 700;
  margin-bottom: 15px;
  color: #000000;
  margin-top: 10px;
`;
export const ItemDescription = styled(Text)`
  font-size: 16px;
  line-height: 18px;
  font-weight: 400;
  color: #000000;
  margin-bottom: 20px;
`;

export const ListCardItem = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 30px;
  width: 100%;
  flex-wrap: wrap;
`;

export const CardItem = styled(Card)`
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 9px;
  margin: 8px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
