import React from 'react';
import { View,Text,Image, FlatList, ScrollView} from 'react-native';
import constants from '../../../constants';
import {styles} from './styles'
import Components from '../../../components';
import { Divider, Loader } from '../../../components/loaders';
import { GET_SESSION } from '../../../utils/async_storage';
import NumberFormat from 'react-number-format';
import FastImage  from 'react-native-fast-image'
import { addToCart } from '../../../actions/transaction';


export default class SetCommodityDetails extends React.Component {
    constructor(props) {
      super(props);
      this.state = {        
          parameters:this.props.route.params,
          commodityInfo:this.props.route.params.commodityInfo,
          voucherInfo:this.props.route.params.voucherInfo,
          cart:this.props.route.params.cart,
          subCategories:[],
          totalAmount:{
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
          unitMeasurement:{
            focus:false,
            error:false,
            errorMessage:'',
            value:'',        
          },  
          category:{
            focus:false,
            error:false,
            errorMessage:'',
            value:'',        
          },  
          subCategory:{
            focus:false,
            error:false,
            errorMessage:'',
            value:'',        
          },  
          
          subCategories:[]
          
      };
    }
    
    
    componentDidMount(){

        console.warn(  this.state.parameters.cart);
        //console.warn((this.state.voucherInfo.amount_val - this.state.parameters.cartTotalAmount) - this.state.totalAmount.value < 0 ? 0 : (this.state.voucherInfo.amount_val - this.state.parameters.cartTotalAmount) - this.state.totalAmount.value )
        
        
        
    }

    
    setMyState = (value)=>this.setState(value);

    handleChangeTotalAmount = (value)=>{                                              
        
        this.setState({totalAmount:{...this.state.totalAmount,value:value,error:false,isAmountExceed:(value + this.state.totalAmount.value) <= this.state.voucherInfo.amount_val  ? false :true}})      

    }   

    handleAddToCart = (commodity)=>{

        
        let parameter = {
            sub_id: commodity.sub_id,
            image: commodity.base64,
            name: commodity.item_name,
            unitMeasurement: this.state.unitMeasurement.value,            
            totalAmount: this.state.totalAmount.value,
            quantity: this.state.quantity.value,                        
            category: this.state.category.value,
            subCategory: this.state.subCategory.value,            
            cashAdded: (this.state.voucherInfo.amount_val - this.state.parameters.cartTotalAmount) -  this.state.totalAmount.value < 0 ?  this.state.totalAmount.value - (this.state.voucherInfo.amount_val - this.state.parameters.cartTotalAmount) : 0
        }
        



        return addToCart(parameter,this.setMyState,this.props)
    }

    handleChangeCategory = (value)=>{                           
            console.warn(   this.state.voucherInfo.sub_categories);
            let subCategories= [];
            this.state.voucherInfo.sub_categories.map((item)=>{

                if(item.fertilizer_category_id == this.state.category.value )
                {

                    subCategories.push({label:item.sub_category,value:item.sub_category});
                }   

            })

            console.warn(subCategories);
            this.setState({subCategories:subCategories})
            this.setState({category:{...this.state.category,value:value,error:false}})
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
                 <FastImage
                    style={styles.commodity}
                    source={{
                        uri: `data:image/jpg;base64, ${this.state.commodityInfo.base64}`                        
                    }}
                    resizeMode={FastImage.resizeMode.contain}    
                />


                <ScrollView >
                    <View style={styles.scrollView}>
                        <View style={styles.form}>
                            <Text style={styles.label}>Total Amount</Text>
                            <Components.AmountInput
                                
                                value={this.state.totalAmount.value}
                                onChangeValue={this.handleChangeTotalAmount}
                                keyboardType={"decimal-pad"}
                                iconName="loyalty"
                                placeholder="Place your total amount here..."
                                onFocus={()=>this.setState({totalAmount:{...this.state.totalAmount,focus:true}})}
                                onBlur={()=>this.setState({totalAmount:{...this.state.totalAmount,focus:false}})}
                                isFocus={this.state.totalAmount.focus}
                                isError={this.state.totalAmount.error}
                                errorMessage={this.state.totalAmount.errorMessage}
                                prefix={'₱'}
                            
                                    
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
                                
                            />
                        </View>

                        <View style={styles.form}>
                            <Text style={styles.label}>Unit Measurement</Text>
                            <Components.Category
                            iconName="line-weight"
                            placeholder="Select Measurement"
                            onFocus={()=>this.setState({unitMeasurement:{...this.state.unitMeasurement,focus:true}})}
                            onBlur={()=>this.setState({unitMeasurement:{...this.state.unitMeasurement,focus:false}})}
                            isFocus={this.state.unitMeasurement.focus}
                            isError={this.state.unitMeasurement.error}
                            errorMessage={this.state.unitMeasurement.errorMessage}
                            items={this.state.voucherInfo.unit_measurements}
                            value={this.state.unitMeasurement.value}
                            onChangeValue={(value)=>{                           
                                    
                                    this.setState({unitMeasurement:{...this.state.unitMeasurement,value:value,error:false}})
                                }}
                            />
                        </View>



                        <View style={styles.form}>
                            <Text style={styles.label}>Category</Text>
                            <Components.Category
                            iconName="auto-awesome-mosaic"
                            placeholder="Select Category"
                            onFocus={()=>this.setState({category:{...this.state.category,focus:true}})}
                            onBlur={()=>this.setState({category:{...this.state.category,focus:false}})}
                            isFocus={this.state.category.focus}
                            isError={this.state.category.error}
                            errorMessage={this.state.category.errorMessage}
                            items={this.state.voucherInfo.fertilizer_categories}
                            value={this.state.category.value}
                            onChangeValue={this.handleChangeCategory}
                            />
                        </View>

                        {/*  show sub category if organic fertilize   */}
                        { this.state.category.value == 2 &&
                            <View style={styles.form}>
                                <Text style={styles.label}>Sub Category</Text>
                                <Components.Category
                                placeholder="Select Sub Category"
                                iconName="dashboard"
                                value={this.state.subCategory.value}
                                onFocus={()=>this.setState({subCategory:{...this.state.subCategory,focus:true}})}
                                onBlur={()=>this.setState({subCategory:{...this.state.subCategory,focus:false}})}
                                isFocus={this.state.subCategory.focus}
                                isError={this.state.subCategory.error}
                                errorMessage={this.state.subCategory.errorMessage}
                                items={this.state.subCategories}
                                onChangeValue={(value)=>this.setState({subCategory:{...this.state.subCategory,value:value,error:false}})}
                                />
                            </View>
                        }
                      
                    
                    </View>
                </ScrollView>

                <View style={styles.bottom}>
                    
                    <View style={{ flexDirection:'column',marginHorizontal:constants.Dimensions.vh(5) }}>
                        <View style={{ flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={styles.detailsLabel}>Remaining balance</Text>
                            <Components.AmountText  amountStyle={styles.remainingBalance} value={(this.state.voucherInfo.amount_val - this.state.parameters.cartTotalAmount) - this.state.totalAmount.value < 0 ? 0 : (this.state.voucherInfo.amount_val - this.state.parameters.cartTotalAmount) - this.state.totalAmount.value }/>                                    
                        </View>
                        <View style={{ flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={styles.detailsLabel}>Cash Added</Text>
                            <Components.AmountText  amountStyle={styles.cashAdded} value={(this.state.voucherInfo.amount_val - this.state.parameters.cartTotalAmount) -  this.state.totalAmount.value < 0 ?  this.state.totalAmount.value - (this.state.voucherInfo.amount_val - this.state.parameters.cartTotalAmount) : 0}/>                                    
                        </View>
                    </View>
                </View>
                
             
                
            </View>         
            </>
        )
        
    }

}
  