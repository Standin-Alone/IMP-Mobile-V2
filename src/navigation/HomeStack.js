import { createStackNavigator,CardStyleInterpolators} from '@react-navigation/stack';
import React from 'react';
import constants from '../constants';
import Home from '../screens/BottomTab/Home';
import ViewTransaction from '../screens/Home/ViewTransaction';
import SearchVoucher from '../screens/Home/SearchVoucher';
import EditCommodityDetails from '../screens/Home/EditCommodityDetails';
import EditCart from '../screens/Home/EditCart';
import EditUploadAttachments from '../screens/Home/EditUploadAttachments';
import EditCommodities from '../screens/Home/EditCommodities';
import AddCommodityDetails from '../screens/Home/AddCommodityDetails';


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
                options={{cardStyleInterpolator:CardStyleInterpolators.forScaleFromCenterAndroid}}                
            />  

            <HomeStack.Screen
                component={SearchVoucher}
                name={constants.ScreenNames.HOME_STACK.SEARCH_VOUCHER}
                options={{cardStyleInterpolator:CardStyleInterpolators.forRevealFromBottomAndroid}}                
            />  

            <HomeStack.Screen
                component={EditCommodityDetails}
                name={constants.ScreenNames.HOME_STACK.EDIT_COMMODITY_DETAILS}
                options={{cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS}}                
            />  

            <HomeStack.Screen
                component={EditCart}
                name={constants.ScreenNames.HOME_STACK.EDIT_CART}
                options={{cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS}}                
            />  

            <HomeStack.Screen
                component={EditUploadAttachments}
                name={constants.ScreenNames.HOME_STACK.EDIT_UPLOAD_ATTACHMENTS}
                options={{cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS}}                
            />  

            <HomeStack.Screen
                component={EditCommodities}
                name={constants.ScreenNames.HOME_STACK.EDIT_COMMODITIES}
                options={{cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS}}                
            />  

            <HomeStack.Screen
                component={AddCommodityDetails}
                name={constants.ScreenNames.HOME_STACK.ADD_COMMODITY_DETAILS}
                options={{cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS}}                
            />  


        </HomeStack.Navigator>
)}
