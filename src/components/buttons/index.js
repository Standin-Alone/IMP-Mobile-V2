
import React from "react";
import { View,TouchableOpacity,Text } from "react-native";
import { styles } from "./styles";
import LinearGradient from 'react-native-linear-gradient';
import constants from "../../constants";
import Spinner from 'react-native-spinkit';
export const PrimaryButton = ({
    onPress,
    fontSize,
    title,
    width,
    height,
    isLoading,
    loadingTitle
})=>(   

    <LinearGradient
    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
    colors={[constants.Colors.primary, constants.Colors.secondary]}
    style={[styles.primaryButton]}
    >
        <TouchableOpacity  onPress={onPress}  style={{ justifyContent: "center",alignItems: "center",padding:14}} >
            <View style={{ flexDirection:'row' }}>
      

            {
                isLoading ?
                <Spinner                     
                    isVisible={isLoading} 
                    size={30} 
                    type={'FadingCircleAlt'} 
                    color={constants.Colors.light}
                    
                />
                :

                <Text style={[styles.primaryButtonText]}>
                    { isLoading ? loadingTitle : title}
                </Text>

            }
            </View>
        </TouchableOpacity>
    </LinearGradient>
);


export const PrimaryButtonOutline = ({
    onPress,
    fontSize,
    title,
    width,
    height,
    isLoading,
    loadingTitle
})=>(   

    <LinearGradient
    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
    colors={[constants.Colors.light,constants.Colors.light]}
    style={[styles.primaryButtonOutline]}
    >
        <TouchableOpacity  onPress={onPress}  style={{ justifyContent: "center",alignItems: "center",padding:14}} >
            <View style={{ flexDirection:'row' }}>
      

            {
                isLoading ?
                <Spinner                     
                    isVisible={isLoading} 
                    size={30} 
                    type={'FadingCircleAlt'} 
                    color={constants.Colors.primary}
                    
                />
                :

                <Text style={[styles.primaryButtonOutlineText]}>
                    { isLoading ? loadingTitle : title}
                </Text>

            }
            </View>
        </TouchableOpacity>
    </LinearGradient>
);
