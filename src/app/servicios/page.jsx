'use client'
import Image from 'next/image'
import Link from 'next/link'
import { getServicios, searchServicio  } from '@/db/Pocketbase'
import {useEffect, useState} from 'react'
//import EmpleadoCard from '@/components/EmpleadoCard'
import ServicioCard from '@/components/ServicioCard'
//import { IoAddCircleOutline } from "react-icons/io5";
import { IoAdd } from "react-icons/io5";

export default function ServiciosPage() {
  const[isLoaded, setIsLoaded] = useState(false)
  const[searchTerm, setSearchTerm] = useState("")
  const[servicios, setServicios] = useState([])

  const cargarServicios = async () => {
    const data = await getServicios();
    console.log(data)
    setServicios(data)
  }

  const buscarServicios = async (e) => {
    e.preventDefault()
    console.log(searchTerm)
    const serviciosResultado = await searchServicio(searchTerm)
    console.log(serviciosResultado)
    setServicios(serviciosResultado)
  }

  useEffect(()=>{
    setIsLoaded(true)
    cargarServicios()

  },[])
  return (
    <div className='p-5 flex flex-col gap-5 bg-zinc-100'>
      <div className='flex justify-between mb-7 lg:mx-12 lg:mt-10'>
        <h1 className='text-4xl font-bold'>Servicios</h1>
        <Link href ="/servicios/crear"className='font-bold text-4xl'>
          <IoAdd className=' bg-zinc-100 border shadow-md shadow-zinc-700 rounded-full size-14  hover:bg-gradient-to-b from-zinc-900 hover:to-zinc-700 hover:shadow-md hover:border-zinc-700 hover:shadow-zinc-700 hover:text-zinc-200 hover:size-16 active:bg-zinc-900 active:text-zinc-100 fixed bottom-12 right-10  ' />
        </Link>
      </div>
      <div className="w-full flex gap-3 mb-6 lg:w-auto lg:mx-12 ">
          <input type="text" name="busqueda" className="border rounded-2xl py-2 px-5 w-full placeholder:italic shadow-md" placeholder='Buscar por servicio' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
          <button className='p-3 bg-zinc-800 rounded-3xl text-white hover:bg-gradient-to-b from-zinc-900 hover:to-zinc-700 shadow-lg ' onClick={buscarServicios}>Buscar</button>
      </div>
      {isLoaded && (
        <div className='grid grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-10 lg:mx-12'>
          {servicios.map((servicio)=> (
            <ServicioCard key={servicio.id}id= {servicio.id} nombre={servicio.nombre} costo={servicio.costo}></ServicioCard>
          ))}
        </div>
      )}

    </div>
  )
}