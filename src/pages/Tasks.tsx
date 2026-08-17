import { logoutUser } from '../services/auth'

export default function Tasks() {
    // Cierra la sesión del usuario mediante Firebase.
    const handleLogout = async () => {
        await logoutUser()
    }

    return (
        <main>
            <h1>Mis tareas</h1>
            <p>Área privada del usuario autenticado.</p>

            <button type="button" onClick={handleLogout}>
                Cerrar sesión
            </button>
        </main>
    )
}