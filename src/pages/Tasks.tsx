import TodoForm from '../components/TodoForm'
import { useAuth } from '../features/auth/AuthContext'
import { logoutUser } from '../services/auth'

export default function Tasks() {
    // Obtenemos el usuario autenticado desde el contexto.
    const { user } = useAuth()

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

            {/* El formulario necesita el ID del usuario
                para asociar la tarea con su propietario. */}
            {user && <TodoForm userId={user.uid} />}
        </main>
    )
}