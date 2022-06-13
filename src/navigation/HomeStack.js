import { createStackNavigator,CardStyleInterpolators} from '@react-navigation/stack';
import React from 'react';
import constants from '../constants';
import Home from '../screens/BottomTab/Home';
import ViewTransaction from '../screens/Home/ViewTransaction';
import SearchVoucher from '../screens/Home/SearchVoucher';

const HomeStack = createStackNavigator();

export const HomeStackComponent= (props) => {

    return (
        <HomeStack.Navigator            


            screenOptions={{
                 headerShown: false,
                 cardStyleInterpolator:CardStyleInterpolators.forFadeFromCenter
            }}
            initialRouteName={constants.ScreenNames.HOME_STACK.HOME}
            
        >           

            <HomeStack.Screen
                component={Home}
                name={constants.ScreenNames.HOME_STACK.HOME}
                options={{ }}                
            />  

            <HomeStack.Screen
                component={ViewTransaction}
                name={constants.ScreenNames.HOME_STACK.VIEW_TRANSACTION}
                options={{cardStyleInterpolator:CardStyleInterpolators.forRevealFromBottomAndroid}}                
            />  

            <HomeStack.Screen
                component={SearchVoucher}
                name={constants.ScreenNames.HOME_STACK.SEARCH_VOUCHER}
                options={{cardStyleInterpolator:CardStyleInterpolators.forRevealFromBottomAndroid}}                
            />  


        </HomeStack.Navigator>
)}
