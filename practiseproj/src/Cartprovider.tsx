import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import { doc,getDoc,setDoc } from "firebase/firestore";
import {db} from "./firebaseConfig"
import { useAuth } from "./authProvider";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type product={
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
};
 type productincart={
    id: number;
    title: string;
    price: number;
    image: string;
 }

 
 const cartcontext = createContext<any>(null);

const Cartprovider=({children}:{children:ReactNode})=>{
    const navigate=useNavigate()
    const {user}=useAuth()
    const [cart, setCart] = useState<productincart[]>([])
    const [orders,setorders]=useState([]);

    async function addtocart (Product:product){
        try{
            if(!user) navigate("/") 
            const {id,title,price,image}=Product;
            let updatedCart=[...cart,{id,title,price,image}];
           setCart((prevcart) =>{
                updatedCart=[...prevcart, { id, title, price, image}];
               return  updatedCart;
            } )
            if(user)
            setDoc(doc(db, "users", user.uid, "cart", "usercart"), { updatedCart });
            
            toast.success(
                <>
                <p>Product Addded to cart</p>
                </>,{
                      
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        style: {
                          backgroundColor: "#1e293b",  
                          color: "#facc15",  
                          fontSize: "16px",
                          fontWeight: "bold",
                          borderRadius: "10px",
                          padding: "10px",
                          boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
                        },
                }
            )
        }catch(error){
            console.log(error);
            
        }  
    }
    
    async function removefromcart(item:any){
        try{
            if(!user) navigate("/") 
            const filteredcart=cart.filter((product)=>product.id!==item.id)
            setCart(filteredcart)
            if(user)
            setDoc(doc(db,"users",user?.uid,"cart","usercart"),{filteredcart});
        }catch(err){
            console.log(err);
            
        }
    }

    async function fetchcart(){ 
        try{
            if(!user) navigate("/") 
            if(user){
            const cartsnap= await getDoc(doc(db,"users",user?.uid,"cart","usercart"));
            const ordersnap=await getDoc(doc(db,"users",user?.uid,"orders","userorder"))
            // console.log(ordersnap.data());
            // console.log(cartsnap.data()?.updatedCart);
            
            if(cartsnap.exists()){
                setCart(cartsnap.data()?.updatedCart|| [])
            }
            if(ordersnap.exists()){
                setorders(ordersnap.data()?.orders || [])

            }
        }
        }catch(err){
            console.log(err);
        }
    }
    useEffect(() => {
        fetchcart();
    }, [user])
    const contextvalue=useMemo(()=>({cart,addtocart,setCart,orders,setorders,removefromcart}),[cart])
    return(
        <cartcontext.Provider value={contextvalue}>
            {children}
            <ToastContainer/>
        </cartcontext.Provider>
    )

}

export { cartcontext,Cartprovider }