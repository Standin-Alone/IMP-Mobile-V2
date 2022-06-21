import React from 'react';
import { View,Text,Image, FlatList, ScrollView} from 'react-native';
import constants from '../../../constants';
import {styles} from './styles'
import Components from '../../../components';
import { Divider, Loader } from '../../../components/loaders';
import { GET_SESSION } from '../../../utils/async_storage';
import NumberFormat from 'react-number-format';
import FastImage  from 'react-native-fast-image'
import { editCart, editTransactionCart } from '../../../actions/transaction';


export default class EditCommodityDetails extends React.Component {
    constructor(props) {
      super(props);
      this.state = {        
          parameters:this.props.route.params,
          commodityInfo:this.props.route.params.commodityInfo,
          voucherInfo:this.props.route.params.voucherInfo,
          cart:this.props.route.params.cart,
          subCategories:[],
          subTotalAmount:parseFloat(this.props.route.params.commodityInfo.totalAmount) + parseFloat(this.props.route.params.commodityInfo.cashAdded),
          cashAdded:this.props.route.params.commodityInfo.cash_added,
          totalAmount:{
            focus:false,
            error:false,
            errorMessage:'',
            value:parseFloat(this.props.route.params.commodityInfo.totalAmount) ,
            isAmountExceed:false
          },  
          quantity:{
            focus:false,
            error:false,
            errorMessage:'',
            value:this.props.route.params.commodityInfo.quantity,
            isAmountExceed:false
          },  
          unitMeasurement:{
            focus:false,
            error:false,
            errorMessage:'',
            value:this.props.route.params.commodityInfo.unitMeasurement,        
          },  
          category:{
            focus:false,
            error:false,
            errorMessage:'',
            value:this.props.route.params.commodityInfo.category,        
          },  
          subCategory:{
            focus:false,
            error:false,
            errorMessage:'',
            value:this.props.route.params.commodityInfo.subCategory,        
          },  
          
          subCategories:[]
          
      };
    }
    
    
    componentDidMount(){
        console.warn(this.state.parameters.cartTotalAmount);
        // console.warn((parseFloat(this.state.voucherInfo.amount_val) - parseFloat(this.state.parameters.cartTotalAmount)))
        
    }

    
    setMyState = (value)=>this.setState(value);

    handleChangeTotalAmount = (value)=>{                                              
        
        this.setState({totalAmount:{...this.state.totalAmount,value:value === null ? 0 : Math.abs(value) ,error:false,isAmountExceed:(value + this.state.totalAmount.value) <= this.state.voucherInfo.current_balance  ? false :true}})      

    }   

    handleEditCommodity = (commodity)=>{
        
        
        console.warn(commodity);
        let parameter = {     
            index:commodity.index,       
            subCategories:this.state.subCategories,
            sub_id: commodity.sub_id,
            image: commodity.image,
            name: commodity.name,
            unitMeasurement: this.state.unitMeasurement.value,            
            totalAmount: Math.abs(this.state.totalAmount.value),
            quantity: this.state.quantity.value,                        
            category: this.state.category.value,
            subCategory: this.state.subCategory.value,            
            cashAdded: (parseFloat(this.state.voucherInfo.amount_val) - parseFloat(this.state.parameters.cartTotalAmount)) -  parseFloat(this.state.totalAmount.value) <= 0 ?  parseFloat(this.state.totalAmount.value) - (parseFloat(this.state.voucherInfo.amount_val) - parseFloat(this.state.parameters.cartTotalAmount)) : 0
        }
        

        
        
        return editTransactionCart(parameter,this.setMyState,this.props)
    }

    handleChangeCategory = (value)=>{                           
            
            let subCategories= [];
            this.state.voucherInfo.sub_categories.map((item)=>{

                if(item.fertilizer_category_id == this.state.category.value )
                {

                    subCategories.push({label:item.sub_category,value:item.sub_category});
                }   

            })

            
            this.setState({subCategories:subCategories})
            this.setState({category:{...this.state.category,value:value,error:false}})
            this.setState({subCategory:{...this.state.subCategory,value:'',error:false}})
            
        }


    render(){
        return(
            <>  
            
            <View style={{backgroundColor:constants.Colors.light,flex:1 }}>
                <Components.PrimaryHeader                    
                        onGoBack = {()=>this.props.navigation.goBack()}                        
                        title={"Edit Commodity Details"}
                        showAddToCartButton={true}        
                        onAddToCart={()=>this.handleEditCommodity(this.state.commodityInfo)}               
                />       
                <ScrollView style={{ flexGrow:0 }} >                    

               
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
                            {/* <Components.AmountText  amountStyle={styles.remainingBalance} value={this.state.subTotalAmount - this.state.totalAmount.value <= 0 ? 0 : (parseFloat(this.state.subTotalAmount) -  parseFloat(this.state.cashAdded)) - this.state.totalAmount.value }/>                                     */}
                            <Components.AmountText  amountStyle={styles.remainingBalance} value={(parseFloat(this.state.voucherInfo.amount_val) - parseFloat(this.state.parameters.cartTotalAmount)) - parseFloat(this.state.totalAmount.value) <= 0 ? 0 : (parseFloat(this.state.voucherInfo.amount_val) - parseFloat(this.state.parameters.cartTotalAmount)) - parseFloat(this.state.totalAmount.value) }/> 
                        </View>


                        <View style={{ flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={styles.detailsLabel}>Cash Added</Text>
                            <Components.AmountText  amountStyle={styles.cashAdded} value={(parseFloat(this.state.voucherInfo.amount_val) - parseFloat(this.state.parameters.cartTotalAmount)) -  parseFloat(this.state.totalAmount.value) <= 0 ?  parseFloat(this.state.totalAmount.value) - (parseFloat(this.state.voucherInfo.amount_val) - parseFloat(this.state.parameters.cartTotalAmount)) : 0}/>                                    
                        </View>
                    </View>
                </View>
                
             
                
            </View>         
            </>
        )
        
    }

}
  