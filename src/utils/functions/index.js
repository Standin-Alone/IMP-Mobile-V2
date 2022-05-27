
import NetInfo from "@react-native-community/netinfo";
import getBaseUrl from '../config';
import constants from '../../constants';
import Toast from 'react-native-toast-message';
import {POST} from '../axios';
import {SET_SESSION,GET_SESSION} from '../async_storage';
import DeviceInfo from 'react-native-device-info';





export const checkAppVersion = async ()=>{

   
    let  result = true;


    let cleanPayload = {
        version:DeviceInfo.getVersion()
    };



    // Check Internet Connection
    await  NetInfo.fetch().then((state)=>{
        
         // if internet connected
         if(state.isConnected && state.isInternetReachable){
                
            // POST REQUEST
            POST(`${getBaseUrl().accesspoint}${constants.EndPoints.CHECK_APP_VERSION}`,cleanPayload).then((response)=>{                    
                  
                if(response.data.status == true){
                    
                    result = response.data.status;
                }else{
                    
                    Toast.show({
                        type:'info',
                        text1: 'Information',
                        text2:response.data.message,
                    });
                    result = response.data.status;                 
                }
               
                
            }).catch((error)=>{
                console.warn(error.response)                
                
                Toast.show({
                    type:'error',
                    text1:'Something went wrong!'
                });
    
              
            });

         }else{
             //  No internet Connection
            Toast.show({
                type:'error',
                text1:'No internet Connection!'
            })
            
         }
    });


    return result;
    
}
