//BARRA DE NAVEGACIÓN

'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FaPerson } from "react-icons/fa6";
import { MdDateRange } from "react-icons/md";
import { BsPersonArmsUp } from "react-icons/bs";
import { FaScissors } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { authModel, isUserValid, pb } from '@/db/Pocketbase';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { IoLogOut, IoClose } from 'react-icons/io5';


export default function BarraNav() {

  console.log(authModel)
  const [domLoaded, setDomLoaded] = useState(false);
  const [menu, setMenu] = useState(false)

  const router = useRouter()
  const path = usePathname()

  const handleLogout = () => {
    pb.authStore.clear();
    window.location.reload()
  }

  useEffect(() => {
    if ((!isUserValid && path !== "/auth/login")){
      router.push("/auth/login")
    }
    else if(path === "/auth/login"){
      router.push("/")
    }
    setDomLoaded(true)
  }, [])

  return (
    <>
    {isUserValid && domLoaded && 
      <div className='flex justify-between bg-gradient-to-b from-zinc-900 to-zinc-800 py-5 px-8 text-white items-center shadow shadow-zinc-700 border-b-2 border-b-[#D6C59B] ' >  
        <div className='flex gap-3 items-center'>
          <div className='w-16'>
          <Link className='text-2xl' href ="/">
            <img src="/isolet.png" alt="" />
          </Link>
          </div>
          <Link className='text-2xl hover:text-[#D6C59B]' href ="/">ISOLET SALON</Link>
        </div>
        <div className='lg:flex lg:items-center gap-7 hidden mr-28'>
          <Link className='flex gap-2 items-center p-3 hover:bg-white hover:text-zinc-800 transition ease-out rounded-xl ' href ="/clientes"><FaPerson className='text-2xl'></FaPerson>Clientes</Link>
          <Link className='flex gap-2 items-center p-3 hover:bg-white hover:text-zinc-800 transition ease-out rounded-xl ' href ="/citas"><MdDateRange  className='text-2xl'></MdDateRange>Citas</Link>
          <Link className='flex gap-2 items-center p-3 hover:bg-white hover:text-zinc-800 transition ease-out rounded-xl ' href ="/empleados"><BsPersonArmsUp  className='text-2xl'></BsPersonArmsUp>Empleados</Link>
          <Link className='flex gap-2 items-center p-3 hover:bg-white hover:text-zinc-800 transition ease-out rounded-xl *:' href ="/servicios"><FaScissors  className='text-2xl'></FaScissors>Servicios</Link>
        </div>
        <div className='lg:flex lg:items-center gap-5 hidden'>
          <div className='relative w-12 h-12 overflow-hidden rounded-full'>
            <img className='object-cover w-full h-full rounded-full' 
            src={`${process.env.NEXT_PUBLIC_PB_URL}/api/files/_pb_users_auth_/${authModel?.id}/${authModel?.avatar}`} 
            />
          </div>
          <div>
            <div className='lg:flex lg:items-center gap-7 hidden mb-2 font-light'>
              {authModel?.name}
            </div>
            <button onClick={handleLogout} className='lg:flex lg:items-center gap-1 hidden bg-white text-black py-1 px-3 rounded-full text-sm font-light
            hover:bg-red-500 hover:text-white transition-all'>
              <IoLogOut className='text-xl'></IoLogOut>
              Salir
            </button>
          </div>
        </div>
        <button onClick={()=>setMenu(!menu)} className='lg:hidden text-3xl'>
          <GiHamburgerMenu className='  rounded-sm hover:bg-gradient-to-b from-zinc-700 hover:to-zinc-600 hover:shadow'></GiHamburgerMenu>
        </button>
        {
        /* Este es el menu de moviles */
        menu && 
          <div className={`fixed top-0 right-0 h-screen  bg-white p-20 rounded-xl border animated-div z-50 overflow-y-auto`}>
            <article className='flex flex-col items-center justify-center gap-10'>
              <div>
                  <button onClick={()=>setMenu(!menu)} className='text-black text-4xl'><IoClose></IoClose> </button>
              </div>
              <div className='relative w-24 h-24 overflow-hidden rounded-full'>
                <img className='object-cover w-full h-full rounded-full' 
                src={`${process.env.NEXT_PUBLIC_PB_URL}/api/files/_pb_users_auth_/${authModel?.id}/${authModel?.avatar}`} 
                />
              </div>
              <h1 className='text-zinc-800 text-2xl font-light'>{authModel?.name}</h1>
              <div className='flex flex-col items-center gap-7 w-full'>
                <Link className='flex gap-2 items-center p-3 text-zinc-800 hover:bg-zinc-800 hover:text-white transition ease-out rounded-xl w-full'  onClick={()=>setMenu(!menu)} href ="/clientes"><FaPerson className='text-2xl'></FaPerson>Clientes</Link>
                <Link className='flex gap-2 items-center p-3 text-zinc-800 hover:bg-zinc-800 hover:text-white transition ease-out rounded-xl w-full'  onClick={()=>setMenu(!menu)} href ="/citas"><MdDateRange  className='text-2xl'></MdDateRange>Citas</Link>
                <Link className='flex gap-2 items-center p-3 text-zinc-800 hover:bg-zinc-800 hover:text-white transition ease-out rounded-xl w-full'  onClick={()=>setMenu(!menu)} href ="/empleados"><BsPersonArmsUp  className='text-2xl'></BsPersonArmsUp>Empleados</Link>
                <Link className='flex gap-2 items-center p-3 text-zinc-800 hover:bg-zinc-800 hover:text-white transition ease-out rounded-xl w-full'  onClick={()=>setMenu(!menu)} href ="/servicios"><FaScissors  className='text-2xl'></FaScissors>Servicios</Link>
              </div>
              <button onClick={handleLogout} className='bg-red-500/70 hover:bg-red-500 text-white transition ease-out rounded-xl w-full p-5 flex gap-2 justify-center items-center'>
                <IoLogOut className='text-2xl'></IoLogOut>
                Logout
              </button>
            </article>
          </div>
        }
      </div>
    }
    </>
  )
}
