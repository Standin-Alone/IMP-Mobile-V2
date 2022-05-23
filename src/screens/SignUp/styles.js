
// STYLESHEET

import React from 'react';
import {StyleSheet} from 'react-native';
import constants from '../../constants';

export const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    form:{
        flexDirection:'column',
        top:constants.Dimensions.vh(30),
        left:constants.Dimensions.vw(5)
    },
    buttonContainer:{        
        left:0,        
        bottom:constants.Dimensions.vh(2),
        right:0,        
        position:'absolute',
        justifyContent:'center',
        alignItems:'center'
    }
});

