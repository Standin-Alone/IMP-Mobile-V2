
// STYLESHEET

import React from 'react';
import {StyleSheet} from 'react-native';
import constants from '../../constants';

export const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:constants.Colors.light
        
    },
    backgroundImage:{
        flex:1,
        height:constants.Dimensions.vh(100),
        width:constants.Dimensions.vw(100),                
        
        
    },
    logo:{
        position:'absolute',
        height:constants.Dimensions.vh(50),
        width:constants.Dimensions.vw(50),     
        alignSelf:'center',
        top:constants.Dimensions.vh(10)           
    },
    form:{
        backgroundColor:'rgba(0,0,0,0.5)',
        paddingVertical:constants.Dimensions.vh(20),
        paddingHorizontal:constants.Dimensions.vw(2),
        width:constants.Dimensions.vw(95),
        borderRadius:20,
        position:'absolute',
        top:constants.Dimensions.vh(80),        
        alignSelf:'center',
        flexDirection:"column",        
        
    },
    buttonContainer:{
        top:20
    },
    headerContainer:{        
        justifyContent:'center',        
    },
    headerText:{
        fontFamily:constants.Fonts.GothamBold,
        fontSize:30,        
        color:constants.Colors.primary                
    },
    subtitleText:{
        fontFamily:constants.Fonts.OpenSansMedium,
        fontSize:20,        
        color:constants.Colors.dark_tint,                
    },
    forgotPassword:{
        color:constants.Colors.primary
    },
    loginCover:{
        alignSelf:'center',
        width:constants.Dimensions.vw(50),
        height:constants.Dimensions.vh(50)
    },
    signUpContainer:{
        top:30,
        alignItems:'center'
    },
    signUpTitle:{
        fontFamily:constants.Fonts.OpenSansRegular,
        fontSize:18,
    },
    signUpText:{
        fontFamily:constants.Fonts.OpenSansBold,
        color:constants.Colors.primary,
        fontSize:18,
    }
});

