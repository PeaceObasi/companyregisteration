import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../Home";
import AppStack from "./stacknavigation";
import Extra from "../Extra";
import MaterialComunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Success from "../Succes";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={AppStack} 
        options={{
        tabBarIcon: ({color, size}) => (
            <MaterialComunityIcons name="home" color={color} size={size}/>
        )
    }}
    />

        <Tab.Screen name="Registered" component={Success}
         options={{tabBarLabel: 'Properties',
         tabBarIcon: ({color, size}) => (
             <MaterialComunityIcons name="apps" color={color} size={size}/>
         )
         }} 
        /> 
      </Tab.Navigator>
    );
  };
  
export default BottomTabNavigator;