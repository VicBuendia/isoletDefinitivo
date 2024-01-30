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
        <main className="p-20 flex flex-col justify-center items-center mt-1 bg-[#f7f6f2]">

            <h1 className="text-3xl font-bold mb-7">Nuevo servicio</h1>

            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <div className="flex flex-col">
                <label className="font-bold">Nombre:</label>
                    <input type="text" required name="nombre" value={formData.nombre} onChange={handleInputChange}
                     className="border rounded-xl p-3 shadow" />
                </div>

                <div className="flex flex-col">
                <label className="font-bold">Costo:</label>
                    <input type="text" required name="costo" value={formData.costo} onChange={handleInputChange}
                     className="border rounded-xl p-3 shadow"/>
                </div>

                <button type="submit" className=" border w-full shadow rounded-xl p-2 bg-gradient-to-b from-zinc-800 via-zinc-800 to-zinc-700 text-white hover:bg-gradient-to-br py">Crear</button>
            </form>
        </main>

       
    )
}