import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import GenerateTokenScreen from '../screens/GenerateTokenScreen';
import ValidateTokenScreen from '../screens/ValidateTokenScreen'
import React from 'react'

const Stack = createStackNavigator();
function AppNavigator() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="GenerateToken">
            <Stack.Screen
            name='GenerateToken'
            component={GenerateTokenScreen}
            options={{title: 'Generate Token'}}
            /> 
            <Stack.Screen 
            name='ValidateToken'
            component={ValidateTokenScreen}
            options={{title: 'Validate Tokens'}}
            />
           

        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator