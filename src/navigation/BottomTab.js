import React from 'react';
import { StyleSheet } from 'react-native';

import Home from '../screens/BottomTab/Home';
import UserProfile from '../screens/BottomTab/UserProfile';
import constants from '../constants';
import {BottomFabBar} from 'rn-wave-bottom-bar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TransactionStackComponent } from './TransactionStack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { HomeStackComponent } from './HomeStack';
import PayoutMonitoring from '../screens/BottomTab/PayoutMonitoring';
import { PayoutMonitoringStackComponent } from './PayoutMonitoringStack';

const BottomTab = createBottomTabNavigator();



export function getTabBarVisibility(route) {   
    
    const routeName = getFocusedRouteNameFromRoute(route);
    
    if (( routeName != 'ScanningScreen') && ( routeName != 'HomeScreen')  && ( routeName != 'PayoutMonitoringScreen')   && routeName !== undefined) {        
      return 'none';
    }else{
        return 'flex';
    }
    
}


export const BottomTabNavigator = ()=>(

    <BottomTab.Navigator            
        screenOptions={({route,navigation})=>({  
            tabBarActiveBackgroundColor: constants.Colors.light,
            tabBarInactiveBackgroundColor: constants.Colors.light,
            tabBarActiveTintColor: constants.Colors.primary,
            tabBarInactiveTintColor: constants.Colors.dark_tint,
            tabBarLabelStyle:styles.tabBarLabelStyle,
            // tabBarStyle:styles.barStyle,
            headerShown:false,
            tabBarStyle:{display:getTabBarVisibility(route)},   
            
        })}


          
     >
        <BottomTab.Screen 
            name ={constants.ScreenNames.BOTTOM_TABS.HOME}
            component={HomeStackComponent}
            options={({route,navigation})=>({     
                tabBarStyle:{display:getTabBarVisibility(route)},           
                tabBarShowLabel:false,                    
                tabBarIcon: ({color})=>(
                    <constants.Icons.Octicons name="home" size={25} color={color} adjustsFontSizeToFit/>
                )
             })}
        />

        <BottomTab.Screen 
            name ={constants.ScreenNames.BOTTOM_TABS.SCANNING}
            component={TransactionStackComponent}
            options={({route,navigation})=>({             
                tabBarStyle:{display:getTabBarVisibility(route)},     
                tabBarShowLabel:false,                    
                tabBarIcon: ({color})=>(
                    <constants.Icons.MaterialCommunityIcons name="qrcode-scan" size={25} color={color} adjustsFontSizeToFit/>
                )
             })}
        />
        <BottomTab.Screen 
            name ={constants.ScreenNames.BOTTOM_TABS.PAYOUT_MONITORING}
            component={PayoutMonitoringStackComponent}
            options={({route,navigation})=>({ 
                tabBarStyle:{display:getTabBarVisibility(route)},     
                tabBarShowLabel:false,
                tabBarIcon: ({color})=>(
                    <constants.Icons.MaterialIcons name="payments" size={25} color={color} adjustsFontSizeToFit/>
                )
             })}
        />


        <BottomTab.Screen 
            name ={constants.ScreenNames.BOTTOM_TABS.USER_PROFILE}
            component={UserProfile}
            options={({route,navigation})=>({ 
                tabBarStyle:{display:getTabBarVisibility(route)},     
                tabBarShowLabel:false,
                tabBarIcon: ({color})=>(
                    <constants.Icons.Octicons name="person-fill" size={25} color={color} adjustsFontSizeToFit/>
                )
             })}
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