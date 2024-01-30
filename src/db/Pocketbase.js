import PocketBase from 'pocketbase';

export const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);
export const authModel = pb.authStore.model
export const isUserValid = pb.authStore.isValid

export async function getCitas(){
    const fechaISO = new Date()
    const fechaActual =new Date(fechaISO.getTime()-(3600000*6))
    const records = await pb.collection('cita').getFullList({
        sort: '+fecha, +hora_i',
        filter: `fecha >= "${fechaActual.toISOString().substring(0,10)}"`,
        expand: 'cliente'
    });
    console.log(fechaActual.toISOString().substring(11,16))

    return records 
    
}

export async function getCitasHoy(){
    const fechaISO = new Date()
    const fechaActual = new Date(fechaISO.getTime()-(3600000*6))
    //const diaSiguiente = new Date(fechaActual + 86400000)

    const records = await pb.collection('cita').getFullList({
        sort: 'fecha, +hora_i',
        //filter: 'fecha  >= "2024-01-26" && fecha < "2024-01-27"',
        //filter: `fecha >= "${fechaActual.toISOString().substring(0,10)}"  && fecha < "${diaSiguiente.toISOString().substring(0,10)}"`,
        filter: `fecha ~ "${fechaActual.toISOString().substring(0,10)}"  &&  hora_f >= "${fechaActual.toISOString().substring(11,15)}"`,
        expand: 'cliente'
    });
    console.log(fechaActual.toISOString().substring(0,10))//diaSiguiente.toISOString().substring(0,10))

    return records
    
}

export async function getClientes(){
    const records = await pb.collection('cliente').getFullList({
        sort: 'nombre',
    });

    return records 
    
}

export async function getEmpleados(){
    const records = await pb.collection('empleado').getFullList({
        sort: '-created',
    });

    return records
    
}

export async function getServicios(){
    const records = await pb.collection('servicio').getFullList({
        sort: '-created',
    });

    return records
    
}

export async function postCita(data){

    const record = await pb.collection('cita').create(data);

}

export async function postClientes(data){

    const record = await pb.collection('cliente').create(data);

}

export async function postEmpleados(data){

    const record = await pb.collection('empleado').create(data);

}

export async function postServicios(data){

    const record = await pb.collection('servicio').create(data);

}

export async function getCita(id){
    const record = await pb.collection('cita').getFirstListItem(`id="${id}"`, 
    {
        expand:'cliente, servicios'

    });
    return record
}


export async function deleteCita(id){
    await pb.collection('cita').delete(id);
}

export async function updateCita(id, data){
    const record = await pb.collection('cita').update(id, data);
    
}


export async function getCliente(id){
    const record = await pb.collection('cliente').getFirstListItem(`id="${id}"`);
    return record
}


export async function deleteCliente(id){
    await pb.collection('cliente').delete(id);
}

export async function updateCliente(id, data){
    const record = await pb.collection('cliente').update(id, data);
    
}


export async function getEmpleado(id){
    const record = await pb.collection('empleado').getFirstListItem(`id="${id}"`);
    return record
}



export async function deleteEmpleado(id){
    await pb.collection('empleado').delete(id);
}

export async function updateEmpleado(id, data){
    const record = await pb.collection('empleado').update(id, data);
    
}


export async function getServicio(id){
    const record = await pb.collection('servicio').getFirstListItem(`id="${id}"`);
    return record
}

export async function deleteServicio(id){
    await pb.collection('servicio').delete(id);
}

export async function updateServicio(id, data){
    const record = await pb.collection('servicio').update(id, data);
    
}

export async function searchCita(searchTerm){
    const records = await pb.collection("cita").getList(1, 20, {
        sort: '+fecha, +hora_i',
        filter: pb.filter(
            "id ~ {:search} || fecha ~ {:search} || cliente.nombre ~ {:search} || cliente.apellido_p ~ {:search}|| cliente.apellido_m ~ {:search} || cliente.telefono ~ {:search}",
            { search: searchTerm}
            ),
            expand:'cliente'
        })

    return records.items
}

export async function searchCliente(searchTerm){
    const records = await pb.collection("cliente").getList(1, 20, {
        sort: '+nombre',
        filter: pb.filter(
            "id ~ {:search} || nombre ~ {:search} || apellido_p ~ {:search}|| apellido_m ~ {:search} || telefono ~ {:search}",
            { search: searchTerm}
            )
        })

    return records.items
}

export async function searchServicio(searchTerm){
    const records = await pb.collection("servicio").getList(1, 20, {
        sort: '+nombre',
        filter: pb.filter(
            "id ~ {:search} || nombre ~ {:search} || costo ~ {:search}",
            { search: searchTerm}
            )
        })

    return records.items
}

export async function searchEmpleado(searchTerm){
    const records = await pb.collection("empleado").getList(1, 20, {
        sort: '+nombre',
        filter: pb.filter(
            "id ~ {:search} || nombre ~ {:search} || apellido_p ~ {:search} || apellido_m ~ {:search} || telefono ~ {:search}",
            { search: searchTerm}
            )
        })

    return records.items
}

export async function login(username, password){

    const authData = await pb.collection('users').authWithPassword(
        username,
        password,
    );

    console.log(pb.authStore.isValid);
    console.log(pb.authStore.token);
    console.log(pb.authStore.model.id);
    window.location.reload()
}