import React from 'react';
import { View,Text,Image, FlatList} from 'react-native';
import constants from '../../../constants';
import {styles} from './styles'
import Components from '../../../components';
import { Loader } from '../../../components/loaders';
import { goToCheckout } from '../../../actions/transaction';



export default class Commodities extends React.Component {
    constructor(props) {
      super(props);
      this.state = {        
          parameters:this.props.route.params.parameters,
          voucherInfo:this.props.route.params.parameters.voucherInfo,
          timer:this.props.route.params.parameters.timer,
          isLoading:false,
          cart:[]  
      };

  
    }
    
 
    

    setMyState = (value)=>this.setState(value);

    addToCart = (item) => {
        this.setState(prevState => ({
            cart: [...prevState.cart, item],
          }));       
    }
    

    goToSetCommodityDetails = (item)=>{
        
        let parameters = {
            commodityInfo:item,
            voucherInfo:this.state.voucherInfo,
            cart:this.state.cart,                        
            cartTotalAmount:this.state.cart.reduce((prev, current) => prev + parseFloat(current.totalAmount), 0),
            addToCart:this.addToCart,
            timer:this.state.timer
        }

        this.props.navigation.navigate(constants.ScreenNames.TRANSACTION_STACK.SET_COMMODITY_DETAILS,parameters);
    }

    renderItem = (item,index) =>(
        <Components.CommodityCard
            image={item.base64}
            commodityName={item.item_name}
            onPress={()=>this.goToSetCommodityDetails(item)}
            showAddButton
        />
    )
    


    handleUpdateCart = (cart)=>{
        this.setState({cart:cart});
    }
    
    handleGoToCheckout = ()=>{
        let parameters = {
            voucherInfo:this.state.voucherInfo,
            cart:this.state.cart,
            timer:this.state.timer,
            handleUpdateCart:this.handleUpdateCart.bind(this)
        }
       
       return goToCheckout(parameters,this.setMyState,this.props)
    }



    

    render(){
        return(
            <>  
             
            <View style={{backgroundColor:constants.Colors.light,flex:1 }}>
                <Components.PrimaryHeader                    
                        onGoBack = {()=>this.props.navigation.goBack()}                        
                        title={"Add Commodities"}                        
                />

                <Components.ProgressModal
                        showProgress={this.state.isLoading}    
                        title={"Loading..."}                
                />

                <FlatList
                    data={ this.state.cart.reduce((prev, current) => prev + parseFloat(current.totalAmount), 0) >= this.state.voucherInfo.amount_val ? [] : this.state.voucherInfo.program_items}
                    renderItem = {({ item, index }) => this.renderItem(item, index)}                
                />


                <View style={styles.bottom}>
                  
                    <View style={{ flexDirection:'column',alignContent:'center',bottom:constants.Dimensions.vw(5),marginHorizontal:constants.Dimensions.vw(3)}}>
                  
                        <View style={{ flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={styles.label}>Remaining Balance</Text>
                            <Components.AmountText  amountStyle={styles.remainingBalance} value={(this.state.voucherInfo.amount_val - this.state.cart.reduce((prev, current) => prev + parseFloat(current.totalAmount), 0)) <= 0 ? 0 :  (this.state.voucherInfo.amount_val - this.state.cart.reduce((prev, current) => prev + parseFloat(current.totalAmount), 0))  }/>                                    
                        </View>                        
                                           
                    </View>
                    <View style={{ left: constants.Dimensions.vh(4) }}>
                        <Components.PrimaryButton  
                            onPress={this.handleGoToCheckout}                      
                            title={ <Text>{`${this.state.cart.length} items •`} <Components.AmountText amountStyle={styles.amountText} value={this.state.cart.reduce((prev, current) => prev + parseFloat(current.totalAmount), 0).toFixed(2)}/></Text>}                                             
                        />
                    </View>
                </View>            
            </View>
                               
            </>
        )
        
    }

}
  