
// STYLESHEET

import React from 'react';
import {StyleSheet} from 'react-native';
import constants from '../../constants';

export const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:constants.Colors.light        
    },
    otpVerificationTitleContainer:{
        top: constants.Dimensions.vw(50),  
        justifyContent:'center'
    },
    otpVerificationTitle:{  
        textAlign:'center',
        fontFamily:constants.Fonts.OpenSansBold,        
        fontSize:28,
        color:constants.Colors.dark
    },
    otpSubtitle:{
        textAlign:'center',
        fontFamily:constants.Fonts.NexaRegular,
        fontSize:18,     
    },  
    email:{ 
        color:constants.Colors.primary,
        fontFamily:constants.Fonts.GothamBold
    },  
    codeFieldContainer:{
        top: constants.Dimensions.vw(70),                
    },  
    cell: {
        width: constants.Dimensions.vw(14),
        height: constants.Dimensions.vh(18),                        
        paddingTop:constants.Dimensions.vh(2),  
        borderWidth: 2,
        borderRadius:20,   
        borderColor: constants.Colors.gray,        
        fontSize:40,
        color:constants.Colors.primary,
       
        textAlign: 'center',        
    }
    ,codeFieldRoot:{        
        paddingHorizontal:constants.Dimensions.vw(2),

    },
    buttonContainer:{
        top:constants.Dimensions.vh(80),    
        left:constants.Dimensions.vw(5),  
        flexDirection:'column',
        flex:0.25
        
    },
    focusCell:{
        width: constants.Dimensions.vw(14),
        height: constants.Dimensions.vh(18),                        
        paddingTop:constants.Dimensions.vh(1),  
        borderWidth: 2,
        borderRadius:20,   
        borderColor: constants.Colors.primary,        
        fontSize:40,
        color:constants.Colors.primary,
        textAlign: 'center',        
    },
    cellHasValue:{
        width: constants.Dimensions.vw(14),
        height: constants.Dimensions.vh(18),                        
        paddingTop:constants.Dimensions.vh(1),  
        borderWidth: 2,
        borderRadius:20,   
        borderColor: constants.Colors.primary,        
        fontSize:40,
        color:constants.Colors.primary,
        textAlign: 'center',        
    },
    errorCell:{
        width: constants.Dimensions.vw(14),
        height: constants.Dimensions.vh(18),                        
        paddingTop:constants.Dimensions.vh(2),  
        borderWidth: 2,
        borderRadius:20,   
        borderColor: constants.Colors.danger,        
        fontSize:40,
        color:constants.Colors.danger,
        textAlign: 'center',        
    }
});

