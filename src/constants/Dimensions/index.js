import { Dimensions, PixelRatio } from 'react-native';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').width;    


const vw = (width)=>( (screenWidth / 100 ) * width);
const vh = (height)=>( (screenHeight / 100 ) * height)

export default {vw,vh};
