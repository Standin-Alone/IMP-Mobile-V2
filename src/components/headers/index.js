
import React from "react";
import { View,TouchableOpacity,TextInput,Text } from "react-native";
import { styles } from "./styles";
import LinearGradient from 'react-native-linear-gradient';
import constants from "../../constants";
import  MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const PrimaryHeader = ({
   title,
   onGoBack,
   backIconWhite,   
   showAddToCartButton,
   onAddToCart
})=>(   
   <>  
        <View style={[styles.primaryContainer,{backgroundColor:backIconWhite ? constants.Colors.primary: 'transparent'}]}>
            <TouchableOpacity onPress={onGoBack}>
                <MaterialIcons 
                    name="chevron-left" 
                    size={55} 
                    color={backIconWhite ? constants.Colors.light : constants.Colors.primary}
                />
            </TouchableOpacity>
            <View>
                <Text style={[styles.primaryTitle,{color:backIconWhite ? constants.Colors.light : constants.Colors.primary}]}>
                    {title}
                </Text>
            </View>        

            {showAddToCartButton && (
                <View style={{left:constants.Dimensions.vw(12),top:constants.Dimensions.vh(2) }}>
                    <TouchableOpacity onPress={onAddToCart}  >
                        <MaterialIcons 
                            name="check" 
                            size={40} 
                            color={backIconWhite ? constants.Colors.light : constants.Colors.secondary}
                        />
                    </TouchableOpacity>
                </View>
            )}
        </View>             
   </>
);



export const PrimaryHeaderSearch = ({
    title,
    onGoBack
 })=>(   
    <>  
         <View style={styles.headerSearchContainer}>
            <View style={{ flexDirection:'row' }}>
                <View style={styles.icon}>
                <constants.Icons.Ionicons
                    name="search"
                    size={30}
                    color={constants.Colors.dark_tint}
                    
                />
                </View>
                <View>
                    <TextInput 
                        style={styles.searchInput}                        
                        placeholder="Search here"
                    />
                </View>                
            </View>
         </View>             
    </>
 );