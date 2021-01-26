import React, { useCallback, useRef } from 'react';
import Input from '../../components/InputForms';
import ButtonAdd from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import {TextInput, Alert} from 'react-native';
import { Container } from './styles';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

interface AppointmentFormData{
    physician: string;
    patient: string;
    start: Date;
    end: Date;
}

const AppointmentForm: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const nextInputRefPatient = useRef<TextInput>(null);
    const nextInputRefStart = useRef<TextInput>(null);
    const nextInputRefEnd = useRef<TextInput>(null);
    const navigation = useNavigation();

    const handleAppointmentForm = useCallback(
        async (data: AppointmentFormData) => {
          try {
            formRef.current?.setErrors({});
    
            const schema = Yup.object().shape({
                physician: Yup.string()
                .required('Médico(a) é obrigatório'),
                patient: Yup.string().required('Paciente é obrigatório'),
                start: Yup.string().required('Horário de começo é obrigatório'),
                end: Yup.string().required('Horário de término é obrigatório')
            });
    
            await schema.validate(data, { abortEarly: false });
    
            await api.post('/appointments', data);

            Alert.alert('Cadastro realizado com sucesso!');
    
            navigation.goBack();
          } catch (err) {
            if (err instanceof Yup.ValidationError) {
              const errors = getValidationErrors(err);
    
              formRef.current?.setErrors(errors);
              return;
            }

            Alert.alert(
                'Erro ao cadastrar agendamento',
                'Ocorreu um erro ao criar agendamento, cheque as credenciais',
            );
          }
        }, [navigation]);

    return(
        <Container>
            <Form ref={formRef} onSubmit={handleAppointmentForm}>
            <Input 
            name="physician" 
            icon="user" 
            placeholder="Médico(a)" 
            autoCorrect={false} 
            autoCapitalize="words" 
            returnKeyType="next" 
            onSubmitEditing={() => {nextInputRefPatient.current?.focus()}}/>

            <Input 
            ref={nextInputRefPatient}
            name="patient" 
            icon="user" 
            placeholder="Paciente" 
            autoCorrect={false} 
            autoCapitalize="words" 
            returnKeyType="next" 
            onSubmitEditing={() => {nextInputRefStart.current?.focus()}}/>

            <Input 
            ref={nextInputRefStart}
            name="start" 
            icon="user" 
            placeholder="Começa" 
            autoCorrect={false} 
            autoCapitalize="none" 
            returnKeyType="next" 
            onSubmitEditing={() => {nextInputRefEnd.current?.focus()}}/>

            <Input 
            ref={nextInputRefEnd}
            name="end" 
            icon="phone" 
            placeholder="Termina" 
            autoCorrect={false} 
            autoCapitalize="none" 
            returnKeyType="send" 
            onSubmitEditing={() => {
                formRef.current?.submitForm();}} />

            <ButtonAdd onPress={() => {
                formRef.current?.submitForm();}
            }>Adicionar</ButtonAdd>

            </Form>
        </Container>
    );
}

export default AppointmentForm;