
// STYLESHEET

import React from 'react';
import {StyleSheet} from 'react-native';
import constants from '../../../constants';

export const styles = StyleSheet.create({
   
    container: {

        flex: 0.8,
        backgroundColor: constants.Colors.primary,
        justifyContent: 'center',
        flexDirection: 'column'
    },
    infoContainer: {
        flex: 1,
        backgroundColor: constants.Colors.light
    },
    profile_pic:{
        width:constants.Dimensions.vw(30),
        height:constants.Dimensions.vh(30),
        backgroundColor:constants.Colors.secondary,
        borderRadius:900,
        bottom:constants.Dimensions.vh(10) 
    },
    fullName:{
        fontFamily:constants.Fonts.PoppinsBold,
        color:constants.Colors.light,
        fontSize:18,
        textAlign:'center'
    },
    address:{
        fontFamily:constants.Fonts.PoppinsRegular,
        color:constants.Colors.light,
        fontSize:14,
        textAlign:'center'
    },
    label:{
        fontFamily:constants.Fonts.PoppinsRegular,
        color:constants.Colors.dark_tint,
        fontSize:18,        
    },
    value:{
        fontFamily:constants.Fonts.PoppinsRegular,
        color:constants.Colors.dark_tint,
        fontSize:18,      
    }

});

