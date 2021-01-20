import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';

import { Container, Icon } from './styles';

type ButtonProps = RectButtonProperties;

const Button: React.FC<ButtonProps> = ({ ...rest }) => (
  <Container {...rest}>
    <Icon name="x" size={20} color="#000000" />
  </Container>
);

export default Button;
