'use client'
import Image from 'next/image'
import Link from 'next/link'
import { getEmpleados, searchEmpleado } from '@/db/Pocketbase'
import {useEffect, useState} from 'react'
//import EmpleadoCard from '@/components/EmpleadoCard'
import EmpleadoCard from '@/components/EmpleadoCard'
//import { IoAddCircleOutline } from "react-icons/io5";
import { IoAdd } from "react-icons/io5";

export default function EmpleadosPage() {
  const[isLoaded, setIsLoaded] = useState(false)
  const[searchTerm, setSearchTerm] = useState("")
  const[empleados, setEmpleados] = useState([])

  const cargarEmpleados = async () => {
    const data = await getEmpleados();
    console.log(data)
    setEmpleados(data)
  }

  const buscarEmpleados = async (e) => {
    e.preventDefault()
    console.log(searchTerm)
    const empleadosResultado = await searchEmpleado(searchTerm)
    console.log(empleadosResultado)
    setEmpleados(empleadosResultado)
  }

  useEffect(()=>{
    setIsLoaded(true)
    cargarEmpleados()

  },[])
  return (
    <div className='p-5 flex flex-col gap-5 bg-zinc-100'>
      <div className='flex justify-between mb-7 lg:mx-12 lg:mt-10'>
        <h1 className='text-4xl font-bold'>Empleados</h1>
        <Link href ="/empleados/crear"className='font-bold text-4xl'>
          <IoAdd className=' bg-zinc-100 border shadow-md shadow-zinc-700 rounded-full size-14  hover:bg-gradient-to-b from-zinc-900 hover:to-zinc-700 hover:shadow-md hover:border-zinc-700 hover:shadow-zinc-700 hover:text-zinc-200 hover:size-16 active:bg-zinc-900 active:text-zinc-100 fixed bottom-12 right-10  ' />
        </Link>
      </div>
      <div className="w-full flex gap-3 mb-6 lg:w-3/4 lg:mx-12">
          <input type="text" name="busqueda" className="border rounded-2xl py-2 px-5 w-full placeholder:italic shadow-md" placeholder= 'Buscar por nombre o teléfono' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
          <button className='p-3 bg-zinc-800 rounded-xl text-white hover:bg-gradient-to-b from-zinc-900 hover:to-zinc-700 shadow-lg' onClick={buscarEmpleados}>Buscar</button>
      </div>
      {isLoaded && (
        <div className='grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-10 lg:mx-12'>
          {empleados.map((empleado)=> (
            <EmpleadoCard key={empleado.id} id= {empleado.id} nombre={empleado.nombre} apellido_p={empleado.apellido_p} apellido_m={empleado.apellido_m} telefono={empleado.telefono}></EmpleadoCard>
          ))}
        </div>
      )}
 
    </div>
  )
}