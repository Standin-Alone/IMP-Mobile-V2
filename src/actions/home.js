
import NetInfo from "@react-native-community/netinfo";
import getBaseUrl from '../utils/config';
import constants from '../constants';
import Toast from 'react-native-toast-message';
import {POST,GET} from '../utils/axios';
import { GET_SESSION, SET_SESSION } from "../utils/async_storage";




export const goToViewTransaction = (payload,setState,props)=>{
    setState({isLoading:true,loadingText:'Viewing the transaction...'})
    // Check Internet Connection
    NetInfo.fetch().then(async (state)=>{

         // if internet connected
         if(state.isConnected && state.isInternetReachable){
            setState({isLoading:false,loadingText:''})
            props.navigation.navigate(constants.ScreenNames.HOME_STACK.VIEW_TRANSACTION,payload)
            
           
         }else{
             //  No internet Connection
            Toast.show({
                type:'error',
                text1:'No internet Connection!'
            })
             // turn off loading
             setState({isLoading:false,loadingText:''})
         }
    });

}



export const getTransactedVouchers = (payload,setState)=>{
    

    // Check Internet Connection
    NetInfo.fetch().then(async (state)=>{

         // if internet connected
         if(state.isConnected && state.isInternetReachable){
            


            let cleanPayload = {
                supplierId: await GET_SESSION('USER_ID'),
                page:payload.page
            }
            
            console.warn(cleanPayload);
            // POST REQUEST
            POST(`${getBaseUrl().accesspoint}${constants.EndPoints.GET_TRANSACTED_VOUCHERS}`,cleanPayload).then((response)=>{       
                
                if(response.data.status == true){
                    
                    
                    let newData = response.data.data;
                    
                    if(payload.page == 0){
                        setState({transactedVouchers: newData,isReadyToRender:true,isRefreshing:false});    
                    }else{
                        setState({transactedVouchers: [...new Set(payload.transactedVouchers),...newData],isReadyToRender:true,isRefreshing:false});    
                    }
                    

                    if(newData.length ==  0){ 
                        setState({showFooter:false,isRefreshing:false})
                    }


                }else{
                    
                console.warn( response.data.errorMessage);
                    Toast.show({
                        type:'error',
                        text1:'Message',  
                        text2: response.data.errorMessage
                    });
                    setState({isReadyToRender:true,isRefreshing:false})
                }
                
            }).catch((error)=>{
                    
                console.warn(error.response);
                Toast.show({
                    type:'error',
                    text1:'Something went wrong!',                     
                    text2:error.response
                });
                
                // turn off loading
                setState({isReadyToRender:true,isRefreshing:false})
            });


         }else{
             //  No internet Connection
            Toast.show({
                type:'error',
                text1:'No internet Connection!'
            })
             // turn off loading
             setState({isReadyToRender:true,isRefreshing:false})
         }
    });

}