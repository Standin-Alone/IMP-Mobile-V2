
// STYLESHEET

import React from 'react';
import {StyleSheet} from 'react-native';
import constants from '../../../constants';

export const styles = StyleSheet.create({
   
    card:{
        top:constants.Dimensions.vh(1),        
        backgroundColor:constants.Colors.light,        
        height:'auto',    
        marginVertical:constants.Dimensions.vh(2)

    },
    referenceNumberLabel:{
        fontFamily:constants.Fonts.GothamBold,
        color:constants.Colors.secondary,
        fontSize:constants.Dimensions.normalizeFontSize(6)
    },
    referenceNumber:{
        fontFamily:constants.Fonts.GothamBold,
        color:constants.Colors.secondary,
        fontSize:constants.Dimensions.normalizeFontSize(8)
    },
    cardHeader:{
        fontFamily:constants.Fonts.GothamBold,
        color:constants.Colors.dark_tint,
        fontSize:constants.Dimensions.normalizeFontSize(8),
        left:constants.Dimensions.vw(2)
    },
    image:{
        width:constants.Dimensions.vw(40),
        height:constants.Dimensions.vh(40),
        
    },
    commodityButtonImage:{
        marginHorizontal:constants.Dimensions.vw(2)
    },    
    label:{
        fontSize:constants.Dimensions.normalizeFontSize(7),
    },
    cashAdded:{
        fontSize:constants.Dimensions.normalizeFontSize(7),
    },
    firsCardLabel:{
        fontSize:constants.Dimensions.normalizeFontSize(7),
    },
    firstCardValue:{
        fontSize:constants.Dimensions.normalizeFontSize(7),
    }
});

