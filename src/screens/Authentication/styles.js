
// STYLESHEET

import React from 'react';
import {StyleSheet} from 'react-native';
import constants from '../../constants';

export const styles = StyleSheet.create({
    backgroundImage:{
        flex:1,
        height:constants.Dimensions.vh(100),
        width:constants.Dimensions.vw(100),                
    },
    logo:{
        position:'absolute',
        height:constants.Dimensions.vh(50),
        width:constants.Dimensions.vw(50),     
        alignSelf:'center',
        top:constants.Dimensions.vh(30)           
    }

});

