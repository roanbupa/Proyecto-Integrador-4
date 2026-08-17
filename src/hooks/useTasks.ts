import { useEffect, useState } from 'react'
import type { Task } from '../types/task'
import { subscribeToTasks } from '../services/tasks'

// Hook encargado de mantener sincronizadas las tareas
// del usuario autenticado con Cloud Firestore.
export function useTasks(userId: string | undefined) {
    // Lista actual de tareas.
    const [tasks, setTasks] = useState<Task[]>([])

    // Indica si todavía estamos esperando la primera respuesta
    // de Firestore.
    const [loading, setLoading] = useState(true)

    // Guarda un posible error de lectura/sincronización.
    const [error, setError] = useState('')

    useEffect(() => {
        // Si no hay usuario autenticado, limpiamos el estado
        // y no creamos ninguna suscripción.
        if (!userId) {
            setTasks([])
            setLoading(false)
            setError('')
            return
        }

        // Cada vez que cambia el usuario empezamos una nueva carga.
        setLoading(true)
        setError('')

        // Nos suscribimos en tiempo real a las tareas
        // correspondientes solamente a este usuario.
        const unsubscribe = subscribeToTasks(
            userId,
            (updatedTasks) => {
                setTasks(updatedTasks)
                setLoading(false)
            },
            () => {
                setError('No se pudieron cargar las tareas.')
                setLoading(false)
            },
        )

        // Cancelamos la suscripción cuando el componente se desmonta
        // o cuando cambia el usuario, evitando memory leaks.
        return unsubscribe
    }, [userId])

    return {
        tasks,
        loading,
        error,
    }
}