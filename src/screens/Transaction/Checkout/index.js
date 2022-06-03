import React from 'react';
import { View,Text,FlatList} from 'react-native';
import constants from '../../../constants';
import {styles} from './styles'
import Components from '../../../components';
import { checkout } from '../../../actions/transaction';

export default class Checkout extends React.Component {
    constructor(props) {
      super(props);
      this.state = {        
          parameters:this.props.route.params,
          voucherInfo:this.props.route.params.voucherInfo,
          cart:this.props.route.params.cart,
          timer:this.props.route.params.timer,
          newCart:[],
          cartTotalAmount:0
         
      };
    }
    

    setMyState = (value)=>this.setState(value);

    componentDidMount(){
        
        this.setState({cartTotalAmount:  Number(this.state.cart.reduce((prev, current) => prev + parseFloat(current.totalAmount), 0)).toFixed(2)});    
    }


    handleRemoveItem = (index)=>{
          let newCart = this.state.cart;
          
          // remove delete 
          newCart.splice(index, index + 1);

          this.setState({newCart:newCart})

          if(newCart.length  == 0){
            this.state.parameters.handleUpdateCart(newCart);
            this.props.navigation.goBack();
          }
    }


    renderItem = (item,index) =>{
        let categoryName = this.state.voucherInfo.fertilizer_categories.filter((info)=>info.value == item.category)[0]?.label;
        let unitMeasurement = this.state.voucherInfo.unit_measurements.filter((info)=>item.unitMeasurement == info.value)[0]?.label;

        
        return (
        <Components.CommodityCard
            image={item.image}
            commodityName={item.name}  
            category={categoryName}        
            subCategory={item.subCategory} 
            quantity={item.quantity}     
            unitMeasurement={unitMeasurement}
            totalAmount={item.totalAmount}     
            showRemoveButton
            showCommodityInfo
            onRemove={()=>this.handleRemoveItem(index)}  
        />
    )}
    

    handleCheckout = ()=>{

        let parameters = {           
            voucherInfo:this.state.voucherInfo,
            cart:this.state.cart,  
            timer:this.state.timer,            
        }

        
        return checkout(parameters,this.setMyState,this.props)

    }


    render(){
        return(
            <>  
            
                <Components.PrimaryHeader                    
                        onGoBack = {()=>{
                            this.state.parameters.handleUpdateCart(this.state.cart);
                            this.props.navigation.goBack()
                        }}                        
                        title={"Review Cart"}
                        
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
                            <Text style={styles.label}>Cart Total Amount</Text>
                            <Components.AmountText  amountStyle={styles.cashAdded} value={this.state.cartTotalAmount}/>                                    
                        </View> 
                        <View style={{ flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={styles.label}>Voucher Total Amount</Text>
                            <Components.AmountText  amountStyle={styles.cashAdded} value={this.state.voucherInfo.amount_val}/>                                    
                        </View>                        
                        <View style={{ flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={styles.label} >Total Cash Added By Farmer</Text>
                            <Components.AmountText  amountStyle={styles.cashAdded} value={(this.state.voucherInfo.amount_val - this.state.cartTotalAmount) < 0 ? (this.state.cartTotalAmount -this.state.voucherInfo.amount_val  ) : 0.00}/>                                    
                        </View>
                        <View style={{ flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={styles.label}>Remaining Balance</Text>
                            <Components.AmountText  amountStyle={styles.cashAdded} value={(this.state.voucherInfo.amount_val - this.state.cartTotalAmount) < 0 ? 0.00 :  (this.state.voucherInfo.amount_val - this.state.cartTotalAmount)}/>                                    
                        </View>                        
                    </View>
                    <View style={{ left: constants.Dimensions.vh(4),bottom:constants.Dimensions.vh(2) }}>
                        <Components.PrimaryButton  
                            onPress={this.handleCheckout}                      
                            title={`Checkout`}                                
                            isLoading={this.state.isLoading}
                            
                            
                        />
                    </View>
                </View>    
                                                        
            </>
        )
        
    }

}
  