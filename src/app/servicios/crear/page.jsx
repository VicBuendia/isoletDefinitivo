//FORMULARIO PARA EL POST DE SERVICIOS

"use client"
import { postServicios} from "@/db/Pocketbase";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function crear(){

    const [formData, setFormData] = useState({
        nombre: '',
        costo: ''
    });

    const router = useRouter() 
    
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
        postServicios(formData)
        router.push("/servicios")
    }

    return(
        <main className="p-20 flex flex-col justify-center items-center bg-zinc-100 ">

            <h1 className="text-2xl font-light mb-7">Nuevo servicio</h1>

            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <div className="flex flex-col">
                <label className="font-bold">Nombre:</label>
                    <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange}
                     className="border rounded-xl p-3" />
                </div>

                <div className="flex flex-col">
                <label className="font-bold">Costo:</label>
                    <input type="text" name="costo" value={formData.costo} onChange={handleInputChange}
                     className="border rounded-xl p-3" />
                </div>

                <button type="submit" className=" border w-full rounded-xl p-2 bg-zinc-800 text-white">Crear</button>
            </form>
        </main>

       
    )
}