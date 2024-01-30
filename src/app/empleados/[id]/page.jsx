//PÁGINA EMPLEADO INDIVIDUAL, HACE EL DELETE Y PUT

"use client"
import { postClientes } from "@/db/Pocketbase";
import { getEmpleado, deleteEmpleado, updateEmpleado  } from "@/db/Pocketbase";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";

export default function EmpleadoPage({params}){
    const[isLoaded, setIsLoaded] = useState(false)

    const[empleado, setEmpleado] = useState()
    
    const router = useRouter() 
  
    const cargarEmpleado = async () => {
      const data = await getEmpleado(params.id);
      console.log(data)
      setEmpleado(data)
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
        updateEmpleado(params.id,formData)
        router.push("/empleados")

    }

    useEffect(()=>{
      setIsLoaded(true)
      cargarEmpleado()
      
    }, [])
    
//Regresa a la pagina anterior
    async function handleDelete(){
        await deleteEmpleado(params.id)
        router.push("/empleados")

    }

  return(
    <main className='p-20 flex flex-col justify-center items-center'>
        <section className="flex gap-5 flex-col">
        
            <div>
                <button onClick={handleDelete} className="text-4xl text-red-500"><MdDelete></MdDelete></button>
            </div>
            <div className="">
            <h1>Actualizar empleado</h1>

            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <div className="flex flex-col">
                    <label className="font-bold">Nombre:</label>
                    <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange}
                    className="border rounded-xl p-3" />
                </div>

                <div className="flex flex-col">
                    <label className="font-bold">Apellido Paterno</label>
                    <input type="text" name="apellido_p" value={formData.apellido_p} onChange={handleInputChange}
                    className="border rounded-xl p-3" />
                </div>

                <div className="flex flex-col">
                    <label className="font-bold">Apellido Materno</label>
                    <input type="text" name="apellido_m" value={formData.apellido_m} onChange={handleInputChange}
                    className="border rounded-xl p-3" />
                </div>

                <div className="flex flex-col">
                    <label className="font-bold">Telefono:</label>
                    <input type="tel" maxLength={10} name="telefono" value={formData.telefono} onChange={handleInputChange}
                    className="border rounded-xl p-3" />
                </div>
                <button className="bg-zinc-800 p-3 rounded-xl text-white" type="submit">Actualizar</button>
            </form>
        </div>

        </section>
        


  </main>

   
    
  )
}