import styled, {css} from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';


interface ContainerProps{
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 16px;

  flex-direction: row;
  align-items: center;
  border: 2px;
  border-radius: 20px;
  margin-bottom: 20px;
  border-color: #347ae3;

  ${(props) =>
  props.isErrored &&
  css`
    border-color: #c53030;
  `}
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
