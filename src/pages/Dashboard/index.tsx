import React from 'react';
import { Image } from 'react-native';

import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';

import { Container, Title } from './styles';

import logoImg from '../../assets/logo.png';


const Patient: React.FC = () => {
    const navigation = useNavigation();

    return(
        <Container>
            <Image source={logoImg} />
            <Title>Seja Bem-Vindo(a)!</Title>
            <Button onPress={() => navigation.navigate('Pacientes')}>Pacientes</Button>
            <Button onPress={() => navigation.navigate('Médicos')}>Médicos(as)</Button>
            <Button onPress={() => navigation.navigate('Agendamentos')}>Agendamentos</Button>
        </Container>
    );
}


export default Patient;