//FORMULARIO PARA EL POST DE CLIENTES

"use client"
import { postClientes} from "@/db/Pocketbase";
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
        postClientes(formData)
        router.push("/clientes")
    }

    return(
        <main className="p-20 flex flex-col justify-center items-center bg-zinc-100 ">
            <h1 className="text-2xl font-bold mb-7">Nuevo cliente</h1>
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2">
                    <label className="font-bold">Nombre:</label>
                    <input type="text" required name="nombre" value={formData.nombre} onChange={handleInputChange}
                    className="border rounded-xl p-3"/>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-bold">Apellido Paterno:</label>
                    <input type="text" required name="apellido_p" value={formData.apellido_p} onChange={handleInputChange}
                    className="border rounded-xl p-3" />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-bold">Apellido Materno:</label>
                    <input type="text" required name="apellido_m" value={formData.apellido_m} onChange={handleInputChange}
                    className="border rounded-xl p-3 " />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-bold">Telefono:  
                        <label className="font-light text-xs">*Ingrese 10 dígitos</label>
                    </label>
                    <input type="tel" required   pattern="[0-9]{10}" minLength={10} maxLength={10} name="telefono" value={formData.telefono} onChange={handleInputChange}
                    className="border rounded-xl p-3 "/>
                </div>
                <button type="submit" className=" border w-full rounded-xl p-2 bg-gradient-to-b from-zinc-800 via-zinc-800 to-zinc-700 text-white hover:bg-gradient-to-br py">Crear</button>
            </form>
        </main>

       
    )
}