import styled from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.View``;

export const AddPatientButton = styled.TouchableOpacity`
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    background: #61dac9;
    padding: 16px 0 ${16 + getBottomSpace()}px;

    justify-content: center;
    align-items: center;
    flex-direction: row;
`;

export const AddPatientButtonText = styled.Text`
    color: #F5FFFA;
    font-size: 18px;
    font-family: 'RobotoSlab-Regular';
    margin-left: 16px;
`;

export const RemovePatientButton = styled.TouchableOpacity`
    background-color: red;
    margin: 20px;
    margin-right: 15px;
    height: 40px;
    border-radius: 4px;
    justify-content: center;
    align-items: center;
    padding: 15px;
`;

export const RemovePatientButtonText = styled.Text`
    font-weight: bold;
    font-size: 16px;
    font-family: 'RobotoSlab-Regular';
`;

export const ContainerList = styled.View`
    flex-direction: row;
    margin-bottom: 1px;
    background-color: #DCDCDC;
    align-items: center;
`;

export const PatientNameText = styled.Text`
    color: black;
    font-size: 18px;
    font-family: 'RobotoSlab-Regular';
    margin-left: 15px;
    flex:1;
`;