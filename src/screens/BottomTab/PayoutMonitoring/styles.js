// STYLESHEET

import React from 'react';
import { StyleSheet } from 'react-native';
import constants from '../../../constants';

export const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: constants.Colors.light,        
    },
    listText:{
        fontFamily:constants.Fonts.PoppinsBold,
        color:constants.Colors.dark
    }
});