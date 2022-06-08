import React from 'react';
import { View,Text,Image,RefreshControl} from 'react-native';
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
            isRefreshing:false,
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

        // this.props.navigation.addListener('focus',()=>{
        //     getPayoutBatchList(parameter,this.setMyState)
        // })
    }


    goToPayoutTracking = (item)=>{
        let parameter = {
            batch:item
        }
        
        this.props.navigation.navigate(constants.ScreenNames.PAYOUT_MONITORING_STACK.TRACKING,parameter)

    }

    refreshData = ()=>{

        
        let parameter = {

            payoutBatchList:this.state.payoutBatchList,
            page:0
        }

        getPayoutBatchList(parameter,this.setMyState)
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


    renderEmptyComponent = ()=>(

        <Image
            style={styles.noDataBg}                        
            source={constants.Images.noData}
            resizeMode={"contain"}            
        />
                    
    )

    renderFooterComponent = () =>(

    
            this.state.showFooter ?
            <Components.FooterLoader message={"Getting more list..."}/> :
            <View style={styles.emptyFooter}> 
                <Text> No more payout batches..</Text>
            </View>                
    )

    handleOnEndReached = async ({distanceFromEnd}) => {     
                                                      
        if (distanceFromEnd > 0 && this.state.payoutBatchList.length - 6 == this.state.page ) 
         {  
           await this.setState({showFooter:true});              
           await this.setState((prevState) => ({page:prevState.page + 6}));
           let parameter = {
             payoutBatchList:this.state.payoutBatchList,
             page:this.state.page
           }
           await getPayoutBatchList(parameter,this.setMyState)
         }                              
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
                                        nestedScrollEnabled
                                        refreshControl = {
                                            <RefreshControl
                                                onRefresh={this.refreshData}
                                                refreshing={this.state.isRefreshing}                                                
                                                title="Pull to refresh"
                                                tintColor={constants.Colors.primary}
                                                colors={[constants.Colors.primary]}
                                                titleColor={constants.Colors.primary}
                                                progressViewOffset={0}
                                                />
                                        }
                                        renderItem={this.renderItem}                                        
                                        ListEmptyComponent = {this.renderEmptyComponent}
                                        ListFooterComponent = {this.renderFooterComponent}
                                        contentContainerStyle={{ paddingBottom:constants.Dimensions.vh(45) }}
                                        onEndReachedThreshold={0.1} // so when you are at 5 pixel from the bottom react run onEndReached function
                                        onEndReached={this.handleOnEndReached}
                                    />
                                </View>
                            )
                        }
                                 
                </View>               
            </>
        )
    }

}
  