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
          timer:this.props.route.params.timer,
          newCart:[],
          cartTotalAmount:0,
          isLoading:false,
          deletedInCart:[]

         
      };
    }
    

    setMyState = (value)=>this.setState(value);


    addToCart = (commodityInfo) => {
        console.warn('EDIT ADD TO CART',commodityInfo);
       
        let cleanCommodityInfo = commodityInfo.map((item)=>({
             
            sub_id:item.sub_id,
            commodityBase64:item.image,
            voucher_details_id:item.voucher_details_id,
            item_name:item.name,
            total_amount:parseFloat(item.totalAmount),
            unit_type_id:item.unitMeasurement,
            unit_type:item.unitMeasurement,
            quantity:parseFloat(item.quantity),
            item_category:item.category,
            item_sub_category:item.subCategory,
            cash_added:parseFloat(item.cashAdded),
            isChange:true
                   

        }));

        this.setState({cart:cleanCommodityInfo},function(){

            this.setState({cartTotalAmount:  Number(cleanCommodityInfo.reduce((prev, current) => prev + (!current.isChange ? (parseFloat(current.total_amount) + parseFloat(current.cash_added)) :  parseFloat(current.total_amount)), 0))});    
        })

        
    }
    


    componentDidMount(){
        console.warn('NEW CART',this.state.cart);
        this.setState({cartTotalAmount:  Number(this.state.cart.reduce((prev, current) => prev + !current.isChange ? (parseFloat(current.total_amount) + parseFloat(current.cash_added)) :  parseFloat(current.total_amount), 0)).toFixed(2)});    
    }


    handleRemoveItem = (index)=>{
          let newCart = this.state.cart;
          
          // remove delete 
          newCart.splice(index, index + 1);

          this.setState({newCart:newCart,cartTotalAmount:  Number(newCart.reduce((prev, current) => prev + !current.isChange ? (parseFloat(current.total_amount) + parseFloat(current.cash_added)) :parseFloat(current.total_amount) , 0)).toFixed(2)})

          if(newCart.length  == 0){
            // this.state.parameters.handleUpdateCart(newCart);
            
            
            this.state.parameters.addToCart = this.addToCart;

                            
            this.props.navigation.navigate(constants.ScreenNames.HOME_STACK.EDIT_COMMODITIES,this.state.parameters)
          }
    }

  
    refreshInfo = (transaction_info)=>{
        this.setState({voucherInfo:transaction_info})
    }

    changeCart = (commodityInfo)=>{

        console.warn('commodity INfo',commodityInfo.voucher_details_id);
    
        this.setState({cart:this.state.cart.map((item)=>{
            if(item.voucher_details_id == commodityInfo.voucher_details_id){
                return  {
                    sub_id:commodityInfo.sub_id,
                    commodityBase64:commodityInfo.image,
                    voucher_details_id:commodityInfo.voucher_details_id,
                    item_name:commodityInfo.name,
                    total_amount:parseFloat(commodityInfo.totalAmount),
                    unit_type_id:commodityInfo.unitMeasurement,
                    unit_type:commodityInfo.unitMeasurement,
                    quantity:parseFloat(commodityInfo.quantity),
                    item_category:commodityInfo.category,
                    item_sub_category:commodityInfo.subCategory,
                    cash_added:parseFloat(commodityInfo.cashAdded),
                    isChange:true
                }
            }else{
                return item
            }
        })})

        this.setState({cartTotalAmount:  Number(this.state.cart.reduce((prev, current) => prev +  !current.isChange  ? (parseFloat(current.total_amount) + parseFloat(current.cash_added)): parseFloat(current.total_amount), 0)).toFixed(2)});    
    }


    


    goToEditCommodityDetails = (item)=>{
        
        let parameters = {
            commodityInfo:item,
            voucherInfo:this.state.voucherInfo,
            cart:this.state.cart,                        
            cartTotalAmount:parseFloat(this.state.voucherInfo.commodities.reduce((prev, current) =>  prev + (current.voucher_details_id != item.voucher_details_id ?  parseFloat(parseFloat(current.total_amount) ) : 0), 0)),
            refreshInfo:this.refreshInfo,   
            changeCart:this.changeCart   
        };

        
        this.props.navigation.navigate(constants.ScreenNames.HOME_STACK.EDIT_COMMODITY_DETAILS,parameters);        
    }


    renderItem = (item,index) =>{
        
        
        let categoryName = this.state.voucherInfo.fertilizer_categories.filter((info)=>info.label === item.item_category  ? (info.label === item.item_category) : (info.value == item.item_category))[0]?.label;
        let unitMeasurement = this.state.voucherInfo.unit_measurements.filter((info)=>item.unit_type == info.label || item.unit_type == info.value)[0]?.label;
        
        return (
        <Components.CommodityCard
            image={item.commodityBase64}
            commodityName={item.item_name}  
            category={categoryName}        
            subCategory={item.subCategory} 
            quantity={item.quantity}     
            unitMeasurement={unitMeasurement}
            cashAdded={item.cash_added}     
            totalAmount={!item.isChange ? parseFloat(item.total_amount) + parseFloat(item.cash_added) : parseFloat(item.total_amount)}      
            showRemoveButton
            showCommodityInfo
            onRemove={()=>this.handleRemoveItem(index)}  
            showEditButton
            onEdit={()=>this.goToEditCommodityDetails(item)}
        />
    )}
    

    handleUpdateCart = async()=>{
        
        let parameters = {           
            voucherInfo:this.state.voucherInfo,
            cart:this.state.cart,  
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
                        showGoToCommoditiesButton = {()=>{
                                let computeRemainingBalance = (parseFloat(this.state.voucherInfo.current_balance) - parseFloat(this.state.cartTotalAmount)) < 0 ? 0.00 :  (parseFloat(this.state.voucherInfo.current_balance) - parseFloat(this.state.cartTotalAmount));
                                console.warn(computeRemainingBalance);
                                if(computeRemainingBalance > 0 ){
                                    return true
                                }else{
                                    return false
                                }
                        }}
                        onGoToCommodities={()=>{

                            this.state.parameters.addToCart = this.addToCart;
                            this.props.navigation.navigate(constants.ScreenNames.HOME_STACK.EDIT_COMMODITIES,this.state.parameters)
                            
                        }}                     

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
                            onPress={this.handleUpdateCart}                      
                            title={`Save`}                                
                            isLoading={this.state.isLoading}                                                        
                        />
                    </View>
                </View>    
                                                        
            </>
        )
        
    }

}
  