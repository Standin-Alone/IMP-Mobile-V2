import React from 'react';
import { StyleSheet } from 'react-native';

import Home from '../screens/BottomTab/Home';
import UserProfile from '../screens/BottomTab/UserProfile';
import constants from '../constants';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const BottomTab = createBottomTabNavigator();


export const BottomTabNavigator = ()=>(

    <BottomTab.Navigator            
        screenOptions={{
            tabBarActiveBackgroundColor: constants.Colors.light,
            tabBarInactiveBackgroundColor: constants.Colors.light,
            tabBarActiveTintColor: constants.Colors.primary,
            tabBarInactiveTintColor: constants.Colors.dark_tint,
            tabBarLabelStyle:styles.tabBarLabelStyle,
            tabBarStyle:styles.barStyle,
            headerShown:false
            
        }}
     >
        <BottomTab.Screen 
            name ="Home" 
            component={Home}
            options={{             
                tabBarShowLabel:false,                    
                tabBarIcon: ({color})=>(
                    <constants.Icons.Octicons name="home" size={40} color={color}/>
                )
             }}
        />

        <BottomTab.Screen 
            name ="UserProfile" 
            component={UserProfile}
            options={{ 
                // title:"User Account",
                tabBarShowLabel:false,
                tabBarIcon: ({color})=>(
                    <constants.Icons.Octicons name="person-fill" size={40} color={color}/>
                )
             }}
        />
    </BottomTab.Navigator>
)



const styles = StyleSheet.create({
    barStyle:{
        height:constants.Dimensions.vh(16),        
    },
    tabBarLabelStyle:{
        fontFamily:constants.Fonts.OpenSansBold,
        fontSize:14
    }

});