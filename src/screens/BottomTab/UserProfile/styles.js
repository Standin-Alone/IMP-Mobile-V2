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
        fontSize:16,
        textAlign:'center'
    },
    bottom:{
        position: 'absolute',
        left:0,
        right:0,
        bottom:constants.Dimensions.vh(2),
        backgroundColor:constants.Colors.light,
        
    },
    registeredProgramLabel:{
        fontFamily:constants.Fonts.PoppinsBold,
        color:constants.Colors.dark_tint,
        fontSize:constants.Dimensions.normalizeFontSize(14),
        top:constants.Dimensions.vh(2),
        textAlign:'center'
    },
    programTitle:{
        fontFamily:constants.Fonts.PoppinsMedium,
        color:constants.Colors.light,
        fontSize:constants.Dimensions.normalizeFontSize(14),        
        
    },
    programShortName:{
        fontFamily:constants.Fonts.PoppinsBold,
        color:constants.Colors.light,
        fontSize:constants.Dimensions.normalizeFontSize(14),        
        
    },
    programContainer:{ 
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:constants.Dimensions.vw(10),
        borderRadius:20,
        paddingHorizontal:constants.Dimensions.vw(2),
        marginVertical:constants.Dimensions.vh(2)
    }
});