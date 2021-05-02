import styled from 'styled-components/native';
import {Button, Text, Card} from '@ui-kitten/components';
import {View} from 'react-native';

export const Container = styled.View`
  padding: 15px;
  width: 100%;
`;

export const FavoriteItem = styled.View`
  width: 100%;
  min-height: 170px;
  background-color: transparent;
  border-radius: 8px;
  position: relative;
`;

export const FavoriteButton = styled(Button)`
  background: #f04;
  display: flex;
  border: 0;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
  color: #fff;
  border-radius: 45px;
  text-align: center;
  position: absolute;
  top: 16px;
  right: 16px;
`;

export const ViewFlex = styled(View)`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 80px;
  margin-bottom: -20px;
`;

export const TextView = styled(Text)`
  font-size: 23px;
  font-weight: 400;
  margin-top: -90px;
  text-align: left;
`;

export const ItemTitle = styled(Text)`
  font-size: 13px;
  line-height: 18px;
  font-weight: 700;
  margin-bottom: 10px;
  color: #ffffff;
  margin-top: 10px;
`;
export const ItemDescription = styled(Text)`
  font-size: 12px;
  line-height: 16px;
  font-weight: 400;
  color: #ffffff;
  margin-bottom: 20px;
`;

export const ListCardItem = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 30px;
  width: 100%;
  flex-wrap: wrap;
`;

export const ImageUI = styled.Image`
  width: 100%;
  min-height: 160px;
  background: transparent;
  border-radius: 8px;
  display: flex;
  margin: 0% 0 4% 0;
  align-items: flex-start;
  justify-content: space-between;
`;

export const CardItem = styled(Card)`
  width: 163px;
  min-height: 170px;
  background: transparent;
  border-radius: 9px;
  margin: 8px 0px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
`;
