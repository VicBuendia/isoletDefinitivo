'use client'

import React from "react"
import { useState } from "react";
import { login } from "@/db/Pocketbase";
import { useRouter } from "next/navigation";
import { IoLogIn } from "react-icons/io5";

export default function page(){

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const router = useRouter()

    const handleLogin = async (e) => {
        e.preventDefault()
        console.log(username, password)
        await login(username, password)

    }
 

    return (
        <>
        <main className='flex flex-col justify-center items-center h-screen'>
            <section className="flex gap-5 flex-col">
                    <div className="flex gap-10 flex-col">
                    <h1 className="text-center text-3xl font-light">Login</h1>
                    <form className="flex flex-col gap-5" onSubmit={handleLogin}>
                        <div className="flex flex-col">
                            <label className="font-bold mb-3">Username:</label>
                            <input type="text" name="username" onChange={(e) => setUsername(e.target.value)}
                            className="border rounded-xl p-3" />
                        </div>
                        <div className="flex flex-col">
                            <label className="font-bold mb-3">Contraseña</label>
                            <input type="password" name="password" onChange={(e) => setPassword(e.target.value)}
                        className="border rounded-xl p-3" />
                        </div>
                        <button className="flex justify-center items-center gap-2 bg-zinc-800 p-3 rounded-xl text-white hover:bg-white
                         hover:text-black shadow-md transition-all"
                         type="submit"><IoLogIn className="text-2xl"></IoLogIn>Log In</button>
                    </form>
                </div>
            </section>
        </main>
        </>
    )
}