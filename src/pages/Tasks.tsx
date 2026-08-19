import { useState } from 'react'
import TodoForm from '../components/TodoForm'
import TodoList from '../components/TodoList'
import { useAuth } from '../hooks/useAuth'
import { useTasks } from '../hooks/useTasks'
import { logoutUser } from '../services/auth'
import { sendTaskSummaryEmail } from '../services/email'
import './Tasks.css'

export default function Tasks() {
    // Obtenemos el usuario autenticado desde el contexto.
    const { user } = useAuth()

    // Escuchamos en tiempo real las tareas del usuario.
    const { tasks, loading, error } = useTasks(user?.uid)

    // Controla el estado del envío del resumen por correo.
    const [sendingEmail, setSendingEmail] = useState(false)
    const [emailMessage, setEmailMessage] = useState('')

    // Cierra la sesión del usuario mediante Firebase.
    const handleLogout = async () => {
        await logoutUser()
    }

    // Envía por email un resumen del estado actual de las tareas.
    const handleSendSummary = async () => {
        // Firebase Authentication nos proporciona el email del usuario.
        if (!user?.email) {
            setEmailMessage('No se pudo obtener el email del usuario.')
            return
        }

        // Calculamos automáticamente cuántas tareas hay de cada estado.
        const completed = tasks.filter((task) => task.completed).length
        const pending = tasks.length - completed

        try {
            setSendingEmail(true)
            setEmailMessage('')

            // El frontend llama solamente a nuestra Vercel Function.
            // Las credenciales de AWS nunca llegan al navegador.
            await sendTaskSummaryEmail({
                email: user.email,
                pending,
                completed,
            })

            setEmailMessage('Resumen enviado correctamente.')
        } catch {
            setEmailMessage('No se pudo enviar el resumen por email.')
        } finally {
            setSendingEmail(false)
        }
    }

    return (
        <main className="tasks-page">
            <header className="tasks-header">
                <div>
                    <p className="tasks-brand">MateCode</p>
                    <h1>Mis tareas</h1>
                </div>

                <button
                    className="secondary-button"
                    type="button"
                    onClick={handleLogout}
                >
                    Cerrar sesión
                </button>
            </header>

            <section className="tasks-content">
                {/* Formulario para crear tareas. */}
                <section className="tasks-panel">
                    <h2>Nueva tarea</h2>

                    {user && <TodoForm userId={user.uid} />}
                </section>

                <section className="tasks-panel">
                    <div className="tasks-summary-header">
                        <h2>Lista de tareas</h2>

                        <button
                            className="primary-button summary-button"
                            type="button"
                            onClick={handleSendSummary}
                            disabled={sendingEmail || loading}
                        >
                            {sendingEmail
                                ? 'Enviando...'
                                : 'Enviar resumen por email'}
                        </button>
                    </div>

                    {/* Mensaje de éxito o error del envío de email. */}
                    {emailMessage && (
                        <p
                            className={
                                emailMessage.includes('correctamente')
                                    ? 'form-success'
                                    : 'form-error'
                            }
                            role="status"
                        >
                            {emailMessage}
                        </p>
                    )}

                    {/* Estado de carga de Firestore. */}
                    {loading && <p>Cargando tareas...</p>}

                    {/* Error al obtener las tareas. */}
                    {error && (
                        <p className="form-error" role="alert">
                            {error}
                        </p>
                    )}

                    {/* Mostramos la lista cuando terminó la carga. */}
                    {!loading && !error && <TodoList tasks={tasks} />}
                </section>
            </section>
        </main>
    )
}