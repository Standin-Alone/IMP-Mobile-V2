import { createStackNavigator,CardStyleInterpolators} from '@react-navigation/stack';
import React from 'react';
import constants from '../constants';
import Scanning from '../screens/BottomTab/Scanning';
import Commodities from '../screens/Transaction/Commodities';
import FarmerProfile from '../screens/Transaction/FarmerProfile';
import SetCommodityDetails from '../screens/Transaction/SetCommodityDetails';
import Checkout from '../screens/Transaction/Checkout';
import UploadAttachments from '../screens/Transaction/UploadAttachments';
import ReviewTransaction from '../screens/Transaction/ReviewTransaction';


const TransactionStack = createStackNavigator();



export const TransactionStackComponent= (props) => {

    return (
        <TransactionStack.Navigator            


            screenOptions={{
                 headerShown: false,
                 cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS
            }}
            initialRouteName={constants.ScreenNames.TRANSACTION_STACK.SCANNING}
            
        >           

            <TransactionStack.Screen
                component={Scanning}
                name={constants.ScreenNames.TRANSACTION_STACK.SCANNING}
                
            />  

            <TransactionStack.Screen
                component={FarmerProfile}
                name={constants.ScreenNames.TRANSACTION_STACK.FARMER_PROFILE}
                options={{ }}                
            />  

            <TransactionStack.Screen
                component={Commodities}
                name={constants.ScreenNames.TRANSACTION_STACK.COMMODITIES}
                options={{ }}                
            />  

            <TransactionStack.Screen
                component={SetCommodityDetails}
                name={constants.ScreenNames.TRANSACTION_STACK.SET_COMMODITY_DETAILS}
                options={{cardStyleInterpolator:CardStyleInterpolators.forRevealFromBottomAndroid}}                
            />  

            <TransactionStack.Screen
                component={Checkout}
                name={constants.ScreenNames.TRANSACTION_STACK.CHECKOUT}
                
            />  

            <TransactionStack.Screen
                component={UploadAttachments}
                name={constants.ScreenNames.TRANSACTION_STACK.UPLOAD_ATTACHMENTS}
                
            /> 


            <TransactionStack.Screen
                component={ReviewTransaction}
                name={constants.ScreenNames.TRANSACTION_STACK.REVIEW_TRANSACTION}
                
            />  


        </TransactionStack.Navigator>
)}
