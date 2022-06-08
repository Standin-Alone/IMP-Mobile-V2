import React from 'react';
import { View,Text,Image} from 'react-native';
import Components from '../../components';
import constants from '../../constants';
import { styles } from './styles';
import { sendResetPasswordLink } from '../../actions/auth';



export default class ForgotPassword extends React.Component {
    constructor(props) {
      super(props);
      this.state = {        

          username:{
              focus:false,
              error:false,
              errorMessage:'',
              value:''
          },        
          isLoading:false
        
      };
     
    }

    setMyState = (value)=>this.setState(value);

    handleSendResetPasswordLink = () => {
        let parameters = {
            email:this.state.username.value
        }
        return sendResetPasswordLink(parameters,this.setMyState,this.props)
    }

    render(){
     
        return(
            <>  
              
       
                <View style={styles.container}>   
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
                    
             
                    <View style={styles.form}>       

                        <View style={{ flexDirection:'row' }}>
                            <constants.Icons.MaterialIcons name="chevron-left" size={39} color={constants.Colors.primary} onPress={()=>this.props.navigation.goBack()}/>
                            <Text style={styles.forgotPasswordText}>Forgot Password</Text>
                        </View>

                        <View>     
                            <Components.PrimaryTextInput
                                    lineColor={constants.Colors.light}
                                    placeholder={"Email"}
                                    iconName="email"
                                    onFocus={()=>this.setState({username:{...this.state.username,focus:true}})}
                                    onBlur={()=>this.setState({username:{...this.state.username,focus:false}})}
                                    isFocus={this.state.username.focus}
                                    isError={this.state.username.error}
                                    errorMessage={this.state.username.errorMessage}
                                    value={this.state.username.value}
                                    onChangeText={(value)=>this.setState({username:{...this.state.username,value:value,error:false}})}                                
                            />                        
                        </View>


                        <View style={styles.buttonContainer}>                             
                            
                            <View>
                                <Components.PrimaryButton  
                                    onPress={this.handleSendResetPasswordLink}                      
                                    title={"Send Reset Password Link"}                                
                                    isLoading={this.state.isLoading}
                                />
                            </View>
                        </View>                                                                                                
                    </View>

              
                </View>
              
            </>
        )
    }

}
  