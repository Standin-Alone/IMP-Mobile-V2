import React from 'react';
import { View,Text,Image} from 'react-native';
import {styles} from './styles'
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Components from '../../../components';
import constants from '../../../constants';
import Icons from '../../../constants/Icons';

export default class UserProfile extends React.Component {
    constructor(props) {
      super(props);
      this.state = {        
      };
    }

    render(){
        return(
            <>                
                
                    <View style={styles.container}>
                        <View style={{ flexDirection:'row',justifyContent:'center' }}>
                            <Image source= {constants.Images.userSample} style={styles.profile_pic}/>                                            
                        </View>
                        <View style={{ flexDirection:'row',justifyContent:'center' }}>
                            <View style={{ flexDirection:'column',bottom:constants.Dimensions.vh(2) }}>
                                <Text style={styles.fullName}>John Doe</Text>
                                <Text style={styles.address}>San Jose Del Monte Bulacan</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.infoContainer}>

                    </View>
                
                
            </>
        )
    }

}
  