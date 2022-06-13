import React from 'react';
import { View,Text,Image, FlatList} from 'react-native';
import constants from '../../../constants';
import {styles} from './styles'
import Components from '../../../components';
import { searchVoucher,goToViewTransaction} from '../../../actions/home';

export default class SearchVoucher extends React.Component {
    constructor(props) {
      super(props);
      this.state = {        
        searchValue:'',
        data:[],
        isSearching:false
      };
    }


    componentDidMount(){
      
    }

    setMyState = (value)=>this.setState(value);


    handleSearch = (value)=>{

        let parameters = {
            searchValue:value
        }

        return searchVoucher(parameters,this.setMyState);
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
    render(){
        return(
            <>  
            
                <Components.PrimaryHeaderSearch                    
                        onGoBack = {()=>this.props.navigation.goBack()}                                                
                        onChangeText={this.handleSearch}                    
                        value={this.state.searchValue}
                />
                <View style={{ alignSelf:'center' }}>

                    {this.state.isSearching ? (
                                <View style={{ bottom:constants.Dimensions.vh(50) }}>
                                    <Components.Loader isLoading={true}/>
                                </View>
                            ) : (
                        <FlatList
                            data={this.state.data}
                            renderItem={this.renderItem}
                            contentContainerStyle={{ paddingBottom:constants.Dimensions.vh(50),paddingHorizontal:constants.Dimensions.vw(2) }}
                            ListEmptyComponent={this.renderEmptyComponent}
                        />    
                    )}
                </View>         
            </>
        )
        
    }

}
  