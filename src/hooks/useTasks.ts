import { useEffect, useState } from 'react'
import type { Task } from '../types/task'
import { subscribeToTasks } from '../services/tasks'

// Estado interno asociado al usuario cuyas tareas fueron recibidas.
interface TasksState {
    userId: string | undefined
    tasks: Task[]
    loading: boolean
    error: string
}

// Hook encargado de mantener sincronizadas las tareas
// del usuario autenticado con Cloud Firestore.
export function useTasks(userId: string | undefined) {
    const [state, setState] = useState<TasksState>({
        userId: undefined,
        tasks: [],
        loading: true,
        error: '',
    })

    useEffect(() => {
        // Sin usuario autenticado no necesitamos
        // crear ninguna suscripción a Firestore.
        if (!userId) {
            return
        }

        // Nos suscribimos en tiempo real solamente
        // a las tareas pertenecientes a este usuario.
        const unsubscribe = subscribeToTasks(
            userId,
            (updatedTasks) => {
                setState({
                    userId,
                    tasks: updatedTasks,
                    loading: false,
                    error: '',
                })
            },
            () => {
                setState({
                    userId,
                    tasks: [],
                    loading: false,
                    error: 'No se pudieron cargar las tareas.',
                })
            },
        )

        // Cancelamos la suscripción cuando cambia el usuario
        // o cuando el componente se desmonta.
        return unsubscribe
    }, [userId])

    // Si no existe usuario, devolvemos un estado vacío.
    if (!userId) {
        return {
            tasks: [],
            loading: false,
            error: '',
        }
    }

    // Si cambió el usuario y todavía no llegaron sus datos,
    // evitamos mostrar las tareas del usuario anterior.
    if (state.userId !== userId) {
        return {
            tasks: [],
            loading: true,
            error: '',
        }
    }

    return {
        tasks: state.tasks,
        loading: state.loading,
        error: state.error,
    }
}