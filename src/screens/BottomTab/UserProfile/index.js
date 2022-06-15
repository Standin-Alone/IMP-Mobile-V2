import React from 'react';
import { View,Text,Image,ScrollView} from 'react-native';
import {styles} from './styles'
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Components from '../../../components';
import constants from '../../../constants';
import Icons from '../../../constants/Icons';
import { CLEAR_SESSION, GET_SESSION } from '../../../utils/async_storage';

export default class UserProfile extends React.Component {
    constructor(props) {
      super(props);
      this.state = {  
            showConfirm:false,      
            fullName:'',
            supplierName:'',
            programs:[],
            regionName:''
      };
    }


    async componentDidMount(){
        this.setState({fullName: await GET_SESSION('FULL_NAME')})
        this.setState({supplierName: await GET_SESSION('SUPPLIER_NAME')})
        this.setState({regionName: await GET_SESSION('REGION_NAME')})
        this.setState({programs: JSON.parse(await GET_SESSION('PROGRAMS'))})
        

     
    }

    handleLogOut = async ()=>{


        await CLEAR_SESSION();
        this.props.navigation.reset({
            index: 0,
            routes: [{ name: constants.ScreenNames.APP_STACK.AUTHENTICATION }]
        });
    }   

    handleShowConfirm = ()=>{
        this.setState({showConfirm:this.state.showConfirm ? false :true});
    }

    render(){
        return(
            <>                

                <Components.ConfirmModal
                    showConfirm={this.state.showConfirm}
                    onConfirmPressed={this.handleLogOut}
                    onCancelPressed={this.handleShowConfirm}
                    title={"Do you want to logout?"}
                    confirmText={'Yes'}
                    cancelText={'No'}
                    confirmButtonStyle={{    borderColor:constants.Colors.danger,borderWidth:1 }}                
                    confirmButtonTextStyle={{     color:constants.Colors.danger}}                
                />

                <View style={styles.container}>
                    <View style={{ flexDirection:'row',justifyContent:'center' }}>
                        <Image source= {constants.Images.merchant} style={styles.profile_pic}/>                                            
                    </View>
                    <View style={{ flexDirection:'row',justifyContent:'center' }}>
                        <View style={{ flexDirection:'column',bottom:constants.Dimensions.vh(2) }}>
                            <Text style={styles.fullName}>{this.state.fullName}</Text>
                            <Text style={styles.address}>{this.state.supplierName}</Text>
                            <Text style={styles.address}>{this.state.regionName}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.registeredProgramLabel}>Registered Programs</Text>
                    <ScrollView style={{ top:constants.Dimensions.vh(2) }}>
                        <View >
                        {this.state.programs.map((item)=>{
                                return (
                                    <View style={[styles.programContainer,{backgroundColor: item.shortname == 'RFDV' ? constants.Colors.brown : constants.Colors.secondary}]}>                                                                           
                                            <Text style={styles.programTitle}>{item.title}</Text>
                                            <Text style={styles.programShortName}>{item.shortname}</Text>                                       
                                    </View>
                                )
                            })
                        }
                        </View>                        
                    </ScrollView>
                </View>
                <View style={styles.bottom}>
                    <Components.TertiaryButton  
                        onPress={this.handleShowConfirm}                      
                        title={`Logout`}                                        
                        isLoading={this.state.isLoading}                                                        
                        
                    />
                </View>
                
            </>
        )
    }

}
  