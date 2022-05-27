
import NetInfo from "@react-native-community/netinfo";
import getBaseUrl from '../utils/config';
import constants from '../constants';
import Toast from 'react-native-toast-message';
import {POST,GET} from '../utils/axios';
import { GET_SESSION, SET_SESSION } from "../utils/async_storage";

export const login = (payload,setState,props) => {     
    //turn on loading
    setState({isLoading:true});
    let countError = 0;
    // Check Internet Connection
    NetInfo.fetch().then((state)=>{
            
        // if internet connected
        if(state.isConnected && state.isInternetReachable){
            

             // validate payload
             Object.keys(payload).map((item,index)=>{                         
                if(payload[item] !== undefined || payload[item] != '' ){  
                    console.warn(payload[item]);
                    if(payload[item] == '' || payload[item] === undefined ){
                        setState({[item]:{...payload[item],error:true,errorMessage:`Please enter your ${item}.`}})      
                        countError++;
                    }                                     
                }
            })            
            
            
            if(countError == 0){
                                      
                let clean_payload = {
                    username : payload.username,
                    password : payload.password
                }
                
                // POST REQUEST
                POST(`${getBaseUrl().accesspoint}${constants.EndPoints.LOGIN}`,clean_payload).then((response)=>{                    
                    
                    if(response.data.status == true){                    

                        console.warn(response.data.data);
                        let params = {
                            userId: response.data.data.user_id,
                            email:response.data.data.email,
                            fullName:response.data.data.full_name,
                            role:response.data.data.role
                        }   
                        
                        
                        // NAVIGATE TO VERIFY OTP
                        props.navigation.navigate('VerifyOtp',params);
                    }else{
                        Toast.show({
                            type:'error',
                            text1:'Error',   
                            text2: response.data.message
                        });

                    }

                     // turn off loading
                     setState({isLoading:false});
                }).catch((error)=>{
                    
                    console.warn(error.response);
                    Toast.show({
                        type:'error',
                        text1:'Something went wrong!'
                    });
                    
                    // turn off loading
                    setState({isLoading:false});
                });

            }else{
                setState({isLoading:false});
            }
                        
        }else{
            //  No internet Connection
            Toast.show({
                type:'error',
                text1:'No internet Connection!'
            })
             // turn off loading
            setState({isLoading:false});
        }
    });

}


export const verifyOtp = (payload,setState,props)=>{
    setState({isLoading:true});

    // Check Internet Connection
    NetInfo.fetch().then((state)=>{
         // if internet connected
         if(state.isConnected && state.isInternetReachable){
           console.warn(payload.otp);
             
            if(payload.otp.value.length == 6){


                let cleanPayload = {
                    otp : payload.otp.value,
                    user_id : payload.userId
                }
                // POST REQUEST
                POST(`${getBaseUrl().accesspoint}${constants.EndPoints.VERIFY_OTP}`,cleanPayload).then((response)=>{                    
                    
                    if(response.data.status == true){                      
                        
                        SET_SESSION('USER_ID',payload.userId)

                         // NAVIGATE TO HOME
                         props.navigation.navigate('MainTabs');                                                

                    }else{
                        Toast.show({
                            type:'error',
                            text1:'Error',  
                            text2: response.data.message
                        });

                        setState({otp:{...payload.otp,error:true,value:''}})    
                    }

                     // turn off loading
                     setState({isLoading:false});
                }).catch((error)=>{
                    
                    console.warn(error.response);
                    Toast.show({
                        type:'error',
                        text1:'Something went wrong!',                     
                    });
                    setState({otp:{...payload.otp,error:true}})    
                    // turn off loading
                    setState({isLoading:false});
                });



                
                            
            }else{          
                setState({otp:{...payload.otp,error:true},isLoading:false})
                Toast.show({
                    type:'error',
                    text1:'Please put your one time pin.',                
                });
            }


         }else{
             //  No internet Connection
            Toast.show({
                type:'error',
                text1:'No internet Connection!'
            })
             // turn off loading
            setState({isLoading:false});
         }
    });

}



export const resendOtp = (payload,setState)=>{
    setState({isLoadingResendButton:true});

    // Check Internet Connection
    NetInfo.fetch().then((state)=>{

         // if internet connected
         if(state.isConnected && state.isInternetReachable){
            

            let cleanPayload = {
                user_id:payload.userId,
                full_name : payload.fullName,
                email : payload.email
            }
            // POST REQUEST
            POST(`${getBaseUrl().accesspoint}${constants.EndPoints.RESEND_OTP}`,cleanPayload).then((response)=>{       
                
                if(response.data.status == true){

                    Toast.show({
                            type:'success',
                            text1:'Success',                    
                            text2: response.data.message
                    });                                                                                                    

                }else{
                    Toast.show({
                        type:'error',
                        text1:'Error',  
                        text2: response.data.message
                    });

                }

                // turn off loading
                setState({isLoadingResendButton:false});
            }).catch((error)=>{
                    
                console.warn(error.response);
                Toast.show({
                    type:'error',
                    text1:'Something went wrong!',                     
                });
                
                // turn off loading
                setState({isLoadingResendButton:false});
            });


         }else{
             //  No internet Connection
            Toast.show({
                type:'error',
                text1:'No internet Connection!'
            })
             // turn off loading
            setState({isLoadingResendButton:false});
         }
    });

}