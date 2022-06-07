import { createStackNavigator,CardStyleInterpolators} from '@react-navigation/stack';
import React from 'react';
import constants from '../constants';
import PayoutMonitoring from '../screens/BottomTab/PayoutMonitoring';
import PayoutTracking from '../screens/PayoutMonitoring/Tracking';


const PayoutMonitoringStack = createStackNavigator();



export const PayoutMonitoringStackComponent= (props) => {

    return (
        <PayoutMonitoringStack.Navigator            


            screenOptions={{
                 headerShown: false,
                 cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS
            }}
            initialRouteName={constants.ScreenNames.PAYOUT_MONITORING_STACK.PAYOUT_MONITORING}
            
        >           

            <PayoutMonitoringStack.Screen
                component={PayoutMonitoring}
                name={constants.ScreenNames.PAYOUT_MONITORING_STACK.PAYOUT_MONITORING}
                
            />  

            <PayoutMonitoringStack.Screen
                component={PayoutTracking}
                name={constants.ScreenNames.PAYOUT_MONITORING_STACK.TRACKING}
                
            />  

       


        </PayoutMonitoringStack.Navigator>
)}
