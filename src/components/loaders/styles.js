
// STYLESHEET

import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import constants from '../../constants';

export const styles = StyleSheet.create({

    primaryContainer:{
        flexDirection:'row',    
        marginVertical:constants.Dimensions.vh(2)
    },
    divider:{
        width:constants.Dimensions.vw(100),        
        borderColor:constants.Colors.gray,
        borderBottomWidth:1,

    },
    loaderText:{
        fontFamily:constants.Fonts.PoppinsRegular
    }
});

