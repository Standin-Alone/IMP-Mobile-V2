import React from 'react';
import { View,Text,TouchableOpacity, FlatList,BackHandler} from 'react-native';
import constants from '../../../constants';
import {styles} from './styles'
import Components from '../../../components';
import { goToEditCart,goToEditAttachments } from '../../../actions/transaction';
import { GET_SESSION } from '../../../utils/async_storage';
export default class ViewTransaction extends React.Component {
    constructor(props) {
      super(props);
      this.state = {        
          parameters:this.props.route.params,
          transactionInfo:this.props.route.params.transactionInfo,
          isReadyToRender:true,
          showImage:false,
          imageUri:'',
          userId:''
         
      };
    }

    async componentDidMount(){


        BackHandler.addEventListener("hardwareBackPress", ()=>{
            if(this.props.route.params.hasOwnProperty('handleUpdateTransactionInfo')){
                this.props.route.params?.handleUpdateTransactionInfo(this.state.transactionInfo,this.props.route.params.transactionIndex)
            }
            
            this.props.navigation.goBack()
            return true;
        });  
        
        this.setState({userId : await GET_SESSION('USER_ID')})
    }

    
    refreshInfo = (transaction_info)=>{
        
        this.setState({transactionInfo:transaction_info})
    }

    setMyState = (value)=>this.setState(value);


    goToEditCommodityDetails = (item)=>{
        
        let parameters = {
            commodityInfo:item,
            voucherInfo:this.state.transactionInfo,
            cart:this.state.transactionInfo.commodities,                        
            cartTotalAmount:parseFloat(this.state.transactionInfo.commodities.reduce((prev, current) => prev + parseFloat(parseFloat(current.total_amount) +  parseFloat(current.cash_added)  ), 0)),
            refreshInfo:this.refreshInfo,            
        };
        

        this.props.navigation.navigate(constants.ScreenNames.HOME_STACK.EDIT_COMMODITY_DETAILS,parameters);        
    }


    renderCommodities = ({item,index}) => {
        console.warn(item)
        return(
            <Components.ViewTransactionCommodityCard
                image={item.commodityBase64}
                commodityName={item.item_name}
                category={item.item_category}
                // subCategory={item.item_sub_category}
                amount={parseFloat(item.total_amount) }
                quantity={`x${item.quantity}`}
            
                

            />

        )

    }

    showImage = (attachments)=>{

        let getImages =[];
        
        attachments.map((item)=>{
            
            getImages.push({url:`data:image/jpeg;base64,${item.image}`})            

        })

        this.setState({showImage:true,imageUri:getImages})
    }


    renderAttachments = ({item,index})=>{
            
        return(        
            <Components.PrimaryCard
                image={{uri:`data:image/jpeg;base64,${item.image}` }}
                imageStyle={styles.image}
                title={item.name}
                buttonStyle={styles.commodityButtonImage}
                onPress={()=>this.showImage(this.state.transactionInfo.base64)}
            />
        )
    }

    handleGoToEditCart = ()=>{

        let addIndexToCart = this.state.transactionInfo.commodities.map((cartItem,cartIndex)=>({...cartItem, index: cartIndex}));

        let parameters = {
            voucherInfo:this.state.transactionInfo,
            cart:addIndexToCart,
            refreshInfo:this.refreshInfo,    
        }
       
       return goToEditCart(parameters,this.setMyState,this.props)
    }

    updateAttachmentList = (newUpdatedAttachments)=>{
                
        this.setState({ transactionInfo: { ...this.state.transactionInfo, base64: newUpdatedAttachments } });
    }

    handleGoToEditAttachments = ()=>{
        let parameters = {
            voucherInfo:this.state.transactionInfo,       
            updateAttachmentList:this.updateAttachmentList     
        }

    
       return goToEditAttachments(parameters,this.setMyState,this.props)
    }
    
