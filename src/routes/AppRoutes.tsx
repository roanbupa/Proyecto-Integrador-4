import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AuthRoutes from './AuthRoutes'
import PrivateRoutes from './PrivateRoutes'

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Todas las rutas de autenticación */}
                <Route path="/login/*" element={<AuthRoutes />} />

                {/* Todas las rutas privadas */}
                <Route path="/*" element={<PrivateRoutes />} />

                {/* Ruta de respaldo */}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </BrowserRouter>
    )
}