import styled from 'styled-components/native';
import {Button, Input} from '@ui-kitten/components';

export const Container: any = styled.View`
  display: ${(props: any) =>
    props.hide ? 'none' : 'flex'};
  padding: 15px;
`;

export const ButtonUI = styled(Button)`
  padding: 10px;
  border: 1px solid black;
`;

export const BoxInput = styled.View`
  border-radius: 99px;
  background-color: #fff;
  height: 42px;
  display: flex;
  flex-direction: row;
  padding: 0px 0px 0px 5px;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

export const InputField = styled(Input)`
  width: auto;
  color: #000000;
  font-size: 16px;
  margin: 0;
  width: 85%;
  background-color: transparent;
  margin-top: 3px;
  border: none;
  border-radius: 99px;
  margin-left: 5px;
`;

export const BoxButton = styled(Button)`
  background: transparent;
  border: 0;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  margin: 0;
  background-color: transparent;
`;

export const TextView = styled.Text`
  font-size: 30px;
`;
