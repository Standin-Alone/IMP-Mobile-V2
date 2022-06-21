
// STYLESHEET

import React from 'react';
import {StyleSheet} from 'react-native';
import constants from '../../../constants';

export const styles = StyleSheet.create({
   
    container: {

        flex: 0.8,
        backgroundColor: constants.Colors.primary,
        justifyContent: 'center',
        flexDirection: 'column'
    },
    bottom:{
        position: 'absolute',
        left:0,
        right:0,
        bottom:2,
        backgroundColor:constants.Colors.light,
        paddingTop:constants.Dimensions.vh(15),
        borderTopWidth:0.2,
        borderTopColor:constants.Colors.gray
    },
    label:{
        fontFamily:constants.Fonts.PoppinsMedium,
        color:constants.Colors.gray,
        fontSize:16,
    },   
    cartSummaryText:{
        fontFamily:constants.Fonts.PoppinsBold,
        color:constants.Colors.dark,
        fontSize:20,
    }


});

