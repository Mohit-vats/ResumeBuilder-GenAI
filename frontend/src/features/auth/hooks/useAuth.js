import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { registerUser,loginUser,logoutUser,getME } from "../services/auth.api";

export const authUser = () =>{
    const context = useContext(AuthContext);
    const {  user, setUser, loading, setLoading } = context;

    const handleRegister = async (username,email,password) =>{
        setLoading(true);
        try{
            const data = await registerUser(username,email,password);
            setUser(data.user)
            return data;
        } catch(error){
            console.error("Error registering user:", error);
        }finally{
            setLoading(false);
        }
    }

    const handleLogin = async (email,password) =>{
        setLoading(true);
        try{
            const data = await loginUser(email,password);
            setUser(data.user)
            return data.user;
        } catch(error){
            console.error("Error logging in user:", error);
        }finally{
            setLoading(false);
        }
    }

    const handleLogout = async () =>{
        setLoading(true);
        try{
            const data = await logoutUser();
            setUser(null)
        } catch(error){
            console.error("Error logging out user:", error);
        }finally{
            setLoading(false);
        }
    }

    // const handleGetME = async () =>{
    //     setLoading(true);
    //     const data = await registerUser();
    //     setUser(data.user);
    //     setLoading(false);
    // }

    return {user,loading,handleRegister,handleLogin,handleLogout};
}

