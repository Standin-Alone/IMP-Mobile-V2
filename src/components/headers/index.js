
import React from "react";
import { View,TouchableOpacity,TextInput,Text } from "react-native";
import { styles } from "./styles";
import LinearGradient from 'react-native-linear-gradient';
import constants from "../../constants";
import  MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const PrimaryHeader = ({
   title,
   onGoBack
})=>(   
   <>  
        <View style={styles.primaryContainer}>
            <TouchableOpacity onPress={onGoBack}>
                <MaterialIcons 
                    name="chevron-left" 
                    size={55} 
                    color={constants.Colors.primary}
                />
            </TouchableOpacity>
            <View>
                <Text style={styles.primaryTitle}>
                    {title}
                </Text>
            </View>        
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