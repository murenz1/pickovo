import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import auth screens
import LaunchScreen from '../screens/auth/LaunchScreen';
import CreateAccountScreen from '../screens/auth/CreateAccountScreen';
import AddEmailScreen from '../screens/auth/AddEmailScreen';
import VerifyEmailScreen from '../screens/auth/VerifyEmailScreen';
import CreatePasswordScreen from '../screens/auth/CreatePasswordScreen';
import AccountCreatedScreen from '../screens/auth/AccountCreatedScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Launch"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#FFFFFF' }
      }}
    >
      <Stack.Screen name="Launch" component={LaunchScreen} />
      <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
      <Stack.Screen name="AddEmail" component={AddEmailScreen} />
      <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} />
      <Stack.Screen name="CreatePassword" component={CreatePasswordScreen} />
      <Stack.Screen name="AccountCreated" component={AccountCreatedScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
