import React from 'react';
import { View,Image, FlatList,Text,RefreshControl} from 'react-native';
import constants from '../../../constants';
import {styles} from './styles'
import Components from '../../../components';
import { getTransactedVouchers, goToViewTransaction } from '../../../actions/home';
import { createFilter } from "react-native-search-filter";


const KEYS_TO_FILTERS = ["reference_no", "fullname"];

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

        getTransactedVouchers(parameter,this.setMyState)
    }



    renderFooterComponent = () =>(

    
            this.state.showFooter ?
            <Components.FooterLoader message={"Getting more transacted vouchers"}/> :
            <View style={styles.emptyFooter}> 
                <Text> No transacted vouchers...</Text>
            </View>                
    )
    
    render(){
        const filteredVouchers = this.state.transactedVouchers.filter(
            createFilter(this.state.search.value, KEYS_TO_FILTERS)
        );
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
                                <Components.PrimaryHeaderSearch
                                    onFocus={()=>this.setState({search:{...this.state.search,focus:true}})}
                                    onBlur={()=>this.setState({search:{...this.state.search,focus:false}})}                                    
                                    onChangeText={(value)=>this.setState({search:{...this.state.search,value:value,error:false}})}                                
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
                                        data={this.state.transactedVouchers ? filteredVouchers : null}
                                        extraData={this.state.transactedVouchers}
                                        renderItem={this.renderItem}                                                                            
                                        ListEmptyComponent = {this.renderEmptyComponent}
                                        ListFooterComponent = {this.renderFooterComponent}
                                        contentContainerStyle={{ paddingBottom:constants.Dimensions.vh(50) }}
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
                                                      
                                           if (distanceFromEnd > 0  && this.state.transactedVouchers.length - 2 == this.state.page ) 
                                            {                               
                                             await this.setState({showFooter:true});   
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
  