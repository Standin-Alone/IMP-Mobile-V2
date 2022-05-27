
import NetInfo from "@react-native-community/netinfo";
import getBaseUrl from '../utils/config';
import constants from '../constants';
import Toast from 'react-native-toast-message';
import {POST,GET} from '../utils/axios';
import { GET_SESSION, SET_SESSION } from "../utils/async_storage";
import { checkAppVersion } from "../utils/functions";

export const scanQrCode =   async (payload,setState,props) => {     
    //turn on loading
     setState({isLoading:true,isScanning:false});
    console.warn('scanned');
    // Check Internet Connection
    NetInfo.fetch().then(async(state)=>{
            
        // if internet connected
        if(state.isConnected && state.isInternetReachable){
            let checkVersion = await checkAppVersion();
            


            //Check if the mobile app is latest.
            if(checkVersion){

                let clean_payload = {
                    reference_number:payload.scanResult,
                    user_id:  payload.userId,
                }
                
                // POST REQUEST
                await POST(`${getBaseUrl().accesspoint}${constants.EndPoints.SCAN_QR_CODE}`,clean_payload).then((response)=>{  
                    console.warn(response);
                    if(response.data.status == true){
                         

                         let parameters = {
                             voucherInfo:response.data.voucherInfo
                         }
                         
                         setState({isLoading:false,isScanning:true});
                         //  NAVIGATE TO FARMER PROFILE
                         props.navigation.navigate(constants.ScreenNames.TRANSACTION_STACK.FARMER_PROFILE,parameters)
                         
                         
                    }else{
                        Toast.show({
                            type:'error',
                            text1: 'Error',
                            text2:response.data.message ? response.data.message : response.data.errorMessage,
                        });
                        setState({isLoading:false,isScanning:true});
                    }


                }).catch((error)=>{
                    
                    console.warn(error.response);
                    Toast.show({
                        type:'error',
                        text1:'Something went wrong!'
                    });                   
                });

                setState({isLoading:false,isScanning:true});
            }else{

                console.warn(checkVersion);
                setState({isLoading:false,isScanning:true});
            }
                        
        }else{
            //  No internet Connection
            Toast.show({
                type:'error',
                text1:'No internet Connection!'
            })
             // turn off loading
            setState({isLoading:false,isScanning:true});
        }
    });

}





export const goToAddCommodities = (payload,setState,props) => {     
    //turn on loading
    setState({isLoading:true,isScanning:false});

    // Check Internet Connection
    NetInfo.fetch().then(async(state)=>{
            
        // if internet connected
        if(state.isConnected && state.isInternetReachable){
            let checkVersion = await checkAppVersion();
            
  


            //Check if the mobile app is latest.
            if(checkVersion){

                let cleanParameters = {
                    parameters:payload.parameters
                }
                
                
                props.navigation.navigate(constants.ScreenNames.TRANSACTION_STACK.COMMODITIES,cleanParameters)
                setState({isLoading:false,isScanning:true});
            }else{

                console.warn(checkVersion);
                setState({isLoading:false,isScanning:true});
            }
                        
        }else{
            //  No internet Connection
            Toast.show({
                type:'error',
                text1:'No internet Connection!'
            })
             // turn off loading
            setState({isLoading:false,isScanning:true});
        }
    });

}





export const addToCart = (payload,setState,props) => {     
 

    // Check Internet Connection
    NetInfo.fetch().then(async(state)=>{
            
        // if internet connected
        if(state.isConnected && state.isInternetReachable){
            
            let countError = 0;
            // validate payload


            Object.keys(payload).map((item,index)=>{                         

                

                
                if((payload[item] !== undefined ||  payload[item] != '')  && (item != 'subCategory' && item != 'cashAdded' )   ){                   
                    if((payload[item] == '' || payload[item] === undefined)  ){
                        console.warn(item);
                        setState({[item]:{...payload[item],error:true,errorMessage:`Please enter your ${item}.`}})      
                        countError++;
                    }                    
                }


            })          
                
            
            
            if(countError == 0){
                props.route.params.addToCart(payload);
                props.navigation.goBack();
            }
            

                        
        }else{
            //  No internet Connection
            Toast.show({
                type:'error',
                text1:'Error!',
                text2:'No internet Connection!'
            })
            
        }
    });

}



export const goToCheckout = (payload,setState,props) => {     
    

    // Check Internet Connection
    NetInfo.fetch().then(async(state)=>{
            
        // if internet connected
        if(state.isConnected && state.isInternetReachable){
            let checkVersion = await checkAppVersion();
            
  


            //Check if the mobile app is latest.
            if(checkVersion){

                if(payload.cart.length > 0){
                    let cartTotal = payload.cart.reduce((prev, current) => prev + parseFloat(current.totalAmount), 0);
                    let checkBalance = payload.voucherInfo.amount_val  - cartTotal;
                    let compute =   payload.voucherInfo.amount_val - cartTotal;
                    console.warn(checkBalance);
                    if(checkBalance <=  0){
                       props.navigation.navigate(constants.ScreenNames.TRANSACTION_STACK.CHECKOUT,payload)
                    }else{
                        Toast.show({
                            type:'error',
                            text1:'Error!',
                            text2:`Please consume the full amount of the voucher.`
                        })
                    }

                }else{
                    Toast.show({
                        type:'error',
                        text1:'Error!',
                        text2:'You have no items on your cart.'
                    })
                }
  
            }else{

                console.warn(checkVersion);
  
            }
                        
        }else{
            //  No internet Connection
            Toast.show({
                type:'error',
                text1:'No internet Connection!'
            })
  
        }
    });

}




export const checkout = (payload,setState,props) => {     
    

    // Check Internet Connection
    NetInfo.fetch().then(async(state)=>{
            
        // if internet connected
        if(state.isConnected && state.isInternetReachable){
            let checkVersion = await checkAppVersion();
            
  


            //Check if the mobile app is latest.
            if(checkVersion){

                props.navigation.navigate(constants.ScreenNames.TRANSACTION_STACK.UPLOAD_ATTACHMENTS,payload)
  
            }else{

                console.warn(checkVersion);
  
            }
                        
        }else{
            //  No internet Connection
            Toast.show({
                type:'error',
                text1:'No internet Connection!'
            })
  
        }
    });

}