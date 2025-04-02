import { useContext,useState } from "react";
import { constantscontext } from "./App";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import { cartcontext } from "./Cartprovider";

const Products=()=>{
    const props=useContext(constantscontext)
    const {cart,addtocart}=useContext(cartcontext)

    if(!props) return null;

    const [selected, setselected] = useState<{ id: number; title: string; price: number; image: string; description: string } | null>(null);
    const handleclick: any = (product: any) => {
        setselected(product);
    }
    let presentincart=false;

    if(selected)
         presentincart=cart.find((item: { id: number; })=>item.id===selected.id)?true:false;

    
      return (
            <>
            <div className="flex flex-wrap justify-around gap-5 pt-20 absolute">    
               {props.products.length>=0?(
                   props.products.map((product:any,index:number)=>(
                       <ProductCard key ={index} product={product} onClick={handleclick}/>
                    ))):(
                        <div>No items found</div>
                    )}
            </div>
                    {
                        selected && 
                        <div  onClick={()=>setselected(null)} className="flex backdrop-blur-2xl overscroll-none items-center justify-center bg-transparent fixed w-full h-full rounded-2xl p-5 ">
                            <div   onClick={(e) => e.stopPropagation()} className="flex flex-col items-center bg-white m-50 rounded-2xl p-5 ">
                                <div className="relative w-full ">
                                    <p className="font-bold text-2xl text-blue-400 pr-5">{selected.title}</p>
                                    <button 
                                        className="absolute top-0 right-0 text-gray-600 text-2xl p-2" 
                                        onClick={() => setselected(null)}>
                                        ✖
                                    </button>
                                </div>
                                <img src={selected.image} className="w-50 h-50 rounded-xl m-10"></img>
                                <p className="font-bold">${selected.price}</p>
                                <p className="">{selected.description}</p>
                                <button onClick={presentincart ? () => {} : () => addtocart({
                                    id: selected.id, title: selected.title, price: selected.price, image: selected.image,description: "",category: "",rating: {rate: 0,count: 0}
                                })} className="bg-amber-950 rounded-2xl text-amber-50 m-2 p-2 hover:bg-amber-900">
                                    {presentincart ? <Link to="/cart">Go to Cart</Link> : "Add to Cart"}</button>
                            </div>
                        </div>
                    }
            </>
        )
}
export default Products;