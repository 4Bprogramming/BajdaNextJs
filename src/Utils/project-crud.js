import { baseURL } from "@/constants/constants";

export async function getProjects() {
    try {
        const response = await fetch(`${baseURL}api/projects`, {
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
        const response = await fetch(`${baseURL}api/projects/${id}`, {
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

    console.log('body para el post==>', body);
    try {
        const response = await fetch(`${baseURL}/api/projects`, {
            method: 'POST',
            body: body,
        });
        console.log('response==S', response);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error); 
    }
}

