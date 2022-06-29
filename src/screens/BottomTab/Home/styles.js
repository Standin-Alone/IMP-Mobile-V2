
// STYLESHEET

import React from 'react';
import {StyleSheet} from 'react-native';
import constants from '../../../constants';

export const styles = StyleSheet.create({
    container:{
        flex:1,
        height:constants.Dimensions.vh(20),
        width:constants.Dimensions.vw(100),
        backgroundColor:constants.Colors.primary        
    },
    contentContainer:{
         top:constants.Dimensions.vw(30),
         flex:1,
         backgroundColor:constants.Colors.light,     
         height:constants.Dimensions.vh(100),    
         borderTopLeftRadius:constants.Dimensions.vh(7),
         borderTopRightRadius:constants.Dimensions.vh(7)
    },
    searchContainer:{      
        left:constants.Dimensions.vw(5),
           
        bottom:constants.Dimensions.vh(10),
        backgroundColor:'transparent'        
    },
   
    noDataBg:{
        height:constants.Dimensions.vh(100),    
        width:constants.Dimensions.vw(100),
    },
    emptyFooter:{
        alignSelf:'center'
    },
    transactionLabel:{
        fontFamily:constants.Fonts.PoppinsBold,
        fontSize:constants.Dimensions.normalizeFontSize(15),
        color:constants.Colors.dark
    }
});

