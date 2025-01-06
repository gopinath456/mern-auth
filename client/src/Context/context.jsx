import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export const context=createContext();

export const ContextProvider=(props)=>{
    const backendUrl=import.meta.env.VITE_BACKEND_URL;
    const [isLoggedin,setLoggedin]=useState(false);
    const [userdata,setUserdata]=useState(false);

    const navigate=useNavigate()


    // getting user data
    const userData=async()=>{
      try {
        const backendUrl=import.meta.env.VITE_BACKEND_URL;
        const {data}=await axios.get(backendUrl+'/api/auth/user-verified');
        console.log(data);
        if(data.success)
         setUserdata(data.user);
        else
         toast.error(data.message);
        
      } catch (error) {
        toast.error(error.messagej);
      } 
    }
    
    // checking if user authenticated
    const isAuth=async ()=>{
      try {
        axios.defaults.withCredentials = true;
        const {data}=await axios.get(backendUrl+'/api/auth/is-auth');
        if(data.success){
          setLoggedin(true)
          userData();
        }
          
      } catch (error) {
        toast.error(error.message)
      } 
    }
    
    // logout funtion
    const logout= async ()=>{
      axios.defaults.withCredentials=true;
      try {
        const {data}=await axios.delete(backendUrl+'/api/auth/logout');
      if(data.success){
        setLoggedin(false);
        toast.success(data.message);
        setUserdata(false);
        navigate('/');
      } 
      else
        toast.error(data.message);
        
      } catch (error) {
        toast.error(error.message);
      }
      
    }
    const value={
      backendUrl,
      isLoggedin,setLoggedin,
      userdata,setUserdata,userData,logout
    }
     
    useEffect(()=>{isAuth()},[]);

    return(
        <context.Provider value={value}>
         {props.children}
        </context.Provider>
    )
}
