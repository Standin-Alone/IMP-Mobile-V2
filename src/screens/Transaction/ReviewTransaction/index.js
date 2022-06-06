import React from 'react';
import { View,Text,Image, FlatList,ScrollView} from 'react-native';
import constants from '../../../constants';
import {styles} from './styles'
import Components from '../../../components';
import { transact } from '../../../actions/transaction';
export default class ReviewTransaction extends React.Component {
    constructor(props) {
      super(props);
      this.state = {        
          parameters:this.props.route.params,
          voucherInfo:this.props.route.params.voucherInfo,
          cart:this.props.route.params.cart,
          attachments:this.props.route.params.attachments,
          longitude:this.props.route.params.longitude,
          latitude:this.props.route.params.latitude,
          timer:this.props.route.params.timer,
          cartTotalAmount:0,
          showImage:false,
          imageUri:'',
          showConfirm:false,   
          showProgress:false
         
      };
    }
    

    setMyState = (value)=>this.setState(value);

    componentDidMount(){
        this.setState({cartTotalAmount:  Number(this.state.cart.reduce((prev, current) => prev + parseFloat(current.totalAmount), 0)).toFixed(2)});    
    }

    showImage = (image)=>{
        this.setState({showImage:true,imageUri:image})
    }


    renderItem = ({item,index})=>{
        let categoryName = this.state.voucherInfo.fertilizer_categories.filter((info)=>info.value == item.category)[0]?.label;

        
        return(
            <Components.PrimaryCard
                image={{uri:`data:image/jpeg;base64,${item.image}` }}
                imageStyle={styles.image}
                title={item.name+':'+categoryName}
                buttonStyle={styles.commodityButtonImage}
                onPress={()=>this.showImage(item.image)}
            />
        )
    }

    renderAttachments = ({item,index})=>{
        
        return(
            item.name == 'Other Documents'? 

            (
                item.file.map((otherDocument)=>(
                    <Components.PrimaryCard
                        image={{uri:`data:image/jpeg;base64,${otherDocument}` }}
                        imageStyle={styles.image}
                        title={item.name+'(Front)'}
                        buttonStyle={styles.commodityButtonImage}
                        onPress={()=>this.showImage(item.file)}

                    />                    
                ))
            )
            :
            item.name == 'Valid ID'? 
            (<>
                <Components.PrimaryCard
                    image={{uri:`data:image/jpeg;base64,${item.file[0]?.front}` }}
                    imageStyle={styles.image}
                    title={item.name+'(Front)'}
                    buttonStyle={styles.commodityButtonImage}
                    onPress={()=>this.showImage(item.file[0]?.front)}
                />

                <Components.PrimaryCard
                    image={{uri:`data:image/jpeg;base64,${item.file[0]?.back}` }}
                    imageStyle={styles.image}
                    title={item.name +'(Back)' }
                    buttonStyle={styles.commodityButtonImage}
                    onPress={()=>this.showImage(item.file[0]?.back)}
                />
            </>)
            :
            <Components.PrimaryCard
                image={{uri:`data:image/jpeg;base64,${item.file}` }}
                imageStyle={styles.image}
                title={item.name}
                buttonStyle={styles.commodityButtonImage}
                onPress={()=>this.showImage(item.file)}
            />
        )
    }




    handleShowConfirm = ()=>{
        this.setState({showConfirm:this.state.showConfirm ? false :true});
    }

    handleShowProgress = ()=>{
        this.setState({showProgress:this.state.showProgress ? false :true});
    }

    handleTransact = () =>{

        let parameters = {           
            voucherInfo:this.state.voucherInfo,
            cart:this.state.cart,            
            attachments:this.state.attachments,
            latitude:this.state.latitude,
            longitude:this.state.longitude,
            timer:this.state.timer
        }

        return transact(parameters,this.setMyState,this.props)

    }

