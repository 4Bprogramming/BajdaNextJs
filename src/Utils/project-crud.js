import { baseURL } from "@/constants/constants";

export async function getProjects() {
    try {
        const response = await fetch(`${baseURL}/api/projects`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
        });
        
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        
    }
}
export async function getProjectById(id) {
    

    try {
        const response = await fetch(`${baseURL}/api/projects/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
        });
        
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        
    }
}
export async function createProject(body) {
    try {
        
        const response = await fetch(`${baseURL}/api/projects`, {
            method: 'POST',
            body
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error); 
    }
}
export async function updateProject(body, id) {
    console.log('body==>', body);
    console.log('id==>', id);

    try {
        const response = await fetch(`${baseURL}/api/projects/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json' // Asegurar el encabezado
            },
            body: JSON.stringify(body) // Convertir el cuerpo a JSON
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error); 
    }
}



