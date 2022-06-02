// STYLESHEET

import React from 'react';
import { StyleSheet } from 'react-native';
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
        borderRadius:10,
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
        fontSize:18,
        textAlign:'center'
    },
    bottom:{
        position: 'absolute',
        left:0,
        right:0,
        bottom:constants.Dimensions.vh(2),
        backgroundColor:constants.Colors.light,
        
    }
});