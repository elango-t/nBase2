import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { cartcontext } from "./Cartprovider";

const ViewOrder = () => {
    const { orders } = useContext(cartcontext);
    const { orderid } = useParams();  
    const navigate = useNavigate()
    const order = orders?.find((i: any) => i.orderid === Number(orderid));
    
    if (!order) {
        return (
            <div className="text-center mt-10">
                <h2 className="text-2xl font-bold text-red-500">Order Not Found</h2>
                <button onClick={() => navigate(-1)} className="mt-4 px-4 py-2 bg-gray-700 text-white rounded-md">
                    Back to Orders
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-30">
            <div className="flex flex-col justify-around items-center mb-10 shadow-2xl p-10 gap-3">
                <h1 className="text-2xl font-bold mb-4">Order Details</h1>
                <p><strong className="text-gray-700 text-xl">Order ID:</strong> {order.orderid}</p>
                <p><strong className="text-gray-700 text-xl">Date:</strong> {new Date(order.date).toLocaleString()}</p>
                <p><strong className="text-gray-700 text-xl">Total Price:</strong> ${order.totalprice}</p>
                <p ><strong className="text-gray-700 text-xl">Status : </strong><span className={`text-bold ${
                    order.status=="pending" ? "text-yellow-600" :
                    order.status=="Delivered" ? "text-green-300" :
                    "text-red-600"
                }`}>{order.status}</span></p>
            </div>
                <h1 className=" font-semibold mt-20 text-3xl mb-10">Ordered Items</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {order.cartitems.map((item: any) => (
                    <div key={item.id} className="border p-4 rounded-lg shadow-sm flex items-center">
                        <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-md" />
                        <div className="ml-4">
                            <p className="font-bold">{item.title}</p>
                            <p>${item.price}</p>
                        </div>
                    </div>
                ))}
            </div>

            <button 
                className="mt-6 px-4 py-2 bg-gray-700 text-white rounded-md"
                onClick={() => navigate(-1)}
            >
                Back to Orders
            </button>
        </div>
    );
};

export default ViewOrder;
