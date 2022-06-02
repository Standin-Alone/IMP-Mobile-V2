
// STYLESHEET

import React from 'react';
import {StyleSheet} from 'react-native';
import constants from '../../../constants';

export const styles = StyleSheet.create({
   commodity:{
       width:constants.Dimensions.vw(90),
       height:constants.Dimensions.vh(70),
   },
   form:{
       flexDirection:'column',
       left:constants.Dimensions.vw(5),
       
   },
   label:{
       fontFamily:constants.Fonts.PoppinsBold,
       fontSize:14,
       color:constants.Colors.gray
   },
   detailsLabel:{
        fontFamily:constants.Fonts.PoppinsBold,
        fontSize:14,
        color:constants.Colors.dark
    },
   scrollView:{
       paddingBottom:constants.Dimensions.vh(50),
       
   },
   remainingBalance:{
        color:constants.Colors.danger
    },
   cashAdded:{
       color:constants.Colors.primary
   },
   bottom:{
        position:'absolute',
        bottom:0,
        left:0,
        right:0,
        borderTopWidth:1,
        backgroundColor:constants.Colors.light,
        borderColor:constants.Colors.primary
    }


});

