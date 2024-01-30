// HACE EL GET DE LOS CLIENTES

'use client'
import Link from 'next/link'
import { getClientes, searchCliente } from '@/db/Pocketbase'
import {useEffect, useState} from 'react'
import ClienteCard from '@/components/ClienteCard'
//import {IoAddCircleOutline} from "react-icons/io5";
import { IoAddCircle } from "react-icons/io5";
import { IoAdd } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";


export default function ClientesPage() {
  const[isLoaded, setIsLoaded] = useState(false)
  const[searchTerm, setSearchTerm] = useState("")
  const[clientes, setClientes] = useState([])


  const cargarClientes = async () => {
    const data = await getClientes();
    console.log(data)
    setClientes(data)
  }

  const buscarClientes = async (e) => {
    e.preventDefault()
    console.log(searchTerm)
    const clientesResultado = await searchCliente(searchTerm)
    console.log(clientesResultado)
    setClientes(clientesResultado)
  }

  const handleChange = (e) => {
    console.log(e.target.value)
    setSearchTerm(e.target.value)
  }

  useEffect(()=>{
    setIsLoaded(true)
    cargarClientes()
    
  }, [])
  return (
    <div className='p-5 flex flex-col gap-5 mt-1  bg-[#f7f6f2] ' >
      <div className='flex justify-between mb-7 lg:ml-12 lg:mt-10'>
        <h1 className='text-4xl font-bold'>Clientes</h1>
        <Link  href ="/clientes/crear" className='font-bold text-4xl'>{/*border shadow  fixed bottom-12 right-8 */}
          <IoAdd className=' bg-zinc-100 border shadow-md shadow-zinc-700 rounded-full size-14  hover:bg-gradient-to-b from-zinc-900 hover:to-zinc-700 hover:shadow-md hover:border-zinc-700 hover:shadow-zinc-700 hover:text-zinc-200 hover:size-16 active:bg-zinc-900 active:text-zinc-100 fixed bottom-12 right-10  ' />{/*<IoAddCircleOutline/>*/}
        </Link>
      </div>
      <div className="w-full flex   mb-6  lg:w-1/2 lg:mx-80">
          <input type="text" name="busqueda" className="border-l border-t border-b border-zinc-200 rounded-l-3xl py-2 px-5 w-full placeholder:italic shadow-md" placeholder= 'Buscar por nombre o teléfono' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
          <button className='p-3 bg-zinc-800  rounded-r-3xl text-white  hover:bg-gradient-to-b from-zinc-900 hover:to-zinc-700  shadow-md border-r border-t border-b border-zinc-200 border-l' onClick={buscarClientes} >Buscar</button>
      </div>
      {isLoaded && (
        <div className='grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-10 lg:mx-12'>
          {clientes.map((cliente)=> (
            <ClienteCard key={cliente.id} id= {cliente.id} nombre={cliente.nombre} apellido_p={cliente.apellido_p} apellido_m={cliente.apellido_m} telefono={cliente.telefono}></ClienteCard>
          ))}
        </div>
      )}
 
    </div>
  )
}
