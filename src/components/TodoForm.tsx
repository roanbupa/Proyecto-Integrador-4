import { useState, type FormEvent } from 'react'
import { createTask } from '../services/tasks'
import './TodoForm.css'

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
        <form className="todo-form" onSubmit={handleSubmit}>
            <div className="todo-form-group">
                <label htmlFor="title">Título</label>

                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="Ej: Preparar presentación"
                    required
                />
            </div>

            <div className="todo-form-group">
                <label htmlFor="description">Descripción</label>

                <textarea
                    id="description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    placeholder="Describí la tarea..."
                    rows={4}
                    required
                />
            </div>

            {error && (
                <p className="form-error" role="alert">
                    {error}
                </p>
            )}

            <button
                className="primary-button todo-form-button"
                type="submit"
                disabled={loading}
            >
                {loading ? 'Creando...' : 'Crear tarea'}
            </button>
        </form>
    )
}