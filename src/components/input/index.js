
import React from "react";
import { View,TouchableOpacity,TextInput,Text } from "react-native";
import { styles } from "./styles";
import RNPickerSelect from 'react-native-picker-select';
import constants from "../../constants";
import  MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FakeCurrencyInput from 'react-native-currency-input';
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
    value,
    keyboardType,
    lineColor,
    onShowPassword,
    showPassword,
    textColor
    

})=>(   

   <View>
       <View style={styles.primaryContainer}>  
            <View style={styles.icon}>
                <MaterialIcons 
                    name={iconName} 
                    size={40} 
                    color={isFocus ||  value != '' ? 
                                constants.Colors.secondary 
                                : 
                                isError ? 
                                    constants.Colors.danger
                                    :                                    
                                    !lineColor ? constants.Colors.gray : lineColor
                            } 
                    style={{ top:10 }} />
            </View>

            <View>
                <View style={{ flexDirection:'row' }}>
                    <TextInput 
                        keyboardType={keyboardType ? keyboardType : 'default'}
                        placeholder={placeholder}     
                        placeholderTextColor={constants.Colors.gray}            
                        style={[styles.primaryInput,
                                    {borderColor: isFocus ||  value != '' ? 
                                                            constants.Colors.secondary 
                                                            : 
                                                            isError ? 
                                                                constants.Colors.danger
                                                                :
                                                                !lineColor ? constants.Colors.gray : lineColor,
                                        color:textColor ? textColor : constants.Colors.light,
                                    }]} 
                        onFocus={onFocus} 
                        onBlur={onBlur} 
                        secureTextEntry={secureTextEntry} 
                        onChangeText={onChangeText}
                        value={value}
                        adjustsFontSizeToFit
                        />
                    {(showPassword &&
                        <constants.Icons.Ionicons name={secureTextEntry ? "eye" : "eye-off"} color={constants.Colors.secondary} style={styles.eye} size={30} onPress={onShowPassword}/>                                                
                        )
                    }
                </View>
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




export const AmountInput = ({
    label,
    onChangeValue,
    onBlur,
    onFocus,
    isFocus,
    secureTextEntry,
    iconName,
    placeholder,
    isError,
    errorMessage,
    value,
    keyboardType,
    prefix,
    textColor
    

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
                
                <FakeCurrencyInput 
                   value={value}
                   onChangeValue={onChangeValue}
                    keyboardType={keyboardType ? keyboardType : 'default'}
                    placeholder={placeholder}     
                    placeholderTextColor={constants.Colors.gray}            
                    style={[styles.primaryInput,
                                {borderColor: isFocus ||  value != '' ? 
                                                        constants.Colors.primary 
                                                        : 
                                                        isError ? 
                                                            constants.Colors.danger
                                                            :
                                                            constants.Colors.gray,
                                color:textColor ? textColor : constants.Colors.light,
                                }]} 
                    onFocus={onFocus} 
                    onBlur={onBlur} 
                    prefix={prefix ? prefix : ''}
                    delimiter=","
                    separator="."
                    minValue={0}
                    precision={2}                                       
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





export const Category = ({
    
    onChangeValue,
    onBlur,
    onFocus,
    isFocus,
    
    iconName,
    placeholder,
    isError,
    errorMessage,
    value,

    items

    

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
                
                <RNPickerSelect 
                   value={value}
                    onValueChange={onChangeValue} 
                    useNativeAndroidPickerStyle={false}                                           
                    placeholderTextColor={constants.Colors.gray}                     
                    onFocus={onFocus} 
                    onBlur={onBlur}            
                      
                                
                      style = {{ inputAndroid: [styles.inputAndroid, {borderColor: isFocus ||  value != '' ? 
                      constants.Colors.primary 
                      : 
                      isError ? 
                          constants.Colors.danger
                          :
                          constants.Colors.gray
                        }],
                      placeholder:[styles.placeholder,  {borderColor: isFocus ||  value != '' ? 
                      constants.Colors.primary 
                      : 
                      isError ? 
                          constants.Colors.danger
                          :
                          constants.Colors.gray
                        }]
                      
                      }}                        
                      placeholder={{
                        label: placeholder,
                        value: '',               
                      }}
                      items={items}
                    
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