import React from 'react';
import { View,Text} from 'react-native';
import {styles} from './styles'

import Components from '../../../components';
import constants from '../../../constants';
import { FlatList } from 'react-native-gesture-handler';
import { getPayoutBatchList } from '../../../actions/payout';



export default class PayoutMonitoring extends React.Component {
    constructor(props) {
      super(props);
      this.state = {                    
            payoutBatchList:[],
            totalPendingPayout:0,
            page:0,
            isReadyToRender:false,
            showFooter:false
         
      };
    }

    setMyState = (value)=>this.setState(value);

    async componentDidMount(){

        let parameter = {
            payoutBatchList:this.state.payoutBatchList,
            page:this.state.page
        }
        getPayoutBatchList(parameter,this.setMyState)

        this.props.navigation.addListener('focus',()=>{
            getPayoutBatchList(parameter,this.setMyState)
        })
    }


    goToPayoutTracking = (item)=>{
        let parameter = {
            batch:item
        }
        
        this.props.navigation.navigate(constants.ScreenNames.PAYOUT_MONITORING_STACK.TRACKING,parameter)

    }

    renderItem = ({item,index})=>{

        
        return(
            <Components.PayoutBatchCard
                batchNumber={item.application_number}  
                totalAmount={item.amount}  
                status=
                    {
                        item.iscomplete == '1' ?
                        'Paid':
                        item.approved_by_approver != undefined ?
                           'Approved':
                        item.issubmitted == 1 &&  item.application_number !=  undefined ?
                        'Pending' 
                     
                        :
                        'Pending'     
                      }
                onPress={
                    ()=>this.goToPayoutTracking(item)
                }                
            />
        )
    }


    render(){
        return(
            <>                
                <View style={styles.container}>
                    <View style={{left:constants.Dimensions.vh(5),top:constants.Dimensions.vh(5) }}>
                        <Components.PayoutCard
                            amount={this.state.totalPendingPayout}
                        />    
                
                        <View style={{ top:constants.Dimensions.vh(2) }}>
                            <Text style={styles.listText}>List of Batch Payout</Text>
                        </View> 
                    </View>                          
                        {!this.state.isReadyToRender ? (
                                <View style={{ bottom:constants.Dimensions.vh(50) }}>
                                    <Components.Loader isLoading={true}/>
                                </View>
                            ) : (
                                <View style={{ top:constants.Dimensions.vh(10),left:constants.Dimensions.vw(5)}}>
                                    <FlatList
                                        data={this.state.payoutBatchList}
                                        renderItem={this.renderItem}
                                    />
                                </View>
                            )
                        }
                                 
                </View>               
            </>
        )
    }

}
  