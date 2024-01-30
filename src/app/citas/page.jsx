// HACE EL GET DE LOS CLIENTES

'use client'
import Image from 'next/image'
import Link from 'next/link'
import { getCitas, searchCita } from '@/db/Pocketbase'
import {useEffect, useState} from 'react'
import CitaCard from '@/components/CitaCard'
//import {IoAddCircleOutline} from "react-icons/io5";
import { IoAdd } from "react-icons/io5";


export default function CitasPage() {
  const[isLoaded, setIsLoaded] = useState(false)
  const[searchTerm, setSearchTerm] = useState("")
  const[citas, setCitas] = useState([])


  const cargarCitas = async () => {
    const data = await getCitas();
    console.log(data)
    setCitas(data)
  }

  const buscarCitas = async (e) => {
    e.preventDefault()
    console.log(searchTerm)
    const citasResultado = await searchCita(searchTerm)
    console.log(citasResultado)
    setCitas(citasResultado)
  }

  const handleChange = (e) => {
    console.log(e.target.value)
    setSearchTerm(e.target.value)
  }

  useEffect(()=>{
    setIsLoaded(true)
    cargarCitas()
    
  }, [])
 
  return (
    <div className='p-5 flex flex-col gap-5 mt-1  bg-[#f7f6f2]'>
      <div className='flex gap-40 justify-between mb-7 lg:ml-12 lg:mt-10'>
        <div>
          <h1 className=' text-4xl font-bold'>Citas</h1>
        </div>
        <Link href ="/citas/crear"className='font-bold text-4xl'>
          <IoAdd className=' bg-zinc-100 border shadow-md shadow-zinc-700 rounded-full size-14  hover:bg-gradient-to-b from-zinc-900 hover:to-zinc-700 hover:shadow-md hover:border-zinc-700 hover:shadow-zinc-700 hover:text-zinc-200 hover:size-16 active:bg-zinc-900 active:text-zinc-100 fixed bottom-12 right-10  ' />
        </Link>
      </div>
      <div className="w-full flex mb-6 lg:w-1/2 lg:mx-80">
          <input type="text" name="busqueda" className="border rounded-l-3xl py-2 px-5 w-full  placeholder:italic shadow-md" placeholder='Buscar por fecha, nombre o teléfono' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
          <button className='p-3 bg-zinc-800 rounded-r-3xl text-white hover:bg-gradient-to-b from-zinc-900 hover:to-zinc-700 shadow-md border-r border-t border-b' onClick={buscarCitas}>Buscar</button>
      </div>
      {isLoaded && (
        <div className='grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-10 lg:mx-12 '>
          {
          citas.map((cita)=> (
            <CitaCard key={cita.id} id= {cita.id} fecha={cita.fecha} hora_i={cita.hora_i} hora_f={cita.hora_f} cliente={cita.expand.cliente} telefono={cita.expand.cliente.telefono}></CitaCard>
          ))}
        </div>
      )}
    </div>
  )
}
 