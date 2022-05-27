import React from 'react';
import { View,Text} from 'react-native';
import constants from '../../../constants';
import {styles} from './styles'
import Components from '../../../components';






export default class Home extends React.Component {
    constructor(props) {
      super(props);
      this.state = {        
      };


    }

    render(){
        return(
            <>

                <View style={styles.container}>                                               
                    <View style={styles.contentContainer}>
                        <View style={styles.searchContainer}>
                                <Components.PrimaryHeaderSearch/>
                        </View>

                        <View style={styles.body}>
                            <View style={{ top:80 }}>
                                <Components.PrimaryCard
                                />
                            </View>
                        </View>
                        
                    </View>      
                </View>
                                                        
            </>
        )
    }

}
  