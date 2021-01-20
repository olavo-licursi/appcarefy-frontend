import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import FeatherIcon from 'react-native-vector-icons/Feather';

export const Container = styled(RectButton)`
    background-color: #6495ED;
    margin: 10px;
    margin-right: 4px;
    height: 40px;
    border-radius: 4px;
    justify-content: center;
    align-items: center;
    padding: 15px;
`;

export const Icon = styled(FeatherIcon)``;