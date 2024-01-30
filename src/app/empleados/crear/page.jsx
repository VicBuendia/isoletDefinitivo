//FORMULARIO PARA EL POST DE EMPLEADOS

"use client"
import { postEmpleados} from "@/db/Pocketbase";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function crear(){

    const [formData, setFormData] = useState({
        nombre: '',
        apellido_p: '',
        apellido_m: '',
        telefono: ''
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
        postEmpleados(formData)
        router.push("/empleados")
    }

    return(
        <main className="p-20 flex flex-col justify-center items-center bg-zinc-100 ">
            <h1 className="text-2xl font-light mb-7">Nuevo empleado</h1>
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2">
                    <label className="font-bold">Nombre:</label>
                    <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange}
                     className="border rounded-xl p-3" />
                </div>

                <div className="flex flex-col gap-2">
                <label className="font-bold">Apellido Paterno:</label>
                    <input type="text" name="apellido_p" value={formData.apellido_p} onChange={handleInputChange}
                     className="border rounded-xl p-3" />
                </div>

                <div className="flex flex-col gap-2">
                <label className="font-bold">Apellido Materno:</label>
                    <input type="text" name="apellido_m" value={formData.apellido_m} onChange={handleInputChange}
                     className="border rounded-xl p-3" />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-bold">Telefono:</label>
                    <input type="tel" maxLength={10} name="telefono" value={formData.telefono} onChange={handleInputChange}
                     className="border rounded-xl p-3" />
                </div>

                <button type="submit" className=" border w-full rounded-xl p-2 bg-zinc-800 text-white">Crear</button>
            </form>
        </main>

       
    )
}