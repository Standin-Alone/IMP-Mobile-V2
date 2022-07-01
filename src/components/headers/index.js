
import React from "react";
import { View,TouchableOpacity,TextInput,Text } from "react-native";
import { styles } from "./styles";
import LinearGradient from 'react-native-linear-gradient';
import constants from "../../constants";
import  MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LottieView from 'lottie-react-native';

export const HomeHeader = ({
    title,    
      
 })=>(   
    <>  
         <View style={[styles.primaryContainer,{backgroundColor:constants.Colors.primary,bottom:constants.Dimensions.vh(2)}]}>             
            
             <View>
                <LottieView source={constants.Images.hello}  autoPlay  style={styles.hello} resizeMode="contain" />
                 {/* <Text style={[styles.primaryTitle,{color:constants.Colors.light,fontSize:30,left:constants.Dimensions.vw(2) }]}>
                     {title}
                     
                 </Text> */}
              
             </View>         
             
         </View>             
    </>
 );

 

export const PrimaryHeader = ({
   title,
   onGoBack,
   backIconWhite,   
   showAddToCartButton,
   onAddToCart,
   showGoToCommoditiesButton,
   onGoToCommodities
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
            
            {showGoToCommoditiesButton && (
                <View style={{left:constants.Dimensions.vw(50),top:constants.Dimensions.vh(2) }}>
                    <TouchableOpacity onPress={onGoToCommodities}  >
                        <MaterialIcons 
                            name="shopping-bag" 
                            size={40} 
                            color={backIconWhite ? constants.Colors.light : constants.Colors.primary}
                        />
                    </TouchableOpacity>
                </View>
            )}

            {showAddToCartButton && (
                <View style={{left:constants.Dimensions.vw(14),top:constants.Dimensions.vh(2) }}>
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
    onSubmitEditing,
    onBlur,
    onFocus,    
    onGoBack,
    value
 })=>(   

        <View style={[styles.primaryContainer,{backgroundColor:constants.Colors.primary}]}>
         <View style={styles.headerSearchContainer}>
            <View style={{ flexDirection:'row' }}>
                <TouchableOpacity onPress={onGoBack}>
                    <MaterialIcons 
                        name="chevron-left" 
                        size={55} 
                        color={constants.Colors.light}
                    />
                </TouchableOpacity>
                <View style={{ top:constants.Dimensions.vh(1.5)}}>
                    <TextInput 
                        style={[styles.searchInput]}                        
                        placeholder="Search"                        
                        placeholderTextColor={constants.Colors.light}                        
                        onChangeText={onChangeText}
                        onFocus={onFocus} 
                        onBlur={onBlur} 
                        value={value}
                        returnKeyType={"search"}
                        onSubmitEditing={onSubmitEditing}
                        adjustsFontSizeToFit
                    />
                </View>                
   
            </View>
         </View>             
        </View>   
 );



 

export const ListHeader = ({
   
 })=>(   
    <>  
         <View style={{ alignSelf:'center' }}>
              <Text style={styles.listHeaderText}>Swipe down to refresh.</Text>
         </View>             
    </>
 );