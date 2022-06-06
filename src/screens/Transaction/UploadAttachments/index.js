import React from 'react';
import { View,Text,FlatList} from 'react-native';
import constants from '../../../constants';
import {styles} from './styles'
import Components from '../../../components';
import { goToReviewTransaction, openCamera } from '../../../actions/transaction';

export default class UploadAttachments extends React.Component {
    constructor(props) {
      super(props);
      this.state = {        
          parameters:this.props.route.params,
          voucherInfo:this.props.route.params.voucherInfo,
          cart:this.props.route.params.cart,   
          timer:this.props.route.params.timer,      
          showImage:false,  
          showProgress:false,              
          imageUri:'',      
          loadingTitle:'',
          attachments:[
            {
              name: "Beneficiary with Commodity",
              file: null,
            },
            {
              name: "Valid ID",
              file: [{ front: null, back: null }],
            },
            {
              name: "Receipt",
              file: null,
            },
            {
              name: "Other Documents",
              file: [],
            },                    
          ],
          latitude:'',
          longitude:''
          
      };
    }
    

    setMyState = (value)=>this.setState(value);


    openCamera = (documentName)=>{
        
        let parameter = {
            documentName:documentName,
            attachments:this.state.attachments
        }
        return openCamera(parameter,this.setMyState);        
    }


    showImage = (image)=>{
        this.setState({showImage:true,imageUri:image})
    }


    handleReviewTransaction = ()=>{

        let parameters = {           
            voucherInfo:this.state.voucherInfo,
            cart:this.state.cart,            
            attachments:this.state.attachments,
            timer:this.state.timer,
            latitude:this.state.latitude,
            longitude:this.state.longitude
        }   

      

        return goToReviewTransaction(parameters,this.setMyState,this.props)

    }

