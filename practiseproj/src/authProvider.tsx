import { createContext, useContext, useEffect, useState } from "react";
import {User,onAuthStateChanged,signOut} from "firebase/auth"
import {auth} from "./firebaseConfig"
// import { cartcontext } from "./Cartprovider";

type authcontexttype={
    user:User |null,
    logout:()=>void
}
const authcontext=createContext<authcontexttype |undefined>(undefined)
const AuthProvider=({children}:{children:React.ReactNode})=>{
    // const [setCart]=useContext(cartcontext)
    const [user,setuser]=useState<User |null>(null)
    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,(currentuser)=>setuser(currentuser));
        return ()=>unsubscribe()
    },[])

    const logout=async()=>{
        await signOut(auth);
        // setCart([])
    }

    return(
        <>
        <authcontext.Provider value={{user,logout}}>
            {children}
        </authcontext.Provider>
        </>
    )

}
const useAuth=()=>{
    const context=useContext(authcontext)
    if(!context){
        throw new Error("Authcontex cannot be accessed outside")
    }
    return context
}
export {useAuth}
export default AuthProvider;