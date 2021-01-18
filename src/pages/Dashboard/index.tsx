import React from 'react';
import { Image } from 'react-native';

import Button from '../../components/Button';

import { Container, Title } from './styles';

import logoImg from '../../assets/logo.png';


const Patient: React.FC = () => {
    return(
        <Container>
            <Image source={logoImg} />
            <Title>Seja Bem-Vindo(a)!</Title>
            <Button onPress={() => {console.log('Funcionando')}}>Pacientes</Button>
            <Button onPress={() => {console.log('Funcionando')}}>Médicos(as)</Button>
            <Button onPress={() => {console.log('Funcionando')}}>Consultas</Button>
        </Container>
    );
}

export default Patient;