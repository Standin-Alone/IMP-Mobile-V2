import { setSession,getSession,clearSession } from "./model";

export const SET_SESSION = async (name,value) => {
    return new Promise(function (resolve) {
        resolve(setSession(name, value));
    });
}





export const GET_SESSION = async (value) => {
 
        return new Promise(function (resolve) {
            resolve(getSession(value));
        });
    
}


export const CLEAR_SESSION = async (value) => {
 
    return new Promise(function (resolve) {
        resolve(clearSession(value));
    });

}
