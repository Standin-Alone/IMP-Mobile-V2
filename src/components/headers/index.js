
import React from "react";
import { View,TouchableOpacity,TextInput,Text } from "react-native";
import { styles } from "./styles";
import LinearGradient from 'react-native-linear-gradient';
import constants from "../../constants";
import  MaterialIcons from 'react-native-vector-icons/MaterialIcons';


export const HomeHeader = ({
    title,    
      
 })=>(   
    <>  
         <View style={[styles.primaryContainer,{backgroundColor:constants.Colors.primary,bottom:constants.Dimensions.vh(2)}]}>             
             <View>
                 <Text style={[styles.primaryTitle,{color:constants.Colors.light,fontSize:30,left:constants.Dimensions.vw(2) }]}>
                     {title}
                 </Text>
             </View>         
         </View>             
    </>
 );

 

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
    onChangeText,
    onBlur,
    onFocus,
    isFocus,
    value
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
                        style={[styles.searchInput, {borderColor: isFocus ? 
                        constants.Colors.primary 
                        :                     
                        constants.Colors.gray
                        }]}                        
                        placeholder="Search here by name or reference #"
                        
                        onChangeText={onChangeText}
                        onFocus={onFocus} 
                        onBlur={onBlur} 
                        value={value}
                        adjustsFontSizeToFit
                    />
                </View>                
            </View>
         </View>             
    </>
 );


 

export const ListHeader = ({
   
 })=>(   
    <>  
         <View style={{ alignSelf:'center' }}>
              <Text style={styles.listHeaderText}>Swipe down to refresh.</Text>
         </View>             
    </>
 );