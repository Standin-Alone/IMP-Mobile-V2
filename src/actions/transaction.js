
import NetInfo from "@react-native-community/netinfo";
import getBaseUrl from '../utils/config';
import constants from '../constants';
import Toast from 'react-native-toast-message';
import {POST,GET} from '../utils/axios';
import { GET_SESSION, SET_SESSION } from "../utils/async_storage";
import { checkAppVersion, getLocation, rotateImage,geotagging, backgroundTime } from "../utils/functions";
import BackgroundTimer from 'react-native-background-timer';
import {launchCamera,launchImageLibrary} from 'react-native-image-picker';

export const scanQrCode =    (payload,setState,props) => {     
    //turn on loading
     setState({isLoading:true,isScanning:false});
 
    // Check Internet Connection
    NetInfo.fetch().then(async(state)=>{
            
        // if internet connected
        if(state.isConnected && state.isInternetReachable){
            let checkVersion =   await checkAppVersion();
            


            //Check if the mobile app is latest.
            if(checkVersion.status){

                let clean_payload = {
                    reference_number:payload.scanResult,
                    user_id:  payload.userId,
                }
                           
                // POST REQUEST
                POST(`${getBaseUrl().accesspoint}${constants.EndPoints.SCAN_QR_CODE}`,clean_payload).then((response)=>{  
                    console.warn(response.data.fullyClaimed);  
                    if(response.data.status == true){
                         

                         let parameters = {
                             voucherInfo:response.data.voucherInfo,
                             timer:  backgroundTime(response.data.timer,props)
                         }
                         
                         setState({isLoading:false,isScanning:true});
                         //  NAVIGATE TO FARMER PROFILE
                         props.navigation.navigate(constants.ScreenNames.TRANSACTION_STACK.FARMER_PROFILE,parameters)
                         
                        
                    }else if(response.data.fullyClaimed == true){
                        
                        let parameters = {
                            
                            transactionInfo:response.data.voucherInfo[0],
                            
                        };

                        setState({isLoading:false,isScanning:true});
                        
                        // NAVIGATE TO VIEW TRANSACTION
                        props.navigation.navigate(constants.ScreenNames.HOME_STACK.VIEW_TRANSACTION,parameters)                                    
                    }else{
                        Toast.show({
                            type:'error',
                            text1: 'Message',
                            text2:response.data.message ? response.data.message : response.data.errorMessage,
                        });

                      
                        
                        setState({isLoading:false,isScanning:true});
                      
                    }


                }).catch((error)=>{
                    console.warn('error',error);
                    
                    Toast.show({
                        type:'error',
                        text1:'Something went wrong!',
                        text2:error.response
                    });                   
                    setState({isLoading:false,isScanning:true});
                });

                
            }else{

                console.warn('checkVersion',checkVersion);
                setState({isLoading:false,isScanning:true});
            }
                        
        }else{
            //  No internet Connection
            Toast.show({
                type:'error',
                text1:'No internet Connection!'
            })
             // turn off loading
            setState({isLoading:false,isScanning:true});
        }
    });

}





export const goToAddCommodities = (payload,setState,props) => {     
    //turn on loading
    setState({isLoading:true,isScanning:false});

    // Check Internet Connection
    NetInfo.fetch().then(async(state)=>{
            
        // if internet connected
        if(state.isConnected && state.isInternetReachable){
            let checkVersion = await checkAppVersion();
            
  

            
            //Check if the mobile app is latest.
            if(checkVersion.status){

                let cleanParameters = {
                    parameters:payload.parameters
                }
                
                
                props.navigation.navigate(constants.ScreenNames.TRANSACTION_STACK.COMMODITIES,cleanParameters)
                setState({isLoading:false,isScanning:true});
            }else{

                console.warn(checkVersion);
                setState({isLoading:false,isScanning:true});
            }
                        
        }else{
            //  No internet Connection
            Toast.show({
                type:'error',
                text1:'No internet Connection!'
            })
             // turn off loading
            setState({isLoading:false,isScanning:true});
        }
    });

}





