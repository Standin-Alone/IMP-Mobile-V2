import React from 'react';
import { View,Text,Image,BackHandler} from 'react-native';
import constants from '../../../constants';
import {styles} from './styles'
import Components from '../../../components';
import { Loader } from '../../../components/loaders';
import { GET_SESSION } from '../../../utils/async_storage';
import NumberFormat from 'react-number-format';
import { goToAddCommodities } from '../../../actions/transaction';
import BackgroundTimer from 'react-native-background-timer';
export default class FarmerProfile extends React.Component {
    constructor(props) {
      super(props);
      this.state = {        
          parameters:this.props.route.params,
          voucherInfo:this.props.route.params.voucherInfo
         
      };
    }
    

    setMyState = (value)=>this.setState(value);

    componentDidMount(){    
        BackHandler.addEventListener("hardwareBackPress",()=>{
            BackgroundTimer.clearTimeout(this.props.route.params.timer);  
        })
    }

    handleStartTransaction = ()=>{

        let parameters = {
            parameters: this.state.parameters
        }

        return goToAddCommodities(parameters,this.setMyState,this.props)
    }

    render(){
        return(
            <>  
            
                <Components.PrimaryHeader                    
                        onGoBack = {()=>{
                            
                            BackgroundTimer.clearTimeout(this.props.route.params.timer);  
                            this.props.navigation.goBack()
                        
                        }}
                        backIconWhite={true}
                        title={"Review Farmer Profile"}
                        
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
                            <Text style={styles.label}>Birthday</Text>
                            <Text style={styles.value}>{this.state.voucherInfo.birthday}</Text>
                        </View>
                        <View style={{ flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={styles.label}>Voucher Amount</Text>
                            <Text style={styles.value}>P{this.state.voucherInfo.amount_val}</Text>
                        </View>
                    </View>
                </View>
                
                    <View style={{position: 'absolute', left: constants.Dimensions.vh(4), right: 0, bottom: constants.Dimensions.vh(5)}}>
                        <Components.PrimaryButton  
                            onPress={this.handleStartTransaction}                      
                            title={"Start Transaction"}                                
                            isLoading={this.state.isLoading}
                        />
                    </View>
              
                               
            </>
        )
        
    }

}
  