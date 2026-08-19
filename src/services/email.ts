// Datos necesarios para enviar el resumen de tareas.
interface TaskSummaryEmailData {
    email: string
    pending: number
    completed: number
}

// Envía el resumen de tareas a nuestra Vercel Function.
export const sendTaskSummaryEmail = async (
    data: TaskSummaryEmailData,
) => {
    const response = await fetch('/api/sendTaskSummary', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    // Si la función devuelve un error, lo propagamos
    // para que la interfaz pueda mostrarlo al usuario.
    if (!response.ok) {
        throw new Error('No se pudo enviar el resumen por email.')
    }

    return response.json()
}