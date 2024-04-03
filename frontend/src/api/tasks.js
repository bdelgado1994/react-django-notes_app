import axios from 'axios';

const api = axios.create({
    baseURL: "http://127.0.0.1:8000"
})
export const getAllTasks = async () => {
    try {
        const response = await api.get("/api/tasks/");
        return response.data;
    } catch (error) {
        console.error("Error al obtener todas las tareas:", error);
        throw error;
    }
};
export const addTask = async (data) => {
    try {
        await api.post("/api/tasks/", data)
    } catch (error) {
        console.error(error)
    }
};

export const getTaskById = async (taskId) => {
    if (taskId === undefined || taskId === null) {
        throw new Error("El ID de tarea no puede ser indefinido o nulo.")
    }
    try {
        if (taskId !== undefined || taskId) {

            const response = await api.get(`/api/tasks/${taskId}/`);
            return response.data;
        }
    } catch (error) {
        console.error(`Error al obtener la tarea con ID ${taskId}:`, error);
        throw error;
    }
}
export const editTask = async (data) => {
    try {
        await api.put(`/api/tasks/${data.id}/`, data)
    } catch (error) {
        throw Error(error)
    }
}
export const deleteTask = async (taskId) => {
    try {
        await api.delete(`/api/tasks/${taskId}/`)
    } catch (error) {
        throw Error(error)
    }
}
export const dateFormated = (date) => {
    const fecha = new Date(date);
    // Obtener los componentes de la fecha
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, "0"); // Los meses se indexan desde 0
    const día = String(fecha.getDate()).padStart(2, "0");
    const hora = String(fecha.getHours()).padStart(2, "0");
    const minuto = String(fecha.getMinutes()).padStart(2, "0");
    const segundo = String(fecha.getSeconds()).padStart(2, "0");

    // Formatear la fecha en el formato deseado (por ejemplo, YYYY-MM-DD HH:mm:ss)
    const fechaFormateada = `${año}-${mes}-${día} ${hora}:${minuto}:${segundo}`;
    return fechaFormateada;
}