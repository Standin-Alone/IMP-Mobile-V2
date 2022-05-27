import React from 'react';
import { View,Text,Image} from 'react-native';
import constants from '../../../constants';
import {styles} from './styles'
import Components from '../../../components';
import { Loader } from '../../../components/loaders';
import { GET_SESSION } from '../../../utils/async_storage';
import NumberFormat from 'react-number-format';
import { goToAddCommodities } from '../../../actions/transaction';

export default class UploadAttachments extends React.Component {
    constructor(props) {
      super(props);
      this.state = {        
          parameters:this.props.route.params,
          voucherInfo:this.props.route.params.voucherInfo
        
         
      };
    }
    

    setMyState = (value)=>this.setState(value);



    render(){
        return(
            <>  
            
                <Components.PrimaryHeader                    
                        onGoBack = {()=>this.props.navigation.goBack()}
                        backIconWhite={true}
                        title={"Upload Attachments"}
                        
                />
                                                
                <View style={styles.container}>
                    
                              
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
  