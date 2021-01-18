import React from 'react';

import Input from '../../components/Input';

import { Container } from './styles';

const Dashboard: React.FC = () => {
    return(
        <Container>
            <Input name="search" icon="search" placeholder="Buscar" />
        </Container>
    );
}

export default Dashboard;