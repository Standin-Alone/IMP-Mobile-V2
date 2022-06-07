// STYLESHEET

import React from 'react';
import { StyleSheet } from 'react-native';
import constants from '../../../constants';

export const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: constants.Colors.light,        
    },
    timelineTitle:{
        fontFamily:constants.Fonts.PoppinsBold,
        
    },
    detailText:{
        fontFamily:constants.Fonts.PoppinsBold
    },
    detailDescription:{
        fontFamily:constants.Fonts.PoppinsRegular
    }
});