import React, {useContext} from 'react';
import {ShareDataContext} from "@/components/context";
import Image from "next/image";
import AddressDetails from "@/components/AddressDetails";

const Cart = () => {
    const {data} = useContext(ShareDataContext);
    console.log(data)
    return (
        <div className={"max-w-7xl mx-auto"}>
            {data && data.length > 0 && (
                <h1 className={"text-xl text-center text-green-800 font-bold"}> {"Added Items in the cart"}</h1>
            )}
            {data && data.length === 0 && (
                <h1 className={"text-xl text-center text-green-800 font-bold"}>{"No Items in the Cart , kindly add items and fill the details"}</h1>
            )}
            <div className={"grid grid-cols-2 gap-8 "}>
                {data && data.map((row, index) => {
                    return (<div key={index} className={"border-2 border-[#b8e0b5] rounded-2xl p-2"}>
                        <div className={"flex justify-center"}><Image className={"w-auto h-[150px]"}
                                                                      objectFit={"contain"} src={row.image}
                                                                      alt={row.title} width={150} height={100}/>
                        </div>
                        <div className={"flex justify-center"}>{row.title}</div>
                        <div className={"addToCart flex justify-center text-white "}>
                            <button className={"addToCart flex justify-center bg-[#7ba07b] text-white rounded-lg p-2"}
                                    onClick={() => addProduct(row.id)}> Add to Cart
                            </button>
                        </div>
                    </div>)
                })}
            </div>
            {data && data.length > 0 && (
                <AddressDetails/>
            )}
        </div>
    );
};

export default Cart;