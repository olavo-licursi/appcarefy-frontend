import React, {useState, useEffect} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, FlatList, View, Text, TouchableOpacity} from 'react-native';

import api from "../../services/api";

import Input from '../../components/Input';


import { Container, AddPatientButton, AddPatientButtonText, RemovePatientButton, RemovePatientButtonText, ContainerList, PatientNameText } from './styles';

const Dashboard: React.FC = () => {
    const [patients, setPatients] = useState<any[]>([])

    useEffect(() => {
        api.get('/patients').then(response => {
          console.log(response.data);
          setPatients(response.data);
        });
      }, []);

      async function handleRemovePatient(id){
        await api.delete(`/patients/${id}`);

        const newPatients = patients.filter(
            patient => patient.id !== id
        )

        setPatients(newPatients);
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
                    data={patients}
                    keyExtractor={patient => String(patient.id)}
                    renderItem={({ item: patient}) => (  
                        <ContainerList>
                        <PatientNameText>{patient.name}</PatientNameText>    

                        <RemovePatientButton
                              activeOpacity={0.6}
                              onPress={() => handleRemovePatient(patient.id)}
                              >
                                  <RemovePatientButtonText>Remover</RemovePatientButtonText>
                              </RemovePatientButton>      
                              </ContainerList>                           
                        )}
                        
                        
                    />

                </Container>
        </KeyboardAvoidingView>

        <AddPatientButton>
        <AddPatientButtonText>Adicionar Paciente</AddPatientButtonText>
        </AddPatientButton>
        </>
    );
}

export default Dashboard;