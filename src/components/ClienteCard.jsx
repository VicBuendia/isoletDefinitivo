//GET DE CLIENTE EN FORMATO DE TARJETA

'use client'
import Image from 'next/image'
import Link from 'next/link'

export default function ClienteCard(props) {
  return (
    <Link href= {`/clientes/${props.id}`} className='flex justify-between shadow-md p-4 rounded-2xl bg-zinc-100 hover:bg-[#D6C59B] transition'>

      <div className='flex flex-col  ' >
        <p className='font-bold'>{props.nombre} {props.apellido_p} {props.apellido_m}</p>
        <p className='font-light'> Tel. {props.telefono}</p>

      </div>

    </Link>
  )
}