    renderItem = ({item,index})=>{
        return( 
            item.name == 'Other Documents' ?   
                <>
                <Text style={styles.label} adjustsFontSizeToFit>{item.name}</Text>                                                            
                    {item.file.length == 0 ? 
                        <View style={{ flexDirection:'column',justifyContent:'flex-start'}}>                                                        
                            <Components.SecondaryButton                     
                                iconName={"camera-plus"}
                                iconColor={constants.Colors.primary}
                                iconSize= {40}
                                onPress={()=>this.openCamera(item.name)}
                                title={"Press to add photo."}
                            />
                            <View style={{ left:constants.Dimensions.vh(5) }}>                         
                            </View>
                        </View>  

                        :

                        item.file.map((image,index)=>(
                            <View style={{ flexDirection:'column',justifyContent:'flex-start'}}>
                                <View style={{ left:constants.Dimensions.vh(5),marginVertical:constants.Dimensions.vh(4)}}>                                    
                                    <Components.ImageCard
                                        image={image}
                                        onChangeImage={()=>this.openCamera(item.name)}
                                        onViewImage={()=>this.showImage(item.file)}
                                    />
                             
                                </View>

                                {item.file.length == (index +1) &&
                                    <View style={{ flexDirection:'column',justifyContent:'flex-start'}}>                                                        
                                        <Components.SecondaryButton                     
                                            iconName={"camera-plus"}
                                            iconColor={constants.Colors.primary}
                                            iconSize= {40}
                                            onPress={()=>this.openCamera(item.name)}
                                            title={"Press to add photo."}
                                        />                                                                                  
                                    </View>  
                                }

                            </View>
                            
                        ))
                    }
                </>
            :
            item.name == 'Valid ID' ?                
                <>                  
                    <View style={{ flexDirection:'column',justifyContent:'flex-start',marginVertical:constants.Dimensions.vh(2)}}>
                        <Text style={styles.label} adjustsFontSizeToFit>{item.name}<Text style={{ color:constants.Colors.danger }}>*</Text></Text>

                        {item.file[0].front == null ?
                            <View style={{marginVertical:constants.Dimensions.vh(2) }}>
                                <Components.SecondaryButton                     
                                    iconName={"camera-plus"}
                                    iconColor={constants.Colors.primary}
                                    iconSize= {40}
                                    onPress={()=>this.openCamera(item.name  + "(front)")}
                                    title={"Press to add photo of valid ID (Front)."}
                                    
                                />
                            </View>
                            :
                            <View style={{ flexDirection:'column',justifyContent:'flex-start'}}>
                                <View style={{ left:constants.Dimensions.vh(5) }}>                                    
                                    <Components.ImageCard
                                        image={item.file[0].front}
                                        onChangeImage={()=>this.openCamera(item.name  + "(front)")}
                                        onViewImage={()=>this.showImage(item.file[0]?.front)}
                                    />
                                </View>
                            </View>
                        }
                         {item.file[0].back == null ?
                            <View style={{marginVertical:constants.Dimensions.vh(5) }}>
                                <Components.SecondaryButton                     
                                    iconName={"camera-plus"}
                                    iconColor={constants.Colors.primary}
                                    iconSize= {40}
                                    onPress={()=>this.openCamera(item.name  + "(back)")}
                                    title={"Press to add photo of valid ID (Back)."}
                                    
                                />
                            </View>
                            :
                            <View style={{ flexDirection:'column',justifyContent:'flex-start'}}>
                                <View style={{ left:constants.Dimensions.vh(5),marginVertical:constants.Dimensions.vh(4)}}>                                    
                                    <Components.ImageCard
                                        image={item.file[0].back}
                                        onChangeImage={()=>this.openCamera(item.name  + "(back)")}
                                        onViewImage={()=>this.showImage(item.file[0].back)}
                                        
                                    />
                                </View>
                            </View>
                        }                       
                    </View>                      
                </>            
            :
            item.file  == undefined  ? 
            <>                  
                <View style={{ flexDirection:'column',justifyContent:'flex-start'}}>
                    <Text style={styles.label} adjustsFontSizeToFit>{item.name}<Text style={{ color:constants.Colors.danger }}>*</Text></Text>
                    <Components.SecondaryButton                     
                        iconName={"camera-plus"}
                        iconColor={constants.Colors.primary}
                        iconSize= {40}
                        onPress={()=>this.openCamera(item.name)}
                        title={"Press to add photo."}
                    />
                </View>  
            </>
            :
            <> 
                <View style={{ flexDirection:'column',justifyContent:'flex-start'}}>
                    <View style={{ left:constants.Dimensions.vh(5) }}>
                        <Text style={styles.label} adjustsFontSizeToFit>{item.name}</Text>                        
                        <Components.ImageCard
                            image={item.file}
                            onChangeImage={()=>this.openCamera(item.name)}
                            onViewImage={()=>this.showImage(item.file)}
                        />
                    </View>
                </View>
            </>
        )
    }

    render(){
        return(
            <>  
                 <Components.ProgressModal
                    showProgress={this.state.showProgress}    
                    title={this.state.loadingTitle}                
                />
                       
                <Components.PrimaryHeader                    
                        onGoBack = {()=>this.props.navigation.goBack()}
                 
                        title={"Upload Attachments"}
                        
                />

               

                 <Components.ImageModal
                    showImage={this.state.showImage}
                    image={{ url: "data:image/jpeg;base64," + this.state.imageUri}}
                    onRequestClose={()=>this.setState({showImage:false})}
                />
                <View style={styles.container}>           

                    <FlatList
                        data={this.state.attachments}
                        renderItem={this.renderItem}
                        contentContainerStyle={{ paddingBottom:constants.Dimensions.vh(50) }}
                        
                    />         
                                                
                </View>
                
                <View style={{position: 'absolute', left: constants.Dimensions.vh(4), right: 0, bottom: constants.Dimensions.vh(5)}}>
                    <Components.PrimaryButton  
                        onPress={this.handleReviewTransaction}                      
                        title={"Review Transaction"}                                
                        isLoading={this.state.isLoading}
                    />
                </View>
              
                               
            </>
        )
        
    }

}
  