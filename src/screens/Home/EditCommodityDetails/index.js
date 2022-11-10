import React from 'react';
import { View,Text,Image, FlatList, ScrollView} from 'react-native';
import constants from '../../../constants';
import {styles} from './styles'
import Components from '../../../components';
import { Divider, Loader } from '../../../components/loaders';
import { GET_SESSION } from '../../../utils/async_storage';
import NumberFormat from 'react-number-format';
import FastImage  from 'react-native-fast-image'
import { editCart } from '../../../actions/transaction';


export default class EditCommodityDetails extends React.Component {
    constructor(props) {
      super(props);
      this.state = {        
          parameters:this.props.route.params,
          commodityInfo:this.props.route.params.commodityInfo,
          voucherInfo:this.props.route.params.voucherInfo,
          cart:this.props.route.params.cart,
          cartTotalAmount:this.props.route.params.cartTotalAmount,
          subCategories:[],          
        //   cashAdded:this.props.route.params.cart.reduce((prev, current) =>  prev + parseFloat(current.cash_added),0),
          cashAdded:this.props.route.params.cart.reduce((prev, current) =>  prev +  parseFloat(current.cash_added),0),
          total_amount:{
            focus:false,
            error:false,
            errorMessage:'',
            value:  this.props.route.params.commodityInfo.total_amount,       
            isAmountExceed:false
          },  
          quantity:{
            focus:false,
            error:false,
            errorMessage:'',
            value:this.props.route.params.commodityInfo.quantity,
            isAmountExceed:false
          },  
          unit_type:{
            focus:false,
            error:false,
            errorMessage:'',
            value:this.props.route.params.commodityInfo.unit_type_id ?  this.props.route.params.commodityInfo.unit_type_id : this.props.route.params.commodityInfo.unit_type,        
          },  
          item_category:{
            focus:false,
            error:false,
            errorMessage:'',
            value:this.props.route.params.commodityInfo.fertilizer_category_id ? this.props.route.params.commodityInfo.fertilizer_category_id : this.props.route.params.voucherInfo?.fertilizer_categories.filter((item)=>item.label == this.props.route.params.commodityInfo.item_category || item.value == this.props.route.params.commodityInfo.item_category )[0].value,        
          },  
          item_sub_category:{
            focus:false,
            error:false,
            errorMessage:'',
            value:this.props.route.params.commodityInfo.item_sub_category ,        
          },  
          
          subCategories:[]
          
      };
    }
    
    
    componentDidMount(){
        
       
        
        // set sub categories
        let subCategories= [];
      
        this.state.voucherInfo.sub_categories.map((item)=>{

            if(item.fertilizer_category_id == this.state.item_category.value )
            {

                subCategories.push({label:item.sub_category,value:item.sub_category});
            }   

        })
        
        
        this.setState({subCategories:subCategories})        
        this.setState({item_sub_category:{...this.state.item_sub_category,value:this.props.route.params.commodityInfo.item_sub_category,error:false}})
    }

    
    setMyState = (value)=>this.setState(value);

    handleChangeTotalAmount = (value)=>{                                              
        
        this.setState({
            total_amount:{...this.state.total_amount,value:value === null ? 0 : Math.abs(value) ,error:false,isAmountExceed:(value + this.state.total_amount.value) <= this.state.voucherInfo.default_balance  ? false :true},            
        })      

    }   

    handleEditCommodity = (commodity)=>{
                
        
        let parameter = {
            index:commodity.index,
            voucher_details_id:commodity?.voucher_details_id,
            subCategories:this.state.subCategories,
            sub_id: commodity.sub_id,
            commodityBase64: commodity.commodityBase64,
            item_name: commodity.item_name,
            unit_type: this.state.unit_type.value,            
            total_amount: Math.abs(this.state.total_amount.value),
            quantity: this.state.quantity.value,                        
            item_category: this.state.item_category.value,
            item_sub_category: this.state.item_sub_category.value,            
            cash_added: this.state.total_amount.value  -  (parseFloat(this.state.voucherInfo.default_balance) -  parseFloat(this.state.cartTotalAmount))  < 0  
                        ? 0 :
                        this.state.total_amount.value  -  (parseFloat(this.state.voucherInfo.default_balance) -  parseFloat(this.state.cartTotalAmount)),
            remainingBalance:(parseFloat(this.state.voucherInfo.default_balance) -  parseFloat(this.state.cartTotalAmount)) - this.state.total_amount.value   <= 0  
                        ? 0 : 
                        ((parseFloat(this.state.voucherInfo.default_balance) - parseFloat(this.state.cartTotalAmount))) - parseFloat(this.state.total_amount.value) 
        }
        

        
        
        return editCart(parameter,this.setMyState,this.props,this.state)
    }

