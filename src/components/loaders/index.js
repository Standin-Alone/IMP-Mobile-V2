
import React from "react";
import { View,SafeAreaView,ActivityIndicator,Text} from "react-native";
import { styles } from "./styles";

import constants from "../../constants";


export const Loader = ({
   isLoading
}) => {
   if (isLoading) {
       return (
           <SafeAreaView style={[styles.overlay, { alignItems: 'center', justifyContent: 'center',zIndex:1000 }]}>
               <View style={{ borderRadius: 10,paddingHorizontal: 25, paddingVertical: 15,top:constants.Dimensions.vh(90) }}>                 
                   <ActivityIndicator size="large" color={constants.Colors.primary}/>               
               </View>
           </SafeAreaView>
       );
   } else {
       return (<View />)
   }
}


export const FooterLoader = ({
    message
 }) => {
    
        return (    
        <SafeAreaView style={[styles.overlay, { alignItems: 'center', justifyContent: 'center',top:constants.Dimensions.vh(10)}]}>
            <View style={{ flexDirection:'row' }}>
                <ActivityIndicator size="small" color={constants.Colors.primary}/>               
                <Text style={styles.loaderText}>  {message}</Text>
            </View>                            
        </SafeAreaView>
        )
}
 
 

export const Divider =  ({
    style
 }) => {

        return (
            <View style={[styles.divider,style]}>

            </View>
        )
 }
 