
import React from "react";
import { LogBox } from 'react-native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import Toast from 'react-native-toast-message';


import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import Authentication from "../screens/Authentication";
import VerifyOtp from "../screens/VerifyOtp";
import {BottomTabNavigator} from "./BottomTab";
import constants from "../constants";
import ForgotPassword from "../screens/ForgotPassword";


// LogBox.ignoreLogs([
//   "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
  
// ]);

  
// LogBox.ignoreAllLogs()



const Stack  = createStackNavigator();


const AppStack = () =>(

    <Stack.Navigator initialRouteName={constants.ScreenNames.APP_STACK.AUTHENTICATION} screenOptions={{headerShown:false }} >
        <Stack.Screen component={Authentication} name={constants.ScreenNames.APP_STACK.AUTHENTICATION}/>
        <Stack.Screen component={Login} name={constants.ScreenNames.APP_STACK.LOGIN} options={{cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS}}/>    
        <Stack.Screen component={ForgotPassword} name={constants.ScreenNames.APP_STACK.FORGOT_PASSWORD} options={{cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS}}/>    
        <Stack.Screen component={SignUp} name={"SignUp"} options={{cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS}}/>    
        <Stack.Screen component={VerifyOtp} name={constants.ScreenNames.APP_STACK.VERIFY_OTP} options={{cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS}}/>    
        <Stack.Screen component={BottomTabNavigator} name={constants.ScreenNames.APP_STACK.MAIN_TAB} options={{cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS}}/>    
        
    </Stack.Navigator>

)



export default Route = ()=>(

    <NavigationContainer>
        <AppStack/>
        <Toast/>
    </NavigationContainer>
)

