import { baseURL } from "@/constants/constants";
import axios from "axios";
export async function getProjects() {
    try {
        const response = await axios.get(baseURL);
        
        if (response.status !== 200) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = response.data;
        // console.log('respuesta post proyectos=>', data);
        return data;
    } catch (error) {
        console.error('Error en createProject:', error);
        throw error; // Re-lanza el error para que el llamador pueda manejarlo
    }
}
export async function getProjectById(id) {
    

    try {
        const response = await axios.get(`${baseURL}/${id}`);
        
        if (response.status !== 200) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = response.data;
        // console.log('respuesta post proyectos=>', data);
        return data;
    } catch (error) {
        console.error('Error en createProject:', error);
        throw error; // Re-lanza el error para que el llamador pueda manejarlo
    }
}
export async function createProject(body) {
    try {
        const response = await axios.post(baseURL, body);
        
        // Verifica el estado de la respuesta
        if (response.status !== 201) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = response.data;
        // console.log('respuesta post proyectos=>', data);
        return data;
    } catch (error) {
        console.error('Error en createProject:', error);
        throw error; // Re-lanza el error para que el llamador pueda manejarlo
    }
}
export async function updateProject(body, id) {

    try {
        const response = await fetch(`${baseURL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json' // Asegurar el encabezado
            },
            body: JSON.stringify(body) // Convertir el cuerpo a JSON
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const text = await response.text();
        if (!text) {
            return {}; // Retornar un objeto vacío si la respuesta no tiene cuerpo
        }

        const data = JSON.parse(text); // Convertir el texto a JSON
        return data;
    } catch (error) {
        console.error(error); 
    }
}
export async function deleteProjectId(imageIds, projectId) {
    try {
        const body = { imageIds, projectId }; 
        const response = await fetch(`${baseURL}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body) 
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const text = await response.text();
        if (!text) {
            return {}; // Retornar un objeto vacío si la respuesta no tiene cuerpo
        }

        const data = JSON.parse(text); // Convertir el texto a JSON
        return data;
    } catch (error) {
        console.error('Failed to delete image from project:', error);
        throw error; 
    }
}




