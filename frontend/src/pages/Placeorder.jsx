import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import { data } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const Placeorder = () => {

  const[method,setMethod] = useState("COD")
  const{ navigate ,backendUrl, token, setCartItems,cartItems,getCartAmount,delivery_fee,products } = useContext(ShopContext)

  const[formData,setFormData] = useState({
    firstName:'',
    lastName:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zipcode:'',
    country:'',
    phone:''
  })

  const onChangeHandler =(e) => {
    const name = e.target.name
    const value = e.target.value

    setFormData(data => ({...data,[name]:value}))
  }

  const onSubmitHandler = async(e) => {
    e.preventDefault(); 
  
    console.log("Form submitted");
    console.log("Form Data:", formData);
    console.log("Cart Items:", cartItems);
    console.log("Method:", method);
  
    try {
      let orderItems = [];
  
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items));
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
  
      let orderData = {
        address : formData,
        items : orderItems,
        amount : getCartAmount() + delivery_fee,
      };
  
      console.log("Order Data:", orderData);
  
      switch (method) {
        case 'COD':
          const response = await axios.post('http://localhost:3000/api/order/cod', orderData, 
            { headers:{ token }}
          );
          console.log("Response Data:", response.data);
  
          if(response.data.success){
            setCartItems({});
            navigate('/orders');
            toast.success('Order placed successfully!');
            console.log('order placed')
          } else {
            toast.error(response.data.message);
            console.log("error")
          }
          break;
  
        default:
          break;
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error(error.message);
    }
  };
  ;
  
  
  
  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>

      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>

        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'}/>
        </div>

        <div className='flex gap-3'>
          <input type="text" onChange={onChangeHandler} name='firstName' value={formData.firstName} placeholder='First Name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full'required />
          <input type="text" onChange={onChangeHandler} name='lastName' value={formData.lastName} placeholder='Last Name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' required />
        </div>

        <input type="email" onChange={onChangeHandler} name='email' value={formData.email} placeholder='E-mail address' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' required />
        <input type="text" onChange={onChangeHandler} name='street' value={formData.street} placeholder='street' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' required />

        <div className='flex gap-3'>
          <input type="text" onChange={onChangeHandler} name='city' value={formData.city} placeholder='City' className='border border-gray-300 rounded py-1.5 px-3.5 w-full'required />
          <input type="text" onChange={onChangeHandler} name='state' value={formData.state} placeholder='State' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' required />
        </div>

        <div className='flex gap-3'>
          <input type="number" onChange={onChangeHandler} name='zipcode' value={formData.zipcode} placeholder='Zipcode' className='border border-gray-300 rounded py-1.5 px-3.5 w-full'required />
          <input type="text" onChange={onChangeHandler} name='country' value={formData.country} placeholder='Country' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' required />
        </div>

        <input type="number" onChange={onChangeHandler} name='phone' value={formData.phone} placeholder='Phone' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' required />

      </div>

      {/* -----right side ----- */}
      <div className='mt-8'>

        <div className='mt-8 min-w-80'> 
        <CartTotal/>
        </div>

        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'}/>
          {/* PAYMENT MEETHOD SECTION */}
          <div className='flex gap-3 flex-col lg:flex-row'>

            {/* <div onClick={()=> setMethod("STRIPE")} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5  border rounded-full ${method === 'STRIPE' ? 'bg-green-600' : ""}`}></p>
              <img src={assets.stripe_logo} className='h-5 mx-4' alt="" srcset="" />
            </div> */}

            <div onClick={()=> setMethod("RAZOR")} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5  border rounded-full ${method === 'RAZOR' ? 'bg-green-600' : ""}`}></p>
              <img src={assets.razorpay_logo} className='h-5 mx-4' alt="" srcset="" />
            </div>

            <div onClick={()=> setMethod("COD")} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5  border rounded-full ${method === 'COD' ? 'bg-green-600' : ""}`}></p>
              <p className='text-sm text-gray-500 font-medium mx-4'>CASH ON DELIVERY</p>
            </div> 

          </div>

           {/*ORDER BUTTON  */}

           <div className='w-full text-end mt-8'>
              <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
            </div>
              
        </div>

      </div>
      

    </form>
  )
}

export default Placeorder
