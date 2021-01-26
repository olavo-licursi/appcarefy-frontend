import styled from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
`;

export const ContainerList = styled.View`
  flex-direction: row;
  margin-bottom:1px;
  background-color: #F5FFFA;
  align-items: center;
`;

export const PatientNameText = styled.Text`
  color: black;
  font-size: 18px;
  font-family: 'RobotoSlab-Regular';
  margin-left: 15px;
  flex: 1;
`;
