
import React from "react";
import { View,TouchableOpacity,Text } from "react-native";
import { styles } from "./styles";
import FastImage  from 'react-native-fast-image'
import constants from "../../constants";

export const PrimaryCard = ({

})=>(   
    <TouchableOpacity style={styles.primaryCard}>
        <View style={styles.imageContainer}>
            <FastImage
                style={styles.attachments}

                source={{
                    uri: 'https://unsplash.it/400/400?image=1',
                    headers: { Authorization: 'someAuthToken' },                
                }}

                resizeMode={FastImage.resizeMode.cover}    
            >

                <View style={styles.cardHeader}>
                    <Text style={styles.cardHeaderText}>Jojo bardon</Text>
                </View>
            </FastImage>
        </View>
    </TouchableOpacity>
);



export const CommodityCard = ({
    image,
    commodityName,
    onPress,
    category,
    subCategory,
    showAddButton,
    showRemoveButton,
    onRemove,
    quantity,
    unitMeasurement,
    showCommodityInfo

})=>(   
    <View style={styles.commodityCard}>       
        <View style={{ flexDirection:'row',justifyContent:'flex-start'}}>
            <View style={{ flexDirection:'row',justifyContent:'flex-start',marginHorizontal:constants.Dimensions.vw(5)}}>
            <FastImage
                    style={styles.commodity}

                    source={{
                        uri: `data:image/jpg;base64, ${image}`
                        
                    }}
                    resizeMode={FastImage.resizeMode.cover}    
                />
                <View style={styles.commodityDetails}>
                    <Text style={styles.commodityName}>{commodityName}</Text>

                    {showCommodityInfo  && (
                        <>
                            <Text style={styles.category}>{category}</Text>
                            <Text style={styles.category}>{subCategory}</Text>
                            <Text style={styles.category}>Quantity:{quantity} ({unitMeasurement})</Text>
                        </>
                        )
                    }
                    

                    {showAddButton &&
                    <TouchableOpacity style={styles.addCommodityButton} onPress={onPress} >
                        <View style={{ flexDirection:'row',justifyContent:'center'}}>
                            <constants.Icons.Ionicons name="add-circle-outline" size={20} color={constants.Colors.light}/>
                            <Text style={styles.addText}>Add</Text>
                        </View>
                    </TouchableOpacity>
                    }
                </View>
            </View>  

            {showRemoveButton &&
                <View style={{ flexDirection:'row',justifyContent:'flex-start',marginHorizontal:constants.Dimensions.vw(5)}}>
                        <TouchableOpacity onPress={onRemove}>
                            <constants.Icons.Ionicons name="close-circle-outline" size={18} color={constants.Colors.danger}/>
                        </TouchableOpacity>
                </View>      
            }
        </View>    
    </View>

);