    handleChangeCategory = (value)=>{                           
            
            let subCategories= [];

            this.state.voucherInfo.sub_categories.map((item)=>{

                if(item.fertilizer_category_id == this.state.item_category.value )
                {

                    subCategories.push({label:item.sub_category,value:item.sub_category});
                }   

            })

            
            this.setState({subCategories:subCategories})
            this.setState({item_category:{...this.state.item_category,value:value,error:false}})
            this.setState({item_sub_category:{...this.state.item_sub_category,value:'',error:false}})
            
        }


    render(){
        return(
            <>  
            
            <View style={{backgroundColor:constants.Colors.light,flex:1 }}>
                <Components.PrimaryHeader                    
                        onGoBack = {()=>this.props.navigation.goBack()}                        
                        title={"Edit Commodity Details"}
                        showAddToCartButton={false}        
                        
                />       
                <ScrollView style={{ flexGrow:0 }} >                    

               
                    <View style={styles.scrollView}>
                        <View style={styles.form}>
                            <Text style={styles.label}>Total Amount</Text>
                            <Components.AmountInput
                                
                                value={this.state.total_amount.value}
                                onChangeValue={this.handleChangeTotalAmount}
                                keyboardType={"decimal-pad"}
                                iconName="loyalty"
                                placeholder="Place your total amount here..."
                                onFocus={()=>this.setState({total_amount:{...this.state.total_amount,focus:true}})}
                                onBlur={()=>this.setState({total_amount:{...this.state.total_amount,focus:false}})}
                                isFocus={this.state.total_amount.focus}
                                isError={this.state.total_amount.error}
                                errorMessage={this.state.total_amount.errorMessage}                                
                                prefix={'₱'}
                                textColor={constants.Colors.dark_tint}
                            
                                    
                            />
                        </View>

                        <View style={styles.form}>
                            <Text style={styles.label}>Quantity</Text>
                            <Components.AmountInput
                                    value={this.state.quantity.value}                             
                                    onChangeValue={(value)=>this.setState({quantity:{...this.state.quantity,value:value,error:false}})}
                                    keyboardType={"decimal-pad"}
                                    iconName="swap-vert"
                                    placeholder="Place your quantity"
                                    onFocus={()=>this.setState({quantity:{...this.state.quantity,focus:true}})}
                                    onBlur={()=>this.setState({quantity:{...this.state.quantity,focus:false}})}
                                    isFocus={this.state.quantity.focus}
                                    isError={this.state.quantity.error}
                                    errorMessage={this.state.quantity.errorMessage}
                                    textColor={constants.Colors.dark_tint}
                                
                            />
                        </View>

                        <View style={styles.form}>
                            <Text style={styles.label}>Unit Measurement</Text>
                            <Components.Category
                            iconName="line-weight"
                            placeholder="Select Measurement"
                            onFocus={()=>this.setState({unit_type:{...this.state.unit_type,focus:true}})}
                            onBlur={()=>this.setState({unit_type:{...this.state.unit_type,focus:false}})}
                            isFocus={this.state.unit_type.focus}
                            isError={this.state.unit_type.error}
                            errorMessage={this.state.unit_type.errorMessage}
                            items={this.state.voucherInfo.unit_measurements}
                            value={this.state.unit_type.value}
                            onChangeValue={(value)=>{                           
                                    
                                    this.setState({unit_type:{...this.state.unit_type,value:value,error:false}})
                                }}
                            />
                        </View>



                        <View style={styles.form}>
                            <Text style={styles.label}>Category</Text>
                            <Components.Category
                            iconName="auto-awesome-mosaic"
                            placeholder="Select Category"
                            onFocus={()=>this.setState({item_category:{...this.state.item_category,focus:true}})}
                            onBlur={()=>this.setState({item_category:{...this.state.item_category,focus:false}})}
                            isFocus={this.state.item_category.focus}
                            isError={this.state.item_category.error}
                            errorMessage={this.state.item_category.errorMessage}
                            items={this.state.voucherInfo.fertilizer_categories}
                            value={this.state.item_category.value}
                            onChangeValue={this.handleChangeCategory}
                            />
                        </View>

                        {/*  show sub category if inorganic fertilize   */}
                        { this.state.item_category.value == 1 &&
                            <View style={styles.form}>
                                <Text style={styles.label}>Sub Category</Text>
                                <Components.Category
                                placeholder="Select Sub Category"
                                iconName="dashboard"
                                value={this.state.item_sub_category.value}
                                onFocus={()=>this.setState({item_sub_category:{...this.state.item_sub_category,focus:true}})}
                                onBlur={()=>this.setState({item_sub_category:{...this.state.item_sub_category,focus:false}})}
                                isFocus={this.state.item_sub_category.focus}
                                isError={this.state.item_sub_category.error}
                                errorMessage={this.state.item_sub_category.errorMessage}
                                items={this.state.subCategories}
                                onChangeValue={(value)=>this.setState({item_sub_category:{...this.state.item_sub_category,value:value,error:false}})}
                                />
                            </View>
                        }
                      
                    
                    </View>
                </ScrollView>

                {/* <View style={styles.bottom}>
                    
                    <View style={{ flexDirection:'column',marginHorizontal:constants.Dimensions.vh(5) }}>
                         <View style={{ flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={styles.detailsLabel}>Remaining balance</Text>                                                        
                            <Components.AmountText  amountStyle={styles.remainingBalance} value={
                                (parseFloat(this.state.voucherInfo.default_balance) -  parseFloat(this.state.cartTotalAmount)) - this.state.total_amount.value   < 0  
                                ? 0 : 
                                ((parseFloat(this.state.voucherInfo.default_balance) - parseFloat(this.state.cartTotalAmount))) - parseFloat(this.state.total_amount.value) }/> 
                        </View>


                       <View style={{ flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={styles.detailsLabel}>Cash Added</Text>                                                  
                             <Components.AmountText  amountStyle={styles.cashAdded} value={
                                   this.state.total_amount.value  -  (parseFloat(this.state.voucherInfo.default_balance) -  parseFloat(this.state.cartTotalAmount))  < 0  
                                    ? 0 :
                                    this.state.total_amount.value  -  (parseFloat(this.state.voucherInfo.default_balance) -  parseFloat(this.state.cartTotalAmount)) }/>                                    
                         </View> 
                    </View>
                </View> */}
                        

                
                <View style={styles.bottom}>
                    <View style={{ flexDirection:'row',paddingVertical:constants.Dimensions.vh(5) }}>                    
                        <View style={{ flexDirection:'column',marginHorizontal:constants.Dimensions.vh(2)}}>

                            <View style={{ flexDirection:'row',justifyContent:'space-between',}}>
                                <Text style={styles.detailsLabel}>Remaining balance</Text>
                                <Components.AmountText  amountStyle={styles.remainingBalance} value={
                                (parseFloat(this.state.voucherInfo.default_balance) -  parseFloat(this.state.cartTotalAmount)) - this.state.total_amount.value   < 0  
                                ? 0 : 
                                ((parseFloat(this.state.voucherInfo.default_balance) - parseFloat(this.state.cartTotalAmount))) - parseFloat(this.state.total_amount.value) }/> 
                            </View>
                            <View style={{ flexDirection:'row',justifyContent:'space-between'}}>
                                <Text style={styles.detailsLabel}>Cash Added</Text>
                                <Components.AmountText  amountStyle={styles.cashAdded} value={
                                   this.state.total_amount.value  -  (parseFloat(this.state.voucherInfo.default_balance) -  parseFloat(this.state.cartTotalAmount))  < 0  
                                    ? 0 :
                                    this.state.total_amount.value  -  (parseFloat(this.state.voucherInfo.default_balance) -  parseFloat(this.state.cartTotalAmount)) }/>                                    
                            </View>
                        </View>

                        <View style={{ flexDirection:'column',left:constants.Dimensions.vw(10)}}>                
                           <Components.PrimaryButton title="Save" moreStyle={{width:constants.Dimensions.vw(30),height:constants.Dimensions.vh(12)}} onPress={()=>this.handleEditCommodity(this.state.commodityInfo)}/>
                        </View>
                    </View>                    
                </View>
             
                
            </View>         
            </>
        )
        
    }

}
  