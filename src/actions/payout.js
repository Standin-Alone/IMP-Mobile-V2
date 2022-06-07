
import NetInfo from "@react-native-community/netinfo";
import getBaseUrl from '../utils/config';
import constants from '../constants';
import Toast from 'react-native-toast-message';
import {POST,GET} from '../utils/axios';
import { GET_SESSION, SET_SESSION } from "../utils/async_storage";



export const getPayoutBatchList = (payload,setState)=>{
    setState({showFooter:true});

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
            POST(`${getBaseUrl().accesspoint}${constants.EndPoints.GET_PAYOUT_BATCH_LIST}`,cleanPayload).then((response)=>{       
                console.warn(response.data);
                if(response.data.status == true){
                    
                    
                    let newData = response.data.payout_batch_list;
                  
                    setState({payoutBatchList: [...new Set(payload.payoutBatchList),...newData],isReadyToRender:true,totalPendingPayout:response.data.total_pending_payout});    
                    
                    if(newData.length ==  0){ 
                        setState({showFooter:false})
                    }


                }else{
                    
                    Toast.show({
                        type:'error',
                        text1:'Error',  
                        text2: response.data.errorMessage
                    });
                    setState({isReadyToRender:true})
                }
                
            }).catch((error)=>{
                    
                console.warn(error);
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