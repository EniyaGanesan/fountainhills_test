import {Inter} from "next/font/google";
import Link from "next/link";
import Image from "next/Image";
import {useContext, useEffect, useState} from "react";
import axios from "axios"
import {ShareDataContext} from "@/components/context";

const inter = Inter({subsets: ["latin"]});

export default function Home() {
    const [productDataFetch, setProductDataFetch] = useState([]);
    const [productData, setProductData] = useState([]);
    const [cartData, setCartData] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const {updateData} = useContext(ShareDataContext);
    useEffect(() => {
        dataFetch();
    }, []);
    useEffect(() => {
        if (cartData)
            updateData(cartData);
    }, [productData, productDataFetch, cartData]);
    useEffect(() => {
        if (searchValue === "") {
            setProductData(productDataFetch);
        }
    }, [searchValue])

    async function dataFetch() {
        axios("https://fakestoreapi.com/products")
            .then(response => {
                if (response.status === 200)
                    setProductDataFetch(response.data)
                setProductData(response.data)
            })
            .catch(err => console.log(err));
    }

    function handleFilter(event) {
        let value = document.getElementById("search").value;
        setSearchValue(value);
        let filterdData = [];
        productDataFetch.filter(function (row) {
            console.log(JSON.stringify(row).toLowerCase().includes(value.toLowerCase())) //Searches everything
            if (row.title.toLowerCase().includes(value.toLowerCase())) // search for name
                filterdData.push(row);
        });
        setProductData(filterdData);
    }

    function addProduct(id) {
        let currentData = productDataFetch.filter(function (row) {
            return (row.id === id)
        });
        setCartData((prevItems) => {
            const exists = prevItems.some(item => item.id === id);
            if (!exists) {
                return [...prevItems, currentData[0]];
            }
            return prevItems; // Return the array without duplicate
        });
    }

    return (
        <main
            className={`bg-white flex flex-col items-center justify-between  ${inter.className}`}
        >
            <h1 className={"text-xl text-center text-green-800 font-bold my-8"}>FountainHills Test Next App</h1>
            <div className="z-10 w-full items-center font-mono text-sm max-w-7xl m-4">
                <nav>
                    <div className={"flex w-full justify-between py-8 mb-8"}>
                        <div className={"flex justify-start w-3/4"}>
                            <div className={"flex justify-between w-3/4"}>
                                <input
                                    className={"border-2 border-[#7ba07b] opacity-90 font-medium text-sm rounded-lg block w-full p-2.5 "}
                                    placeholder={"Search for products"} id={"search"} />
                                <button className={"bg-[#7ba07b] text-white mx-4 rounded-lg px-4"}
                                        onClick={handleFilter}>Filter
                                </button>
                            </div>
                        </div>
                        <div className={"flex justify-end "}>
                            <Link href={"/cart"} className={"bg-[#7ba07b] flex justify-center items-center text-center text-white mx-4 rounded-lg px-4"}>
                                <div className="text-sm hover:text-gray-800">Go to Cart</div>
                            </Link>
                        </div>
                    </div>
                </nav>
                <div className={"grid grid-cols-3 gap-8 "}>
                    {productData.map((row, index) => {
                        return (<div key={index} className={"border-2 border-[#b8e0b5] rounded-2xl p-2"}>
                            <div className={"flex justify-center"}><Image className={"w-auto h-[150px]"}
                                                                          objectFit={"contain"} src={row.image}
                                                                          alt={row.title} width={150} height={100}/>
                            </div>
                            <div className={"flex justify-center"}>{row.title}</div>
                            <div className={"flex justify-between"}>
                                <div>Price :{row.price}</div>
                                <div>Left :{row.rating?.count}</div>
                            </div>
                            <div className={"addToCart flex justify-center text-white "}>
                                <button
                                    className={"addToCart flex justify-center bg-[#7ba07b] text-white rounded-lg p-2"}
                                    onClick={() => addProduct(row.id)}> Add to Cart
                                </button>
                            </div>
                        </div>)
                    })}
                </div>
            </div>
        </main>
    );
}
