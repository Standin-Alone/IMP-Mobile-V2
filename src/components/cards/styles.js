
// STYLESHEET

import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import constants from '../../constants';

export const styles = StyleSheet.create({
    primaryCard:{
        height:constants.Dimensions.vh(120),
        width:constants.Dimensions.vw(90), 
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        borderBottomRightRadius:20,
        borderBottomLeftRadius:20,
        backgroundColor: constants.Colors.light,
        elevation:2,
    },
    attachments:{
     
        resizeMode:'cover',
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        borderBottomRightRadius:20,
        borderBottomLeftRadius:20, 
        
        height:constants.Dimensions.vh(100)
    },
    imageContainer:{
        flex:1,
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        borderBottomRightRadius:20,
        borderBottomLeftRadius:20, 
    },
    cardHeader:{
        backgroundColor:'rgba(0, 0, 0, 0.5)',
        flexDirection:'row',
        height:constants.Dimensions.vh(10)
    },
    cardHeaderText:{
        left:constants.Dimensions.vw(2),
        top:constants.Dimensions.vh(2),
        color:'white',
        fontFamily:constants.Fonts.PoppinsRegular
    },

    commodityCard:{
        marginVertical:constants.Dimensions.vh(2)
    },
    commodity:{
        
        resizeMode:'cover',
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        borderBottomRightRadius:20,
        borderBottomLeftRadius:20,         
        height:constants.Dimensions.vh(40),
        width:constants.Dimensions.vw(40),
    },
    commodityName:{
        
        fontFamily:constants.Fonts.PoppinsBold,
        fontSize:20
    },
    category:{
        
        fontFamily:constants.Fonts.PoppinsMedium,
        fontSize:16
    },
    subCategory:{
        
        fontFamily:constants.Fonts.PoppinsMedium,
        fontSize:16
    },
    addCommodityButton:{
        flexDirection:'column',
        justifyContent:'center',
        borderRadius:15,
        width:constants.Dimensions.vw(45),
        height:constants.Dimensions.vh(10),
        backgroundColor:constants.Colors.warning
    },  
    commodityDetails:{        
        flexDirection:'column',
        justifyContent:'space-between',
        left:constants.Dimensions.vw(5),      
    },
    addText:{        
        textAlign:'center',  
        fontFamily:constants.Fonts.PoppinsMedium,
        color:constants.Colors.light,
        fontSize:16
    }
});

