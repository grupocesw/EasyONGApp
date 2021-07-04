import styled from 'styled-components/native';
import {Button, Input, Text} from '@ui-kitten/components';
import {View} from 'react-native';

export const HideSuggest: any = styled.View`
  display: ${(props: any) =>
    props.hide ? 'none' : 'flex'};
`;

export const Container = styled.View`
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 16px;
  background-color: transparent;
`;

export const InputField = styled(Input)`
  width: auto;
  margin: 0;
  width: 85%;
  background-color: transparent;
  margin-top: 4px;
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
  margin-left: 16px;
`;

export const ViewAvatar = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-self: stretch;
  width: 100%;
`;

export const ViewSwitch = styled(View)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const ViewFlex: any = styled(View)`
  display: ${(props: any) =>
    props.hide ? 'none' : 'flex'};
  justify-content: center;
  align-items: flex-start;
  height: 80px;
  background-color: transparent;
`;

export const TextView = styled(Text)`
  font-size: 24px;
  font-weight: 400;
  margin-top: 16px;
  text-align: left;
`;

export const OngCardItem = styled.TouchableOpacity`
  width: 256px;
  margin: 16px 16px;
  margin-left: 0px;
  min-height: 200px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  border-radius: 8px;
  color: #fafafa;
  padding: 0px;
  font-size: 12px;
  font-weight: 700;
  background-color: transparent;
  border: 1px solid #eeeeee;
`;

export const RattingContainer = styled(View)`
  align-self: stretch;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-right: 15px;
  margin-top: auto;
`;

export const FavoriteButton = styled(Button)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  width: 10px;
  height: 10px;
  padding: 0px;
  border: 0;
`;

export const ItemTitle = styled(Text)`
  font-size: 16px;
  line-height: 18px;
  font-weight: 700;
  margin-bottom: 4px;
  margin-left: 10px;
  margin-right: 10px;
`;
export const ItemDescription = styled(Text)`
  font-size: 14px;
  line-height: 16px;
  font-weight: 400;
  margin-left: 10px;
  margin-right: 10px;
`;

export const ListCardItem = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 48px;
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
`;

export const ImageUI = styled.Image`
  width: 100%;
  height: 128px;
  background: #c4c4c4;
  border-radius: 8px;
  display: flex;
  margin: 0% 0 4% 0;
  align-items: flex-start;
  justify-content: space-between;
`;

export const CardItem = styled.TouchableOpacity`
  width: 48%;
  min-height: 168px;
  border-radius: 8px;
  display: flex;
  margin: 0% 0 6% 0;
  padding: 0px;
  align-items: flex-start;
  justify-content: space-between;
`;