export const addToCart = (payload,setState,props) => {     
 

    // Check Internet Connection
    NetInfo.fetch().then(async(state)=>{
            
        // if internet connected
        if(state.isConnected && state.isInternetReachable){
            
            let countError = 0;
            // validate payload

            
           
            Object.keys(payload).map((item,index)=>{                         
                                
                if((item != 'subCategory' && item != 'cashAdded'  && item != 'subCategories' )   ){          
                    
                    if((payload[item] == '' || payload[item] === null)  || payload[item] === undefined  ||  payload[item] == 0 ){                        
                        // console.warn(item)
                        setState({[item]:{...payload[item],error:true,errorMessage:`Please enter your ${item}.`}})      
                        countError++;
                    } 
                }

                // sub category validation
                if(item == 'category'){

                    if(payload.subCategories.length  > 0){
                        if(payload['subCategory'] == ''){
                          
                            setState({['subCategory']:{...payload['subCategory'],error:true,errorMessage:`Please enter your sub category.`}})      
                            countError++;
                        }
                    }                        

                }
            

            })          
                
            // console.warn(payload);
            
            if(countError == 0){
                props.route.params.addToCart(payload);
                props.navigation.goBack();
            }
            

                        
        }else{
            //  No internet Connection
            Toast.show({
                type:'error',
                text1:'Message!',
                text2:'No internet Connection!'
            })
            
        }
    });

}



export const editCart = (payload,setState,props) => {     
 

    // Check Internet Connection
    NetInfo.fetch().then(async(state)=>{
            
        // if internet connected
        if(state.isConnected && state.isInternetReachable){
            
            let countError = 0;
            // validate payload

            
           
            Object.keys(payload).map((item,index)=>{                         
                                
                if((item != 'subCategory' && item != 'cashAdded'  && item != 'subCategories' )   ){          
                    
                    if((payload[item] == '' || payload[item] === null)  || payload[item] === undefined  ||  payload[item] == 0 ){                        
                        // console.warn(item)
                        setState({[item]:{...payload[item],error:true,errorMessage:`Please enter your ${item}.`}})      
                        countError++;
                    } 
                }

                // sub category validation
                if(item == 'category'){

                    if(payload.subCategories.length  > 0){
                        if(payload['subCategory'] == ''){
                          
                            setState({['subCategory']:{...payload['subCategory'],error:true,errorMessage:`Please enter your sub category.`}})      
                            countError++;
                        }
                    }                        

                }
            

            })          
                
            // console.warn(payload);
            
            if(countError == 0){
                props.route.params.changeCart(payload);
                props.navigation.goBack();
            }
            

                        
        }else{
            //  No internet Connection
            Toast.show({
                type:'error',
                text1:'Message!',
                text2:'No internet Connection!'
            })
            
        }
    });

}


export const editTransactionCart = (payload,setState,props) => {     
 

    // Check Internet Connection
    NetInfo.fetch().then(async(state)=>{
            
        // if internet connected
        if(state.isConnected && state.isInternetReachable){
            
            let countError = 0;
            // validate payload

            
           
            Object.keys(payload).map((item,index)=>{                         
                                
                if((item != 'subCategory' && item != 'cashAdded'  && item != 'subCategories' && item != 'index' )   ){          
                    
                    if((payload[item] == '' || payload[item] === null)  || payload[item] === undefined  ||  payload[item] == 0 ){                        
                        console.warn(item)
                        setState({[item]:{...payload[item],error:true,errorMessage:`Please enter your ${item}.`}})      
                        countError++;
                    } 
                }

                // sub category validation
                if(item == 'category'){

                    if(payload.subCategories.length  > 0){
                        if(payload['subCategory'] == ''){
                          
                            setState({['subCategory']:{...payload['subCategory'],error:true,errorMessage:`Please enter your sub category.`}})      
                            countError++;
                        }
                    }                        

                }
            

            })          
                
            console.warn(countError);
            
            if(countError == 0){
                props.route.params.changeCart(payload);
                props.navigation.goBack();
            }
            

                        
        }else{
            //  No internet Connection
            Toast.show({
                type:'error',
                text1:'Message!',
                text2:'No internet Connection!'
            })
            
        }
    });

}

