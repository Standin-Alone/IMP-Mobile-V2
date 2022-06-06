
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
        borderWidth:0.5,
        borderColor:constants.Colors.gray

    },
    confirmButtonStyle:{
        borderColor:constants.Colors.primary,
        borderWidth:1
    },
    confirmButtonTextStyle:{
        color:constants.Colors.primary
    },
    cancelButtonStyle:{
        borderWidth:1,
        borderColor:constants.Colors.dark_tint,
        backgroundColor:constants.Colors.light
    },
    cancelButtonTextStyle:{
        color:constants.Colors.dark_tint
    }
});

