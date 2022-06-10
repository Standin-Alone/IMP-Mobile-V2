
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
    loadingTitle,
    moreStyle
})=>(   

    <LinearGradient
    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
    colors={[constants.Colors.primary, constants.Colors.secondary]}
    style={[styles.primaryButton,moreStyle]}
    >
        <TouchableOpacity  onPress={onPress}  style={{ justifyContent: "center",alignItems: "center", paddingVertical:constants.Dimensions.vh(3) }} >
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




export const SecondaryButton = ({
    onPress, 
    iconName,
    iconColor,
    iconSize,
    title
})=>(   

  
        <TouchableOpacity  onPress={onPress}  style={styles.secondaryButton}>
            <View style={{ flexDirection:'column',top:constants.Dimensions.vh(20)}} >
                <View style={{ flexDirection:'row',justifyContent:'center'}}>
                    <constants.Icons.MaterialCommunityIcons name={iconName} size={iconSize} color={iconColor}/>
                    
                </View>
                <Text style={{ textAlign:'center' }}>{title}</Text>
            </View>
        </TouchableOpacity>
  
);



export const TertiaryButton = ({
    onPress,     
    title
})=>(     
    <TouchableOpacity  onPress={onPress}  style={styles.tertiaryButton}>
        <View style={{ flexDirection:'column',top:constants.Dimensions.vh(5)}} >                
            <Text style={{ textAlign:'center',color:constants.Colors.danger }}>{title}</Text>
        </View>
    </TouchableOpacity>  
);





export const FilterButtons = ({
    onPress,     
    title,
    isSelected
})=>(     
    <TouchableOpacity  onPress={onPress}  style={[styles.filterButton,{borderColor:isSelected ? constants.Colors.primary : constants.Colors.dark_tint}]}>
        <View style={{ flexDirection:'column',top:constants.Dimensions.vh(2)}} >                
            <Text style={{ textAlign:'center',color:isSelected ? constants.Colors.primary : constants.Colors.dark_tint }}>{title}</Text>
        </View>
    </TouchableOpacity>  
);