    render(){
        return(
            <>  
            
                <Components.PrimaryHeader                    
                        onGoBack = {()=>{
                            if(this.props.route.params.hasOwnProperty('handleUpdateTransactionInfo')){
                                this.props.route.params?.handleUpdateTransactionInfo(this.state.transactionInfo,this.props.route.params.transactionIndex)
                            }
                            
                            this.props.navigation.goBack()
                        }}
                        backIconWhite={true}
                        title={"View Transaction"}                        
                />

                <Components.ImageModal
                    showImage={this.state.showImage}
                    image={ this.state.imageUri}
                    onRequestClose={()=>this.setState({showImage:false})}
                />

                <Components.ProgressModal
                        showProgress={this.state.isLoading}    
                        title={this.state.loadingText}                
                />

               {!this.state.isReadyToRender ? (
                    <View style={{ bottom:constants.Dimensions.vh(50) }}>
                        <Components.Loader isLoading={true}/>
                    </View>
                ) : (
                    <View style={{ backgroundColor:constants.Colors.gray_tint,flex:1}}>                                                       
                        <View style={styles.card}>
                                <View style={{ flexDirection:'column' ,left:constants.Dimensions.vh(5),marginVertical:constants.Dimensions.vh(5)}}>
                                    <View style={{ flexDirection:'row' }} >
                                        <constants.Icons.Fontisto name="ticket-alt" size={18} color={constants.Colors.secondary}/>
                                        <Text style={styles.referenceNumberLabel} adjustsFontSizeToFit>Reference Number:</Text>
                                    </View>
                                    <View style={{ flexDirection:'column',left:constants.Dimensions.vh(5) }}>                                                                                
                                        <Text style={styles.referenceNumber} adjustsFontSizeToFit>{this.state.transactionInfo.reference_no}</Text>
                                    </View>                                    
                                </View>

                                <View style={{ flexDirection:'row' ,left:constants.Dimensions.vh(5),marginVertical:constants.Dimensions.vh(1)}}>
                                    <View style={{ flexDirection:'row' }} >                                        
                                        <Text style={styles.voucherAmountLabel} adjustsFontSizeToFit>Name:</Text>
                                    </View>
                                    <View style={{ flexDirection:'column',left:constants.Dimensions.vh(5) }}>                                                                                
                                        <Text style={styles.voucherAmount} adjustsFontSizeToFit>{this.state.transactionInfo.fullname}</Text>                                        
                                    </View>                                    
                                </View>     


                                <View style={{ flexDirection:'row' ,left:constants.Dimensions.vh(5),marginVertical:constants.Dimensions.vh(1)}}>
                                    <View style={{ flexDirection:'row' }} >                                        
                                        <Text style={styles.voucherAmountLabel} adjustsFontSizeToFit>Birthday:</Text>
                                    </View>
                                    <View style={{ flexDirection:'column',left:constants.Dimensions.vh(5) }}>                                                                                
                                        <Text style={styles.voucherAmount} adjustsFontSizeToFit>{this.state.transactionInfo.birthday}</Text>                                        
                                    </View>                                    
                                </View>  

                                                       

                                <View style={{ flexDirection:'row' ,left:constants.Dimensions.vh(5),marginVertical:constants.Dimensions.vh(1)}}>
                                    <View style={{ flexDirection:'row' }} >                                        
                                        <Text style={styles.voucherAmountLabel} adjustsFontSizeToFit>Program:</Text>
                                    </View>
                                    <View style={{ flexDirection:'column',left:constants.Dimensions.vh(5),backgroundColor: this.state.transactionInfo.shortname == 'RFDV' ? constants.Colors.brown : constants.Colors.secondary,borderRadius:20,paddingHorizontal:constants.Dimensions.vw(2)}}>                                                                                
                                        <Text style={styles.voucherAmount} adjustsFontSizeToFit>{this.state.transactionInfo.program_title}</Text>                                        
                                    </View>                                    
                                </View>                                

                                <View style={{ flexDirection:'row' ,left:constants.Dimensions.vh(5),marginVertical:constants.Dimensions.vh(1)}}>
                                    <View style={{ flexDirection:'row' }} >                                        
                                        <Text style={styles.voucherAmountLabel} adjustsFontSizeToFit>Voucher Amount:</Text>
                                    </View>
                                    <View style={{ flexDirection:'column',left:constants.Dimensions.vh(5) }}>                                                                                
                                        <Text style={styles.voucherAmount} adjustsFontSizeToFit><Components.AmountText value={this.state.transactionInfo.default_balance}/></Text>                                        
                                    </View>                                    
                                </View>                                
                        </View>

                        <View style={[styles.card,{height:constants.Dimensions.vh(75)}]}>
                            <View style={{ flexDirection:'column',marginVertical:constants.Dimensions.vh(5)}}>
                                <View style={{ flexDirection:'row',justifyContent:'space-between' }}>
                                    <Text style={styles.cardHeader}>Commodities</Text>
                                    {!this.state.transactionInfo.batch_id && this.state.transactionInfo.supplier_id == this.state.userId &&
                                        <View style={{ right:constants.Dimensions.vw(5) }}>                                        
                                          <TouchableOpacity onPress={this.handleGoToEditCart} style={{flexDirection:'row'}}>
                                              <constants.Icons.MaterialCommunityIcons
                                                  name="square-edit-outline"
                                                  size={20}
                                                  color={constants.Colors.warning}
                                              />
                                              <Text style={styles.editText}>Edit</Text>
                                          </TouchableOpacity> 
                                        </View>                                    
                                    }
                                  
                                </View>
                                
                                    <FlatList 
                                        data={this.state.transactionInfo.commodities} 
                                        renderItem={this.renderCommodities}
                                        nestedScrollEnabled
                                        style={{ height:constants.Dimensions.vh(45) }}
                                        
                                        contentContainerStyle={{ paddingBottom:constants.Dimensions.vh(15)}}
                                    />                                    
                                   
                            </View>

                            <View style={{ flexDirection:'column',bottom:constants.Dimensions.vh(4),marginHorizontal:constants.Dimensions.vw(7)}}>
                                <Components.Divider style={{width:constants.Dimensions.vw(85)}}/>
                                    <View style={{ flexDirection:'row',justifyContent:'space-between'}}>
                                        <Text style={styles.label} adjustsFontSizeToFit>Total Amount</Text>
                                        <Components.AmountText  amountStyle={styles.cashAdded} value={this.state.transactionInfo.commodities.reduce((prev, current) => prev + parseFloat(parseFloat(current.total_amount)  ), 0)}/>                                    
                                    </View>                                                                    
                                    <View style={{ flexDirection:'row',justifyContent:'space-between'}}>
                                        <Text style={styles.label} adjustsFontSizeToFit>Total Cash Added</Text>
                                        <Text>
                                            -<Components.AmountText  amountStyle={styles.cashAdded} value={this.state.transactionInfo.commodities.reduce((prev, current) => prev + parseFloat(current.cash_added)  , 0)}/>                                                                           
                                        </Text>
                                    </View>                                  
                                    <View style={{ flexDirection:'row',justifyContent:'space-between'}}>
                                        <Text style={styles.label} adjustsFontSizeToFit>Total Amount Paid By Voucher</Text>
                                        <Text>
                                            <Components.AmountText  amountStyle={styles.cashAdded} value={this.state.transactionInfo.commodities.reduce((prev, current) => prev + parseFloat(parseFloat(current.total_amount)  ), 0) - this.state.transactionInfo.commodities.reduce((prev, current) => prev + parseFloat(current.cash_added)  , 0)}/>                                                                           
                                        </Text>
                                    </View>                                                                    
                            </View>

                            
                            
                            
                        </View>

                        <View style={styles.card}>
                            <View style={{ flexDirection:'column',marginVertical:constants.Dimensions.vh(4)}}>
                            <View style={{ flexDirection:'row',justifyContent:'space-between',marginBottom:constants.Dimensions.vh(2)}}>
                                    <Text style={styles.cardHeader}>Attachments</Text>
                                    {!this.state.transactionInfo.batch_id && this.state.transactionInfo.supplier_id == this.state.userId &&                                    
                                        <View style={{ right:constants.Dimensions.vw(5) }}>
                                            <TouchableOpacity onPress={this.handleGoToEditAttachments} style={{flexDirection:'row'}}>
                                                <constants.Icons.MaterialCommunityIcons
                                                    name="square-edit-outline"
                                                    size={20}
                                                    color={constants.Colors.warning}
                                                />
                                                <Text style={styles.editText}>Edit</Text>
                                            </TouchableOpacity> 
                                        </View>
                                    }
                                </View>
                                    <FlatList 
                                        data={this.state.transactionInfo.base64} 
                                        renderItem={this.renderAttachments}
                                        horizontal
                                        
                                    />
                            </View>
                        </View>

                    </View>
                )}
                               
            </>
        )
        
    }

}
  