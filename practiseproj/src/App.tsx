import { BrowserRouter,Routes,Route } from "react-router-dom";
import { doc, getDoc} from "firebase/firestore";
import {db} from "./firebaseConfig"
import { createContext,useEffect,useState } from "react";
import Navbar from "./Navbar"
import Products from "./Products"
import Orders from "./Orders";
import ViewOrder from "./ViewOrder";
import Signup from "./Signup"
import Login from "./Login"
import {Cartprovider} from "./Cartprovider"
import Cart from "./Cart"
import Admin from "./Admin";
import ProtectedRoute from "./Protectedroute";
import AuthProvider from "./authProvider";


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
}[];

type producttype={
    products:product ;
    setproducts:React.Dispatch<React.SetStateAction<product >>;
}

const constantscontext=createContext<producttype>({
    products:[],
    setproducts:()=>{}
});

const App=()=>{
    const [products,setproducts]=useState<product>([]);
    useEffect(() => {
        const fetchCart = async () => {
            try {
               
                const cartsnap = await getDoc(doc(db, "constants","1"));
                const products = cartsnap.data();
                setproducts(products?.constants);
                
                } catch (err) {
            }
        };
        fetchCart();
    }, []);
        
          
        return(<>
            <BrowserRouter>
            <AuthProvider>
            <Cartprovider>
            <constantscontext.Provider value={{products,setproducts}}>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Products/>}/>
                <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
                <Route path="/orders/:orderid" element={<ProtectedRoute><ViewOrder /></ProtectedRoute>} />
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/login" element={<Login/>}/>   
                <Route path="/admin" element={<Admin/>}/>         
                </Routes>
            </constantscontext.Provider>
            </Cartprovider>
            </AuthProvider>
            </BrowserRouter>
        </>
        )
}
export default App;
export  {constantscontext}