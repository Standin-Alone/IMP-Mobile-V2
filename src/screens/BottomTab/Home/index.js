import React from 'react';
import { View,Image, FlatList,Text,RefreshControl} from 'react-native';
import constants from '../../../constants';
import {styles} from './styles'
import Components from '../../../components';
import { getTransactedVouchers, goToViewTransaction } from '../../../actions/home';
import { createFilter } from "react-native-search-filter";


export default class Home extends React.Component {
    constructor(props) {
      super(props);
      this.state = {        
          transactedVouchers:[],
          isRefreshing:false,
          isLoading:false,
          loadingText:'',
          isReadyToRender:false,
          showFooter:true,
          page:0,
          search:{
            focus:false,
            value:''
          },  
      };

    }

    setMyState = (value)=>this.setState(value);

    componentDidMount(){
        let parameter = {
            transactedVouchers:this.state.transactedVouchers,
            page:this.state.page
        }
        getTransactedVouchers(parameter,this.setMyState)

    }


    handleViewTransaction = (item)=>{

                        
    
        let payload = {
            
            transactionInfo:item,
            
        };
        this.setState({isLoading:true,loadingText:'Viewing the transaction...'})
        
        return goToViewTransaction(payload,this.setMyState,this.props);    
    }

    renderItem = ({item,index})=>{

        
        return(
            <Components.HomePrimaryCard
                image={{uri:`data:image/jpeg;base64,${item.base64[0]?.image}` }}
                title={item.reference_no}
                titleStyle={{ color:constants.Colors.secondary,fontFamily:constants.Fonts.GothamBold }}
                subtitle={item.transac_date}
                onViewTransaction={()=>this.handleViewTransaction(item)}
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

    refreshData = ()=>{
   
        
        let parameter = {

            transactedVouchers:this.state.transactedVouchers,
            page:0
        }
        this.setState({isReadyToRender:false});
        getTransactedVouchers(parameter,this.setMyState)
    }



    renderFooterComponent = () =>(

    
            this.state.showFooter &&  this.state.transactedVouchers.length > 1 ?
            <Components.FooterLoader message={"Getting more transacted vouchers"}/> :
            <View style={styles.emptyFooter}> 
                <Text> No transacted vouchers...</Text>
            </View>                
    )
    
    render(){
     
        return(
            <>  
            
                <View style={styles.container}>
                <Components.ProgressModal
                        showProgress={this.state.isLoading}    
                        title={this.state.loadingText}                
                />
   
                    <Components.HomeHeader
                        title={'IMP'}
                    />            
                 
                    <View style={styles.contentContainer}>
                        <View style={styles.searchContainer}>
                    
                                <Components.SearchButton
                                    onPress={()=>this.props.navigation.navigate(constants.ScreenNames.HOME_STACK.SEARCH_VOUCHER)}
                                />
                        </View>

                        <View style={styles.body}>

                            {!this.state.isReadyToRender ? (
                                <View style={{ bottom:constants.Dimensions.vh(50) }}>
                                    <Components.Loader isLoading={true}/>
                                </View>
                            ) : (
                                <View style={{ top:0 }}>                               

                                    
                                    <FlatList
                                        data={this.state.transactedVouchers}
                                        extraData={this.state.transactedVouchers}
                                        renderItem={this.renderItem}          
                                        ListHeaderComponent = {<Components.ListHeader/>}                                                                  
                                        ListEmptyComponent = {this.renderEmptyComponent}
                                        ListFooterComponent = {this.renderFooterComponent}
                                        contentContainerStyle={{ paddingBottom:constants.Dimensions.vh(50),paddingHorizontal:constants.Dimensions.vw(5) }}
                                        style={{paddingleft:constants.Dimensions.vw(10) }}
                                        
                                        
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
                                        onEndReachedThreshold={0.1} // so when you are at 5 pixel from the bottom react run onEndReached function
                                        onEndReached={async ({distanceFromEnd}) => {     
                                             
                                           if (distanceFromEnd > 0   ) 
                                            {                               
                                                this.setState({showFooter:true});            
                                              await this.setState((prevState) => ({page:prevState.page + 2}));
                                              let parameter = {
                                                transactedVouchers:this.state.transactedVouchers,
                                                page:this.state.page
                                              }
                                              await getTransactedVouchers(parameter,this.setMyState)
                                            }                              
                                        }}
                                    />
                                </View>
                            )}
                            
                        </View>
                        
                    </View>      
                </View>
                                                        
            </>
        )
    }

}
  