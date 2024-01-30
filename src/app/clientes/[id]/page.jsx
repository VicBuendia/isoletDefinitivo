//PÁGINA CLIENTE INDIVIDUAL, HACE EL DELETE Y PUT

'use client'
import { getCliente, deleteCliente, updateCliente} from "@/db/Pocketbase";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";


export default function ClientePage({params}){
    const[isLoaded, setIsLoaded] = useState(false)

    const[cliente, setCliente] = useState() //
    
    const router = useRouter() 
  
    const cargarCliente = async () => {
      const data = await getCliente(params.id);
      console.log(data)
      setCliente(data) //
      setFormData({
        nombre: data.nombre,
        apellido_p: data.apellido_p,
        apellido_m: data.apellido_m,
        telefono: data.telefono
      })
    }
  
    const [formData, setFormData] = useState({
        nombre: '',
        apellido_p: '',
        apellido_m: '',
        telefono: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
        ...formData,
        [name]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(formData)
        updateCliente(params.id,formData)
        router.push("/clientes")
    }

    useEffect(()=>{ //
      setIsLoaded(true)
      cargarCliente()
      
    }, [])
    
//Regresa a la pagina anterior
    async function handleDelete(){
        await deleteCliente(params.id)
        router.push("/clientes")

    }

  return(
    <main className='p-20 flex flex-col justify-center items-center'>
        <section className="flex gap-5 flex-col">
            <div className="flex justify-between gap-10">
                <p className="text-2xl font-bold">{cliente?.nombre} {cliente?.apellido_p} {cliente?.apellido_m}</p>
                <button onClick={handleDelete} className="text-4xl hover:text-red-500"><MdDelete></MdDelete></button>
            </div>
            <div className="flex gap-5 flex-col">
            <h1>Editar cliente</h1>
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <div className="flex flex-col">
                    <label className="font-bold">Nombre:</label>
                    <input type="text" required name="nombre" value={formData.nombre} onChange={handleInputChange}
                    className="border rounded-xl p-3 shadow" />
                </div>

                <div className="flex flex-col">
                    <label className="font-bold">Apellido Paterno</label>
                    <input type="text" required name="apellido_p" value={formData.apellido_p} onChange={handleInputChange}
                   className="border rounded-xl p-3 shadow" />
                </div>

                <div className="flex flex-col">
                    <label className="font-bold">Apellido Materno</label>
                    <input type="text" required name="apellido_m" value={formData.apellido_m} onChange={handleInputChange}
                    className="border rounded-xl p-3 shadow" />
                </div>

                <div className="flex flex-col">
                    <label className="font-bold">Telefono:</label>
                    <input type="tel" required pattern="[0-9]{10}" minLength={10} maxLength={10} name="telefono" value={formData.telefono} onChange={handleInputChange}
                    className="border rounded-xl p-3 shadow" />
                </div>

                <button className="border w-full shadow rounded-xl p-2 bg-gradient-to-b from-zinc-800 via-zinc-800 to-zinc-700 text-white hover:bg-gradient-to-br py" type="submit">Guardar</button>
            </form>
        </div>
        </section>
  </main>

   
    
  )
}