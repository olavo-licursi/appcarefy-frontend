import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, FlatList } from 'react-native';
import BottomButton from '../../components/BottomButton';
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

const Physician: React.FC = () => {
  const navigation = useNavigation();
  const [physicians, setPhysicians] = useState<any[]>([]);

  useEffect(() => {
    api.get('/physicians').then(response => {
      setPhysicians(response.data);
    });
  }, []);

  async function handleRemovePhysician(id) {
    await api.delete(`/physicians/${id}`);

    const newPhysicians = physicians.filter(physician => physician.id !== id);

    setPhysicians(newPhysicians);
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
            data={physicians}
            keyExtractor={physician => String(physician.id)}
            renderItem={({ item: physician }) => (
              <ContainerList>
                <PatientNameText>{physician.name}</PatientNameText>

                <EditPersonButton activeOpacity={0.6} onPress={() => {}} />

                <RemoveButtonList
                  activeOpacity={0.6}
                  onPress={() => handleRemovePhysician(physician.id)}
                />
              </ContainerList>
            )}
          />
        </Container>
      </KeyboardAvoidingView>

      <BottomButton onPress={() => navigation.navigate('Formularios Médicos')}>
        Adicionar Médico(a)
      </BottomButton>
    </>
  );
};

export default Physician;
