import { useState, type FormEvent } from 'react'
import { createTask } from '../services/tasks'

interface TodoFormProps {
    // Usuario autenticado al que pertenecerá la tarea.
    userId: string
}

export default function TodoForm({ userId }: TodoFormProps) {
    // Datos del formulario.
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    // Estados de la operación.
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    // Procesa la creación de una nueva tarea.
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setError('')

        // La consigna exige título y descripción.
        if (!title.trim() || !description.trim()) {
            setError('El título y la descripción son obligatorios.')
            return
        }

        try {
            setLoading(true)

            // Guardamos la tarea en Firestore asociada al usuario autenticado.
            await createTask({
                userId,
                title: title.trim(),
                description: description.trim(),
            })

            // Limpiamos el formulario después de crear la tarea.
            setTitle('')
            setDescription('')
        } catch {
            setError('No se pudo crear la tarea.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Título</label>

                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    required
                />
            </div>

            <div>
                <label htmlFor="description">Descripción</label>

                <textarea
                    id="description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    required
                />
            </div>

            {error && <p>{error}</p>}

            <button type="submit" disabled={loading}>
                {loading ? 'Creando...' : 'Crear tarea'}
            </button>
        </form>
    )
}