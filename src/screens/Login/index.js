import React from 'react';
import { View,Text,Image,Animated} from 'react-native';
import Components from '../../components';
import constants from '../../constants';
import { styles } from './styles';
import { login } from '../../actions/auth';
import { POST } from '../../utils/axios';

export default class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state = {        

          username:{
              focus:false,
              error:false,
              errorMessage:'',
              value:''
          },
          password:{
            focus:false,
            error:false,
            errorMessage:'',
            value:''
          },  
          isLoading:false
      };
     
    }

    setMyState = (value)=>this.setState(value);

    // handleLogin
    handleLogin = ()=>{
                
    
        let payload = {
            username    : this.state.username.value,
            password : this.state.password.value
        };

        

        return login(payload,this.setMyState,this.props);               
        
              
    }

    goToSignUp = () => {
        this.props.navigation.navigate('SignUp');
    }

    render(){
     
        return(
            <>                              
                <View style={styles.container}>         
                    
                    <View style={styles.form}>                                        
                        <View>     
                            <Components.PrimaryTextInput
                                    placeholder={"Username/Email"}
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

                        <View>     
                            <Components.PrimaryTextInput
                                placeholder={"Password"}
                                iconName="vpn-key"
                                onFocus={()=>this.setState({password:{...this.state.password,focus:true}})}
                                onBlur={()=>this.setState({password:{...this.state.password,focus:false}})}
                                isFocus={this.state.password.focus}
                                isError={this.state.password.error}
                                errorMessage={this.state.password.errorMessage}
                                value={this.state.password.value}
                                onChangeText={(value)=>this.setState({password:{...this.state.password,value:value,error:false}})}
                                secureTextEntry={true}
                            />                        
                        </View>

                        <View style={styles.buttonContainer}> 
                            <View style={{ flexDirection:'row',justifyContent:'flex-end',marginBottom:20 }}>
                                <Text style={styles.forgotPassword}>Forgot Password?</Text>
                            </View>
                            
                            <Animated.View>
                                <Components.PrimaryButton  
                                    onPress={this.handleLogin}                      
                                    title={"Log In"}                                
                                    isLoading={this.state.isLoading}
                                />
                            </Animated.View>
                        </View>                                                                                                
                    </View>
                    
                </View>
                
            </>
        )
    }

}
  