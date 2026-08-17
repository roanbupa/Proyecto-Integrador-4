import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    updateDoc,
    where,
    type Unsubscribe,
} from 'firebase/firestore'

import { db } from './firebase'
import type { Task } from '../types/task'

// Nombre de la colección de tareas en Firestore.
const TASKS_COLLECTION = 'tasks'

// Tipo usado al crear una tarea.
// id y createdAt los genera Firestore.
export interface CreateTaskData {
    userId: string
    title: string
    description: string
}

// Tipo usado al editar una tarea.
// No permitimos modificar el userId desde este servicio.
export interface UpdateTaskData {
    title?: string
    description?: string
    completed?: boolean
}

// Crea una nueva tarea en Firestore.
export const createTask = async (taskData: CreateTaskData) => {
    return addDoc(collection(db, TASKS_COLLECTION), {
        userId: taskData.userId,
        title: taskData.title,
        description: taskData.description,
        completed: false,

        // Firestore asigna la fecha desde el servidor.
        createdAt: serverTimestamp(),
    })
}

// Escucha en tiempo real las tareas de un usuario.
// Devuelve la función unsubscribe para cancelar la suscripción.
export const subscribeToTasks = (
    userId: string,
    onTasksChange: (tasks: Task[]) => void,
    onError: (error: Error) => void,
): Unsubscribe => {
    const tasksQuery = query(
        collection(db, TASKS_COLLECTION),

        // Solo recuperamos tareas del usuario autenticado.
        where('userId', '==', userId),

        // Mostramos primero las tareas más recientes.
        orderBy('createdAt', 'desc'),
    )

    return onSnapshot(
        tasksQuery,
        (snapshot) => {
            const tasks: Task[] = snapshot.docs.map((taskDocument) => {
                const data = taskDocument.data()

                return {
                    id: taskDocument.id,
                    userId: data.userId,
                    title: data.title,
                    description: data.description,
                    completed: data.completed,

                    // Firestore guarda createdAt como Timestamp.
                    // Lo convertimos a Date para respetar nuestro tipo Task.
                    createdAt: data.createdAt?.toDate() ?? new Date(),
                }
            })

            onTasksChange(tasks)
        },
        (error) => {
            onError(error)
        },
    )
}

export const updateTask = async (
    taskId: string,
    taskData: UpdateTaskData,
) => {
    // Obtenemos la referencia al documento que queremos modificar.
    const taskReference = doc(db, TASKS_COLLECTION, taskId)

    // Construimos explícitamente los campos permitidos.
    // Así evitamos enviar propiedades que no correspondan
    // y mantenemos el tipado compatible con Firestore.
    return updateDoc(taskReference, {
        ...(taskData.title !== undefined && {
            title: taskData.title,
        }),

        ...(taskData.description !== undefined && {
            description: taskData.description,
        }),

        ...(taskData.completed !== undefined && {
            completed: taskData.completed,
        }),
    })
}

// Elimina una tarea.
export const deleteTask = async (taskId: string) => {
    const taskReference = doc(db, TASKS_COLLECTION, taskId)

    return deleteDoc(taskReference)
}

// Cambia solamente el estado completed de una tarea.
export const toggleTaskCompleted = async (
    taskId: string,
    completed: boolean,
) => {
    const taskReference = doc(db, TASKS_COLLECTION, taskId)

    return updateDoc(taskReference, {
        completed,
    })
}