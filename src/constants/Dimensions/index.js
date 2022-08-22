import { Dimensions, PixelRatio,Platform } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').width;    


const vw = (width)=>( (screenWidth / 100 ) * width);
const vh = (height)=>( (screenHeight / 100 ) * height)
// based on iphone 5s's scale
const scale = screenWidth / 320;
// const normalizeFontSize = (fontSize)=>{
//     const newSize = fontSize * scale 
//     if (Platform.OS === 'ios') {
//       return Math.round(PixelRatio.roundToNearestPixel(newSize))
//     } else {
      
//       return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
//     }

// }

const  normalizeFontSize = (size, multiplier = 2) =>{
  const scale = (screenWidth / screenHeight) * multiplier;

  const newSize = size * scale;

  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}




export default {vw,vh,normalizeFontSize};
