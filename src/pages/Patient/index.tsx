import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import api from '../../services/api';

import Input from '../../components/Input';

import {
  Container,
  ContainerList,
  PatientNameText,
} from './styles';
import RemoveButtonList from '../../components/RemoveButtonList';
import EditPersonButton from '../../components/EditPersonButton';
import BottomButton from '../../components/BottomButton';

const Dashboard: React.FC = () => {
  const navigation = useNavigation();
  const [patients, setPatients] = useState<any[]>([]);

  useEffect(() => {
    api.get('/patients').then(response => {
      setPatients(response.data);
    });
  }, []);

  async function handleRemovePatient(id) {
    await api.delete(`/patients/${id}`);

    const newPatients = patients.filter(patient => patient.id !== id);

    setPatients(newPatients);
  }

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <Container>
          <Input name="search" placeholder="Buscar"/>

          <FlatList
            data={patients}
            keyExtractor={patient => String(patient.id)}
            renderItem={({ item: patient }) => (
              <ContainerList>
                <PatientNameText>{patient.name}</PatientNameText>

                <EditPersonButton activeOpacity={0.6} onPress={() => {}} />

                <RemoveButtonList
                  activeOpacity={0.6}
                  onPress={() => handleRemovePatient(patient.id)}
                />
              </ContainerList>
            )}
          />
        </Container>
      </KeyboardAvoidingView>

      <BottomButton onPress={() => navigation.navigate('Formularios Pacientes')}>
        Adicionar Paciente
      </BottomButton>
    </>
  );
};

export default Dashboard;
