import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';


const Login = () => {

  const [currentState, setCurrentState] = useState("Login");
  const{ token, setToken, navigate, backendUrl } = useContext(ShopContext)

  const[name,setName] = useState('')
  const[password,setPassword] = useState('')
  const[email,setemail] = useState('')

  const onSubmitHandler = async(e) => {
    e.preventDefault();
    try {
      if(currentState === 'Sign up'){
        const response = await axios.post('http://localhost:3000/api/user/register' , {name,email,password})
        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem('token',response.data.token)
        }else{
          toast.error(response.data.message)
        }
      }else{
        const response = await axios.post('http://localhost:3000/api/user/login', { email, password });
        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
          console.log("Login succesfully")
        }else{
          toast.error(response.data.message)
        }
      }
      
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])

  useEffect(()=>{
    if (!token && localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'))
    }
  },[])

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-6 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>

      {currentState === 'Login' ? null : (
        <input
          onChange={(e)=>setName(e.target.value)}
          value={name}
          type="text"
          className='w-full px-3 py-2 border border-gray-800'
          placeholder='Username'
          required
        />
      )}
      <input
        onChange={(e)=>setemail(e.target.value)}
        value={email}
        type="email"
        className='w-full px-3 py-2 border border-gray-800'
        placeholder='Email'
        required
      />
      <input
        onChange={(e)=>setPassword(e.target.value)}
        value={password}
        type="password"
        className='w-full px-3 py-2 border border-gray-800'
        placeholder='Password'
        required
      />
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forgot password?</p>
        {currentState === 'Login' ? (
          <p className='cursor-pointer' onClick={() => setCurrentState('Sign up')}>Create account</p>
        ) : (
          <p className='cursor-pointer' onClick={() => setCurrentState('Login')}>Log-in here</p>
        )}
      </div>
      <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState === 'Login' ? 'Sign In' : 'Sign up'}</button>
    </form>
  );
};

export default Login;
