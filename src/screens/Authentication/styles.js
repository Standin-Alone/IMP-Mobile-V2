
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
    },
    loadingView:{
         flexDirection:'row',
         alignSelf:'center',
         position:'absolute',
         top:constants.Dimensions.vh(150)           
    },
    titleContainer:{
        flexDirection:'row',
        alignSelf:'center',
        position:'absolute',
        top:constants.Dimensions.vh(100),
    },
    title:{
        color:constants.Colors.light,
        fontFamily:constants.Fonts.PoppinsBold,        
        fontSize:30,
        textAlign:'center',
   },
    loadingText:{
        marginVertical:constants.Dimensions.vh(2),
        marginHorizontal:constants.Dimensions.vw(5),
        color:constants.Colors.light,
        fontFamily:constants.Fonts.PoppinsRegular,
        fontSize:18
    }

});

