import { Dimensions, PixelRatio } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').width;    


const vw = (width)=>( (screenWidth / 100 ) * width);
const vh = (height)=>( (screenHeight / 100 ) * height)

const normalizeFontSize = (fontSize)=>( RFValue(fontSize))


export default {vw,vh,normalizeFontSize};
