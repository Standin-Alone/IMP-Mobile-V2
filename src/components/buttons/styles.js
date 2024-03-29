
// STYLESHEET

import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import constants from '../../constants';

export const styles = StyleSheet.create({

    primaryButton:{
        height:constants.Dimensions.vh(12),
        width:constants.Dimensions.vw(90),
        borderRadius:20,    
        elevation:2
        
    },
    primaryButtonText:{        
        textAlign:'center',
        fontSize:constants.Dimensions.normalizeFontSize(10),
        fontFamily:constants.Fonts.GothamBold,        
        color:constants.Colors.light
    },
    primaryButtonOutline:{
        height:constants.Dimensions.vh(15),
        width:constants.Dimensions.vw(90),
        borderRadius:240,    
        borderWidth:1,
        borderColor:constants.Colors.primary,
        elevation:2
        
    },
    primaryButtonOutlineText:{        
        textAlign:'center',
        fontSize:20,
        fontFamily:constants.Fonts.GothamBold,        
        color:constants.Colors.primary
    },
    secondaryButton:{
        alignSelf:'center',
        borderWidth:1,
        borderColor:constants.Colors.primary,
        height:constants.Dimensions.vh(50),
        width:constants.Dimensions.vw(90),
        borderRadius:30,    
    },
    tertiaryButton:{
        alignSelf:'center',
        borderWidth:1,
        borderColor:constants.Colors.danger,
        height:constants.Dimensions.vh(15),
        width:constants.Dimensions.vw(90),
        borderRadius:30,    
    },
    filterButton:{        
        marginHorizontal:constants.Dimensions.vh(1),
        borderWidth:1,
        borderColor:constants.Colors.dark_tint,
        height:constants.Dimensions.vh(10),
        width:constants.Dimensions.vw(20),
        borderRadius:30,    
    },
    searchButton:{
        backgroundColor:constants.Colors.light,
        height:constants.Dimensions.vh(12),
        width:constants.Dimensions.vh(90),
        paddingVertical:constants.Dimensions.vh(2),
        paddingHorizontal:constants.Dimensions.vh(2),
        elevation:2,
        borderRadius:15,
    },
    searchPlaceholder:{
      
        fontSize:16,
        fontFamily:constants.Fonts.GothamBold,        
        color:constants.Colors.dark_tint
    }
});

