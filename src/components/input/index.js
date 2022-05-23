
import React from "react";
import { View,TouchableOpacity,TextInput,Text } from "react-native";
import { styles } from "./styles";
import LinearGradient from 'react-native-linear-gradient';
import constants from "../../constants";
import  MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const PrimaryTextInput = ({
    label,
    onChangeText,
    onBlur,
    onFocus,
    isFocus,
    secureTextEntry,
    iconName,
    placeholder,
    isError,
    errorMessage,
    value
    

})=>(   

   <View>
       <View style={styles.primaryContainer}>  
            <View style={styles.icon}>
                <MaterialIcons 
                    name={iconName} 
                    size={40} 
                    color={isFocus ||  value != '' ? 
                                constants.Colors.primary 
                                : 
                                isError ? 
                                    constants.Colors.danger
                                    :
                                    constants.Colors.gray
                            } 
                    style={{ top:10 }} />
            </View>

            <View>
                
                <TextInput 
                    placeholder={placeholder}     
                    placeholderTextColor={constants.Colors.gray}            
                    style={[styles.primaryInput,
                                {borderColor: isFocus ||  value != '' ? 
                                                        constants.Colors.primary 
                                                        : 
                                                        isError ? 
                                                            constants.Colors.danger
                                                            :
                                                            constants.Colors.gray
                                }]} 
                    onFocus={onFocus} 
                    onBlur={onBlur} 
                    secureTextEntry={secureTextEntry} 
                    onChangeText={onChangeText}
                    adjustsFontSizeToFit
                    />
                {isError && 
                    <View style={{ flexDirection:'row' }}>
                        <MaterialIcons 
                            name={'error-outline'} 
                            size={16} 
                            color={constants.Colors.danger}                     
                            />
                            <Text style={styles.primaryErrorMessage} adjustsFontSizeToFit>{errorMessage}</Text>
                    </View>
                }
            </View>
       </View>
       
   </View>
);
