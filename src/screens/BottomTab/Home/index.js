import React from 'react';
import { View,Image, FlatList} from 'react-native';
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
          isReadyToRender:false,
          search:{
            focus:false,


            value:''
          },  
      };

    }

    setMyState = (value)=>this.setState(value);

    componentDidMount(){
        
        getTransactedVouchers(this.setMyState)

        this.props.navigation.addListener('focus',()=>{
            getTransactedVouchers(this.setMyState)
        })

    }


    handleViewTransaction = (item)=>{

                        
    
        let payload = {
            transactionInfo:item
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
    
    render(){
        const filteredVouchers = this.state.transactedVouchers.filter(
            createFilter(this.state.search.value, KEYS_TO_FILTERS)
        );
        return(
            <>  
            
                <View style={styles.container}>   
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
                                        renderItem={this.renderItem}                                                                            
                                        ListEmptyComponent = {this.renderEmptyComponent}
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
  