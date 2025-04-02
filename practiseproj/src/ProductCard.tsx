import { useContext } from "react";
import { cartcontext } from "./Cartprovider";
import { Link } from "react-router-dom";

function ProductCard(props:any){
    const {addtocart,cart}=useContext(cartcontext)
    function calculatestars(rating:number){
        let stars="";
        stars += '🌟'.repeat(rating);
        return stars;
    }
    const product =props.product;
    const handleclick=props.onClick;
    const presentincart=cart.find((item: { id: any; })=>item.id===product.id)

    return (
        <> 
        <div onClick={()=>{handleclick(product)}} className="flex  flex-col gap-1 justify-around w-80 bg-amber-100 p-4 border-2 m-4 rounded-xl" key={product.id}>
        <p className="font-bold text-2xl text-blue-400">{product.title}</p>
        <img src={product.image} className="w-50 h-50 rounded-xl m-10"></img>
        <p>{calculatestars(product.rating.rate) + " " + product.rating.count+" ratings"}</p>
        <p className="font-bold">${product.price}</p>
        <p className="">{product.description}</p>
        <button onClick={(e) => {
            e.stopPropagation();
            if (!presentincart) {
                addtocart(product);
            }
        }} className="bg-amber-950 rounded-2xl text-amber-50 m-2 p-2 hover:bg-amber-900">
            {presentincart ? <Link to="/cart">Go to Cart</Link> : "Add to Cart"}
        </button>
    </div>
    
        </>
    )
}
export default ProductCard