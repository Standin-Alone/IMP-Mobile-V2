import AsyncStorage from '@react-native-async-storage/async-storage';
const setSession = async function (
    name,
    data
){

    try {
         await AsyncStorage.setItem(name, JSON.stringify(data))

      
      } catch (e) {
        // saving error
        return e;
      }

    return true;
}   


const getSession = async function  (
name    
){
    try {

        const value = await AsyncStorage.getItem(name);        
         
        return JSON.parse(value);
        
      } catch (e) {
        // saving error
        return e;
      }    
}   


const clearSession = async function  (
 
  ){
      try {
  
          await AsyncStorage.clear();
          
        } catch (e) {
          // saving error
          return e;
        }    
  }   

  
export {setSession,getSession,clearSession};