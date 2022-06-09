
import React from "react";
import { View,TouchableOpacity,Text } from "react-native";
import { styles } from "./styles";
import FastImage  from 'react-native-fast-image'
import constants from "../../constants";
import Components from '../../components';
import Moment from 'react-moment';
import moment from 'moment';



export const PrimaryCard = ({
    image,
    imageStyle,
    title,
    titleStyle,
    buttonStyle,
    onPress
})=>(   
    <TouchableOpacity style={[styles.primaryCard,buttonStyle]} onPress={onPress}>
        <View style={styles.imageContainer}>
            <FastImage
                style={[styles.attachments,imageStyle]}
                source={image}
                resizeMode={FastImage.resizeMode.cover}    
            >

                <View style={styles.cardHeader}>
                    <Text style={[styles.cardHeaderText,titleStyle]}>{title}</Text>
                </View>
            </FastImage>
        </View>
    </TouchableOpacity>
);



export const HomePrimaryCard = ({
    image,
    imageStyle,
    title,
    subtitle,
    titleStyle,
    buttonStyle,    
    onViewTransaction
})=>(   
    <View style={[styles.homePrimaryCard,buttonStyle]} >
        <View style={styles.imageContainer}>
            <FastImage
                style={[styles.attachments,imageStyle]}
                source={image}
                resizeMode={FastImage.resizeMode.cover}    
            >

                <View style={styles.cardHeader}>
                    <View style={styles.cardHeaderContent}>
                        
                            <constants.Icons.Fontisto name="ticket-alt" size={20} color={constants.Colors.secondary} style={{top:constants.Dimensions.vh(2),left:constants.Dimensions.vw(1),}}/> 
                        <View style={{ flexDirection:'column',}}>
                            <Text style={[styles.cardHeaderText,titleStyle]}>{title}</Text>                                                          
                                { !moment(subtitle).isSame( moment().startOf('day'), 'day') ? 
                                   <Text  style={[styles.cardHeaderSubTitle]} adjustsFontSizeToFit>{moment(subtitle).format('MMMM DD, YYYY, h:mm a')} </Text>   : 
                                    (
                                        <Moment element={Text} style={[styles.cardHeaderSubTitle]} adjustsFontSizeToFit   fromNow>{subtitle}</Moment>
                                    )          
                                }     
                        </View>
                    </View>
                </View>

                <View style={[styles.imageMenu,{top:constants.Dimensions.vh(70)}]}>
                    <View style={styles.imageMenuContainer}>                    
                        <TouchableOpacity >
                            <constants.Icons.Ionicons name ="eye" color={constants.Colors.light}  size={30} onPress={onViewTransaction} />
                        </TouchableOpacity>
                    </View>
                </View>     
            </FastImage>
        </View>
    </View>
);





export const ViewTransactionCommodityCard = ({
    image,
    commodityName,
    category,
    subCategory,
    amount,
    quantity

})=>(   
    <View>
        <View style={styles.commodityInfo}>
            <View style={{ flexDirection:'row',justifyContent:'space-between',marginHorizontal:constants.Dimensions.vw(5)}}>                
                <Text style={styles.commodityLabel}>{commodityName}  ({quantity})</Text>                
                <FastImage
                    style={styles.commodityImage}
                    source={{ uri:`data:image/jpeg;base64,${image}` }}
                    resizeMode={FastImage.resizeMode.cover}    
                />          
            </View>
            <View style={{ flexDirection:'row',justifyContent:'space-between',marginHorizontal:constants.Dimensions.vw(5)}}>                
                <Text style={styles.commodityLabel}>{category}</Text>                
            </View>

            {subCategory &&
                <View style={{ flexDirection:'row',justifyContent:'space-between',marginHorizontal:constants.Dimensions.vw(5)}}>                
                    <Text style={styles.commodityLabel}>{subCategory}</Text>                
                </View>
            }
            

            <View style={{ flexDirection:'row',justifyContent:'space-between',marginHorizontal:constants.Dimensions.vw(5)}}>                
                <Text style={styles.commodityLabel}><Components.AmountText  amountStyle={styles.amount} value={ amount}/> </Text>                
            </View>
        </View>     
    </View>
);



