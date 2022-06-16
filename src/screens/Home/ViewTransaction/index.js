import React from 'react';
import { View,Text,Image, FlatList} from 'react-native';
import constants from '../../../constants';
import {styles} from './styles'
import Components from '../../../components';

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
        
        console.warn(this.state.transactionInfo.commodities.reduce((prev, current) => prev + parseFloat(parseFloat(current.total_amount) +  parseFloat(current.cash_added)  ), 0))
    }

    setMyState = (value)=>this.setState(value);


    renderCommodities = ({item,index}) => {
        
        return(
            <Components.ViewTransactionCommodityCard
                commodityName={item.item_name}
                category={item.item_category}
                subCategory={item.item_sub_category}
                amount={item.total_amount +  item.cash_added }
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
                                        <Text style={styles.referenceNumberLabel}>Reference Number:</Text>
                                    </View>
                                    <View style={{ flexDirection:'column',left:constants.Dimensions.vh(5) }}>                                                                                
                                        <Text style={styles.referenceNumber}>{this.state.transactionInfo.reference_no}</Text>
                                    </View>                                    
                                </View>

                                <View style={{ flexDirection:'row' ,left:constants.Dimensions.vh(5),marginVertical:constants.Dimensions.vh(1)}}>
                                    <View style={{ flexDirection:'row' }} >                                        
                                        <Text style={styles.voucherAmountLabel}>Name:</Text>
                                    </View>
                                    <View style={{ flexDirection:'column',left:constants.Dimensions.vh(5) }}>                                                                                
                                        <Text style={styles.voucherAmount}>{this.state.transactionInfo.fullname}</Text>                                        
                                    </View>                                    
                                </View>                                

                                <View style={{ flexDirection:'row' ,left:constants.Dimensions.vh(5),marginVertical:constants.Dimensions.vh(1)}}>
                                    <View style={{ flexDirection:'row' }} >                                        
                                        <Text style={styles.voucherAmountLabel}>Program:</Text>
                                    </View>
                                    <View style={{ flexDirection:'column',left:constants.Dimensions.vh(5),backgroundColor: this.state.transactionInfo.shortname == 'RFDV' ? constants.Colors.brown : constants.Colors.secondary,borderRadius:20,paddingHorizontal:constants.Dimensions.vw(2)}}>                                                                                
                                        <Text style={styles.voucherAmount}>{this.state.transactionInfo.program_title}</Text>                                        
                                    </View>                                    
                                </View>                                

                                <View style={{ flexDirection:'row' ,left:constants.Dimensions.vh(5),marginVertical:constants.Dimensions.vh(1)}}>
                                    <View style={{ flexDirection:'row' }} >                                        
                                        <Text style={styles.voucherAmountLabel}>Voucher Amount:</Text>
                                    </View>
                                    <View style={{ flexDirection:'column',left:constants.Dimensions.vh(5) }}>                                                                                
                                        <Text style={styles.voucherAmount}><Components.AmountText value={this.state.transactionInfo.default_balance}/></Text>                                        
                                    </View>                                    
                                </View>                                
                        </View>

                        <View style={[styles.card,{height:constants.Dimensions.vh(75)}]}>
                            <View style={{ flexDirection:'column',marginVertical:constants.Dimensions.vh(5)}}>
                                <Text style={styles.cardHeader}>Commodities</Text>
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
                                        <Text style={styles.label}>Total Amount</Text>
                                        <Components.AmountText  amountStyle={styles.cashAdded} value={this.state.transactionInfo.commodities.reduce((prev, current) => prev + parseFloat(parseFloat(current.total_amount) +  parseFloat(current.cash_added)  ), 0)}/>                                    
                                    </View>                                                                    
                                    <View style={{ flexDirection:'row',justifyContent:'space-between'}}>
                                        <Text style={styles.label}>Total Cash Added</Text>
                                        <Text>
                                            -<Components.AmountText  amountStyle={styles.cashAdded} value={this.state.transactionInfo.commodities.reduce((prev, current) => prev + parseFloat(current.cash_added)  , 0)}/>                                                                           
                                        </Text>
                                    </View>                                  
                                    <View style={{ flexDirection:'row',justifyContent:'space-between'}}>
                                        <Text style={styles.label}>Total Amount Paid By Voucher</Text>
                                        <Text>
                                            <Components.AmountText  amountStyle={styles.cashAdded} value={this.state.transactionInfo.commodities.reduce((prev, current) => prev + parseFloat(parseFloat(current.total_amount) +  parseFloat(current.cash_added)  ), 0) - this.state.transactionInfo.commodities.reduce((prev, current) => prev + parseFloat(current.cash_added)  , 0)}/>                                                                           
                                        </Text>
                                    </View>                                                                    
                            </View>

                            
                            
                            
                        </View>

                        <View style={styles.card}>
                            <View style={{ flexDirection:'column',marginVertical:constants.Dimensions.vh(5)}}>
                                <Text style={styles.cardHeader}>Attachments</Text>
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
  