import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from '../features/auth/AuthContext'

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
            <Route index element={<p>Usuario autenticado</p>} />

            {/* Cualquier ruta privada desconocida vuelve al inicio. */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}