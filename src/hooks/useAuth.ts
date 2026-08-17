import { useContext } from 'react'
import { AuthContext } from '../features/auth/AuthContextDefinition'

// Hook personalizado para acceder al contexto de autenticación.
export function useAuth() {
    const context = useContext(AuthContext)

    // Evita usar el hook fuera del AuthProvider.
    if (!context) {
        throw new Error('useAuth debe utilizarse dentro de AuthProvider')
    }

    return context
}