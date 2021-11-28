/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-unused-vars */
 
import React ,{createContext,useState,useEffect,useRef} from 'react' ;
import {User} from '../Service/User.service';
import Loading from '../Component/LoadingPage/index'



export const AuthContext = createContext();

export default ({children})=>{
    const [user,setUser]=useState("");
    const [isAuthenticated,setisAuthenticated]=useState(false);
    const [isLoaded,setIsloaded]=useState(false);
    const [info,setinfo]= useState(false);
    
    useEffect(()=>{
        setIsloaded(true);
        User.Info().then(data=>{
            console.log(data.data)
            setUser(data.data.user);
            setisAuthenticated(data.data.isAuthenticated);
        })
        const timer = setTimeout(() => {
            setIsloaded(false);
          }, 1100);
        return () => clearTimeout(timer);
    },[])

    return (
        <div>
        {isLoaded? <Loading/>:
        <AuthContext.Provider value={{user,setUser,isAuthenticated,setisAuthenticated,info,setinfo}}>
            {children}
        </AuthContext.Provider>
        }
        </div>
    )
}