    render(){
        return(
            <>  
            
                <Components.PrimaryHeader                    
                        onGoBack = {()=>this.props.navigation.goBack()}
                        backIconWhite={true}
                        title={"Review Transaction"}
                        
                />
                
            
                <Components.ConfirmModal
                    showConfirm={this.state.showConfirm}
                    onConfirmPressed={this.handleTransact}
                    onCancelPressed={this.handleShowConfirm}
                    title={"Do you want to submit?"}
                    message={"You can't revert this transaction once you press the confirm button."}
                />


                <Components.ImageModal
                    showImage={this.state.showImage}
                    image={{ url: "data:image/jpeg;base64," + this.state.imageUri}}
                    onRequestClose={()=>this.setState({showImage:false})}
                />


                <Components.ProgressModal
                    showProgress={this.state.showProgress}    
                    title={"Loading..."}                
                />
                                                
                <View style={styles.container}>
                <View style={{ flexDirection:'row',justifyContent:'center' }}>
                        <Image source= {constants.Images.farmer} style={styles.profile_pic}/>                                            
                    </View>
                    <View style={{ flexDirection:'row',justifyContent:'center' }}>
                        <View style={{ flexDirection:'column',bottom:constants.Dimensions.vh(2) }}>
                            <Text style={styles.fullName}>{`${this.state.voucherInfo.first_name} ${this.state.voucherInfo.middle_name} ${this.state.voucherInfo.last_name} `}</Text>
                            <Text style={styles.address}> {`${this.state.voucherInfo.brgy_desc}, ${this.state.voucherInfo.mun_desc},${this.state.voucherInfo.prv_desc}, ${this.state.voucherInfo.reg_desc} `}</Text>
                        </View>
                    </View>     
                </View>           

          
                  <View style={styles.infoContainer}>
                    <ScrollView >
                        <View style={{paddingBottom:constants.Dimensions.vh(50) }}>
                            <View style={{ flexDirection:'column',marginHorizontal:constants.Dimensions.vh(5) , top:constants.Dimensions.vh(10)}}>
                                 <View style={{ flexDirection:'row',justifyContent:'space-between'}}>
                                    <Text style={styles.label}>Reference Number</Text>
                                    <Text style={styles.value}>{this.state.voucherInfo.reference_no}</Text>
                                </View>
                                <View style={{ flexDirection:'row',justifyContent:'space-between'}}>
                                    <Text style={styles.label}>Program</Text>
                                    <Text style={styles.value}>{this.state.voucherInfo.shortname}</Text>
                                </View>
                                <View style={{ flexDirection:'row',justifyContent:'space-between'}}>
                                    <Text style={styles.label} adjustsFontSizeToFit>Birthday</Text>
                                    <Text style={styles.value} adjustsFontSizeToFit>{this.state.voucherInfo.birthday}</Text>
                                </View>
                                <View style={{ flexDirection:'row',justifyContent:'space-between'}}>
                                    <Text style={styles.label} adjustsFontSizeToFit>Voucher Amount</Text>
                                    <Text style={styles.value} adjustsFontSizeToFit>P{this.state.voucherInfo.amount_val}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection:'column',marginHorizontal:constants.Dimensions.vh(5) , top:constants.Dimensions.vh(10)}}>
                                <Text style={styles.label} adjustsFontSizeToFit>Commodities:</Text>
                                <FlatList
                                    data={this.state.cart}
                                    horizontal
                                    renderItem = {this.renderItem}           
                                    contentContainerStyle={{ paddingVertical:constants.Dimensions.vh(5) }}                 
                                />
                            </View>
                

                            <View style={{ flexDirection:'column',marginHorizontal:constants.Dimensions.vh(5) , top:constants.Dimensions.vh(10)}}>
                                <Text style={styles.label} adjustsFontSizeToFit>Attachments:</Text>
                                <FlatList
                                    data={this.state.attachments}
                                    horizontal
                                    renderItem = {this.renderAttachments}   
                                    contentContainerStyle={{ paddingVertical:constants.Dimensions.vh(5) }}                                          
                                />
                            </View>   
                            
                        </View>                                      
                    </ScrollView>                         
                </View>

                                      
               
                <View style={styles.bottom}>
                    <View style={{ flexDirection:'column',alignContent:'center',bottom:constants.Dimensions.vw(5),marginHorizontal:constants.Dimensions.vw(3)}}>                
                    <View style={{ flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={styles.labelSummary}>Cart Total Amount</Text>
                            <Components.AmountText  amountStyle={styles.cashAdded} value={this.state.cartTotalAmount}/>                                    
                        </View>                        
                        <View style={{ flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={styles.labelSummary}>Voucher Total Amount</Text>
                            <Components.AmountText  amountStyle={styles.cashAdded} value={this.state.voucherInfo.amount_val}/>                                    
                        </View>                        
                        <View style={{ flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={styles.labelSummary} >Total Cash Added By Farmer</Text>
                            <Components.AmountText  amountStyle={styles.cashAdded} value={(this.state.voucherInfo.amount_val - this.state.cartTotalAmount) < 0 ? (this.state.cartTotalAmount -this.state.voucherInfo.amount_val  ) : 0.00}/>                                    
                        </View>
                                   
                    </View>
                    <View style={{ left: constants.Dimensions.vh(4),bottom:constants.Dimensions.vh(2) }}>
                        <Components.PrimaryButton  
                            onPress={this.handleShowConfirm}                      
                            title={`Submit`}                                
                            isLoading={this.state.isLoading}
                        />
                    </View>
                </View>                          
            </>
        )
        
    }

}
  