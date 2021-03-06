/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-unused-vars */
 
import React ,{createContext,useState,useEffect,useRef} from 'react' ;
import {User} from '../Service/User.service';
import Loading from '../Component/LoadingPage/LoadingPage'



export const AuthContext = createContext();

export default ({children})=>{
    const [user,setUser]=useState("");
    const [isAuthenticated,setisAuthenticated]=useState(false);
    const [isLoaded,setIsloaded]=useState(false);
    const [info,setinfo]= useState(false);
    
    useEffect(()=>{
        setIsloaded(true);
        User.Info().then(data=>{
//            if(!data.data) return;
            setUser(data.data?data.data.user:false || false);
            setisAuthenticated(data.data?data.data.isAuthenticated :false || false);
            setIsloaded(false);
        })
        const timer = setTimeout(() => {
            setIsloaded(false);
          },3500);
        return () => clearTimeout(timer);
    },[])

    return (
        <div>
        {isLoaded? <Loading/>:
        <AuthContext.Provider value={{user,setUser,isAuthenticated,setisAuthenticated,info,setinfo, isLoaded,setIsloaded}}>
            {children}
        </AuthContext.Provider>
        }
        </div>
    )
}