export const goToCheckout = (payload,setState,props) => {     
    
    setState({isLoading:true})
    // Check Internet Connection
    NetInfo.fetch().then(async(state)=>{
            
        // if internet connected
        if(state.isConnected && state.isInternetReachable){
            let checkVersion = await checkAppVersion();
            
  


            //Check if the mobile app is latest.
            if(checkVersion.status){

                if(payload.cart.length > 0){
                    let cartTotal = payload.cart.reduce((prev, current) => prev + parseFloat(current.totalAmount), 0);
                    let checkBalance = payload.voucherInfo.amount_val  - cartTotal;
                    
                     // FOR ONE TIME TRANSACTION ONLY
                    if(payload.voucherInfo.one_time_transaction == '1'){
                        if(checkBalance <=  0){
                            setState({isLoading:false})
                            props.navigation.navigate(constants.ScreenNames.TRANSACTION_STACK.CHECKOUT,payload)
                        }else{
                            Toast.show({
                                type:'error',
                                text1:'Message!',
                                text2:`Please consume the full amount of the voucher.`
                            })
                            setState({isLoading:false})
                        }
                    }else{
                        setState({isLoading:false})
                        props.navigation.navigate(constants.ScreenNames.TRANSACTION_STACK.CHECKOUT,payload)
                    }

                }else{
                    Toast.show({
                        type:'error',
                        text1:'Message!',
                        text2:'You have no items on your cart.'
                    })
                    setState({isLoading:false})
                }
  
            }else{
                
                setState({isLoading:false})
            }
                        
        }else{
            //  No internet Connection
            Toast.show({
                type:'error',
                text1:'No internet Connection!'
            })
               
            setState({isLoading:false})
  
        }
    });

}




export const goToEditCart = (payload,setState,props) => {     
    
    setState({isLoading:true})
    // Check Internet Connection
    NetInfo.fetch().then(async(state)=>{
            
        // if internet connected
        if(state.isConnected && state.isInternetReachable){
            let checkVersion = await checkAppVersion();
            
  


            //Check if the mobile app is latest.
            if(checkVersion.status){

                if(payload.cart.length > 0){                     
                    
                    props.navigation.navigate(constants.ScreenNames.HOME_STACK.EDIT_CART,payload)
                                       

                }else{
                    Toast.show({
                        type:'error',
                        text1:'Message!',
                        text2:'You have no items on your cart.'
                    })
                    setState({isLoading:false})
                }
  
            }else{
                
                setState({isLoading:false})
            }
                        
        }else{
            //  No internet Connection
            Toast.show({
                type:'error',
                text1:'No internet Connection!'
            })
               
            setState({isLoading:false})
  
        }
    });

}



