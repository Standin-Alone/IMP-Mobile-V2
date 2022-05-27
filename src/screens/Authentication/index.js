import React from 'react';
import { View } from 'react-native';
import { GET_SESSION } from '../../utils/async_storage';
import constants from '../../constants';
import Toast from 'react-native-toast-message';
import NetInfo from "@react-native-community/netinfo";


export default class Authentication extends React.Component {

    async componentDidMount(){
        let checkSession = await GET_SESSION('USER_ID');

        // Check Internet Connection
        NetInfo.fetch().then((state)=>{

            // if internet connected
            if(state.isConnected && state.isInternetReachable){
                
                this.setState({loadingText:'Authentication...'});

                setTimeout(()=>{
                    if(checkSession){            
                        this.props.navigation.replace(constants.ScreenNames.APP_STACK.MAIN_TAB);
                    }else{
                        this.props.navigation.replace(constants.ScreenNames.APP_STACK.LOGIN);
                    }
                },2000)
              
            
            }else{
                
                this.setState({loadingText:'No internet connection. Please check your network.'});

                Toast.show({
                    type:'error',
                    text1: 'Warning',
                    text2: 'You are currently offline. No internet connection.'
                });
            }

        });
     
    }

    render(){
        return(
            <>
                <View>
                    
                </View>
            </>
        )
    }

}
  