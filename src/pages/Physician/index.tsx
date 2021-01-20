import React, {useEffect, useState} from 'react';

import {KeyboardAvoidingView, Platform, FlatList} from 'react-native';

import api from "../../services/api";

import Input from '../../components/Input';

import { Container, AddPatientButton, AddPatientButtonText, ContainerList, PatientNameText } from './styles';
import RemoveButtonList from '../../components/RemoveButtonList';
import EditPersonButton from '../../components/EditPersonButton';

const Physician: React.FC = () => {
    const [physicians, setPhysicians] = useState<any[]>([])

    useEffect(() => {
        api.get('/physicians').then(response => {
          console.log(response.data);
          setPhysicians(response.data);
        });
      }, []);

      async function handleRemovePhysician(id){
        await api.delete(`/physicians/${id}`);

        const newPhysicians = physicians.filter(
            physician => physician.id !== id
        )

        setPhysicians(newPhysicians);
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
                    data={physicians}
                    keyExtractor={physician => String(physician.id)}
                    renderItem={({ item: physician}) => (  
                        <ContainerList>
                        <PatientNameText>{physician.name}</PatientNameText>

                        <EditPersonButton 
                        activeOpacity={0.6}
                        onPress={() => {}}
                        />    

                        <RemoveButtonList
                              activeOpacity={0.6}
                              onPress={() => handleRemovePhysician(physician.id)}
                              />
                             
                        </ContainerList>                           
                        )}
                        
                        
                    />

                </Container>
        </KeyboardAvoidingView>

        <AddPatientButton>
        <AddPatientButtonText>Adicionar Médico</AddPatientButtonText>
        </AddPatientButton>
        </>
    );
}

export default Physician;