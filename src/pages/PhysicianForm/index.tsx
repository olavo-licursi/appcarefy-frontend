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

interface PhysicianFormData{
    name: string;
    telephones: string;
}

const PhysicianForm: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const nextInputRefTelephone = useRef<TextInput>(null);
    const navigation = useNavigation();

    const handlePhysicianForm = useCallback(
        async (data: PhysicianFormData) => {
          try {
            formRef.current?.setErrors({});
    
            const schema = Yup.object().shape({
                name: Yup.string()
                .required('Nome é obrigatório'),
                telephones: Yup.string().required('Telefone é obrigatório'),
            });
    
            await schema.validate(data, { abortEarly: false });
    
            await api.post('/physicians', data);

            Alert.alert('Cadastro realizado com sucesso!');
    
            navigation.goBack();
          } catch (err) {
            if (err instanceof Yup.ValidationError) {
              const errors = getValidationErrors(err);
    
              formRef.current?.setErrors(errors);
              return;
            }

            Alert.alert(
                'Erro ao cadastrar médico',
                'Ocorreu um erro ao criar médico, cheque as credenciais',
            );
          }
        }, [navigation]);

    return(
        <Container>
            <Form ref={formRef} onSubmit={handlePhysicianForm}>
            <Input 
            name="name" 
            icon="user" 
            placeholder="Nome" 
            autoCorrect={false} 
            autoCapitalize="words" 
            returnKeyType="next" 
            onSubmitEditing={() => {nextInputRefTelephone.current?.focus()}}/>

            <Input 
            ref={nextInputRefTelephone}
            name="telephones" 
            icon="phone" 
            placeholder="Telefone" 
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

export default PhysicianForm;