/* eslint-disable react/prop-types */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from 'views/guest/LoginScreen/LoginScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from 'views/user/HomeScreen/HomeScreen';


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AboutScreen from 'views/user/AboutScreen/AboutScreen';
import Ionicons from '@expo/vector-icons/Ionicons';

const Stack = createNativeStackNavigator();



const Tab = createBottomTabNavigator();


function BottomNavButtons() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={HomeScreen} options={
        {
          title: "My Notes",
          tabBarIcon: () => (
            <Ionicons name="md-home" size={32} color="green" />
          )
        }
      }
        />

<Tab.Screen name="About" component={AboutScreen} options={
        {
          title: "About",
          tabBarIcon: () => (
            <Ionicons name="md-information" size={32} color="green" />
          )
        }
      }
        />
    </Tab.Navigator>
  );
}


const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
        <Stack.Group
          screenOptions={{ headerStyle: { backgroundColor: 'papayawhip' } }}

        >
          <Stack.Screen name="Login" component={LoginScreen} options={
           {
            headerShown: false
           } 
          }/>
        </Stack.Group>
        <Stack.Group>
          <Stack.Screen name="App" component={BottomNavButtons} options={{
            headerShown: false,
            title: "My Notes"
          }}/>
        </Stack.Group>
      </Stack.Navigator>



    </NavigationContainer>
  );
};

export default AppNavigation;
