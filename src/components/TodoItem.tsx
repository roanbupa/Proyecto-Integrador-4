import { useState, type FormEvent } from 'react'
import type { Task } from '../types/task'
import {
    deleteTask,
    toggleTaskCompleted,
    updateTask,
} from '../services/tasks'

interface TodoItemProps {
    // Tarea individual que recibe el componente.
    task: Task
}

export default function TodoItem({ task }: TodoItemProps) {
    // Controla si estamos editando la tarea.
    const [isEditing, setIsEditing] = useState(false)

    // Valores temporales usados durante la edición.
    const [title, setTitle] = useState(task.title)
    const [description, setDescription] = useState(task.description)

    // Guarda posibles errores de las operaciones.
    const [error, setError] = useState('')

    // Marca o desmarca la tarea como completada.
    const handleToggleCompleted = async () => {
        try {
            setError('')

            await toggleTaskCompleted(task.id, !task.completed)
        } catch {
            setError('No se pudo actualizar el estado de la tarea.')
        }
    }

    // Elimina la tarea de Firestore.
    const handleDelete = async () => {
        try {
            setError('')

            await deleteTask(task.id)
        } catch {
            setError('No se pudo eliminar la tarea.')
        }
    }

    // Guarda los cambios realizados durante la edición.
    const handleEdit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setError('')

        // Título y descripción son obligatorios.
        if (!title.trim() || !description.trim()) {
            setError('El título y la descripción son obligatorios.')
            return
        }

        try {
            await updateTask(task.id, {
                title: title.trim(),
                description: description.trim(),
            })

            // Salimos del modo edición cuando Firestore confirma el cambio.
            setIsEditing(false)
        } catch {
            setError('No se pudo editar la tarea.')
        }
    }

    // Si estamos editando mostramos el formulario.
    if (isEditing) {
        return (
            <li>
                <form onSubmit={handleEdit}>
                    <div>
                        <label htmlFor={`title-${task.id}`}>Título</label>

                        <input
                            id={`title-${task.id}`}
                            type="text"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor={`description-${task.id}`}>Descripción</label>

                        <textarea
                            id={`description-${task.id}`}
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                            required
                        />
                    </div>

                    {error && <p>{error}</p>}

                    <button type="submit">Guardar</button>

                    <button
                        type="button"
                        onClick={() => {
                            // Restauramos los valores originales si se cancela.
                            setTitle(task.title)
                            setDescription(task.description)
                            setError('')
                            setIsEditing(false)
                        }}
                    >
                        Cancelar
                    </button>
                </form>
            </li>
        )
    }

    return (
        <li>
            <h3>{task.title}</h3>

            <p>{task.description}</p>

            <p>
                Estado: {task.completed ? 'Completada' : 'Pendiente'}
            </p>

            {error && <p>{error}</p>}

            <button type="button" onClick={handleToggleCompleted}>
                {task.completed ? 'Marcar pendiente' : 'Marcar completada'}
            </button>

            <button type="button" onClick={() => setIsEditing(true)}>
                Editar
            </button>

            <button type="button" onClick={handleDelete}>
                Eliminar
            </button>
        </li>
    )
}