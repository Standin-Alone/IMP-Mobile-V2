
// STYLESHEET

import React from 'react';
import {StyleSheet} from 'react-native';
import constants from '../../../constants';

export const styles = StyleSheet.create({
   
    container: {

        flex: 0.4,
        backgroundColor: constants.Colors.primary,
        justifyContent: 'center',
        flexDirection: 'column'
    },
    profile_pic:{
        width:constants.Dimensions.vw(20),
        height:constants.Dimensions.vh(20),
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
    infoContainer: {
        flex: 1,
        backgroundColor: constants.Colors.light
    },
    label:{
        fontFamily:constants.Fonts.PoppinsRegular,
        color:constants.Colors.dark_tint,
        fontSize:14,        
    },
    value:{
        fontFamily:constants.Fonts.PoppinsBold,
        color:constants.Colors.dark_tint,
        fontSize:14,      
    },
    image:{
        width:constants.Dimensions.vw(40),
        height:constants.Dimensions.vh(40),
        
    },
    commodityButtonImage:{
        marginHorizontal:constants.Dimensions.vw(2)
    },
    bottom:{
        position: 'absolute',
        left:0,
        right:0,
        bottom:0,
        backgroundColor:constants.Colors.light,
        paddingTop:constants.Dimensions.vh(10),
        borderTopWidth:0.2,
        borderTopColor:constants.Colors.gray
    },
    labelSummary:{
        fontFamily:constants.Fonts.PoppinsBolds,
        color:constants.Colors.dark,
        fontSize:14,
    },
    cashAdded:{
        fontFamily:constants.Fonts.PoppinsBold,
        color:constants.Colors.danger,
        fontSize:14,
    }
    

});

