
export const deleteCuenta = async (password) =>{
    try{
        const respuesta = await fetch("http://localhost:4000/api/perfil",{
        method: "DELETE",
        headers:{
            'Content-Type': 'application/json',

        },
        credentials: 'include',
        body: JSON.stringify({password: password})
        
    });
    return respuesta;
    }catch(error){
        throw new Error("Error de conexion con el servidor");
    }
}

export const logoutCuenta = async ()=>{

    try{
        const respuesta = await fetch("http://localhost:4000/api/logout",{
        method: "POST",
        credentials: 'include'
    });
    return respuesta;

    }catch(error){
        throw new Error("Error de conexion con el servidor");
    }
}

export const getUserProfile = async () => {
    const res = await fetch("http://localhost:4000/api/perfil", {
        method: 'GET',
        credentials: 'include'
    });
    
    if (!res.ok) {
        return null; 
    }
    
    return res.json();
}