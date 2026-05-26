import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import axios from 'axios'
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';


export const ShopContext = createContext    

const ShopContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const[token,setToken] = useState('')

    const[products,setProducts] = useState([])

    const currency = "$" ;
    const delivery_fee = 10 ;
    const[search,setSearch] = useState('')
    const[showSearch,setShowsearch] = useState(false)

    const[cartItems,setCartItems] = useState({})
    const navigate = useNavigate()

    const addToCart = async(itemId,size) => {

        if(!size){
            toast.error('Select product size')
            return
        }

        let cartData = structuredClone(cartItems)

        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1
            }else{
                cartData[itemId][size] = 1
            }
        }else{
            cartData[itemId] = {} ;
            cartData[itemId][size] = 1 ;
        }

        setCartItems(cartData)

        if (token) {
            try {
                await axios.post('http://localhost:3000/api/cart/add',{itemId,size}, {headers : {token}})
            } catch (error) {
             console.log(error)
             toast.error(error.message)   
            }
        }
    }

    const updatequantity = async(itemId ,size,quantity) => {
        
        let cartData = structuredClone(cartItems)
        cartData[itemId][size] = quantity
        setCartItems(cartData)

        if (token) {
            try {
                await axios.post('http://localhost:3000/api/cart/update',{itemId,size,quantity} , {headers : {token}})
            } catch (error) {
             console.log(error)
             toast.error(error.message)   
            }
        }
    }

    const getcartcount = () => {
        let totalcount = 0;
        for (const itemId in cartItems) {
            for (const size in cartItems[itemId]) {
                try {
                    if (cartItems[itemId][size] > 0) {
                        totalcount += cartItems[itemId][size];
                    }
                } catch (error) {
                    console.error("Error accessing cart data:", error);
                }
            }
        }
        return totalcount;
    };

    const getCartAmount = () => {
        let totalamount = 0;
        for (const items in cartItems) {
            let iteminfo = products.find((product) => product._id === items);
            if (!iteminfo) continue; // Skip if product not found
    
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalamount += iteminfo.price * cartItems[items][item];
                    }
                } catch (error) {
                    console.error("Error calculating total:", error);
                }
            }
        }
        return totalamount;
    };

    const getProductData = async() => {
        try {
            const response = await axios.get('http://localhost:3000/api/products/listproduct')
            if (response.data.success) {
                setProducts(response.data.products)
            }else{
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getUserCart = async(token) => {
        try {
            const response = await axios.post('http://localhost:3000/api/cart/get', {}, { headers:{token}}) 
            if(response.data.success){
                setCartItems(response.data.cartData)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        getProductData()
    },[])
    
            useEffect(()=>{
                if(!token && localStorage.getItem('token')){
                    setToken(localStorage.getItem('token')) ;
                    getUserCart(localStorage.getItem('token')) ;
                }
            },[])
    

    const value = {
        products,currency,delivery_fee,
        search,setSearch,showSearch,setShowsearch,
        cartItems,addToCart,setCartItems,
        getcartcount,updatequantity,
        getCartAmount,
        navigate,
        backendUrl,
        setToken,token
    }

    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider