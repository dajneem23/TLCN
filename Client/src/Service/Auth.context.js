/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-unused-vars */
 
import React ,{createContext,useState,useEffect,useRef} from 'react' ;
import {User} from '../Service/User.service'


export const AuthContext = createContext();

export default ({children})=>{
    const [user,setUser]=useState(null);
    const [isAuthenticated,setisAuthenticated]=useState(false);
    const [isLoaded,setIsloaded]=useState(false);
    const [info,setinfo]= useState(false);
    
    useEffect(()=>{
        setIsloaded(true);
        User.Info().then(data=>{
            console.log(data)
            setUser(data.user);
            setisAuthenticated(data.isAuthenticated);
        })
        const timer = setTimeout(() => {
            setIsloaded(false);
          }, 1100);
        return () => clearTimeout(timer);
    },[])

    return (
        <div>
        {isLoaded? <h1>loading</h1>:
        <AuthContext.Provider value={{user,setUser,isAuthenticated,setisAuthenticated,info,setinfo}}>
            {children}
        </AuthContext.Provider>
        }
        </div>
    )
}