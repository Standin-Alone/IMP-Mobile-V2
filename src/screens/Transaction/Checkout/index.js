import React from 'react';
import { View,Text,FlatList,BackHandler} from 'react-native';
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
          cartTotalAmount:0,
          isLoading:false
         
      };
    }
    

    setMyState = (value)=>this.setState(value);

    componentDidMount(){

       
        // BackHandler.addEventListener("hardwareBackPress", ()=>{
        //     this.state.parameters.handleUpdateCart(this.state.cart);
        //     this.props.navigation.goBack()
        // })


        this.setState({cartTotalAmount:  Number(this.state.cart.reduce((prev, current) => prev + parseFloat(current.totalAmount), 0)).toFixed(2)});    
    }

    changeCart = (commodityInfo)=>{


      console.warn('COMMODITY INFO',commodityInfo)
        
        this.setState((prevState)=>({

            cart: prevState.cart.map((commodity,index)=>
                        commodityInfo.index == index ? {
                                ...commodity,                
                                sub_id: commodityInfo.sub_id,
                                image: commodityInfo.image,
                                name: commodityInfo.name,
                                unitMeasurement:commodityInfo.unitMeasurement,
                                totalAmount:commodityInfo.totalAmount,
                                quantity: commodityInfo.quantity,
                                category: commodityInfo.category,
                                subCategory: commodityInfo.subCategory,                            
                                cashAdded: commodityInfo.cashAdded,                            
                            }
                            : commodity                            
                        )
        }));
        
        this.setState({cartTotalAmount:  Number(this.state.cart.reduce((prev, current) => prev + parseFloat(current.totalAmount), 0)).toFixed(2)});    

    }

    handleRemoveItem = (index)=>{
          let newCart = this.state.cart;
          
          // remove delete 
          newCart.splice(index, index + 1);

        


          this.setState({cartTotalAmount:  Number(this.state.cart.reduce((prev, current) => prev + parseFloat(current.totalAmount), 0)).toFixed(2)})

          if(newCart.length  == 0){
            this.state.parameters.handleUpdateCart(newCart);
            this.props.navigation.goBack();
          }
    }

    goToEditCommodityDetails = (item,index)=>{
        
        item.index = index;

        let parameters = {           
            commodityInfo:item,
            voucherInfo:this.state.voucherInfo,
            cart:this.state.cart,                        
            cartTotalAmount:parseFloat(this.state.cart.reduce((prev, current,currentIndex) =>  prev +   (currentIndex != index ? parseFloat(current.totalAmount)  -  parseFloat(current.cashAdded) : 0 ) , 0)),                          
            changeCart:this.changeCart     
        };
        
        
        

        this.props.navigation.navigate(constants.ScreenNames.TRANSACTION_STACK.EDIT_COMMODITY_DETAILS,parameters);        
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
            cashAdded={item.cashAdded}     
            showRemoveButton
            showEditButton
            showCommodityInfo
            onRemove={()=>this.handleRemoveItem(index)}  
            onEdit={()=>this.goToEditCommodityDetails(item,index)}
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

                <Components.ProgressModal
                    showProgress={this.state.isLoading}    
                    title={"Loading..."}                
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


                <View style={styles.bottom}>
                    <View style={{ flexDirection:'column',alignContent:'center',bottom:constants.Dimensions.vw(10),marginHorizontal:constants.Dimensions.vw(3)}}>
                        <Text style={styles.cartSummaryText}>Cart Summary</Text>
                        <View style={{ flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={styles.label}>Voucher Total Amount</Text>
                            <Components.AmountText  amountStyle={styles.cashAdded} value={this.state.voucherInfo.amount_val}/>                                    
                        </View>   
                        <View style={{ flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={styles.label}>Cart Total Amount</Text>
                             <Components.AmountText  amountStyle={styles.cashAdded} value={this.state.cartTotalAmount}/>                                    
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
  