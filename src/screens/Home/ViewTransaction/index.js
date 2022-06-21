import React from 'react';
import { View,Text,TouchableOpacity, FlatList} from 'react-native';
import constants from '../../../constants';
import {styles} from './styles'
import Components from '../../../components';
import { goToEditCart } from '../../../actions/transaction';

export default class ViewTransaction extends React.Component {
    constructor(props) {
      super(props);
      this.state = {        
          parameters:this.props.route.params,
          transactionInfo:this.props.route.params.transactionInfo,
          isReadyToRender:true,
          showImage:false,
          imageUri:'',
         
      };
    }

    componentDidMount(){
        console.warn(this.state.transactionInfo.commodities)
    }

    
    refreshInfo = (transaction_info)=>{
        this.setState({transaction_info:transaction_info})
    }

    setMyState = (value)=>this.setState(value);


    goToEditCommodityDetails = (item)=>{
        
        let parameters = {
            commodityInfo:item,
            voucherInfo:this.state.transactionInfo,
            cart:this.state.transactionInfo.commodities,                        
            cartTotalAmount:parseFloat(this.state.transactionInfo.commodities.reduce((prev, current) => prev + parseFloat(parseFloat(current.total_amount) +  parseFloat(current.cash_added)  ), 0)),
            refreshInfo:this.refreshInfo,            
        };
        

        this.props.navigation.navigate(constants.ScreenNames.HOME_STACK.EDIT_COMMODITY_DETAILS,parameters);        
    }


    renderCommodities = ({item,index}) => {
        console.warn(item)
        return(
            <Components.ViewTransactionCommodityCard
                image={item.commodityBase64}
                commodityName={item.item_name}
                category={item.item_category}
                subCategory={item.item_sub_category}
                amount={parseFloat(item.total_amount) + parseFloat(item.cash_added) }
                quantity={`x${item.quantity}`}
            
                

            />

        )

    }

    showImage = (image)=>{
        this.setState({showImage:true,imageUri:image})
    }


    renderAttachments = ({item,index})=>{
            
        return(        
            <Components.PrimaryCard
                image={{uri:`data:image/jpeg;base64,${item.image}` }}
                imageStyle={styles.image}
                title={item.name}
                buttonStyle={styles.commodityButtonImage}
                onPress={()=>this.showImage(item.image)}
            />
        )
    }

    handleGoToEditCart = ()=>{
        let parameters = {
            voucherInfo:this.state.transactionInfo,
            cart:this.state.transactionInfo.commodities           
        }
       
       return goToEditCart(parameters,this.setMyState,this.props)
    }
    
