import * as nodeFetch from "node-fetch";
import axios from 'axios';

export const getLoginToken =async (username,password) =>{
    const response = await nodeFetch('http://localhost:2221/api/login',{
        method: "POST",
        body: JSON.stringify({"username": username, "password": password})
    })
    if (response.status !==200){
        console.log(response)
        throw new Error("Some incorrect response status received")
    }
    const body = await response.json()
    return body.token
}

//Rewritten the same but using Axios
// export const getLoginToken =async (username,password) =>{                         
//     try{
//     const response = await axios.post('http://localhost:2221/api/login',{
//        username: username, password: password
//     })
//     return response.data.token
//     }
//     catch (e) {throw new Error("Some incorrect response status received "+e)}
// }