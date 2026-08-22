import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AuthRoutes from './AuthRoutes'
import PrivateRoutes from './PrivateRoutes'

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Al entrar a la aplicación, redirige al login */}
                <Route
                    path="/"
                    element={<Navigate to="/login" replace />}
                />

                {/* Rutas relacionadas con autenticación */}
                <Route
                    path="/login/*"
                    element={<AuthRoutes />}
                />

                {/* Rutas privadas de la aplicación */}
                <Route
                    path="/*"
                    element={<PrivateRoutes />}
                />
            </Routes>
        </BrowserRouter>
    )
}