
// STYLESHEET

import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import constants from '../../constants';

export const styles = StyleSheet.create({
    primaryCard:{
        height:constants.Dimensions.vh(40),
        width:constants.Dimensions.vw(40), 
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        borderBottomRightRadius:20,
        borderBottomLeftRadius:20,
        backgroundColor: constants.Colors.light,
        elevation:2,
    },
    homePrimaryCard:{
        marginVertical:constants.Dimensions.vh(2),
        height:constants.Dimensions.vh(100),
        width:constants.Dimensions.vw(90), 
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        borderBottomRightRadius:20,
        borderBottomLeftRadius:20,
        backgroundColor: constants.Colors.light,
        elevation:10,
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
    cardHeaderContent:{
        flexDirection:'row'
    },
    cardHeaderText:{
        left:constants.Dimensions.vw(2),
        top:constants.Dimensions.vh(2),
        color:'white',
        fontSize:constants.Dimensions.normalizeFontSize(10),
        fontFamily:constants.Fonts.PoppinsRegular
    },

    cardHeaderSubTitle:{
        left:constants.Dimensions.vw(2),
        top:constants.Dimensions.vh(2),
        color:constants.Colors.gray,
        fontSize:10,
        fontFamily:constants.Fonts.PoppinsRegular
    },

    commodityCard:{
        marginVertical:constants.Dimensions.vh(2),
        backgroundColor:constants.Colors.light,   
        borderRadius:20,     
        paddingVertical:constants.Dimensions.vh(2)
    },
    commodity:{
        
        resizeMode:'contain',
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        borderBottomRightRadius:20,
        borderBottomLeftRadius:20,         
        height:constants.Dimensions.vh(40),
        width:constants.Dimensions.vw(30),
    },
    commodityName:{
        
        fontFamily:constants.Fonts.PoppinsBold,
        fontSize:16
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
        left:constants.Dimensions.vw(1),      
    },
    addText:{        
        textAlign:'center',  
        fontFamily:constants.Fonts.PoppinsMedium,
        color:constants.Colors.light,
        fontSize:16
    },
    imageCard:{        
        width:constants.Dimensions.vw(90), 
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        borderBottomRightRadius:20,
        borderBottomLeftRadius:20,
        backgroundColor: constants.Colors.light,
        elevation:1,
    },
    imageMenu:{
        width:constants.Dimensions.vw(45),
        height:constants.Dimensions.vh(15),
        borderRadius:20,
        alignSelf:'center',
        top:constants.Dimensions.vh(70),        
        backgroundColor:'rgba(0, 0, 0, 0.3)'
    },
    imageMenuContainer:{
        top:constants.Dimensions.vh(4),        
        flexDirection:'row',
        justifyContent:'space-around'
    },
    commodityInfo:{
        borderBottomWidth:0.2,
        borderColor:constants.Colors.dark_tint,
        marginVertical:constants.Dimensions.vh(2)        
    },
    commodityLabel:{
        fontFamily:constants.Fonts.PoppinsBold,
        color:constants.Colors.dark_tint,
        fontSize:12
    },
    amount:{
        fontFamily:constants.Fonts.PoppinsBold,
        color:constants.Colors.danger,
        fontSize:12
    },
    payoutCard:{
        backgroundColor:constants.Colors.warning,
        height:constants.Dimensions.vh(20),
        width:constants.Dimensions.vw(90),
        borderRadius:15
    },
    forPayout:{        
        fontFamily:constants.Fonts.NexaRegular,
        fontSize:18,
        color:constants.Colors.light
    },
    payoutValue:{
        
        fontFamily:constants.Fonts.PoppinsBold,
        fontSize:20,
        color:constants.Colors.light
    },

    payoutBatchCard:{
        left:constants.Dimensions.vw(1),
        marginVertical:constants.Dimensions.vh(5),
        backgroundColor:constants.Colors.light,
        elevation:2,
        height:constants.Dimensions.vh(20),
        width:constants.Dimensions.vw(90),
        borderRadius:15
    },
    batchImage:{
        width:constants.Dimensions.vw(10),
        height:constants.Dimensions.vh(10),
        resizeMode:'cover',
        top:constants.Dimensions.vh(4)
      
    },
    payoutBatchContent:{
        width:constants.Dimensions.vw(45),
        left:constants.Dimensions.vw(2),

    },
    batchNumber:{        
        fontFamily:constants.Fonts.PoppinsBold,
        fontSize:14,        
    },
    payoutBatchStatus:{
        fontFamily:constants.Fonts.PoppinsBold,
        fontSize:12, 
    },
    payoutCardStatus:{        
        bottom:constants.Dimensions.vh(7),
        left:constants.Dimensions.vw(5),
        height:constants.Dimensions.vh(8),
        elevation:5,
        borderRadius:10,
        paddingVertical:constants.Dimensions.vh(1),
        paddingHorizontal:constants.Dimensions.vw(5)
    },
    eyeIcon: 
    {   flexDirection:'row',
        justifyContent:'flex-end',    
        right:constants.Dimensions.vw(15),
        bottom:constants.Dimensions.vh(5)
    },
    uploadSelectionButton:{
        paddingVertical:constants.Dimensions.vh(5)
    },  
    uploadSelectionText:{        
        fontFamily:constants.Fonts.PoppinsBold,
        fontSize:20, 
        color:constants.Colors.primary,
        paddingHorizontal:constants.Dimensions.vw(2)
    }
});

