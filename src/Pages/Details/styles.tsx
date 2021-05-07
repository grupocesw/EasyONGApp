import styled from 'styled-components/native';
import {
  Button,
  Input,
  Text,
  Card,
  ListItem,
} from '@ui-kitten/components';
import {View, Image} from 'react-native';

export const FavoriteItem = styled.View`
  width: 100%;
  height: 145px;
  background-color: transparent;
  position: relative;
`;

export const ViewAvatar = styled(View)`
  display: flex;
  flex-direction: row;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FavoriteButton = styled(Button)`
  background: #ffffff;
  display: flex;
  border: 0;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
  color: #f04;
  border-radius: 45px;
  text-align: center;
  position: absolute;
  top: 16px;
  right: 16px;
`;

export const ShareButton = styled(Button)`
  background: #ffffff;
  display: flex;
  border: 0;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
  color: #f04;
  border-radius: 45px;
  text-align: center;
  position: absolute;
  top: 16px;
  right: 48px;
`;

export const ImgView = styled(Image)`
  width: 100%;
  height: 250px;
  background-color: #c4c4c4;
`;

export const ListItemBox = styled(ListItem)`
  height: 46px;
  border-radius: 6px;
  margin: 15px 0px;
  padding: 0px 12px;
  background-color: #5db075;
  color: #ffffff;
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

export const BoxButton = styled(Button)`
  background: transparent;
  border: 0;
  padding: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 120px;
  color: #f04;
  margin: 0;
  border: 1px solid #bababa;
  border-radius: 8px;
  text-align: center;
  margin-left: 15px;
`;

export const ViewFlex = styled(View)`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 80px;
  margin-bottom: -20px;
`;

export const Wrapper = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const TextView = styled(Text)`
  font-size: 28px;
  font-weight: 700;
  text-align: left;
  margin-left: 16px;
  margin-bottom: 32px;
  color: #ffffff;
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
  width: 163px;
  height: 168px;
  background: #c4c4c4;
  border-radius: 9px;
  margin: 8px 0px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
`;
