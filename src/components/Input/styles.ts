import styled from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';


export const Container = styled.View`
  width: 100%;
  height: 60px;
  padding: 0 16px;

  flex-direction: row;
  align-items: center;
  border: 1px;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #666360;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;