export const checkout = (payload,setState,props) => {     
        
    setState({isLoading:true})

    // Check Internet Connection
    NetInfo.fetch().then(async(state)=>{
            
        // if internet connected
        if(state.isConnected && state.isInternetReachable){
            let checkVersion = await checkAppVersion();
            
  
            

            //Check if the mobile app is latest.
            if(checkVersion.status){

                // FOR ONE TIME TRANSACTION ONLY
                if(payload.voucherInfo.one_time_transaction == '1'){
                    let cartTotal = payload.cart.reduce((prev, current) => prev + parseFloat(current.totalAmount), 0);
                    let checkBalance = payload.voucherInfo.amount_val  - cartTotal;                    
             
                    if(checkBalance <=  0){
                        setState({isLoading:false})
                        props.navigation.navigate(constants.ScreenNames.TRANSACTION_STACK.UPLOAD_ATTACHMENTS,payload)
                    }else{
                        Toast.show({
                            type:'error',
                            text1:'Message!',
                            text2:`Please consume the full amount of the voucher.`
                        })
                        setState({isLoading:false})
                    }
                }else{
                    setState({isLoading:false})
                    props.navigation.navigate(constants.ScreenNames.TRANSACTION_STACK.UPLOAD_ATTACHMENTS,payload)
                }

            }else{
                setState({isLoading:false})
                console.warn(checkVersion);
  
            }
                        
        }else{
            setState({isLoading:false})
            //  No internet Connection
            Toast.show({
                type:'error',
                text1:'No internet Connection!'
            })
  
        }
    });

}









export const openUploadSelection = (payload,setState) => {     
    setState({showSelection:true,documentName:payload.documentName});  
}

export const openCamera = (payload,setState)=>{
    
    setState({showProgress:true,loadingTitle:'Opening the camera'});
    // Check Internet Connection
    NetInfo.fetch().then(async(state)=>{
            
        // if internet connected
        if(state.isConnected && state.isInternetReachable){
            let checkVersion = await checkAppVersion();
            
  
            //Check if the mobile app is latest.
            if(checkVersion.status){
                
                let checkLocation =    await getLocation();
             
                //Check if location was turn on
                if(checkLocation){
                
                    let openUpCamera = await launchCamera({
                        mediaType: 'photo',
                        includeBase64: true, 
                        quality:0.5                   
                    });
                      

                    // camera function
                    if (!openUpCamera.didCancel) {

                        
                        let {assets} = openUpCamera;

                        assets.map(async(cameraResponse)=>{
                            
                            // set latitude longitude
                            setState({latitude:checkLocation.latitude,longitude:checkLocation.longitude,loadingTitle:'Loading'})
                            
                            // check if image is jpeg format
                            if(cameraResponse.type == 'image/jpeg' || cameraResponse.type == 'image/jpg') {
                                // rotate image
                                let rotatedImage = await rotateImage(cameraResponse.base64);
                                // get geo tag
                                let base64_uri_exif = await geotagging(rotatedImage,checkLocation);

                                payload.attachments.map((item, index) => {                
                                    if (payload.documentName == 'Other Documents' && item.name == 'Other Documents') {
                    
                                        
                                        let attachmentState = [...payload.attachments];
                                        attachmentState[index].file.push(base64_uri_exif);
                                        
                                        setState({attachments:attachmentState})
                                    }else if (payload.documentName == item.name) {
                    
                                        
                                        let attachmentState = [...payload.attachments];
                                        attachmentState[index].file = base64_uri_exif;
                                        
                                        setState({attachments:attachmentState})
                                    } else if (payload.documentName == item.name + "(front)") {
                                        //set file of front page of id
                                        let attachmentState = [...payload.attachments];
                                        attachmentState[index].file[0].front = base64_uri_exif;
                                        
                                        setState({attachments:attachmentState})
                                    } else if (payload.documentName == item.name + "(back)") {
                                        // set file of back page of id
                                        let attachmentState = [...payload.attachments];
                                        attachmentState[index].file[0].back = base64_uri_exif;                
                                        setState({attachments:attachmentState})
                                    }
                                });

                                setState({showProgress:false,showSelection:false});
                            }else{
                                
                                Toast.show({
                                    type:'error',
                                    text1:'Warning!',
                                    text1:'Your captured image is not in jpeg format'
                                })                        
                                setState({showProgress:false,loadingTitle:'Loading',showSelection:false});
                            }

                        })
                       
                    }else{
                        setState({showProgress:false,loadingTitle:'Loading',showSelection:false});
                    }

                }else{
                    Toast.show({
                        type:'error',
                        text1:'Message!',
                        text1:'Please open your location services.'
                    })  
                    setState({showProgress:false,loadingTitle:'Loading',showSelection:false});
                }
            }
                        
        }else{
            //  No internet Connection
            Toast.show({
                type:'error',
                text1:'No internet Connection!'
            })
  
            setState({showProgress:false,loadingTitle:'Loading',showSelection:false});
        }
    });
}



