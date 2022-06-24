
import React from "react";
import { View,Text,Modal } from "react-native";
import { styles } from "./styles";
import ImageViewer from "react-native-image-zoom-viewer";
import constants from "../../constants";

import AwesomeAlert from 'react-native-awesome-alerts';

export const ImageModal = ({
   
   showImage,
   image,
   imageName,
   onRequestClose 

}) =>(


    <Modal
    visible={showImage}
    transparent={true}
    onRequestClose={onRequestClose}
    animationType="fade"
    >
    <ImageViewer
        imageUrls={image}
        index={0}       
    />
    </Modal>
)



export const ConfirmModal =  ({
   
    showConfirm,
    title,
    message,
    cancelText,
    confirmText,
    onConfirmPressed,
    onCancelPressed,
    confirmButtonStyle,
    confirmButtonTextStyle
 
 })=>(
    <AwesomeAlert
    show={showConfirm}
    showProgress={false}
    title={title}
    message={message}
    closeOnTouchOutside={false}
    closeOnHardwareBackPress={false}
    showCancelButton={true}
    showConfirmButton={true}
    cancelText={cancelText}
    confirmText={confirmText}
    confirmButtonColor="white"
    confirmButtonStyle={[styles.confirmButtonStyle,confirmButtonStyle]}
    confirmButtonTextStyle={[styles.confirmButtonTextStyle,confirmButtonTextStyle]}
    cancelButtonStyle={styles.cancelButtonStyle}
    cancelButtonTextStyle={styles.cancelButtonTextStyle}
    onCancelPressed={onCancelPressed}
    onConfirmPressed={onConfirmPressed}    
  />

)



export const MessageModal =  ({
   
  showConfirm,
  title,
  message,
  confirmText,  
  onConfirmPressed,  
  confirmButtonStyle,
  confirmButtonTextStyle

})=>(
  <AwesomeAlert
  show={showConfirm}
  showProgress={false}
  title={title}
  message={message}
  closeOnTouchOutside={false}
  closeOnHardwareBackPress={false}
  showConfirmButton={true}  
  confirmText={confirmText} 
  confirmButtonStyle={[styles.confirmButtonStyle,confirmButtonStyle]}
  confirmButtonTextStyle={[styles.confirmButtonTextStyle,confirmButtonTextStyle]}
  onConfirmPressed={onConfirmPressed}
  
/>

)



export const ProgressModal =  ({
   
  showProgress, 
  title,
  

})=>(
  <AwesomeAlert
  show={showProgress}
  showProgress={true}
  closeOnTouchOutside={false}
  title={title ? title: 'Loading...'}  
  
/>

)