import React from 'react';
import { View} from 'react-native';
import {styles} from './styles'

import Components from '../../../components';
import constants from '../../../constants';



export default class PayoutMonitoring extends React.Component {
    constructor(props) {
      super(props);
      this.state = {  
            showConfirm:false,      
            fullName:'',
            programs:[],
            regionName:''
      };
    }


    async componentDidMount(){
     
     
    }


    render(){
        return(
            <>                
                <View style={styles.container}>
                    <View style={{left:constants.Dimensions.vh(5),top:constants.Dimensions.vh(5) }}>
                        <Components.PayoutCard/>    

                    </View>                    
                </View>               
            </>
        )
    }

}
  