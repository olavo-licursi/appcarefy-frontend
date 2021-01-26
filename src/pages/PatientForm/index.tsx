import React, { useCallback, useRef } from 'react';
import Input from '../../components/InputForms';
import ButtonAdd from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import {TextInput, Alert} from 'react-native';
import {Container} from './styles';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

interface PatientFormData{
    name: string;
    telephones: string;
    preferredPhone: string;
}

const PatientForm: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const nextInputRefTelephones = useRef<TextInput>(null);
    const nextInputRefPreferredTelephone = useRef<TextInput>(null);
    const navigation = useNavigation();

    const handlePatientForm = useCallback(
        async (data: PatientFormData) => {
          try {
            formRef.current?.setErrors({});
    
            const schema = Yup.object().shape({
                name: Yup.string()
                .required('Nome é obrigatório'),
                telephones: Yup.string().required('Telefone é obrigatório'),
                preferredPhone: Yup.string().required('Melhor Telefone é obrigatório'),
            });
    
            await schema.validate(data, { abortEarly: false });
    
            await api.post('/patients', data);

            Alert.alert('Cadastro realizado com sucesso!');
    
            navigation.navigate('Pacientes');

          } catch (err) {
            if (err instanceof Yup.ValidationError) {
              const errors = getValidationErrors(err);
    
              formRef.current?.setErrors(errors);
              return;
            }

            Alert.alert(
                'Erro ao criar paciente',
                'Ocorreu um erro ao cria paciente, cheque as credenciais',
            );
          }
        }, [navigation]);

    return(
        <Container>
            <Form ref={formRef} onSubmit={handlePatientForm}>
            <Input 
            name="name" 
            icon="user" 
            placeholder="Nome" 
            autoCorrect={false} 
            autoCapitalize="words" 
            returnKeyType="next" 
            onSubmitEditing={() => {nextInputRefTelephones.current?.focus()}}/>

            <Input 
            ref={nextInputRefTelephones}
            name="telephones" 
            icon="phone" 
            placeholder="Telefone" 
            autoCorrect={false} 
            autoCapitalize="none" 
            returnKeyType="next" 
            onSubmitEditing={() => {nextInputRefPreferredTelephone.current?.focus()}}/>

            <Input 
            ref={nextInputRefPreferredTelephone}
            name="preferredPhone" 
            icon="phone-incoming" 
            placeholder="Melhor Telefone" 
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

export default PatientForm;