export const openGallery = (payload,setState)=>{
    
    setState({showProgress:true,loadingTitle:'Opening the gallery'});
    // Check Internet Connection
    NetInfo.fetch().then(async(state)=>{
            
        // if internet connected
        if(state.isConnected && state.isInternetReachable){
            let checkVersion = await checkAppVersion();
            
  
            //Check if the mobile app is latest.
            if(checkVersion.status){
                
                let checkLocation =    await getLocation();
             
                //Check if location was turn on
                if(checkLocation){
                
                    let openUpCamera = await launchImageLibrary({
                        mediaType: 'photo',
                        includeBase64: true, 
                        quality:0.5                   
                    });
                      

                    // camera function
                    if (!openUpCamera.didCancel) {

                        
                        let {assets} = openUpCamera;

                        assets.map(async(cameraResponse)=>{
                            
                            // set latitude longitude
                            setState({latitude:checkLocation.latitude,longitude:checkLocation.longitude,loadingTitle:'Loading'})
                            
                            // check if image is jpeg format
                            if(cameraResponse.type == 'image/jpeg' || cameraResponse.type == 'image/jpg') {
                                // rotate image
                                let rotatedImage = await rotateImage(cameraResponse.base64);
                                // get geo tag
                                let base64_uri_exif = await geotagging(rotatedImage,checkLocation);

                                payload.attachments.map((item, index) => {                
                                    if (payload.documentName == 'Other Documents' && item.name == 'Other Documents') {
                    
                                        
                                        let attachmentState = [...payload.attachments];
                                        attachmentState[index].file.push(base64_uri_exif);
                                        
                                        setState({attachments:attachmentState})
                                    }else if (payload.documentName == item.name) {
                    
                                        
                                        let attachmentState = [...payload.attachments];
                                        attachmentState[index].file = base64_uri_exif;
                                        
                                        setState({attachments:attachmentState})
                                    } else if (payload.documentName == item.name + "(front)") {
                                        //set file of front page of id
                                        let attachmentState = [...payload.attachments];
                                        attachmentState[index].file[0].front = base64_uri_exif;
                                        
                                        setState({attachments:attachmentState})
                                    } else if (payload.documentName == item.name + "(back)") {
                                        // set file of back page of id
                                        let attachmentState = [...payload.attachments];
                                        attachmentState[index].file[0].back = base64_uri_exif;                
                                        setState({attachments:attachmentState})
                                    }
                                });

                                setState({showProgress:false,showSelection:false});
                            }else{
                                
                                Toast.show({
                                    type:'error',
                                    text1:'Warning!',
                                    text1:'Your captured image is not in jpeg format'
                                })                        
                                setState({showProgress:false,loadingTitle:'Loading',showSelection:false});
                            }

                        })
                       
                    }else{
                        setState({showProgress:false,loadingTitle:'Loading',showSelection:false});
                    }

                }else{
                    Toast.show({
                        type:'error',
                        text1:'Message!',
                        text1:'Please open your location services.'
                    })  
                    setState({showProgress:false,loadingTitle:'Loading',showSelection:false});
                }
            }
                        
        }else{
            //  No internet Connection
            Toast.show({
                type:'error',
                text1:'No internet Connection!'
            })
  
            setState({showProgress:false,loadingTitle:'Loading',showSelection:false});
        }
    });
}


