export const verPropiedades = async () => {
    const response = await fetch(`http://localhost:4000/properties/mine`, {
        method: "GET",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Error al obtener las propiedades");
    }
    const data = await response.json();
    return data;
}

export const obtenerPropiedad = async (id) => {
    const response = await fetch(`http://localhost:4000/properties/${id}`, {
        method: "GET",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Error al obtener la propiedad");
    }
    const data = await response.json();
    return data;
}

export const editarPropiedades = async (id, credenciales) => {
    const response = await fetch(`http://localhost:4000/properties/${id}`, {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify(credenciales),
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Error al editar la propiedad");
    }
    const data = await response.json();
    return data;
}

export const eliminarPropiedad = async (id, credenciales) => {
    const response = await fetch(`http://localhost:4000/properties/${id}`, {
        method: "DELETE",
        credentials: "include",
        body: JSON.stringify(credenciales),
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Error al eliminar la propiedad");
    }
    const data = await response.json();
    return data;
}

import { supabase } from "../supabase/client";

export const eliminarFoto = async (pathFoto) => {
    const paths = Array.isArray(pathFoto) ? pathFoto : [pathFoto];

    const filesToRemove = paths.map(url => {
        if (!url) return null;
        const parts = url.split('/propiedades/');
        return parts.length > 1 ? parts[1] : url;
    }).filter(Boolean);

    if (filesToRemove.length === 0) return { data: [], error: null };

    const { data, error } = await supabase
        .storage
        .from("propiedades")
        .remove(filesToRemove);

    if (error) {
        console.error("Error eliminando la foto:", error);
        return null;
    }

    return data;
};
