
import NetInfo from "@react-native-community/netinfo";
import getBaseUrl from '../utils/config';
import constants from '../constants';
import Toast from 'react-native-toast-message';
import {POST,GET} from '../utils/axios';
import { GET_SESSION, SET_SESSION } from "../utils/async_storage";




export const goToViewTransaction = (payload,setState,props)=>{

    // Check Internet Connection
    NetInfo.fetch().then(async (state)=>{

         // if internet connected
         if(state.isConnected && state.isInternetReachable){
            
            props.navigation.navigate(constants.ScreenNames.HOME_STACK.VIEW_TRANSACTION,payload)
            
           
         }else{
             //  No internet Connection
            Toast.show({
                type:'error',
                text1:'No internet Connection!'
            })
             // turn off loading
     
         }
    });

}



export const getTransactedVouchers = (setState)=>{
    

    // Check Internet Connection
    NetInfo.fetch().then(async (state)=>{

         // if internet connected
         if(state.isConnected && state.isInternetReachable){
            


            let cleanPayload = {
                supplierId: await GET_SESSION('USER_ID'),
                page:0
            }
 
            // POST REQUEST
            POST(`${getBaseUrl().accesspoint}${constants.EndPoints.GET_TRANSACTED_VOUCHERS}`,cleanPayload).then((response)=>{       
                console.warn(response.data);
                if(response.data.status == true){
                    
                    
                    
                    setState({transactedVouchers:response.data.data,isReadyToRender:true})

                }else{
                    Toast.show({
                        type:'error',
                        text1:'Error',  
                        text2: response.data.errorMessage
                    });
                    setState({isReadyToRender:true})
                }
                
            }).catch((error)=>{
                    
                console.warn(error.response);
                Toast.show({
                    type:'error',
                    text1:'Something went wrong!',                     
                    text2:error.response
                });
                
                // turn off loading
                setState({isReadyToRender:true})
            });


         }else{
             //  No internet Connection
            Toast.show({
                type:'error',
                text1:'No internet Connection!'
            })
             // turn off loading
             setState({isReadyToRender:true})
         }
    });

}