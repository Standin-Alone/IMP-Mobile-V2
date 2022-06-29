import React from 'react';
import { View,Text, ScrollView} from 'react-native';
import constants from '../../../constants';
import {styles} from './styles'
import Components from '../../../components';
import FastImage  from 'react-native-fast-image'
import { addToEditCart } from '../../../actions/transaction';


export default class AddCommodityDetails extends React.Component {
    constructor(props) {
      super(props);
      this.state = {        
          parameters:this.props.route.params,
          commodityInfo:this.props.route.params.commodityInfo,
          voucherInfo:this.props.route.params.voucherInfo,
          cart:this.props.route.params.cart,
          cartTotalAmount:0,
          subCategories:[],
          total_amount:{
            focus:false,
            error:false,
            errorMessage:'',
            value:0.00,
            isAmountExceed:false
          },  
          quantity:{
            focus:false,
            error:false,
            errorMessage:'',
            value:0.00,
            isAmountExceed:false
          },  
          unit_type:{
            focus:false,
            error:false,
            errorMessage:'',
            value:'',        
          },  
          item_category:{
            focus:false,
            error:false,
            errorMessage:'',
            value:'',        
          },  
          item_sub_category:{
            focus:false,
            error:false,
            errorMessage:'',
            value:'',        
          },  
          
          subCategories:[]
          
      };
    }
    
    
    componentDidMount(){

        
        this.setState({cartTotalAmount: (Number(this.state.cart.reduce((prev, current) => prev + (parseFloat(current.total_amount) - parseFloat(current.cash_added) ), 0)).toFixed(2))})
        
        
    }

    
    setMyState = (value)=>this.setState(value);

    handleChangeTotalAmount = (value)=>{                                              
        console.warn(value)
        this.setState({total_amount:{...this.state.total_amount,value:value === null ? 0 : Math.abs(value) ,error:false,isAmountExceed:(value + this.state.total_amount.value) <= this.state.voucherInfo.default_balance  ? false :true}})      

    }   

    handleAddToCart = (commodity)=>{

        let parameter = {
            index: this.props.route.params.cart.length,
            voucher_details_id: commodity.voucher_details_id,
            subCategories:this.state.subCategories,
            sub_id: commodity.sub_id,
            commodityBase64: commodity.base64,
            item_name: commodity.item_name,
            unit_type: this.state.unit_type.value,            
            total_amount: Math.abs(this.state.total_amount.value),
            quantity: this.state.quantity.value,                        
            item_category: this.state.item_category.value,
            item_sub_category: this.state.item_sub_category.value,            
            cash_added:   parseFloat(this.state.total_amount.value) - (parseFloat(this.state.voucherInfo.default_balance) -  parseFloat(this.state.cartTotalAmount))    < 0  
            ? 0 : 
            parseFloat(this.state.total_amount.value) - ((parseFloat(this.state.voucherInfo.default_balance) - parseFloat(this.state.cartTotalAmount))),
            isChange:true
        }
        

        
        

        
        return addToEditCart(parameter,this.setMyState,this.props)
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
                        title={"Set Commodity Details"}
                        showAddToCartButton={true}        
                        onAddToCart={()=>this.handleAddToCart(this.state.commodityInfo)}               
                />       
                <ScrollView style={{ flexGrow:0 }} >         
                 <FastImage
                    style={styles.commodity}
                    source={{
                        uri: `data:image/jpg;base64, ${this.state.commodityInfo.base64}`                        
                    }}
                    resizeMode={FastImage.resizeMode.contain}    
                />


               
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

                        {/*  show sub category if organic fertilize   */}
                        { this.state.item_category.value == 2 &&
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

                <View style={styles.bottom}>
                    
                    <View style={{ flexDirection:'column',marginHorizontal:constants.Dimensions.vh(5) }}>
                        <View style={{ flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={styles.detailsLabel}>Remaining balance</Text>
                            <Components.AmountText  amountStyle={styles.remainingBalance} value={
                                (parseFloat(this.state.voucherInfo.default_balance) -  parseFloat(this.state.cartTotalAmount)) - this.state.total_amount.value   < 0  
                                ? 0 : 
                                ((parseFloat(this.state.voucherInfo.default_balance) - parseFloat(this.state.cartTotalAmount))) - parseFloat(this.state.total_amount.value) 


                            }/>                                    
                        </View>
                        <View style={{ flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={styles.detailsLabel}>Cash Added</Text>
                            <Components.AmountText  amountStyle={styles.cashAdded} value={
                                parseFloat(this.state.total_amount.value) - (parseFloat(this.state.voucherInfo.default_balance) -  parseFloat(this.state.cartTotalAmount))    < 0  
                                ? 0 : 
                                parseFloat(this.state.total_amount.value) - ((parseFloat(this.state.voucherInfo.default_balance) - parseFloat(this.state.cartTotalAmount))) 



                            }/>                                    
                        </View>
                    </View>
                </View>
                
             
                
            </View>         
            </>
        )
        
    }

}
  