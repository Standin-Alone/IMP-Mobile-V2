import React from 'react';
import { View,Text,FlatList} from 'react-native';
import constants from '../../../constants';
import {styles} from './styles'
import Components from '../../../components';
import { updateAttachments, openUploadSelection,openCameraInEdit, openGalleryInEdit } from '../../../actions/transaction';

export default class EditUploadAttachments extends React.Component {
    constructor(props) {
      super(props);
      this.state = {        
          parameters:this.props.route.params,
          voucherInfo:this.props.route.params.voucherInfo,          
          showImage:false,  
          showProgress:false,              
          imageUri:'',      
          loadingTitle:'',
          otherAttachmentId:'',
          addedAttachments:[],
          deletedAttachments:[],
          type:'',
          attachments:[
            {   
              attachment_id:this.props.route.params.voucherInfo.base64.filter((item)=>item.name == 'Beneficiary with Commodity')[0].attachment_id,
              name: "Beneficiary with Commodity",
              file: this.props.route.params.voucherInfo.base64.filter((item)=>item.name == 'Beneficiary with Commodity')[0].image,
            },
            {   
              name: "Valid ID",
              file: [{ 
                  front_attachment_id: this.props.route.params.voucherInfo.base64.filter((item)=>item.name == 'Valid ID')[0].attachment_id,
                  front: this.props.route.params.voucherInfo.base64.filter((item)=>item.name == 'Valid ID')[0].image,
                  back_attachment_id: this.props.route.params.voucherInfo.base64.filter((item)=>item.name == 'Valid ID')[1].attachment_id,
                  back: this.props.route.params.voucherInfo.base64.filter((item)=>item.name == 'Valid ID')[1].image 
                }],
            },
            {   
              attachment_id:this.props.route.params.voucherInfo.base64.filter((item)=>item.name == 'Receipt')[0].attachment_id,
              name: "Receipt",
              file: this.props.route.params.voucherInfo.base64.filter((item)=>item.name == 'Receipt')[0].image,
            },
            {
              name: "Other Documents",
              file: this.props.route.params.voucherInfo.base64.map((item)=> item.name == 'Other Documents' && ({attachment_id:item.attachment_id,file:item.image})).filter((item)=>item),
            },                    
          ],
          showSelection:false,
          latitude:'',
          longitude:''
          
      };
    }
    

    setMyState = (value)=>this.setState(value);

    componentDidMount(){
        
    }

    openUploadSelection = (documentName,otherDocumentId,type)=>{
        
        let parameter = {
            documentName:documentName,
            attachments:this.state.attachments,
            otherAttachmentId: otherDocumentId,
            type:type
        }

        
        return openUploadSelection(parameter,this.setMyState);        
    }


    showImage = (image)=>{

        
        this.setState({showImage:true,imageUri:image})
    }

    // EXECUTE UPDATE ATTACHMENTS
    handleUpdateAttachments = ()=>{

        let parameters = {                       
            attachments:this.state.attachments,       
            addedAttachments:this.state.addedAttachments,            
            deletedAttachments:this.state.deletedAttachments,       
            voucherInfo:this.state.voucherInfo,            
        }   

        
        return updateAttachments(parameters,this.setMyState,this.props)
    }

    removeImage = (delete_index,attachmentId)=>{

        
        let new_data = this.state.attachments;
        let addedAttachments = this.state.addedAttachments;

        new_data.map((item_result)=>{
          if(item_result.name == 'Other Documents'){
            // remove file of other documents
            
            this.setState({deletedAttachments:[...this.state.deletedAttachments,item_result.file[delete_index].attachment_id]});

            item_result.file.splice(delete_index, 1);
          }
        });

        addedAttachments.map((item_result,index)=>{
            if(item_result.attachment_id == attachmentId){
                addedAttachments.splice(index,1)   
            }
        })

       
        this.setState({attachments:new_data,addedAttachments:addedAttachments})
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
                                onPress={()=>this.openUploadSelection(item.name,'','add')}
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
                                        image={image.file}
                                        onChangeImage={()=>this.openUploadSelection(item.name,image.attachment_id,'update')}
                                        onViewImage={()=>this.showImage(image.file)}
                                        showRemoveButton
                                        onRemove={()=>this.removeImage(index,image.attachment_id)}
                                    />
                             
                                </View>

                                {item.file.length == (index +1) &&
                                    <View style={{ flexDirection:'column',justifyContent:'flex-start'}}>                                                        
                                        <Components.SecondaryButton                     
                                            iconName={"camera-plus"}
                                            iconColor={constants.Colors.primary}
                                            iconSize= {40}
                                            onPress={()=>this.openUploadSelection(item.name,'','add')}
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
                                    onPress={()=>this.openUploadSelection(item.name  + "(front)")}
                                    title={"Press to add photo of valid ID (Front)."}
                                    
                                />
                            </View>
                            :
                            <View style={{ flexDirection:'column',justifyContent:'flex-start'}}>
                                <View style={{ left:constants.Dimensions.vh(5) }}>                                    
                                    <Components.ImageCard
                                        image={item.file[0].front}
                                        onChangeImage={()=>this.openUploadSelection(item.name  + "(front)")}
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
                                    onPress={()=>this.openUploadSelection(item.name  + "(back)")}
                                    title={"Press to add photo of valid ID (Back)."}
                                    
                                />
                            </View>
                            :
                            <View style={{ flexDirection:'column',justifyContent:'flex-start'}}>
                                <View style={{ left:constants.Dimensions.vh(5),marginVertical:constants.Dimensions.vh(4)}}>                                    
                                    <Components.ImageCard
                                        image={item.file[0].back}
                                        onChangeImage={()=>this.openUploadSelection(item.name  + "(back)")}
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
                        onPress={()=>this.openUploadSelection(item.name)}
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
                            onChangeImage={()=>this.openUploadSelection(item.name)}
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
                 
                        title={"Edit Upload Attachments"}
                        
                />

                <Components.UploadingSelectionCard
                    showPanel={this.state.showSelection}
                    onDismiss = {()=>this.setState({showSelection:false})}
                    onPressTakePhoto={()=>{
                            
                        let parameter = {                            
                            documentName:this.state.documentName,
                            attachments:this.state.attachments,
                            otherAttachmentId:this.state.otherAttachmentId,
                            addedAttachments:this.state.addedAttachments,                            
                            type:this.state.type
                        }
                        
                        return openCameraInEdit(parameter,this.setMyState)
                    }}

                    onPressOpenGallery={()=>{
                            
                        let parameter = {
                            documentName:this.state.documentName,
                            attachments:this.state.attachments,
                            otherAttachmentId:this.state.otherAttachmentId,
                            addedAttachments:this.state.addedAttachments,                            
                            type:this.state.type
                        }

                        return openGalleryInEdit(parameter,this.setMyState)
                    }}
                    
                    
                    
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
                        onPress={this.handleUpdateAttachments}                      
                        title={"Update Attachments"}                                
                        isLoading={this.state.isLoading}
                    />
                </View>
              
                               
            </>
        )
        
    }

}
  