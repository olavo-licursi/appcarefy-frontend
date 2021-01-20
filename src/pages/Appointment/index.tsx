import React, {useState, useEffect} from 'react';
import {KeyboardAvoidingView, Platform, FlatList} from 'react-native';

import api from "../../services/api";

import Input from '../../components/Input';


import { Container, AddPatientButton, AddPatientButtonText, ContainerList, PatientNameText } from './styles';
import RemoveButtonList from '../../components/RemoveButtonList';
import EditPersonButton from '../../components/EditPersonButton';

const Appointment: React.FC = () => {
    const [appointments, setAppointments] = useState<any[]>([])

    useEffect(() => {
        api.get('/appointments').then(response => {
          console.log(response.data);
          setAppointments(response.data);
        });
      }, []);

      async function handleRemoveAppointment(id){
        await api.delete(`/appointments/${id}`);

        const newAppointments = appointments.filter(
            appointment => appointment.id !== id
        )

        setAppointments(newAppointments);
      }

    return(
        <>
        <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
        >

                <Container>
                    <Input name="search" icon="search" placeholder="Buscar" />

                    <FlatList 
                    data={appointments}
                    keyExtractor={appointment => String(appointment.id)}
                    renderItem={({ item: appointment}) => (  
                        <ContainerList>
                        <PatientNameText>Start: {appointment.start}</PatientNameText>
                        <PatientNameText>End: {appointment.end}</PatientNameText>


                        <EditPersonButton 
                        activeOpacity={0.6}
                        onPress={() => {}}
                        />    

                        <RemoveButtonList
                              activeOpacity={0.6}
                              onPress={() => handleRemoveAppointment(appointment.id)}
                              />
                             
                        </ContainerList>                           
                        )}
                        
                        
                    />

                </Container>
        </KeyboardAvoidingView>

        <AddPatientButton>
        <AddPatientButtonText>Adicionar Agendamento</AddPatientButtonText>
        </AddPatientButton>
        </>
    );
}

export default Appointment;