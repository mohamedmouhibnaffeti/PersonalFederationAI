"use client"
import React from "react";
import bg from "@/components/Images/personalityLogin.jpg";
import { useState } from "react";
import { useRouter } from 'next/navigation'
import { LogInIcon } from "lucide-react";
function Login() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const router = useRouter()

  const handleLogin = async (e: any) => {
    e.preventDefault()
    if(username === '' || email === '') return alert("Please fill in all fields")
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: username,
          email: email,
        }),
      })

      if (!response.ok) alert("Login Failed")

      const { token, role } = await response.json()
      document.cookie = `token=${token}; path=/`
      if(role === 'admin') router.push('/')
        else if (role === 'user') router.push('/profile')
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div
      className="fixed h-screen w-full bg-authbg bg-cover bg-center"
      style={{
        backgroundImage: `url(${bg.src})`,
        width: '100%',
      height: '100%',
      }}
    >
      <div className="mx-auto flex flex-col items-center sm:max-w-2xl">
        <div className="mx-auto flex flex-col items-center sm:max-w-2xl">
          <h1 className="relative mx-0 mt-32 max-w-7xl text-balance text-5xl tracking-tighter text-white max-sm:mt-16 max-sm:text-black font-bold sm:text-5xl md:mx-auto md:px-4 md:py-2 md:text-7xl lg:text-5xl">
            {" "}
            Login{" "}
          </h1>
          <div className="z-10 gap-2 flex flex-col p-8 sm:px-12 px-8 mt-4 w-94 py-16 h-full bg-gray-400/10 rounded-xl bg-clip-padding backdrop-filter backdrop-blur-sm border border-gray-200/50">
            <div className="flex items-center justify-center  z-10 w-full flex-col gap-5">
                <div className="relative w-full">
                    <input
                    id="email"
                    name="email"
                    type="text"
                    onChange={(e)=>setEmail(e.target.value)}
                    required
                    className="border-b text-white border-gray-300 py-1 focus:border-b-2 dark:focus:border-gray-200 focus:border-white transition-colors focus:outline-none peer bg-inherit w-full placeholder-transparent"
                    placeholder=" "
                    />
                    <label
                    htmlFor="email"
                    className="text-white absolute left-0 top-1 cursor-text font-medium text- transition-all peer-valid:hidden peer-invalid:block peer-focus:text-sm peer-focus:-top-4 dark:peer-focus:text-gray-200 peer-focus:text-white"
                    >Email Address</label
                    >
                </div>
                <div className="relative w-full">
                  <input
                  id="username"
                  onChange={(e)=>setUsername(e.target.value)}
                  name="username"
                  type="text"
                  required
                  className="border-b text-white border-gray-300 py-1 focus:border-b-2 dark:focus:border-gray-200 focus:border-white transition-colors focus:outline-none peer bg-inherit w-full placeholder-transparent"
                  placeholder=" "
                  />
                  <label
                  htmlFor="username"
                  className="text-white absolute left-0 top-1 cursor-text font-medium text- transition-all peer-valid:hidden peer-invalid:block peer-focus:text-sm peer-focus:-top-4 dark:peer-focus:text-gray-200 peer-focus:text-white"
                  >Username</label
                  >
                </div>
                <button onClick={handleLogin} className="bg-indigo-700 flex text-white w-full justify-center items-center rounded-md py-[0.3rem] gap-2 hover:bg-indigo-800 transition-all duration-150 active:bg-indigo-600"> 
                  Login <LogInIcon className="w-5 h-5" />
                </button>
                <p className="text-sm">
                  By signing in, you agree to our <a href="#" className="text-blue-500">Terms of Service</a> and <a href="#" className="text-blue-500">Privacy Policy</a>
                </p>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