export const ImageCard = ({

    image,
    onViewImage,
    onChangeImage,
    
})=>(   
    <View style={styles.imageCard}>
        <View style={styles.imageContainer}>
            <FastImage
                style={styles.attachments}

                source={{ uri:`data:image/jpeg;base64,${image}` }}

                resizeMode={FastImage.resizeMode.cover}    
            >            
            <View style={styles.imageMenu}>
                <View style={styles.imageMenuContainer}>
                    <TouchableOpacity onPress={onChangeImage}>
                        <constants.Icons.Ionicons name ="camera-reverse" color={constants.Colors.light} size={40} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onViewImage}>
                        <constants.Icons.Ionicons name ="eye" color={constants.Colors.light}  size={40} />
                    </TouchableOpacity>
                </View>
            </View>                
            </FastImage>
        </View>
    </View>
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
    totalAmount,
    showCommodityInfo,
    

})=>(   
    <View style={styles.commodityCard}>       
        <View style={{ flexDirection:'row',justifyContent:'flex-start'}}>
            <View style={{ flexDirection:'row',justifyContent:'flex-start',marginHorizontal:constants.Dimensions.vw(0)}}>
            <FastImage
                    style={styles.commodity}

                    source={{
                        uri: `data:image/jpg;base64, ${image}`
                        
                    }}
                    resizeMode={FastImage.resizeMode.contain}    
                />
                <View style={styles.commodityDetails}>
                    <Text style={styles.commodityName} adjustsFontSizeToFit>{commodityName}</Text>

                    {showCommodityInfo  && (
                        <>
                            <Text style={styles.category} adjustsFontSizeToFit>{category}</Text>
                            <Text style={styles.category} adjustsFontSizeToFit>{subCategory}</Text>
                            <Text style={styles.category} adjustsFontSizeToFit>Total Amount: 
                                    <Components.AmountText  amountStyle={styles.category} value={totalAmount}/>
                            </Text>

                            <Text style={styles.category} adjustsFontSizeToFit>Quantity: {quantity} ({unitMeasurement})</Text>
                        </>
                        )
                    }
                    

                    {showAddButton &&
                    <TouchableOpacity style={styles.addCommodityButton} onPress={onPress} >
                        <View style={{ flexDirection:'row',justifyContent:'center'}}>
                            <constants.Icons.Ionicons name="add-circle-outline" size={20} color={constants.Colors.light}/>
                            <Text style={styles.addText} adjustsFontSizeToFit >Add</Text>
                        </View>
                    </TouchableOpacity>
                    }
                </View>
            </View>  

            {showRemoveButton &&
                <View style={{ flexDirection:'row',justifyContent:'flex-start',marginHorizontal:constants.Dimensions.vw(2)}}>
                        <TouchableOpacity onPress={onRemove}>
                            <constants.Icons.Ionicons name="close-circle-outline" size={18} color={constants.Colors.danger}/>
                        </TouchableOpacity>
                </View>      
            }
        </View>    
    </View>

);





export const PayoutCard = ({

amount
})=>(   
    <View style={styles.payoutCard}>       
        <View style={{ flexDirection:'column',left:constants.Dimensions.vw(5),top:constants.Dimensions.vh(2)}}>
            <Text style={styles.forPayout}> Total Pending For Payout</Text>
            
            <Components.AmountText value={amount} amountStyle={styles.payoutValue}/>
        </View>
        
    </View>
);




export const PayoutBatchCard = ({
batchNumber,
totalAmount,
status,
onPress

})=>(   
    <View style={styles.payoutBatchCard}>       
        <View style={{ flexDirection:'column',left:constants.Dimensions.vw(5),top:constants.Dimensions.vh(2)}}>
           <View style={{ flexDirection:'row' }}>
            <FastImage
                style={[styles.batchImage]}
                source={constants.Images.batch}
                resizeMode={FastImage.resizeMode.cover}    
            />
            <View style={styles.payoutBatchContent}>
                <Text style={styles.batchNumber} numberOfLines={1}>{batchNumber}</Text>
                <Text style={styles.batchAmount} numberOfLines={1}> Amount: <Components.AmountText  value={totalAmount} amountStyle={styles.amount}/></Text>
            </View>

            <View style={[styles.payoutCardStatus,{backgroundColor: status == 'Approved' || status == 'Paid' ? constants.Colors.success:constants.Colors.warning}]}>
                <Text style={styles.payoutBatchStatus}>{status}</Text>
                
            </View>                        
            </View>          

            <View style={styles.eyeIcon}>
                    <constants.Icons.Ionicons name="eye" size={20} adjustsFontSizeToFit color={constants.Colors.secondary} onPress={onPress}/>
            </View>
            

            
        </View>
        
    </View>
);
