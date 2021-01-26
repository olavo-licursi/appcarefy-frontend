import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from '../pages/Dashboard';
import Patient from '../pages/Patient';
import Physician from '../pages/Physician';
import Appointment from '../pages/Appointment';
import PatientForm from '../pages/PatientForm';
import PhysicianForm from '../pages/PhysicianForm';
import AppointmentForm from '../pages/AppointmentForm';


const Auth = createStackNavigator();
const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: true,
      cardStyle: { backgroundColor: '#F5FFFA' },
    }}
  >
    <Auth.Screen name="Dashboard" component={Dashboard} />
    <Auth.Screen name="Pacientes" component={Patient} />
    <Auth.Screen name="Médicos" component={Physician} />
    <Auth.Screen name="Agendamentos" component={Appointment} />
    <Auth.Screen name="Formularios Pacientes" component={PatientForm} />
    <Auth.Screen name="Formularios Médicos" component={PhysicianForm} />
    <Auth.Screen name="Formularios Agendamentos" component={AppointmentForm} />

  </Auth.Navigator>
);

export default AuthRoutes;
