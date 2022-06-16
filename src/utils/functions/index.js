
import NetInfo from "@react-native-community/netinfo";
import getBaseUrl from '../config';
import constants from '../../constants';
import Toast from 'react-native-toast-message';
import {POST} from '../axios';
import {SET_SESSION,GET_SESSION} from '../async_storage';
import DeviceInfo from 'react-native-device-info';
import ImageResizer from 'react-native-image-resizer';
import Geolocation from '@react-native-community/geolocation';
import {  dump, insert,ImageIFD,GPSIFD,ExifIFD,GPSHelper} from "piexifjs";
import * as RNFS from 'react-native-fs';
import AwesomeAlert from 'react-native-awesome-alerts';
import BackgroundTimer from 'react-native-background-timer';
export const backgroundTime = (timer,props)=>{

    return BackgroundTimer.setTimeout((res) => { 

    BackgroundTimer.clearTimeout(this)      
    
    Toast.show({
        type:'error',
        text1:'Message',
        text2:'The transaction time is already ended.' 
    })

    props.navigation.reset({
        index: 0,
        routes: [{ name: constants.ScreenNames.BOTTOM_TABS.HOME }]
      });                                                                
  }, 
  timer
)}

export const checkAppVersion = async ()=>{
    
   
    let  result = false;


    let cleanPayload = {
        version:DeviceInfo.getVersion()
    };

    

    // Check Internet Connection
    await  NetInfo.fetch().then(async (state)=>{
        
         // if internet connected
         if(state.isConnected && state.isInternetReachable){
                
            // POST REQUEST
           await  POST(`${getBaseUrl().accesspoint}${constants.EndPoints.CHECK_APP_VERSION}`,cleanPayload).then((response)=>{                    
                  
                if(response.data.status == true){
                                        
                    result = { status: response.data.status};   
                }else{
                    
                    Toast.show({
                        type:'info',
                        text1: 'Information',
                        text2:response.data.message,
                    });
                    result = { status: response.data.status,message:response.data.message};                 
                }
               
                
            }).catch((error)=>{
                console.warn(error.response)                
                
                Toast.show({
                    type:'error',
                    text1:'Something went wrong!',
                    text2:error.response
                });
    
                result = { status: false,message:error.response};                 
            });

         }else{
             //  No internet Connection
            Toast.show({
                type:'error',
                text1:'No internet Connection!'
            })

            result = { status: false};    
            
         }
    });


    return result;
    
}



export const  rotateImage = async (uri) =>{

    const rotated_image                   = await   ImageResizer.createResizedImage('data:image/JPEG,'+uri, 1920, 1080, 'JPEG', 50, 90, RNFS.DocumentDirectoryPath);
    const convert_rotated_image_to_base64 = await RNFS.readFile(rotated_image.uri,'base64');
  
    return convert_rotated_image_to_base64;
  }

  
export const  getLocation = async (uri) =>{
    return new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition((position) =>{            
            const {latitude, longitude,altitude} = position.coords;
            resolve({
                latitude:latitude,
                longitude:longitude,
                altitude:altitude,
                code:position.code
            });
        },(error) => {
            
            if(error.code == 2){
                // Toast.show({
                //     type:'error',
                //     text1: 'Warning',
                //     text2: 'Please turn on your location services.'
                // });
            }
            resolve(error);

        },{ enableHighAccuracy: false})
    });
}




// GEO TAGGING
export const geotagging = (response,param_loc)=>{

     let zeroth = {};
     let gps = {};
     let exif = {};
     zeroth[ImageIFD.Make] = "Make";
     exif[ExifIFD.LensMake] = "LensMake";     
     gps[GPSIFD.GPSLatitude] = GPSHelper.degToDmsRational(param_loc.latitude);
     gps[GPSIFD.GPSLongitude] = GPSHelper.degToDmsRational(param_loc.longitude);
     gps[GPSIFD.GPSAltitude] = param_loc.altitude;
     gps[GPSIFD.GPSLatitudeRef] = param_loc.latitude < 0 ? 'S' : 'N';
     gps[GPSIFD.GPSLongitudeRef] = param_loc.longitude < 0 ? 'W' : 'E';
 
     let exifObj = { "0th":zeroth,"Exif":exif, "GPS":gps};
     let exifBtyes = dump(exifObj);
     let newBase64 = insert(exifBtyes,'data:image/jpeg;base64,'+response);    
 
     return newBase64.replace('data:image/jpeg;base64,','');
             
}