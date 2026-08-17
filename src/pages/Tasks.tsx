import TodoForm from '../components/TodoForm'
import TodoList from '../components/TodoList'
import { useAuth } from '../hooks/useAuth'
import { useTasks } from '../hooks/useTasks'
import { logoutUser } from '../services/auth'
import './Tasks.css'

export default function Tasks() {
    // Obtenemos el usuario autenticado desde el contexto.
    const { user } = useAuth()

    // Escuchamos en tiempo real las tareas del usuario.
    const { tasks, loading, error } = useTasks(user?.uid)

    // Cierra la sesión del usuario mediante Firebase.
    const handleLogout = async () => {
        await logoutUser()
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