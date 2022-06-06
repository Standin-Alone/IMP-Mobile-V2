import React from 'react';
import { View,Image} from 'react-native';

import constants from '../../constants';
import Toast from 'react-native-toast-message';
import { authenticate } from '../../actions/auth';
import Components from '../../components';
import FastImage  from 'react-native-fast-image'
import {styles} from './styles'


export default class Authentication extends React.Component {
    constructor(props) {
        super(props);
        this.state = {          
            confirmText:'',
            showConfirm:false,
            message:'',
            title:'',
            loadingText:'',
            showProgress:false
        };
       
      }
  
    setMyState = (value)=>this.setState(value);
    async componentDidMount(){


        authenticate(this.setMyState,this.props)
     
    }

    

    render(){
        return(
            <>
                <View style={{ flex:1 }}>
                    <Components.MessageModal
                        showConfirm={this.state.showConfirm}                    
                        onConfirmPressed={()=>authenticate(this.setMyState,this.props)}                                            
                        confirmText={this.state.confirmText}        
                        title={this.state.title}
                        message={this.state.message}                
                    />
                  
          
                    <Components.ProgressModal
                        showProgress={this.state.showProgress}    
                        title={this.state.loadingText}                
                    />
                    <Image
                        style={styles.backgroundImage}                        
                        source={constants.Images.bgFarm}
                        resizeMode={"cover"}
                        blurRadius={2}                        
                    />
                           
                    <Image
                        style={styles.logo}                        
                        source={constants.Images.daLogoWhite}
                        resizeMode={"contain"}
                        blurRadius={2}                        
                    />
                </View>
            </>
        )
    }

}
  