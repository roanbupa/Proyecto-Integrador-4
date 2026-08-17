import TodoForm from '../components/TodoForm'
import TodoList from '../components/TodoList'
import { useAuth } from '../features/auth/AuthContext'
import { useTasks } from '../hooks/useTasks'
import { logoutUser } from '../services/auth'

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
        <main>
            <h1>Mis tareas</h1>

            <button type="button" onClick={handleLogout}>
                Cerrar sesión
            </button>

            {/* Formulario para crear tareas. */}
            {user && <TodoForm userId={user.uid} />}

            {/* Estado de carga de Firestore. */}
            {loading && <p>Cargando tareas...</p>}

            {/* Error al obtener las tareas. */}
            {error && <p>{error}</p>}

            {/* Mostramos la lista cuando terminó la carga. */}
            {!loading && !error && <TodoList tasks={tasks} />}
        </main>
    )
}