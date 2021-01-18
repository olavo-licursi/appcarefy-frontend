import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../pages/Dashboard';
import Patient from '../pages/Patient';
import Physician from '../pages/Physician';
import Appointment from '../pages/Appointment';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
    <Auth.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#F5FFFA' },
      }}
    >
      <Auth.Screen name="Dashboard" component={Dashboard} />
      <Auth.Screen name="Patient" component={Patient} />
      <Auth.Screen name="Physician" component={Physician} />
      <Auth.Screen name="Appointment" component={Appointment} />
    </Auth.Navigator>
  );
  
  export default AuthRoutes;