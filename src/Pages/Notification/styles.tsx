import styled from 'styled-components/native';
import {Text} from '@ui-kitten/components';
import {View} from 'react-native';

export const Container = styled.View`
  padding: 16px;
`;

export const ListCardItem = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  flex-wrap: wrap;
`;

export const CardItem = styled.TouchableOpacity`
  flex-direction: row;
  width: 100%;
  height: 88px;
  background: #fafafa;
  border-radius: 8px;
  display: flex;
  margin: 0% 0 4% 0;
`;

export const ItemTitle = styled(Text)`
  font-size: 16px;
  line-height: 18px;
  font-weight: 700;
  margin-bottom: 5px;
  color: #000000;
  padding-top: 8px;
  padding-left: 8px;
  padding-right: 8px;
  padding-bottom: 2px;
`;

export const ItemDescription = styled(Text)`
  font-size: 14px;
  line-height: 16px;
  font-weight: 400;
  color: #000000;
  padding-left: 8px;
  padding-right: 8px;
  padding-bottom: 8px;
`;
