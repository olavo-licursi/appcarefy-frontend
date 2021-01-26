import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BottomButton from '../../components/BottomButton';


import api from '../../services/api';

import Input from '../../components/Input';

import {
  Container,
  ContainerList,
  PatientNameText,
} from './styles';
import RemoveButtonList from '../../components/RemoveButtonList';
import EditPersonButton from '../../components/EditPersonButton';

const Appointment: React.FC = () => {
  const navigation = useNavigation();
  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    api.get('/appointments').then(response => {
      setAppointments(response.data);
    });
  }, []);

  async function handleRemoveAppointment(id) {
    await api.delete(`/appointments/${id}`);

    const newAppointments = appointments.filter(
      appointment => appointment.id !== id,
    );

    setAppointments(newAppointments);
  }

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <Container>
          <Input name="search" placeholder="Buscar" />

          <FlatList
            data={appointments}
            keyExtractor={appointment => String(appointment.id)}
            renderItem={({ item: appointment }) => (
              <ContainerList>
                <PatientNameText>
                  Start:{appointment.start}</PatientNameText>
                <PatientNameText>
                  End:{appointment.end}</PatientNameText>

                <EditPersonButton activeOpacity={0.6} onPress={() => {}} />

                <RemoveButtonList
                  activeOpacity={0.6}
                  onPress={() => handleRemoveAppointment(appointment.id)}
                />
              </ContainerList>
            )}
          />
        </Container>
      </KeyboardAvoidingView>

      <BottomButton onPress={() => navigation.navigate('Formularios Agendamentos')}>
        Adicionar Agendamento
      </BottomButton>
    </>
  );
};

export default Appointment;
