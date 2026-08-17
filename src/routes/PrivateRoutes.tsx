import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Tasks from '../pages/Tasks'

export default function PrivateRoutes() {
    const { user, loading } = useAuth()

    // Esperamos a que Firebase determine si existe una sesión.
    if (loading) {
        return <p>Cargando...</p>
    }

    // Si no hay usuario autenticado, enviamos al login.
    if (!user) {
        return <Navigate to="/login" replace />
    }

    return (
        <Routes>
            {/* Página privada temporal.
          Más adelante será reemplazada por el dashboard/tareas. */}
            <Route path="tasks" element={<Tasks />} />

            {/* Cualquier ruta privada desconocida vuelve al inicio. */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}