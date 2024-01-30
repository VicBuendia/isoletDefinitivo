//PÁGINA SERVICIO INDIVIDUAL, HACE EL DELETE Y PUT

"use client"
//import { postClientes } from "@/db/Pocketbase";
import { getServicio, deleteServicio, updateServicio  } from "@/db/Pocketbase";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";

export default function ClientePage({params}){
    const[isLoaded, setIsLoaded] = useState(false)

    const[servicio, setServicio] = useState()
    
    const router = useRouter() 
  
    const cargarServicio = async () => {
      const data = await getServicio(params.id);
      console.log(data)
      setServicio(data)
      setFormData({
        nombre: data.nombre,
        costo: data.costo
      })
    }
  

    const [formData, setFormData] = useState({
        nombre: '',
        costo: ''
    });


        // Handle input changes
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
        updateServicio(params.id,formData)
        router.push("/servicios")
    }

    useEffect(()=>{
      setIsLoaded(true)
      cargarServicio()
      
    }, [])
    
//Regresa a la pagina anterior
    async function handleDelete(){
        await deleteServicio(params.id)
        router.push("/servicios")

    }

  return(
    <main className='p-20 flex flex-col justify-center items-center'>
        <section className="flex gap-5 flex-col">
            
            <div className="flex justify-between gap-10 mb-5">
                <p className="text-3xl font-bold">Editar servicio</p>
                <button onClick={handleDelete} className="text-4xl hover:text-red-500"><MdDelete></MdDelete></button>

            </div>
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <div className="flex flex-col">
                    <label className="font-bold" htmlFor="">Nombre:</label>
                    <input type="text" required name="nombre" value={formData.nombre} onChange={handleInputChange}
                    className="border rounded-xl p-3 shadow" />
                </div>

                <div className="flex flex-col">
                    <label className="font-bold" htmlFor="">Costo:</label>
                    <input type="text" required name="costo" value={formData.costo} onChange={handleInputChange}
                    className="border rounded-xl p-3 shadow" />
                </div>

                <button type="submit" className="mt-5 border w-full shadow rounded-xl p-2 bg-gradient-to-b from-zinc-800 via-zinc-800 to-zinc-700 text-white hover:bg-gradient-to-br py">Guardar</button>
            </form>
        
        </section>
  </main>

   
    
  )
}