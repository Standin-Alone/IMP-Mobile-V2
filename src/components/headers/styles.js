
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
        fontFamily:constants.Fonts.GothamBold,
        fontSize:25,
        top:constants.Dimensions.vh(2),
        color:constants.Colors.primary
    },
    headerSearchContainer:{
        backgroundColor:'transparent',        
    },
    searchInput:{
        backgroundColor:constants.Colors.light,
        width:constants.Dimensions.vw(90),
        fontSize:17,      
        fontFamily:constants.Fonts.PoppinsRegular,  
        borderRadius:14,
        paddingHorizontal:constants.Dimensions.vw(10),
        elevation:10
    },
    searchPlaceholder:{
        width:constants.Dimensions.vh(10),
    },
    icon:{     
        elevation:100,   
        position:'absolute',
        top:constants.Dimensions.vh(1),
        left:10
    }
  
});
