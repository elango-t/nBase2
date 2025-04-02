import { doc, setDoc } from "firebase/firestore";
import { cartcontext } from "./Cartprovider";
import { useContext } from "react";
import { useAuth } from "./authProvider";
import { db } from "./firebaseConfig";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type orders={   
    orderid:number,
    totalprice:number,
    date:string,
    status:"pending" | "Delivered" | "Cancelled",
    cartitems:cart
}[]
type cart={
    id:number,
    title:string,
    price:number,
    image:string
}[];

function Cart(){
    // const navigate = useNavigate();
    const {cart,setCart,setorders,removefromcart}=useContext(cartcontext)
    const {user}=useAuth()
    
    let sum=0;
    const calcualtetotal=(cart:cart):number=>{
        cart.forEach((item)=>sum+=item.price)
        return sum;
    }
    let totalItems=0,totalPrice=0;
    cart.forEach((item:any)=>{
        totalItems+=1;
        totalPrice+=item.price
    })

    function Checkout(){
        const order = {
            orderid: Date.now(), 
            totalprice: calcualtetotal(cart), 
            date: new Date().toISOString(), 
            status: "pending" as "pending" | "Delivered" | "Cancelled", 
            cartitems: cart
        };
        try{
            let updatedorders: orders = [];
            setorders((prevorders: orders) => {
                updatedorders = [...(prevorders || []), order]; 
                return updatedorders;
            });
            if(user && updatedorders?.length>0){
            setDoc(doc(db,"users",user.uid,"orders","userorder"),{orders:updatedorders})
            setDoc(doc(db,"users",user.uid,"cart","usercart"), { cart: [] })
            setCart([]);}}
        catch(err){
            console.log(err)
        }
            setTimeout(() => {
                
                toast.success(
                    <>
                    <p><strong>Order ID:</strong> {order.orderid}</p>
                    <p><strong>Total Price:</strong> ${order.totalprice}</p>
                    <p><strong>Estimated Delivery:</strong> {new Date(new Date().setDate(new Date().getDate() + 5)).toISOString().split("T")[0]}</p>
                  </>,
                    {
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
                  );
                  
            },1000);
        
    }
   
    return(
        <div className="flex justify-center items-center flex-wrap">
            {cart.length>0?(
            <><div className="flex flex-wrap justify-around gap-5 pt-20">

                    {cart.map((item: any, index: number) => (
                        <div key={index} className="flex  flex-col gap-1 justify-around w-80 bg-amber-100 p-4 border-2 m-4 rounded-xl">
                            <img src={item.image} className="w-50 h-50 rounded-xl m-5"></img>
                            <p className="font-bold text-2xl text-blue-400">{item.title}</p>
                            <p className="font-bold">${item.price}</p>
                            <button onClick={() => removefromcart(item)} className="bg-amber-950 rounded-2xl text-amber-50 m-2 p-2 hover:bg-amber-900">Remove from cart</button>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col p-8 bg-amber-200 mt-15 m-20 rounded-2xl border-2 drop-shadow-2xl">
                        <p className="text-gray-700 text-xl font-bold mb-2">Total Items: {totalItems}</p>
                        <p className="text-gray-700 text-xl font-bold mb-5">Total Price: {totalPrice}</p>
                        <button className="p-1 bg-amber-950 text-amber-50 hover:bg-amber-500 rounded-2xl m-3" onClick={Checkout}>Checkout</button>
                </div></>):(
                <div className="flex justify-center items-center">
                     <h1 className="m-80 text-3xl font-bold p-4 text-red-700">No items in cart</h1>
                </div>
            )}
            <ToastContainer/>
        </div>
    )
}
export default Cart;