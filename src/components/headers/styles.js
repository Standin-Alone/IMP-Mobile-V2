
// STYLESHEET

import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import constants from '../../constants';

export const styles = StyleSheet.create({  
    primaryContainer:{
        
        flexDirection:'row',
        backgroundColor:'transparent',
        
        
        
    },
    primaryTitle:{
        fontFamily:constants.Fonts.GothamMedium,
        fontSize:constants.Dimensions.normalizeFontSize(8),
        top:constants.Dimensions.vh(4),
        color:constants.Colors.primary
    },
    headerSearchContainer:{
        
    },
    searchInput:{
        
        backgroundColor:'rgba(0,0,0,0.2)',
        width:constants.Dimensions.vw(80),
        height:constants.Dimensions.vh(11),
        color:constants.Colors.light,
        fontSize:constants.Dimensions.normalizeFontSize(8),      
        fontFamily:constants.Fonts.PoppinsRegular,  
        borderRadius:20,
        paddingHorizontal:constants.Dimensions.vw(4),

    },
    searchPlaceholder:{
        width:constants.Dimensions.vh(10),
    },
    icon:{     
        elevation:100,   
        position:'absolute',
        top:constants.Dimensions.vh(1),
        left:constants.Dimensions.vw(80),
    },
    listHeaderText:{
        fontFamily:constants.Fonts.PoppinsLight,
        fontSize:constants.Dimensions.normalizeFontSize(8),
    },
    
    hello:{
        bottom:constants.Dimensions.vh(-16),
        right:constants.Dimensions.vw(-18),
        width:constants.Dimensions.vw(45),
        height:constants.Dimensions.vw(45),
        position:'absolute'
    }
  
});
