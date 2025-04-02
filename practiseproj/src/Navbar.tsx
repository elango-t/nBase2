import { memo, useContext, useEffect, useState } from "react";
import profile from "./assets/believe4.jpg"
import { Link ,useLocation,useNavigate} from "react-router-dom"
import { cartcontext } from "./Cartprovider";
import Search from "./Search";
import {useAuth} from "./authProvider"


function Navbar(){
    const navigate=useNavigate()
    const {user,logout}=useAuth()
    const {cart,setCart}=useContext(cartcontext)
    const location =useLocation()
    const [email,setemail]=useState <string | null>(null)
    const [emailtoggle,setemailtoggle]=useState<boolean>(false)

   async function handlelogout(){
    try{
        navigate("/login")
        logout()
        setCart([])
        
    }catch(err){
        console.log(err)
    }
    }
    useEffect(
        ()=>{
            if(user){
                setemail(user.email)
            }
        },[user]
    )
    function toggleemail(){
        setemailtoggle((prev)=>!prev)
    } 
    return (
        <>
        <div className="flex justify-end gap-10 p-5 font-bold font-serif bg-amber-200 items-center fixed w-full z-50 top-0">
            { location.pathname=='/' && <Search/>}
            <Link to="/">Home</Link>
            <Link to = "/cart">Cart {cart.length}</Link>
           <Link to ="/orders">orders</Link>
           {
            user?(
                <button onClick={handlelogout}>Logout</button>
            ):(
                <Link to="/login">Login</Link>
            )
           }
            <img onClick={toggleemail} alt="profile" src={profile} className="w-10 h-10 rounded-full border-1"/>
            {
                emailtoggle && email &&
                <div className="absolute top-12 right-0 p-3 bg-white border rounded shadow-lg">
                <p className="text-black">{email}</p>
            </div>
            }
        </div>
        </>
    )
}

export default memo(Navbar);