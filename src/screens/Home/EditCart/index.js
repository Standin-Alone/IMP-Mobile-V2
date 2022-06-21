import React from 'react';
import { View,Text,FlatList} from 'react-native';
import constants from '../../../constants';
import {styles} from './styles'
import Components from '../../../components';
import { checkout } from '../../../actions/transaction';

export default class EditCart extends React.Component {
    constructor(props) {
      super(props);
      this.state = {        
          parameters:this.props.route.params,          
          voucherInfo:this.props.route.params.voucherInfo,
          cart:this.props.route.params.cart,
          timer:this.props.route.params.timer,
          newCart:[],
          cartTotalAmount:0,
          isLoading:false
         
      };
    }
    

    setMyState = (value)=>this.setState(value);

    componentDidMount(){
        
        this.setState({cartTotalAmount:  Number(this.state.cart.reduce((prev, current) => prev + (parseFloat(current.total_amount) + parseFloat(current.cash_added)), 0)).toFixed(2)});    
    }


    handleRemoveItem = (index)=>{
          let newCart = this.state.cart;
          
          // remove delete 
          newCart.splice(index, index + 1);

          this.setState({newCart:newCart,cartTotalAmount:  Number(newCart.reduce((prev, current) => prev + (parseFloat(current.total_amount) + parseFloat(current.cash_added)), 0)).toFixed(2)})

          if(newCart.length  == 0){
            // this.state.parameters.handleUpdateCart(newCart);
            this.props.navigation.goBack();
          }
    }

  
    refreshInfo = (transaction_info)=>{
        this.setState({voucherInfo:transaction_info})
    }

    changeCart = (commodityInfo)=>{


        let newCart = [...this.state.cart];

        // newCart.map((commodity)=>{
        //     if(commodity.voucher_details_id == commodity)
        // })
        console.warn('NEW COIMMODITY INFO',commodityInfo)


    }


    goToEditCommodityDetails = (item)=>{
        
        let parameters = {
            commodityInfo:item,
            voucherInfo:this.state.voucherInfo,
            cart:this.state.cart,                        
            cartTotalAmount:parseFloat(this.state.voucherInfo.commodities.reduce((prev, current) =>  prev + (current.voucher_details_id != item.voucher_details_id ?  parseFloat(parseFloat(current.total_amount) +  parseFloat(current.cash_added)  ) : 0), 0)),
            refreshInfo:this.refreshInfo,   
            changeCart:this.changeCart         
        };
        
        
        this.props.navigation.navigate(constants.ScreenNames.HOME_STACK.EDIT_COMMODITY_DETAILS,parameters);        
    }


    renderItem = (item,index) =>{
        
        let categoryName = item.item_category;
        let unitMeasurement = this.state.voucherInfo.unit_measurements.filter((info)=>item.unit_type == info.label)[0]?.label;

        
        return (
        <Components.CommodityCard
            image={item.commodityBase64}
            commodityName={item.item_name}  
            category={categoryName}        
            subCategory={item.subCategory} 
            quantity={item.quantity}     
            unitMeasurement={unitMeasurement}
            totalAmount={parseFloat(item.total_amount) + parseFloat(item.cash_added)}     
            showRemoveButton
            showCommodityInfo
            onRemove={()=>this.handleRemoveItem(index)}  
            showEditButton
            onEdit={()=>this.goToEditCommodityDetails(item)}
        />
    )}
    

    handleCheckout = ()=>{

        let parameters = {           
            voucherInfo:this.state.voucherInfo,
            cart:this.state.cart,  
            timer:this.state.timer,            
        }

        
        

    }



    render(){
        return(
            <>  
            
                <Components.PrimaryHeader                    
                        onGoBack = {()=>{                            
                            this.props.navigation.goBack()
                        }}                        
                        title={"Edit Cart"}                        
                />

                <Components.ProgressModal
                    showProgress={this.state.isLoading}    
                    title={"Loading..."}                
                />


                <FlatList
                    data={this.state.cart}
                    extraData={this.state.newCart}
                    renderItem = {({ item, index }) => this.renderItem(item, index)}        
                    contentContainerStyle={{ paddingBottom:constants.Dimensions.vh(60) }}
                    nestedScrollEnabled        
                />


                <View style={styles.bottom}>
                    <View style={{ flexDirection:'column',alignContent:'center',bottom:constants.Dimensions.vw(10),marginHorizontal:constants.Dimensions.vw(3)}}>
                        <Text style={styles.cartSummaryText}>Cart Summary</Text>
                        <View style={{ flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={styles.label}>Voucher Total Amount</Text>
                            <Components.AmountText  amountStyle={styles.cashAdded} value={this.state.voucherInfo.default_balance}/>                                    
                        </View>   
                        <View style={{ flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={styles.label}>Cart Total Amount</Text>
                             <Components.AmountText  amountStyle={styles.cashAdded} value={this.state.cartTotalAmount}/>                                    
                        </View>                                           
                        <View style={{ flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={styles.label} >Total Cash Added By Farmer</Text>
                            <Components.AmountText  amountStyle={styles.cashAdded} value={ Number(this.state.cart.reduce((prev, current) => prev + (parseFloat(current.cash_added)), 0)).toFixed(2)}/>                                    
                        </View>
                        <View style={{ flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={styles.label}>Remaining Balance</Text>
                            <Components.AmountText  amountStyle={styles.cashAdded} value={(parseFloat(this.state.voucherInfo.current_balance) - parseFloat(this.state.cartTotalAmount)) < 0 ? 0.00 :  (this.state.voucherInfo.current_balance - this.state.cartTotalAmount)}/>                                    
                        </View>                        
                    </View>
                    <View style={{ left: constants.Dimensions.vh(4),bottom:constants.Dimensions.vh(2) }}>
                        <Components.PrimaryButton  
                            onPress={this.handleCheckout}                      
                            title={`Save`}                                
                            isLoading={this.state.isLoading}                                                        
                        />
                    </View>
                </View>    
                                                        
            </>
        )
        
    }

}
  