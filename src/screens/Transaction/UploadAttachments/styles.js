
// STYLESHEET

import React from 'react';
import {StyleSheet} from 'react-native';
import constants from '../../../constants';

export const styles = StyleSheet.create({
   
    container: {

        flex: 1,
    
        justifyContent: 'center',
        flexDirection: 'column'
    },
    label:{
        fontFamily:constants.Fonts.PoppinsBold,
        fontSize:20,
        left:constants.Dimensions.vw(4)
    }


});

