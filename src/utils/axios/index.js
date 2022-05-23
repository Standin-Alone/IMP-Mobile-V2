import axios from "axios";



const POST = async (
    url,
    data
)=>{
    
    const result = await axios.post(url,data);
    return result;
}   


const GET = async (
url    
)=>{
    const result = await axios.get(url);
    return result;
}   


export {POST,GET};