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

const BottomTab = createBottomTabNavigator();


export function getTabBarVisibility(route) {   
    
    const routeName = getFocusedRouteNameFromRoute(route);
        
    if (( routeName != 'ScanningScreen') && ( routeName != 'HomeScreen')  && routeName !== undefined) {        
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

        // tabBar={(props) => (
        //     <BottomFabBar
        //       // Add Shadow for active tab bar button
        //       focusedButtonStyle={{
                
        //         shadowColor: '#000',
        //         shadowOffset: {
        //           width: 0,
        //           height: 7,
        //         },
                
        //         shadowOpacity: 0.41,
        //         shadowRadius: 9.11,
        //         elevation: 14,
                
        //       }}
        //       // - You can add the style below to show content screen under the tab-bar
        //       // - It will makes the "transparent tab bar" effect.
              
              
    
        //       bottomBarContainerStyle={{     
                
        //         display:getTabBarVisibility(props.state.routes),
        //         position: 'absolute',           
        //         bottom: 0,
        //         left: 0,
        //         right: 0,
        //       }}

              
        //       {...props}
        //     />
        //   )}
          
     >
        <BottomTab.Screen 
            name ={constants.ScreenNames.BOTTOM_TABS.HOME}
            component={HomeStackComponent}
            options={({route,navigation})=>({     
                tabBarStyle:{display:getTabBarVisibility(route)},           
                tabBarShowLabel:false,                    
                tabBarIcon: ({color})=>(
                    <constants.Icons.Octicons name="home" size={40} color={color}/>
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
                    <constants.Icons.MaterialCommunityIcons name="qrcode-scan" size={40} color={color}/>
                )
             })}
        />
        <BottomTab.Screen 
            name ={constants.ScreenNames.BOTTOM_TABS.PAYOUT_MONITORING}
            component={PayoutMonitoring}
            options={({route,navigation})=>({ 
                tabBarStyle:{display:getTabBarVisibility(route)},     
                tabBarShowLabel:false,
                tabBarIcon: ({color})=>(
                    <constants.Icons.MaterialIcons name="payments" size={40} color={color}/>
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
                    <constants.Icons.Octicons name="person-fill" size={40} color={color}/>
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