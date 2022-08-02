
// STYLESHEET

import React from 'react';
import {StyleSheet} from 'react-native';
import constants from '../../../constants';

export const styles = StyleSheet.create({
   
    bottom:{
        position: 'absolute',
        left:0,
        right: 0,
        bottom: 0,
        backgroundColor:constants.Colors.light,
        paddingVertical:constants.Dimensions.vh(5),
        borderTopWidth:0.5,
        borderColor:constants.Colors.primary
    },
    label:{

        fontFamily:constants.Fonts.PoppinsBold,
        color:constants.Colors.dark,
        fontSize:16,
      
    },
    remainingBalance:{

        fontFamily:constants.Fonts.PoppinsBold,
        color:constants.Colors.danger,
        fontSize:16,
      
    },
    amountText:{        
        textAlign:'center',
        fontSize:20,
        fontFamily:constants.Fonts.GothamBold,        
        color:constants.Colors.light
    },

});

