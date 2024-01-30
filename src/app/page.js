'use client'
import { isUserValid, authModel } from '@/db/Pocketbase'
import { getCitasHoy } from '@/db/Pocketbase'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import CitaCard from '@/components/CitaCard'
import {IoAddCircleOutline} from "react-icons/io5";

export default function Home() {

  const router = useRouter()
  const [domLoaded, setDomLoaded] = useState(false);
  const[isLoaded, setIsLoaded] = useState(false)
  //const[searchTerm, setSearchTerm] = useState("")
  const[citas, setCitas] = useState([])


  const cargarCitas = async () => {
    const data = await getCitasHoy();
    console.log(data)
    setCitas(data)
  }


  useEffect(()=>{
    if(!isUserValid){
      router.push("/auth/login")
    }
    setDomLoaded(true)

    setIsLoaded(true)
    cargarCitas()
  },[])
  console.log(authModel)
  return (
    <div className=' mt-1  bg-[#f7f6f2] '>
      {/*domLoaded && 
        <>
          <h1>jfsjf</h1>
          <Link href ="/cliente">Clientes</Link>
        </>
        
      */}

      {domLoaded &&
          <div className=' flex flex-col gap-5 '>
            <div className=' flex gap-40  p-7   '>
              <div className=' lg:ml-12 lg:mt-10'>
                <h1 className='text-4xl font-bold mb-1'>Hola, {authModel?.name}</h1>
                <h2 className='text-xl font-light'>Las citas de hoy son</h2>
              </div>
            </div>
            {/*<div className="w-full flex gap-3 ">
                <input type="text" name="busqueda" className="border rounded-xl py-2 px-5 w-full" placeholder='Buscar' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                <button className='p-3 bg-zinc-800 rounded-xl text-white' onClick={buscarCitas}>Buscar</button>
            </div>*/}
            {isLoaded && (
              <div className=' p-5 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:ml-12 lg:mt-10 lg:gap-10'>
                {
                citas.map((cita)=> (
                  <CitaCard key={cita.id} id= {cita.id} fecha={cita.fecha} hora_i={cita.hora_i} hora_f={cita.hora_f} cliente={cita.expand.cliente} telefono={cita.expand.cliente.telefono}></CitaCard>
                ))}
              </div>
            )}
          </div>}
        </div>
      )
    }
