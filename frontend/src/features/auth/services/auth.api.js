import axios from "axios";

const auth_api =axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true
});

export const registerUser = async (username,email,password) =>{
    try{
        const response = await auth_api.post(`/register`, { username, email, password });
        return response.data;
    }catch(error){
        console.log(error)
        return { user:null, message: error.response?.data?.message  }
    }
}

export const loginUser = async (email,password) =>{
    try{
        const response = await auth_api.post(`/login`, { email, password });
        return response.data;
    }catch(error){
        console.log(error);
        return { user:null, message: "Error logging in user" }
    }
}

export const logoutUser = async () =>{
    try{
        const response = await auth_api.post(`/logout`, {});
        return response.data;
    }catch(error){
        console.log(error)
    }
}

export const getME = async()=>{
    try{
        const response = await auth_api.get(`/get-me`);
        return response.data;
    }catch(error){
        console.log(error)
    }
}
