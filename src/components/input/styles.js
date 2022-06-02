
// STYLESHEET

import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import constants from '../../constants';

export const styles = StyleSheet.create({

    primaryContainer:{
        flexDirection:'row',    
        marginVertical:constants.Dimensions.vh(2)
    },
    primaryInput:{
        borderWidth:1,
        width:constants.Dimensions.vw(90),
        borderRadius:10,        
        borderColor:constants.Colors.gray,        

        color:constants.Colors.light,
        fontFamily:constants.Fonts.PoppinsRegular,
        paddingLeft:constants.Dimensions.vw(15),                
        paddingVertical:   constants.Dimensions.vh(4),        
        fontSize:16
    },
    primaryErrorMessage:{
        color:constants.Colors.danger,
        fontFamily:constants.Fonts.GothamRegular
    },
    icon:{
        position:'absolute',
        top:constants.Dimensions.vh(1),
        left:5

    },
    inputAndroid:{
        borderWidth:1,
        width:constants.Dimensions.vw(90),
        borderRadius:10,        
        borderColor:constants.Colors.gray,                
        fontFamily:constants.Fonts.PoppinsRegular,
        paddingLeft:constants.Dimensions.vw(15),                
        paddingVertical:   constants.Dimensions.vh(4),      
        color:constants.Colors.dark,  
        fontSize:16
    },
    placeholder:{
      
            color:'#a3a3a3',                
            zIndex:1,
            paddingLeft:10,
            borderRadius: 5,
            borderWidth:1,
            
            
    },
    eye:{
        right:constants.Dimensions.vw(12),
        top:constants.Dimensions.vh(4)
    }
  
});

