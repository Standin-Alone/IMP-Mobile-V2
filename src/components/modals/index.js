
import React from "react";
import { View,SafeAreaView,ActivityIndicator,Modal } from "react-native";
import { styles } from "./styles";
import ImageViewer from "react-native-image-zoom-viewer";
import constants from "../../constants";

import AwesomeAlert from 'react-native-awesome-alerts';

export const ImageModal = ({
   
   showImage,
   image,
   onRequestClose 

}) =>(


    <Modal
    visible={showImage}
    transparent={true}
    onRequestClose={onRequestClose}
    animationType="fade"
    >
    <ImageViewer
        imageUrls={[image]}
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
    onCancelPressed
 
 })=>(
    <AwesomeAlert
    show={showConfirm}
    showProgress={false}
    title={title}
    message={message}
    closeOnTouchOutside={true}
    closeOnHardwareBackPress={false}
    showCancelButton={true}
    showConfirmButton={true}
    cancelText={cancelText}
    confirmText={confirmText}
    confirmButtonColor="#DD6B55"
    onCancelPressed={onCancelPressed}
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
  title={title ? title: 'Loading...'}  
/>

)