export const goToReviewTransaction = (payload,setState,props) => {     
    setState({showProgress:true});

    // Check Internet Connection
    NetInfo.fetch().then(async(state)=>{
            
        // if internet connected
        if(state.isConnected && state.isInternetReachable){
            let checkVersion = await checkAppVersion();
            
  


            //Check if the mobile app is latest.
            if(checkVersion.status){

                let noAttachmentCount = 0 ;
                payload.attachments.map((item) => {
                  if (item.name == "Valid ID") {
                    if (item.file[0].front == null) {
                        noAttachmentCount++;
                    }
                    if (item.file[0].back == null) {
                        noAttachmentCount++;
                    }
                  } else {                    
                    if (item.file == null) {
                        noAttachmentCount++;
                    }       
                  }
                });



                if(noAttachmentCount == 0){    
                    setState({showProgress:false});
                    props.navigation.navigate(constants.ScreenNames.TRANSACTION_STACK.REVIEW_TRANSACTION,payload)
                }else{
                    setState({showProgress:false});
                    Toast.show({
                        type:'error',
                        text1:'Message',
                        text2:'Please complete all the required attachments'
                    })

                  }


                
            }else{
                setState({showProgress:false});
                console.warn(checkVersion);
  
            }
                        
        }else{
            //  No internet Connection
            Toast.show({
                type:'error',
                text1:'No internet Connection!'
            })
            setState({showProgress:false});
        }
    });

}






export const transact = (payload,setState,props) => {     
    
    setState({showConfirm:false,showProgress:true});

    // Check Internet Connection
    NetInfo.fetch().then(async(state)=>{
            
        // if internet connected
        if(state.isConnected && state.isInternetReachable){
            let checkVersion = await checkAppVersion();
            
  


            //Check if the mobile app is latest.
            if(checkVersion.status){
        
                payload.userId = await GET_SESSION('USER_ID');
                payload.supplierName = await GET_SESSION('FULL_NAME');
                
                let cleanCart = [];
                payload.cart.map((item)=>{

                    cleanCart.push({
                        sub_id: item.sub_id,                        
                        name: item.name,
                        unitMeasurement: item.unitMeasurement ,           
                        totalAmount: item.totalAmount,
                        quantity: item.quantity,                        
                        category: item.category,
                        subCategory: item.subCategory,            
                        cashAdded: item.cashAdded
                    })

                })

                payload.cart = cleanCart;
                payload.transactionTotalAmount = cleanCart.reduce((prev, current) => prev + parseFloat(parseFloat(current.totalAmount) + parseFloat(current.cashAdded)), 0).toFixed(2);


                console.warn(payload.longitude);
                
                POST(`${getBaseUrl().accesspoint}${constants.EndPoints.TRANSACT_VOUCHER}`,payload).then((response)=>{  
                    
                    console.warn(response.data)

                    if(response.data.status == true){
                        
                        
          
                        Toast.show({
                            type:'success',
                            text1:'Success!',
                            text2: response.data.message
                        })

                        BackgroundTimer.clearTimeout(payload.timer);         

                        
                    

                        setState({showConfirm:false,showProgress:false});
                        
                        props.navigation.reset({
                            index: 0,
                            routes: [{ name: constants.ScreenNames.APP_STACK.MAIN_TAB }]
                        });
                    }else{

                        //  No internet Connection
                        Toast.show({
                            type:'error',
                            text1:'error!',
                            text2: response.data.message
                        })
                        setState({showConfirm:false,showProgress:false});
                    }
                    
                }).catch((error)=>{
                    console.warn(error.response)
                     //  No internet Connection
                    Toast.show({
                        type:'error',
                        text1:'error!',
                        text2:error.response
                    })
                    setState({showConfirm:false,showProgress:false});
                });
                
                
            }else{

                console.warn(checkVersion);
                setState({showConfirm:false,showProgress:false});
            }
                        
        }else{
            //  No internet Connection
            Toast.show({
                type:'error',
                text1:'No internet Connection!'
            })
            setState({showConfirm:false,showProgress:false});
  
        }
    });

}