import React from 'react';
import { Text,StyleSheet} from 'react-native';
import constants from '../../../constants';
import {styles} from './styles'

import { RNCamera } from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';
import { scanQrCode } from '../../../actions/transaction';
import { Loader } from '../../../components/loaders';
import { GET_SESSION } from '../../../utils/async_storage';
import Components from '../../../components';

export default class Scanning extends React.Component {
    constructor(props) {
      super(props);
      this.state = {        
          scanning:false,
          isScanning:true,
          isLoading:false,
          showProgress:false
      };
    }

    setMyState = (value)=>this.setState(value);


    handleBarCodeRead =   async (scanResult)=>{
        let payload = {
            scanResult:scanResult.data,
            userId: await GET_SESSION('USER_ID'),                       
        };
        
        if(this.state.isScanning == true){
            return scanQrCode(payload,this.setMyState,this.props);   
        }
        
    }

    render(){
        return(
            <>

                    {/* <Loader isLoading={this.state.isLoading}/>   */}
                    
                    <Components.ProgressModal
                        showProgress={this.state.isLoading}    
                        title={"Loading..."}                
                    />

                    {this.state.scanning == false ? (        
                    
                        <RNCamera
                            defaultTouchToFocus
                            onBarCodeRead = {this.handleBarCodeRead.bind(this)}
                            style={[StyleSheet.absoluteFillObject,styles.container]}
                            permissionDialogTitle={'Permission to use camera'}
                            permissionDialogMessage={'We need your permission to use your camera phone'}                      
                            barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
                        >                      
                            <BarcodeMask edgeColor={constants.Colors.primary} showAnimatedLine={false}/>                            
                        </RNCamera>  
                    ) : (
                            <Text> No Access camera</Text>
                    )}
                                            
            </>
        )
        
    }

}
  