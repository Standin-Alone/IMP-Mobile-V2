
// STYLESHEET

import React from 'react';
import {StyleSheet} from 'react-native';
import constants from '../../../constants';

export const styles = StyleSheet.create({
   
    card:{
        top:constants.Dimensions.vh(2),        
        backgroundColor:constants.Colors.light,        
        height:'auto',    
        marginVertical:constants.Dimensions.vh(2)

    },
    referenceNumberLabel:{
        fontFamily:constants.Fonts.GothamBold,
        color:constants.Colors.secondary
    },
    referenceNumber:{
        fontFamily:constants.Fonts.GothamBold,
        color:constants.Colors.secondary,
        fontSize:16
    },
    cardHeader:{
        fontFamily:constants.Fonts.GothamBold,
        color:constants.Colors.dark_tint,
        fontSize:16,
        left:constants.Dimensions.vw(2)
    },
    image:{
        width:constants.Dimensions.vw(40),
        height:constants.Dimensions.vh(40),
        
    },
    commodityButtonImage:{
        marginHorizontal:constants.Dimensions.vw(2)
    },
});