    render(){
        return(
            <>  
            
                <Components.PrimaryHeader                    
                        onGoBack = {()=>this.props.navigation.goBack()}
                        backIconWhite={true}
                        title={"View Transaction"}                        
                />

                <Components.ImageModal
                    showImage={this.state.showImage}
                    image={{ url: "data:image/jpeg;base64," + this.state.imageUri}}
                    onRequestClose={()=>this.setState({showImage:false})}
                />

               {!this.state.isReadyToRender ? (
                    <View style={{ bottom:constants.Dimensions.vh(50) }}>
                        <Components.Loader isLoading={true}/>
                    </View>
                ) : (
                    <View style={{ backgroundColor:constants.Colors.gray_tint,flex:1}}>                                                       
                        <View style={styles.card}>
                                <View style={{ flexDirection:'column' ,left:constants.Dimensions.vh(5),marginVertical:constants.Dimensions.vh(5)}}>
                                    <View style={{ flexDirection:'row' }} >
                                        <constants.Icons.Fontisto name="ticket-alt" size={18} color={constants.Colors.secondary}/>
                                        <Text style={styles.referenceNumberLabel} adjustsFontSizeToFit>Reference Number:</Text>
                                    </View>
                                    <View style={{ flexDirection:'column',left:constants.Dimensions.vh(5) }}>                                                                                
                                        <Text style={styles.referenceNumber} adjustsFontSizeToFit>{this.state.transactionInfo.reference_no}</Text>
                                    </View>                                    
                                </View>

                                <View style={{ flexDirection:'row' ,left:constants.Dimensions.vh(5),marginVertical:constants.Dimensions.vh(1)}}>
                                    <View style={{ flexDirection:'row' }} >                                        
                                        <Text style={styles.voucherAmountLabel} adjustsFontSizeToFit>Name:</Text>
                                    </View>
                                    <View style={{ flexDirection:'column',left:constants.Dimensions.vh(5) }}>                                                                                
                                        <Text style={styles.voucherAmount} adjustsFontSizeToFit>{this.state.transactionInfo.fullname}</Text>                                        
                                    </View>                                    
                                </View>                                

                                <View style={{ flexDirection:'row' ,left:constants.Dimensions.vh(5),marginVertical:constants.Dimensions.vh(1)}}>
                                    <View style={{ flexDirection:'row' }} >                                        
                                        <Text style={styles.voucherAmountLabel} adjustsFontSizeToFit>Program:</Text>
                                    </View>
                                    <View style={{ flexDirection:'column',left:constants.Dimensions.vh(5),backgroundColor: this.state.transactionInfo.shortname == 'RFDV' ? constants.Colors.brown : constants.Colors.secondary,borderRadius:20,paddingHorizontal:constants.Dimensions.vw(2)}}>                                                                                
                                        <Text style={styles.voucherAmount} adjustsFontSizeToFit>{this.state.transactionInfo.program_title}</Text>                                        
                                    </View>                                    
                                </View>                                

                                <View style={{ flexDirection:'row' ,left:constants.Dimensions.vh(5),marginVertical:constants.Dimensions.vh(1)}}>
                                    <View style={{ flexDirection:'row' }} >                                        
                                        <Text style={styles.voucherAmountLabel} adjustsFontSizeToFit>Voucher Amount:</Text>
                                    </View>
                                    <View style={{ flexDirection:'column',left:constants.Dimensions.vh(5) }}>                                                                                
                                        <Text style={styles.voucherAmount} adjustsFontSizeToFit><Components.AmountText value={this.state.transactionInfo.default_balance}/></Text>                                        
                                    </View>                                    
                                </View>                                
                        </View>

                        <View style={[styles.card,{height:constants.Dimensions.vh(75)}]}>
                            <View style={{ flexDirection:'column',marginVertical:constants.Dimensions.vh(5)}}>
                                <View style={{ flexDirection:'row',justifyContent:'space-between' }}>
                                    <Text style={styles.cardHeader}>Commodities</Text>
                                    <View style={{ right:constants.Dimensions.vw(5) }}>
                                        <TouchableOpacity onPress={this.handleGoToEditCart}>
                                            <constants.Icons.MaterialCommunityIcons
                                                name="square-edit-outline"
                                                size={20}
                                                color={constants.Colors.warning}
                                            />
                                        </TouchableOpacity> 
                                    </View>
                                </View>
                                
                                    <FlatList 
                                        data={this.state.transactionInfo.commodities} 
                                        renderItem={this.renderCommodities}
                                        nestedScrollEnabled
                                        style={{ height:constants.Dimensions.vh(45) }}
                                        
                                        contentContainerStyle={{ paddingBottom:constants.Dimensions.vh(15)}}
                                    />                                    
                                   
                            </View>

                            <View style={{ flexDirection:'column',bottom:constants.Dimensions.vh(4),marginHorizontal:constants.Dimensions.vw(7)}}>
                                <Components.Divider style={{width:constants.Dimensions.vw(85)}}/>
                                    <View style={{ flexDirection:'row',justifyContent:'space-between'}}>
                                        <Text style={styles.label} adjustsFontSizeToFit>Total Amount</Text>
                                        <Components.AmountText  amountStyle={styles.cashAdded} value={this.state.transactionInfo.commodities.reduce((prev, current) => prev + parseFloat(parseFloat(current.total_amount) +  parseFloat(current.cash_added)  ), 0)}/>                                    
                                    </View>                                                                    
                                    <View style={{ flexDirection:'row',justifyContent:'space-between'}}>
                                        <Text style={styles.label} adjustsFontSizeToFit>Total Cash Added</Text>
                                        <Text>
                                            -<Components.AmountText  amountStyle={styles.cashAdded} value={this.state.transactionInfo.commodities.reduce((prev, current) => prev + parseFloat(current.cash_added)  , 0)}/>                                                                           
                                        </Text>
                                    </View>                                  
                                    <View style={{ flexDirection:'row',justifyContent:'space-between'}}>
                                        <Text style={styles.label} adjustsFontSizeToFit>Total Amount Paid By Voucher</Text>
                                        <Text>
                                            <Components.AmountText  amountStyle={styles.cashAdded} value={this.state.transactionInfo.commodities.reduce((prev, current) => prev + parseFloat(parseFloat(current.total_amount) +  parseFloat(current.cash_added)  ), 0) - this.state.transactionInfo.commodities.reduce((prev, current) => prev + parseFloat(current.cash_added)  , 0)}/>                                                                           
                                        </Text>
                                    </View>                                                                    
                            </View>

                            
                            
                            
                        </View>

                        <View style={styles.card}>
                            <View style={{ flexDirection:'column',marginVertical:constants.Dimensions.vh(5)}}>
                                <Text style={styles.cardHeader} adjustsFontSizeToFit>Attachments</Text>
                                    <FlatList 
                                        data={this.state.transactionInfo.base64} 
                                        renderItem={this.renderAttachments}
                                        horizontal
                                        
                                    />
                            </View>
                        </View>

                    </View>
                )}
                               
            </>
        )
        
    }

}
  