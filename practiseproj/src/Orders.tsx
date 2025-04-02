import {Link } from "react-router-dom"
import { memo, useContext } from "react";
import { cartcontext } from "./Cartprovider";

const Orders = () => {
    const {orders}=useContext(cartcontext)

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg pt-10">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6 mt-4">Your Orders</h2>
            {orders.length > 0 ? (
                <ul className="space-y-6 ">
                    {orders.map((order: any, index: number) => (
                        <li key={index} className="p-4 border rounded-lg bg-gray-100 shadow-md grid grid-cols-2 text-center gap-5">
                            <p className="text-lg font-medium text-gray-700">
                                <span className="font-bold">Order ID:</span> {order.orderid}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-bold">Total Price:</span> ${order.totalprice}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-bold">Date:</span> {new Date(order.date).toLocaleString()}
                            </p>
                            <p className={`font-bold mt-2 ${
                                order.status === "pending"
                                    ? "text-yellow-500"
                                    : order.status === "Delivered"
                                    ? "text-green-500"
                                    : "text-red-500"
                            }`}>
                                Status: {order.status}
                            </p>
                            <p className="text-gray-600">
                            <span className="font-bold">Total items : </span> {order.cartitems.length}
                            </p>
                                <Link to ={`/orders/${order.orderid}`}><button className="rounded-2xl bg-gray-300 p-2 m-2 hover:bg-gray-600 ">View details</button></Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-gray-600 text-lg">No orders yet.</p>
            )}
        </div>
    );
};

export default memo(Orders);
