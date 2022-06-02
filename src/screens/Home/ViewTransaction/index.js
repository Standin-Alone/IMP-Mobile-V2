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
         
      };
    }


    componentDidMount(){
        console.warn(this.state.transactionInfo.commodities)
    }

    setMyState = (value)=>this.setState(value);


    renderCommodities = ({item,index}) => {
        return(
            <Components.ViewTransactionCommodityCard
                commodityName={item.item_name}
                category={item.item_category}
                subCategory={item.item_sub_category}
                amount={item.total_amount}

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

                                <View style={{ flexDirection:'row' ,left:constants.Dimensions.vh(5),marginVertical:constants.Dimensions.vh(5)}}>
                                    <View style={{ flexDirection:'row' }} >                                        
                                        <Text style={styles.voucherAmountLabel}>Voucher Amount:</Text>
                                    </View>
                                    <View style={{ flexDirection:'column',left:constants.Dimensions.vh(5) }}>                                                                                
                                        <Text style={styles.voucherAmount}><Components.AmountText value={this.state.transactionInfo.default_balance}/></Text>                                        
                                    </View>                                    
                                </View>                                
                        </View>

                        <View style={styles.card}>
                            <View style={{ flexDirection:'column',marginVertical:constants.Dimensions.vh(5)}}>
                                <Text style={styles.cardHeader}>Commodities</Text>
                                    <FlatList 
                                        data={this.state.transactionInfo.commodities} 
                                        renderItem={this.renderCommodities}
                                        
                                    />
                            </View>
                        </View>
                    </View>
                )}
                               
            </>
        )
        
    }

}
  