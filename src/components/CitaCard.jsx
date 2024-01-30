//GET DE CITA EN FORMATO DE TARJETA
'use client'
import Link from 'next/link'
import { useEffect } from 'react'
import { useState } from 'react'

export default function CitaCard(props) {
  
  let subFecha = props.fecha.toString()
  

  const citaDate = new Date(`${subFecha.slice(0,10)}T${props.hora_i}`)
  const citaDate_f = new Date(`${subFecha.slice(0,10)}T${props.hora_f}`)

  const during = new Date().getTime() >= citaDate.getTime() && new Date().getTime() <= citaDate_f.getTime()
  const before = citaDate.getTime() > new Date().getTime()
  const after = citaDate.getTime() < new Date().getTime()

  return ( 
    <Link href= {`/citas/${props.id}`} className='flex flex-col shadow-md p-4 rounded-xl hover:bg-[#D6C59B] border hover:border-zinc-600 bg-zinc-100 transition-all'>
      <div className='flex flex-col gap-10 '>
        <div>
          <p className='font-bold text-lg'>{props.cliente.nombre} {props.cliente.apellido_p} {props.cliente.apellido_m}</p>
          <p className='font-light'> Tel. {props.telefono}</p>
        </div>
        <div className='flex justify-between items-center gap-5'>
          <p className='font-light'>Fecha: <span className='font-bold'>{subFecha.substring(0,10)}</span></p>
          <p className='font-light'>Hora: <span className='font-bold'>{props.hora_i}</span> - <span className='font-bold'>{props.hora_f}</span></p>
          <div>
            {before && !during && <p className='py-1 px-3  rounded-full bg-emerald-500 text-white font-light text-sm'>Por venir</p>}
            {during &&
            <div className='relative flex '>
              <p className='animate-ping absolute inline-flex bg-red-300 rounded-full h-full w-full'></p>
              <p className='py-1 px-3  rounded-full bg-red-500 text-white font-light text-sm z-30'>En sesion</p>
            </div>
            }
            {after && !during && <p className='py-1 px-3  rounded-full bg-gray-300 text-white font-light text-sm'>Pasada</p>}
          </div>
        </div>
      </div>

    </Link>
  )
}