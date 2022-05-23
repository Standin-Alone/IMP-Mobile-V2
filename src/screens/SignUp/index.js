import React from 'react';
import { View,Text,Image } from 'react-native';
import Components from '../../components';
import constants from '../../constants';
import { styles } from './styles';
import { login } from '../../actions/auth';
import { POST } from '../../utils/axios';
import { PrimaryHeader } from '../../components/headers';
import Feather from 'react-native-vector-icons'

export default class SignUp extends React.Component {
    constructor(props) {
      super(props);
      this.state = {        
          fullName:{
              focus:false,
              error:false,
              errorMessage:'',
              data:''
          },
          email:{
            focus:false,
            error:false,
            errorMessage:'',
            data:''
          },
          password:{
                focus:false,
                error:false,
                errorMessage:'',
                data:''
          },      
          confirmPassword:{
            focus:false,
            error:false,
            errorMessage:'',
            data:''
          },      
      };
      
    }

    setMyState = (data)=>this.setState(data);


    render(){
        return(
            <>                              
                <View style={styles.container}>
                    <PrimaryHeader title="Sign Up" onGoBack = {()=>this.props.navigation.goBack()}/>
                    <View style={styles.form}>
                        <View>     
                            <Components.PrimaryTextInput
                                    placeholder={"Full Name"}
                                    iconName="supervised-user-circle"
                                    onFocus={()=>this.setState({fullName:{...this.state.fullName,focus:true}})}
                                    onBlur={()=>this.setState({fullName:{...this.state.fullName,focus:false}})}
                                    isFocus={this.state.fullName.focus}
                                    isError={this.state.fullName.error}
                                    errorMessage={this.state.fullName.errorMessage}
                                    value={this.state.fullName.data}
                                    onChangeText={(value)=>this.setState({fullName:{...this.state.fullName,data:value,error:false}})}                                
                            />                        
                        </View>
                        <View>     
                            <Components.PrimaryTextInput
                                    placeholder={"Email"}
                                    iconName="mail"
                                    onFocus={()=>this.setState({email:{...this.state.email,focus:true}})}
                                    onBlur={()=>this.setState({email:{...this.state.email,focus:false}})}
                                    isFocus={this.state.email.focus}
                                    isError={this.state.email.error}
                                    errorMessage={this.state.email.errorMessage}
                                    value={this.state.email.data}
                                    onChangeText={(value)=>this.setState({email:{...this.state.email,data:value,error:false}})}                                
                            />                        
                        </View>

                        <View>     
                            <Components.PrimaryTextInput
                                    placeholder={"Password"}
                                    iconName="vpn-key"
                                    onFocus={()=>this.setState({password:{...this.state.password,focus:true}})}
                                    onBlur={()=>this.setState({password:{...this.state.password,focus:false}})}
                                    isFocus={this.state.password.focus}
                                    isError={this.state.password.error}
                                    errorMessage={this.state.password.errorMessage}
                                    value={this.state.password.data}
                                    onChangeText={(value)=>this.setState({password:{...this.state.password,data:value,error:false}})}                                
                            />                        
                        </View>

                        <View>     
                            <Components.PrimaryTextInput
                                    placeholder={"Confirm Password"}
                                    iconName="vpn-key"
                                    onFocus={()=>this.setState({confirmPassword:{...this.state.confirmPassword,focus:true}})}
                                    onBlur={()=>this.setState({confirmPassword:{...this.state.confirmPassword,focus:false}})}
                                    isFocus={this.state.confirmPassword.focus}
                                    isError={this.state.confirmPassword.error}
                                    errorMessage={this.state.confirmPassword.errorMessage}
                                    value={this.state.confirmPassword.data}
                                    onChangeText={(value)=>this.setState({confirmPassword:{...this.state.confirmPassword,data:value,error:false}})}                                
                            />                        
                        </View>
                    </View>                                                 
                    <View style={styles.buttonContainer}>
                        <Components.PrimaryButton                              
                            title={"Create an Account"}                            
                        />
                    </View>
                </View>
                
            </>
        )
    }

}
  