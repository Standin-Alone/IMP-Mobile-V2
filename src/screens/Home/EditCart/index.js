import React from 'react';
import { View,Text,FlatList} from 'react-native';
import constants from '../../../constants';
import {styles} from './styles'
import Components from '../../../components';
import { updateCart } from '../../../actions/transaction';
import { GET_SESSION } from '../../../utils/async_storage';

export default class EditCart extends React.Component {
    constructor(props) {
      super(props);
      this.state = {        
          parameters:this.props.route.params,          
          voucherInfo:this.props.route.params.voucherInfo,
          cart:this.props.route.params.cart,          
          removedFromCart: this.props.route.params.removedFromCart ? this.props.route.params.removedFromCart : [], //voucher_details_id only
          newCart:[],
          cartTotalAmount:0,          
          isLoading:false,
          deletedInCart:[]

         
      };
    }
    

    setMyState = (value)=>this.setState(value);


    
    componentDidMount(){

        console.warn((Number(this.state.cart.reduce((prev, current) => prev + (parseFloat(current.total_amount) - parseFloat(current.cash_added) ), 0)).toFixed(2)))
        this.setState({cartTotalAmount:  Number(this.state.cart.reduce((prev, current) => prev + parseFloat(current.total_amount), 0)).toFixed(2)})
        
    }

    handleRemoveItem = (voucher_details_id,index)=>{
        let newCart = this.state.cart;
        
        // remove delete 
        newCart.splice(index, 1);

      
        this.setState({cartTotalAmount:  Number(this.state.cart.reduce((prev, current) => prev + parseFloat(current.total_amount), 0)).toFixed(2)})


        // add to removed from cart
        if(voucher_details_id){
            this.setState({removedFromCart:[...this.state.removedFromCart,voucher_details_id]});
        }        
        
        if(newCart.length  == 0){
          
            this.state.parameters.addToCart = this.addToCart;
            this.state.parameters.removedFromCart = this.state.removedFromCart;
            this.props.navigation.navigate(constants.ScreenNames.HOME_STACK.EDIT_COMMODITIES,this.state.parameters)     
        }
  }
  
  changeCart = (item)=>{

    let getCart = [...this.state.cart];
    getCart[item.index] = item;

    this.setState({cart:getCart});
  }

  goToEditCommodityDetails = (item,index)=>{        
    item.index = index;
    
    let parameters = {           
        commodityInfo:item,
        voucherInfo:this.state.voucherInfo,
        cart:this.state.cart,                        
        cartTotalAmount:parseFloat(this.state.cart.reduce((prev, current,currentIndex) =>  prev +   (currentIndex != index ? parseFloat(current.total_amount) - parseFloat(current.cash_added) : 0 ) , 0)),                          
        changeCart:this.changeCart     
    };
    
    
        
    this.props.navigation.navigate(constants.ScreenNames.HOME_STACK.EDIT_COMMODITY_DETAILS,parameters);        
    }


    addToCart = (item)=>{
        

        this.setState({cart:item});

        this.setState({cartTotalAmount:  Number(item.reduce((prev, current) => prev + parseFloat(current.total_amount), 0)).toFixed(2)})
    }




    renderItem = (item,index) =>{
        let categoryName = this.state.voucherInfo.fertilizer_categories.filter((info)=>info.label == item.item_category || info.value == item.item_category)[0]?.label;
        let unitMeasurement = this.state.voucherInfo.unit_measurements.filter((info)=>item.unit_type == info.label || item.unit_type == info.value)[0]?.label;
        
        return (
        <Components.CommodityCard
            image={item.commodityBase64}
            commodityName={item.item_name}  
            category={categoryName}        
            subCategory={item.item_sub_category} 
            quantity={item.quantity}     
            unitMeasurement={unitMeasurement}
            totalAmount={item.total_amount}     
            cashAdded={item.cash_added}     
            showRemoveButton
            showEditButton
            showCommodityInfo
            onRemove={()=>this.handleRemoveItem(item.voucher_details_id,index)}  
            onEdit={()=>this.goToEditCommodityDetails(item,index)}
        />
    )}
    
    

  handleUpdateCart = async()=>{
        
        let parameters = {           
            voucherInfo:this.state.voucherInfo,
            cart:this.state.cart, 
            cartTotalAmount:this.state.cartTotalAmount,  
            removedFromCart:this.state.removedFromCart,  
            supplierId: await GET_SESSION('USER_ID'),
            supplierName: await GET_SESSION('FULL_NAME')
        }

        
        updateCart(parameters,this.setMyState,this.props)
    }



    render(){
        return(
            <>  
            
                <Components.PrimaryHeader                    
                        onGoBack = {()=>{                            
                            this.props.navigation.goBack()
                        }}                        

                        title={"Edit Cart"}             
                        showGoToCommoditiesButton = {(Number(this.state.cart.reduce((prev, current) => prev + (parseFloat(current.total_amount) - parseFloat(current.cash_added) ), 0)).toFixed(2)  < parseFloat(this.state.voucherInfo.default_balance)) ? true :false }
                        onGoToCommodities={()=>{
                            this.state.parameters.addToCart = this.addToCart;
                            this.state.parameters.removedFromCart = this.state.removedFromCart;
                            this.props.navigation.navigate(constants.ScreenNames.HOME_STACK.EDIT_COMMODITIES,this.state.parameters)     
                        }}                     
                />

                <View style={{ left:constants.Dimensions.vw(2) }}>  
                    <Text>{this.state.cart.length} Items</Text>
                </View>

                <FlatList
                    data={this.state.cart}
                    extraData={this.state.newCart}
                    renderItem = {({ item, index }) => this.renderItem(item, index)}        
                    contentContainerStyle={{ paddingBottom:constants.Dimensions.vh(60) }}
                    nestedScrollEnabled        
                />

                <Components.ProgressModal
                    showProgress={this.state.isLoading}    
                    title={"Loading..."}                
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
                            <Components.AmountText  amountStyle={styles.cashAdded} value={(Number(this.state.cart.reduce((prev, current) => prev + (parseFloat(current.cash_added) ), 0)).toFixed(2))}/>                                    
                        </View>
                        <View style={{ flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={styles.label}>Remaining Balance</Text>
                            <Components.AmountText  amountStyle={styles.cashAdded} value={
                                (parseFloat(this.state.voucherInfo.default_balance) - 
                                    (Number(this.state.cart.reduce((prev, current) => prev + (parseFloat(current.total_amount) - parseFloat(current.cash_added) ), 0)).toFixed(2)) <= 0 ?
                                     0.00 :  (parseFloat(this.state.voucherInfo.default_balance) - Number(this.state.cart.reduce((prev, current) => prev + (parseFloat(current.total_amount) - parseFloat(current.cash_added) ), 0)).toFixed(2)))}/>                                    
                        </View>                        
                    </View>
                    <View style={{ left: constants.Dimensions.vh(4),bottom:constants.Dimensions.vh(2) }}>
                        <Components.PrimaryButton  
                            onPress={this.handleUpdateCart}                      
                            title={`Checkout`}                                
                            isLoading={this.state.isLoading}
                            
                            
                        />
                    </View>
                </View> 


           
                                                        
            </>
        )
        
    }

}
  